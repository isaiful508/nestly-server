import express from 'express';
import { UserControllers } from './user.controller';
import auth from '../../middlewares/auth';
import { TUserRole, USER_ROLE } from '../../types/global';



const router = express.Router();

router.post(
    '/register',
    UserControllers.registerUser);
router.post(
    '/login',
    UserControllers.loginUser);

    router.put("/update-profile", 
         auth("LANDLORD", "TENANT", "ADMIN"),
                UserControllers.updateProfile);

export const UserRoutes = router;