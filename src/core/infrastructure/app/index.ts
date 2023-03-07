import { json, urlencoded } from 'body-parser';
import cors from 'cors';
import { config } from 'dotenv';
import express, { type Application } from 'express';
import morgan from 'morgan';
import router from '../../../core/infrastructure/driving-adapter/api/router';
import { env } from '../config/environment';
import { RedisClientConfig } from '../driven-adapter/db/cache/redisConfig';
import { AppDataSource } from '../driven-adapter/db/postgres/dataSource';
export class App {
	private readonly app: Application;
	constructor() {
		this.environment();
		this.app = express();
		this.middleware();
		this.routes();
	}

	middleware(): void {
		this.app.use(urlencoded({ extended: true }));
		this.app.use(json());
		this.app.use(morgan('dev'));
		this.app.use(cors());
		// this.app.use(responseEnhancer());
	}

	listen(): void {
		this.app.listen(env.SERVER_PORT, () => {
			console.log(process.env.POSTGRES_HOST);

			console.log(
				`The ${env.SERVICE_NAME} running in : ${env.SERVER_HOST}:${env.SERVER_PORT}`
			);
		});
	}

	async database(): Promise<void> {
		// Typeorm db initialized
		await AppDataSource.initialize()
			.then(() => {
				console.log('Database connected');
			})
			.catch((err) => {
				console.error('Error during Data Source initialization', err);
			});
	}

	async redis(): Promise<void> {
		// redis cache initialized
		RedisClientConfig.on('error', (err) => {
			console.log('Redis Client Error', err);
		});
		await RedisClientConfig.connect().then(() => {
			console.log('Redis Client Connected ');
		});
	}

	environment(): void {
		config();
		// dotenv.config({
		// 	path: path.resolve(__dirname, '../../../../../.env')
		// })
	}

	routes(): void {
		this.app.use(`${env.SERVER_ROOT}`, router);
	}
}
