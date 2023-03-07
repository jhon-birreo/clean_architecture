import { ApplicationError } from "core/application/errors/apiError"
import { msg } from "core/application/messages/index"
import { statusCode } from "core/domain/enum/httpStatus"
import { UserEntity } from "feature/user/domain/userEntity"
import { IUser } from "feature/user/domain/userInterface"
import { UserRepository } from "feature/user/domain/userRepository"

export class UserFindById {

  constructor (private readonly userRepository: UserRepository) {
  }

  async run (idUser: number): Promise<IUser> {
    const user = await this.userRepository.findById(idUser)

    if (user === null) { throw new ApplicationError({
      statusCode: statusCode.UNPROCESSABLE,
      message: msg.RESOURCE_NOT_FOUND
    }) }

    return user
  }
}