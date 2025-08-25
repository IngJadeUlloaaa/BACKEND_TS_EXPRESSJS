// src/application/user/createUserService.ts
import { User } from '../../domain/user/user';
import { UserRepository } from '../../domain/user/userRepository';

export class CreateUserService {
    constructor(private userRepo: UserRepository) {}

    async execute(nickname: string, passwd: Buffer): Promise<User> {
        // ✅ Creamos la entidad de dominio
        const user = new User(0, nickname, passwd);

        // ✅ Delegamos en el repositorio
        return await this.userRepo.create(user);
    }
}
/**
 * Caso de uso: Crear un usuario    
    * No depende de Express ni de la base de datos
    */