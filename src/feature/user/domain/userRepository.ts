import { MainCrudRepository } from 'feature/shared/domain/repositories/crudRepository';
import { Nullable } from '../../../core/domain/types/NullableType';
import { IUser } from './userInterface';

export interface UserRepository extends MainCrudRepository<IUser> {
	/**
	 * @method findById Encuentra un registro segun el id.
	 * @param {number} userId  Id del usuario;
	 * @returns {Promise<Nullable<IUser>>}
	 */
	findById(userId: number): Promise<Nullable<IUser>>;

	/**
	 * @method findByEmail Encuentra un registro segun el email.
	 * @param {string} userEmail  Email del usuario;
	 * @returns {Promise<Nullable<IUser>>}
	 */
	findByEmail(userEmail: string): Promise<Nullable<IUser>>;
}
