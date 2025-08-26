import { User } from '../../domain/user/user';
import { UserRepository } from '../../domain/user/userRepository';

export class UpdateUserService {
    constructor(private userRepo: UserRepository) {}

    async execute(id: number, nickname: string, passwd: Buffer): Promise<User> {
        const user = new User(id, nickname, passwd);
        return await this.userRepo.update(user);
    }
}