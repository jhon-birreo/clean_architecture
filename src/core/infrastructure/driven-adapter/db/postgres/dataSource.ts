import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { env } from '../../../config/environment';
export const AppDataSource = new DataSource({
	type: 'postgres',
	host: env.POSTGRES_HOST,
	port: env.POSTGRES_PORT,
	username: env.POSTGRES_USER,
	password: env.POSTGRES_PASSWORD,
	database: env.POSTGRES_DB,
	entities: ['./src/feature/shared/infrastructure/orm/entities/*.ts'],
	migrations: ['./src/feature/shared/infrastructure/orm/migrations/*.ts'],
	logging: false,
	synchronize: false
});
