import { statusCode as status } from '../../../core/domain/enum/httpStatus';
class BaseError extends Error {
	public statusCode: number;
	public message: string;

	constructor(statusCode: status, message: string) {
		super(message);
		Object.setPrototypeOf(this, new.target.prototype);

		this.message = message;
		this.statusCode = statusCode;

		Error.captureStackTrace(this);
	}
}

export class ApplicationError extends BaseError {
	constructor({ statusCode = status.BAD_REQUEST, message = 'Bad request' }) {
		super(statusCode, message);
	}
}

export class InfrastructureError extends BaseError {
	constructor({
		statusCode = status.INTERNAL_SERVER,
		message = 'Internal server'
	}) {
		super(statusCode, message);
	}
}
