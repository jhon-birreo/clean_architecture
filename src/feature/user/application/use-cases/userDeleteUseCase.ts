import { UserRepository } from 'feature/user/domain/userRepository';
export class DeleteUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async run(id: number): Promise<any> {
    const result = await this.userRepository.delete(id);
    return result;
  }
}