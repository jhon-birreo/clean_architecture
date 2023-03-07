import { UserEntity } from 'feature/user/domain/userEntity';
import { IUser } from 'feature/user/domain/userInterface';
import { UserRepository } from 'feature/user/domain/userRepository';
import { UserExistBeforeCreateUpdate } from '../services/userExistBeforeCreateUpdate';

export class UpdateUserUseCase {
	private readonly userExistBeforeCreateUpdate: UserExistBeforeCreateUpdate;
	constructor(private readonly userRepository: UserRepository) {
		this.userExistBeforeCreateUpdate = new UserExistBeforeCreateUpdate(userRepository);
	}

	async run(id: number,payload: IUser): Promise<IUser | any> {
		await this.userExistBeforeCreateUpdate.validateUpdate(id, payload.email!);
		const user = new UserEntity(payload);
		const userDB = await this.userRepository.update(id,user);
		const result = UserEntity.toJson(userDB);
		return result;
	}
}