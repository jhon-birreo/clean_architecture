import { Router } from 'express';
import { userValidator } from './userRequestValidator';
import { UserController } from './userController';

const router = Router();
const user = new UserController();
router.get('/', user.findAll);
router.post('/', userValidator('create'), user.create);
router.get('/:id', userValidator('params'), user.findById);
router.patch('/:id', userValidator('update'), user.update);
router.delete('/:id', userValidator('params'), user.delete);

export = router;
