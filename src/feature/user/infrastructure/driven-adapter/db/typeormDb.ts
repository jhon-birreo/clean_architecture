import {
	Column,
	CreateDateColumn,
	DeleteDateColumn,
	Entity,
	PrimaryGeneratedColumn,
	UpdateDateColumn
} from 'typeorm';
import { DBNameOfTheTable } from '../../../../../core/domain/enum/dbTableName';
import { Gender } from '../../../../../core/domain/types/GenderType';
import { IUser } from '../../../domain/userInterface';

@Entity({ name: DBNameOfTheTable.USER })
export class typeormUsers implements IUser {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	uuid: string;

	@Column()
	firstName: string;

	@Column({ nullable: true })
	lastName: string;

	@Column({ unique: true, nullable: true })
	phone: string;

	@Column({ nullable: true })
	avatar: string;

	@Column({ unique: true })
	email: string;

	@Column()
	password: string;

	@Column({ type: 'enum', default: null, enum: Gender, nullable: true })
	gender: Gender | undefined;

	@Column({ default: true })
	isActive: boolean;

	@CreateDateColumn({ type: 'timestamp' })
	createdAt: string;

	@UpdateDateColumn({ type: 'timestamp' })
	updatedAt: string;

	@DeleteDateColumn({ type: 'timestamp', nullable: true })
	deletedAt: string;
}
