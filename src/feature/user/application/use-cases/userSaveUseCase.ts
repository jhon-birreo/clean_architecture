import { UuidRepository } from 'feature/shared/domain/repositories/uuidRepository';
import { UserEntity } from 'feature/user/domain/userEntity';
import { IUser } from 'feature/user/domain/userInterface';
import { UserRepository } from 'feature/user/domain/userRepository';
import { UserExistBeforeCreateUpdate } from '../services/userExistBeforeCreateUpdate';

export class SaveUserUseCase {
	private readonly userExistBeforeCreateUpdate: UserExistBeforeCreateUpdate;
	constructor(
		private readonly userRepository: UserRepository,
		private readonly uuidV4Generator: UuidRepository
	) {
		this.userExistBeforeCreateUpdate = new UserExistBeforeCreateUpdate(
			userRepository
		);
	}

	async run(payload: IUser): Promise<IUser | any> {
		await this.userExistBeforeCreateUpdate.validateCreate(payload.email!);
		const user = new UserEntity(payload);
		user.uuid = this.uuidV4Generator.ramdom();
		const userDB: IUser | null = await this.userRepository.create(user);
		const result = UserEntity.toJson(userDB!);

		return result;
	}
}
