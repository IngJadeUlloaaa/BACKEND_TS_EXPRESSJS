// src/domain/user/userRepository.ts
import { User } from './user';

export interface UserRepository {
    getAll(): Promise<User[]>;      // listar todos
    create(user: User): Promise<User>; // crear
    update(user: User): Promise<User>; // actualizar
    delete(id: number): Promise<void>; // eliminar
}

/**
 * Puerto de salida (contrato)
 * Define qué operaciones soporta el repositorio de usuarios
 */
