import express from 'express';
import { UserControllers } from './user.controller';
import validateRequest from '../../middlewares/validateRequest';
import { loginValidationSchema, registerValidationSchema } from './user.validation';



const router = express.Router();

router.post(
    '/auth/register',
    UserControllers.registerUser);

export const UserRoutes = router;