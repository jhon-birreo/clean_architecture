import type { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
export const validateMessage = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	if (!validationResult(req).isEmpty()) {
		const errors = validationResult(req).array({ onlyFirstError: true });
		return res.status(422).json({
			success: false,
			message: errors[0].msg
		});
	}
	next();
};
