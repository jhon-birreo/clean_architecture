import { body, param, ValidationChain } from 'express-validator';
import { validateMessage } from '../../../../shared/infrastructure/middleware/validationResult';

export const userValidator = (method: string): ValidationChain[] | any => {
	switch (method) {
		case 'create': {
			return [
				body('email')
					.notEmpty()
					.withMessage('el campo email es requerido')
					.isEmail()
					.withMessage('ingrese un correo válido'),
				body('password')
					.notEmpty()
					.withMessage('el campo contraseña es requerido')
					.isLength({ min: 5 })
					.withMessage('la contraseña debe tener como mínimo 5 caracteres'),
				body('firstName')
					.notEmpty()
					.withMessage('el campo nombre es requerido')
					.isLength({ min: 5 })
					.withMessage('el nombre debe tener como mínimo 5 caracteres'),
				body('lastName').optional(),
				body('avatar')
					.optional()
					.isURL()
					.withMessage('el campo avatar debe ser una direccion URL'),
				body('phone')
					.optional()
					.isInt()
					.withMessage('el campo teléfono tiene que ser numérico')
					.isLength({ min: 7 })
					.withMessage('el teléfono debe tener como mínimo 7 caracteres'),
				body('isActive').optional().isIn(['true', 'false']),
				body('address').optional(),
				body('address.userId')
					.if(body('address').exists())
					.notEmpty()
					.withMessage('El campo userId es requerido'),
				body('address.address')
					.if(body('address').exists())
					.notEmpty()
					.withMessage('El campo dirrecion es requerido')
					.isLength({ min: 5, max: 200 })
					.withMessage('La direccion tiene tener min 5 max 200 caracteres'),
				body('address.reference')
					.if(body('address').exists())
					.optional()
					.isLength({ min: 5, max: 200 })
					.withMessage('La referencia tiene tener min 5 max 200 caracteres'),
				validateMessage
			];
		}
		case 'update': {
			return [
				body('email')
					.optional()
					.isEmail()
					.withMessage('ingrese un correo válido'),
				body('password')
					.optional()
					.isLength({ min: 5 })
					.withMessage('la contraseña debe tener como mínimo 5 caracteres'),
				body('firstName')
					.optional()
					.isLength({ min: 3 })
					.withMessage('el nombre usuario debe tener como mínimo 3 caracteres'),
				body('lastName')
					.optional()
					.isLength({ min: 3 })
					.withMessage('el apellido debe tener como mínimo 3 caracteres'),
				body('phone')
					.optional()
					.isInt()
					.withMessage('el campo teléfono tiene que ser numérico')
					.isLength({ min: 7 })
					.withMessage('el teléfono debe tener como mínimo 7 caracteres'),
				body('isActive').optional().isIn(['true', 'false']),
				body('avatar')
					.optional()
					.isURL()
					.withMessage('el campo avatar debe ser una direccion URL'),
				body('address').optional(),
				body('address.userId')
					.optional()
					.if(body('address').exists())
					.notEmpty()
					.withMessage('El campo userId es requerido'),
				body('address.address')
					.optional()
					.if(body('address').exists())
					.notEmpty()
					.withMessage('El campo dirrecion es requerido')
					.isLength({ min: 5, max: 200 })
					.withMessage('La direccion tiene tener min 5 max 200 caracteres'),
				body('address.reference')
					.optional()
					.if(body('address').exists())
					.optional()
					.isLength({ min: 5, max: 200 })
					.withMessage('La referencia tiene tener min 5 max 200 caracteres'),
				validateMessage
			];
		}
		case 'params': {
			return [
				param('id')
					.isNumeric()
					.withMessage('el párametro id no es valido')
					.isInt()
					.withMessage('el párametro id tiene que ser un número entero'),
				validateMessage
			];
		}
		case 'login': {
			return [
				body('email')
					.notEmpty()
					.withMessage('el campo email es requerido')
					.isEmail()
					.withMessage('ingrese un correo válido'),
				body('password')
					.notEmpty()
					.withMessage('el campo contraseña es requerido')
					.isLength({ min: 5 })
					.withMessage('la contraseña debe tener como mínimo 5 caracteres')
			];
		}

		default:
			return [];
	}
};
