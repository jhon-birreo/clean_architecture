import { Request, Response } from 'express';
import { UuidV4Generator } from 'feature/shared/infrastructure/helpers/uuid4Generator';
import { DeleteUserUseCase } from 'feature/user/application/use-cases/userDeleteUseCase';
import { FindUserUseCase } from 'feature/user/application/use-cases/userFindUseCase';
import { SaveUserUseCase } from 'feature/user/application/use-cases/userSaveUseCase';
import { UpdateUserUseCase } from 'feature/user/application/use-cases/userUpdateUseCase';
import { IUser } from 'feature/user/domain/userInterface';
import {
	ApplicationError,
	InfrastructureError
} from '../../../../../core/application/errors/apiError';
import {
	ErrorResponse,
	NotFound,
	Ok
} from '../../../../../core/application/errors/httpHelper';
import { statusCode } from '../../../../../core/domain/enum/httpStatus';
import { IQueryParams } from '../../../../../core/domain/interfaces/queryParamsInterface';
import { UserTypeormRepository } from '../../implementations/userTypeormRepository';

export class UserController {
	private readonly saveUserUseCase = new SaveUserUseCase(
		new UserTypeormRepository(),
		new UuidV4Generator()
	);
	private readonly findUserUseCase = new FindUserUseCase(
		new UserTypeormRepository()
	);
	private readonly updateUserUseCase = new UpdateUserUseCase(
		new UserTypeormRepository()
	);
	private readonly DeleteUserUseCase = new DeleteUserUseCase(
		new UserTypeormRepository()
	);
	create = async (req: Request, res: Response): Promise<Response | void> => {
		const body: IUser = req.body;
		try {
			const data = await this.saveUserUseCase.run(body);
			return res.status(statusCode.OK).json(Ok({ data }));
		} catch (error) {
			if (error instanceof ApplicationError)
				return res.status(error.statusCode).json(NotFound(error.message));
			if (error instanceof InfrastructureError)
				return res.status(error.statusCode).json(ErrorResponse(error));
		}
	};

	findAll = async (req: Request, res: Response): Promise<Response | void> => {
		try {
			const query = req.query as unknown as IQueryParams;
			const data = await this.findUserUseCase.findAll(query);
			return res.status(statusCode.OK).json(Ok({ data }));
		} catch (error) {
			if (error instanceof ApplicationError)
				return res.status(error.statusCode).json(NotFound(error.message));
			if (error instanceof InfrastructureError)
				return res.status(error.statusCode).json(ErrorResponse(error));
		}
	};

	findById = async (req: Request, res: Response): Promise<Response | void> => {
		const userId = req.params.id;
		try {
			return res.json(Ok({ data: userId }));
		} catch (error) {
			if (error instanceof ApplicationError)
				return res.status(error.statusCode).json(NotFound(error.message));
			if (error instanceof InfrastructureError)
				return res.status(error.statusCode).json(ErrorResponse(error));
		}
	};

	update = async (req: Request, res: Response): Promise<Response | void> => {
		const userBody: IUser = req.body;
		const userId = Number(req.params.id);
		try {
			const data = await this.updateUserUseCase.run(userId, userBody);
			return res.json(Ok({ data }));
		} catch (error) {
			if (error instanceof ApplicationError)
				return res.status(error.statusCode).json(NotFound(error.message));
			if (error instanceof InfrastructureError)
				return res.status(error.statusCode).json(ErrorResponse(error));
		}
	};

	delete = async (req: Request, res: Response): Promise<Response | void> => {
		const userId = Number(req.params.id);
		try {
			const message = await this.DeleteUserUseCase.run(userId);
			return res.json(Ok({ message }));
		} catch (error) {
			if (error instanceof ApplicationError)
				return res.status(error.statusCode).json(NotFound(error.message));
			if (error instanceof InfrastructureError)
				return res.status(error.statusCode).json(ErrorResponse(error));
		}
	};
}
