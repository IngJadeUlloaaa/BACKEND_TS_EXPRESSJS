import { User } from './user';

export interface UserRepository {
    getAll(): Promise<User[]>; // list all users
    create(nickname: string, passwd: string): Promise<void>; // add a new user
    update(id: number, nickaname: string, passwd: string): Promise<void>; // modify an existing user
    delete(id: number): Promise<void>; // remove a user
}

/**
 * Puerto de salida (contrato)
 * Define qué operaciones soporta el repositorio de usuarios
 * 
 * 🚫 Aquí NO decimos cómo se hace (SQL, Mongo, etc.)
 * ✅ Solo declaramos el "qué"
 */