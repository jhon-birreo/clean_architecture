import { ApplicationError } from '../../../../core/application/errors/apiError';
import { msg } from '../../../../core/application/messages/index';
import { QueryParams } from '../../../../core/application/utils/queryParams';
import { statusCode } from '../../../../core/domain/enum/httpStatus';
import { IQueryParams } from '../../../../core/domain/interfaces/queryParamsInterface';
import { UserEntity } from '../../../../feature/user/domain/userEntity';
import { IUser } from '../../../../feature/user/domain/userInterface';
import { UserRepository } from '../../../../feature/user/domain/userRepository';

export class FindUserUseCase {
	constructor(private readonly userRepository: UserRepository) {}
	async findAll(queryParams: IQueryParams): Promise<IUser | any> {
		const users = await this.userRepository.find(
			new QueryParams(queryParams).toPrimitives()
		);
		return !users ? [] : users.map((user: IUser) => UserEntity.toJson(user));
	}

	async findOne(payload: IUser): Promise<IUser | any> {
		const user = await this.userRepository.findOne(payload);
		return !user ? [] : UserEntity.toJson(user);
	}

	async findById(id: string): Promise<IUser | []> {
		const user = await this.userRepository.findOne({ id });

		if (user === null) {
			throw new ApplicationError({
				statusCode: statusCode.UNPROCESSABLE,
				message: msg.RESOURCE_NOT_FOUND
			}); 
		}
		return UserEntity.toJson(user);
	}

	async findByEmail(email: string): Promise<IUser> {
		const user = await this.userRepository.findOne({ email });
		if (user === null) {
			throw new ApplicationError({
				statusCode: statusCode.UNPROCESSABLE,
				message: msg.RESOURCE_NOT_FOUND
			}); 
		}
		return user;
	}
}
