import { UserRepository } from "feature/user/domain/userRepository"

export class UserExistByEmail {

  constructor ( private readonly userRepository: UserRepository) {
  }

  async run (userEmail: string): Promise<boolean> {
    const user = await this.userRepository.findByEmail(userEmail)

    if (user != null) return true

    return false
  }
}