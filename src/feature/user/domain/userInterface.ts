import { Gender } from '../../../core/domain/types/GenderType';

export interface IUser {
	id: number | undefined;
	uuid: string | undefined;
	firstName: string | undefined;
	lastName: string | undefined;
	email: string | undefined;
	password?: string | undefined;
	phone: string | undefined;
	avatar: string | undefined;
	gender: Gender | undefined;
	isActive: boolean | undefined;
	createdAt?: string | undefined;
}
