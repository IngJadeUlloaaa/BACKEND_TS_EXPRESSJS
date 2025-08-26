import { User } from '../../domain/user/user';
import { UserRepository } from '../../domain/user/userRepository';

export class GetAllUserService {
    constructor(private userRepo: UserRepository) {}

    async execute(): Promise<User[]> {
        return await this.userRepo.getAll();
    }
}