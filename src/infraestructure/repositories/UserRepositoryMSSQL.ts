import * as sql from "mssql";
import { getPool } from "../db/mssqlConnection";
import { User } from "../../domain/user/user";
import { UserRepository } from "../../domain/user/userRepository";

/**
 * Adapter de salida MSSQL que implementa el Puerto UserRepository
 * Usa tus SP: SP_ReadUsers, SP_InsertUsers, SP_UpdateUsers, SP_DeleteUsers
 */
export class UserRepositoryMSSQL implements UserRepository {
  async getAll(): Promise<User[]> {
    const pool = await getPool();
    const result = await pool.request().execute("SP_ReadUsers");

    return result.recordset.map((row: any) => {
      // Passwd viene como VARBINARY -> Buffer
      return new User(row.id, row.Nickname, row.Passwd);
    });
  }

  async create(user: User): Promise<User> {
    const pool = await getPool();

    // Tus SP esperan contraseña en texto (SQL la encripta con ENCRYPTBYPASSPHRASE)
    // Si en dominio tienes Buffer, lo pasamos a string utf8
    await pool
      .request()
      .input("Nickname", sql.VarChar(50), user.nickname)
      .input("Passwd", sql.VarChar(50), user.passwd.toString("utf8"))
      .execute("SP_InsertUsers");

    // Tus SP no devuelven el registro insertado, así que consultamos el último por Nickname.
    // (Ideal: modificar SP_InsertUsers para devolver SCOPE_IDENTITY())
    const followUp = await pool
      .request()
      .input("Nickname", sql.VarChar(50), user.nickname)
      .query(
        `SELECT TOP 1 id, Nickname, Passwd, Created_at
         FROM Users
         WHERE Nickname = @Nickname
         ORDER BY id DESC`
      );

    const row = followUp.recordset[0];
    return new User(row.id, row.Nickname, row.Passwd);
  }

  async update(user: User): Promise<User> {
    const pool = await getPool();

    await pool
      .request()
      .input("id", sql.Int, user.id)
      .input("Nickname", sql.VarChar(50), user.nickname)
      .input("Passwd", sql.NVarChar(50), user.passwd.toString("utf8"))
      .execute("SP_UpdateUsers");

    // Igual que en create: el SP no devuelve nada; consultamos el registro actualizado.
    const followUp = await pool
      .request()
      .input("id", sql.Int, user.id)
      .query(
        `SELECT id, Nickname, Passwd, Created_at
         FROM Users
         WHERE id = @id`
      );

    const row = followUp.recordset[0];
    return new User(row.id, row.Nickname, row.Passwd);
  }

  async delete(id: number): Promise<void> {
    const pool = await getPool();
    await pool.request().input("id", sql.Int, id).execute("SP_DeleteUsers");
    // No devolvemos nada (Promise<void>)
  }
}