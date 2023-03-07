import 'reflect-metadata';
import { QueryParams } from '../../../src/core/application/utils/queryParams';
import { IQueryParams } from '../../../src/core/domain/interfaces/queryParamsInterface';
import { AppDataSource } from '../../../src/core/infrastructure/driven-adapter/db/postgres/dataSource';
import { FindUserUseCase } from '../../../src/feature/user/application/use-cases/userFindUseCase';
import { UserTypeormRepository } from '../../../src/feature/user/infrastructure/implementations/userTypeormRepository';
import * as uuid from 'uuid';
jest.mock('uuid');

describe('User', () => {
	let findUserUseCase: FindUserUseCase;
	let query: IQueryParams = {
		skip: 0,
		take: 5,
		orderField: null
	};
	beforeAll(async () => {
		await AppDataSource.initialize();
		findUserUseCase = new FindUserUseCase(new UserTypeormRepository());
	});

	it('GET/ find/users', async () => {
		// const post = await findUserUseCase.findAll(
		// 	new QueryParams(query).toPrimitives()
		// );

    const post = await findUserUseCase.findByEmail('alvarezg@gmail.com');
		expect(post.id).toBeDefined();
		expect(post.isActive).toBeTruthy();
		expect(post.gender).toEqual("male");
	});

	afterAll(async () => {
		await AppDataSource.destroy();
	});
});
