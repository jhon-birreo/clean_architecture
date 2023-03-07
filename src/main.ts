import { App } from './core/infrastructure/app/index';
import * as dotenv from 'dotenv';
dotenv.config();
import 'reflect-metadata';
async function main(): Promise<void> {
	const app = new App();
	app.listen();
	await app.database();
	// await app.redis();
	app.routes();
}
void main();
