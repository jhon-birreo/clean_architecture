import { HttpResponse } from '../../../core/domain/interfaces/protocols/httpInterface';
import { ApplicationError, InfrastructureError } from './apiError';
export interface oks {
	data?: [] | {} | undefined | any;
	message?: string | undefined;
	token?: string | undefined;
}
export const Ok = ({ data, token, message }: oks): HttpResponse => ({
	success: true,
	data,
	token,
	message
});

export const ErrorResponse = (
	error: ApplicationError | InfrastructureError | Error
): HttpResponse => ({
	success: false,
	message: error.message
});

export const Unprocessable = (message: string): HttpResponse => ({
	success: false,
	message
});

export const Unauthorized = (message: string): HttpResponse => ({
	success: false,
	message
});

export const NotFound = (message: string): HttpResponse => ({
	success: false,
	message
});

// export const serverError = (error: Error): HttpResponse => ({
//   statusCode: statusCode.INTERNAL_SERVER,
//   message : toErrorWithMessage(error).message
// })

// type ErrorWithMessage = {
//   message: string
// }
// function isErrorWithMessage(error: unknown): error is ErrorWithMessage {
//   return (
//     typeof error === 'object' &&
//     error !== null &&
//     'message' in error &&
//     typeof (error as Record<string, unknown>).message === 'string'
//   )
// }

// function toErrorWithMessage(maybeError: unknown): ErrorWithMessage {
//   if (isErrorWithMessage(maybeError)) return maybeError

//   try {
//     return new Error(JSON.stringify(maybeError))
//   } catch {
//     // fallback in case there's an error stringifying the maybeError
//     // like with circular references for example.
//     return new Error(String(maybeError))
//   }
// }

// function getErrorMessage(error: unknown) {
//   return toErrorWithMessage(error).message
// }
