import { Router } from 'express';
import user from '../../../../feature/user/infrastructure/driving-adapter/api/userRouter';
const router = Router();

router.use('/user', user);
export = router;