import { IUser } from 'feature/user/domain/userInterface';
import { UserRepository } from 'feature/user/domain/userRepository';
import { InfrastructureError } from '../../../../core/application/errors/apiError';
import { msg } from '../../../../core/application/messages/index';
import { statusCode } from '../../../../core/domain/enum/httpStatus';
import { IQueryParams } from '../../../../core/domain/interfaces/queryParamsInterface';
import { AppDataSource } from '../../../../core/infrastructure/driven-adapter/db/postgres/dataSource';
import { typeormUsers } from '../driven-adapter/db/typeormDb';
export class UserTypeormRepository implements UserRepository {
	private readonly _db = AppDataSource.getRepository(typeormUsers);

	async find(param: IQueryParams): Promise<IUser[] | any> {
		try {
			const users: IUser[] = await this._db.find({
				where: { ...Object(param.conditionalField) },
				order: Object(param.orderField),
				skip: param.skip,
				take: param.take
			});
			return users;
		} catch (error) {
			if (error instanceof Error) {
				console.log(error);
				
				throw new InfrastructureError({
					statusCode: statusCode.INTERNAL_SERVER,
					message: error.message
				});
			}
		}
	}

	async create(user: IUser): Promise<IUser | any> {
		try {
			const users = await this._db.save(user);
			return users;
		} catch (error) {
			if (error instanceof Error) {
				throw new InfrastructureError({
					statusCode: statusCode.INTERNAL_SERVER,
					message: error.message
				});
			}
		}
	}

	async update(id: number, user: IUser): Promise<IUser | any> {
		try {
			await this._db.update({ id }, user);
			return await this._db.findOne({ where: { id } });
		} catch (error) {
			if (error instanceof Error) {
				throw new InfrastructureError({
					statusCode: statusCode.INTERNAL_SERVER,
					message: error.message
				});
			}
		}
	}

	async delete(id: number): Promise<string | any> {
		try {
			return await this._db.softDelete({ id }).then((result) => {
				if (result.affected === 0) {
					throw new InfrastructureError({
						statusCode: statusCode.NOT_FOUND,
						message: msg.THERE_NOTHING_REMOVE
					});
				}
				return msg.SUCCESSFULLY_REMOVED;
			});
		} catch (error) {
			if (error instanceof Error) {
				throw new InfrastructureError({
					statusCode: statusCode.INTERNAL_SERVER,
					message: error.message
				});
			}
		}
	}

	async findOne(param: object): Promise<IUser | any> {
		try {
			const users = await this._db.findOne({
				where: { ...param }
			});
			return users;
		} catch (error) {
			if (error instanceof Error) {
				throw new InfrastructureError({
					statusCode: statusCode.INTERNAL_SERVER,
					message: error.message
				});
			}
		}
	}

	async findById(id: number): Promise<IUser | any> {
		try {
			const users = await this._db.findOneBy({ id });

			return users;
		} catch (error) {
			if (error instanceof Error) {
				throw new InfrastructureError({
					statusCode: statusCode.INTERNAL_SERVER,
					message: error.message
				});
			}
		}
	}

	async findByEmail(email: string): Promise<IUser | any> {
		try {
			const users = await this._db.findOneBy({ email });

			return users;
		} catch (error) {
			if (error instanceof Error) {
				throw new InfrastructureError({
					statusCode: statusCode.INTERNAL_SERVER,
					message: error.message
				});
			}
		}
	}
}
