import { UserRepository } from '../../domain/user/userRepository';

export class DeleteUserService {
    constructor(private userRepo: UserRepository) {}

    async execute(id: number): Promise<void> {
        await this.userRepo.delete(id);
    }
}