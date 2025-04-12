import express from 'express';
import { UserControllers } from './user.controller';



const router = express.Router();

router.post(
    '/auth/register',
    UserControllers.registerUser);
router.post(
    '/auth/login',
    UserControllers.loginUser);

export const UserRoutes = router;