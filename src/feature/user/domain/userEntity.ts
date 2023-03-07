import { Email } from '../../../core/application/utils/Email';
import { Gender } from '../../../core/domain/types/GenderType';
import { Nullable } from '../../../core/domain/types/NullableType';
import { IUser } from './userInterface';

export class UserEntity implements IUser {
	[optional: string]: unknown | undefined;
	id: number | undefined;
	uuid: string | undefined;
	firstName: string | undefined;
	lastName: string | undefined;
	email: string | undefined;
	password: string | undefined;
	avatar: string | undefined;
	phone: string | undefined;
	gender: Gender | undefined;
	isActive: boolean | undefined;
	createdAt: string | undefined;

	constructor(props?: {
		id: number | undefined;
		uuid: string | undefined;
		firstName: string | undefined;
		lastName: string | undefined;
		email: string | undefined;
		password?: string | undefined;
		avatar: string | undefined;
		phone: string | undefined;
		gender: Gender | undefined;
		isActive: boolean | undefined;
		createdAt?: string | undefined;
	}) {
		this.id = props?.id;
		this.uuid = props?.uuid;
		this.firstName = props?.firstName;
		this.lastName = props?.lastName;
		this.email = new Email(props?.email?.toLowerCase()).value!;
		this.password = props?.password;
		this.avatar = props?.avatar;
		this.phone = props?.phone;
		this.gender = props?.gender;
		this.isActive = props?.isActive;
		this.createdAt = props?.createdAt;
	}

	static toJson(payload: Nullable<IUser>): IUser | [] {
		if (!payload) return [];
		const fromJSON: IUser = {
			id: payload.id,
			uuid: payload.uuid,
			firstName: payload.firstName,
			lastName: payload.lastName,
			email: payload.email,
			phone: payload.phone,
			avatar: payload.avatar,
			gender: payload.gender,
			isActive: payload.isActive
		};
		return fromJSON;
	}

	static arrayFromJson(payload: IUser[] | []): IUser[] {
		if (!(payload.length >= 0)) return [];
		return payload.map((value) => {
			const fromJSON: IUser = {
				id: value.id,
				uuid: value.uuid,
				firstName: value.firstName,
				lastName: value.lastName,
				email: value.email,
				phone: value.phone,
				avatar: value.avatar,
				gender: value.gender,
				isActive: value.isActive
			};
			return fromJSON;
		});
	}
}
