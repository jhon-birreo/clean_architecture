import { UserRepository } from 'feature/user/domain/userRepository';
import { ApplicationError } from '../../../../core/application/errors/apiError';
import { msg } from '../../../../core/application/messages/index';
import { statusCode } from '../../../../core/domain/enum/httpStatus';
import { UserExistByEmail } from './userExistFindByEmailService';
import { UserFindById } from './userFindByIdService';

export class UserExistBeforeCreateUpdate {
	private readonly _userExistByEmail: UserExistByEmail;
	private readonly _userFindById: UserFindById;
	constructor(private readonly userRepository: UserRepository) {
		this._userExistByEmail = new UserExistByEmail(userRepository);
		this._userFindById = new UserFindById(userRepository);
	}

	async validateCreate(userEmail: string): Promise<any> {
		const isUserExiste = await this._userExistByEmail.run(userEmail);
		if (isUserExiste) {
			throw new ApplicationError({
				statusCode: statusCode.UNPROCESSABLE,
				message: msg.THE_FIELD_AND_VALUE_ALREADY_EXISTS.replace(
					'{field}',
					msg.USER
				).replace('{value}', userEmail)
			});
		}
	}

	async validateUpdate(id: number, userEmail: string): Promise<any> {
		const isUserExiste = await this._userExistByEmail.run(userEmail);
		const existUser = await this._userFindById.run(id);
		if (!existUser) {
			throw new ApplicationError({
				statusCode: statusCode.BAD_REQUEST,
				message: msg.RESOURCE_NOT_FOUND
			});
		}
		if (existUser && existUser.email != userEmail) {
			if (isUserExiste) {
				throw new ApplicationError({
					statusCode: statusCode.UNPROCESSABLE,
					message: msg.USER_WITH_EMAIL_ALREADY_EXISTS.replace(
						'{{email}}',
						userEmail
					)
				});
			}
		}
	}
}
