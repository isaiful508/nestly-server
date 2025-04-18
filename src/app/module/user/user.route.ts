import express from 'express';
import { UserControllers } from './user.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../../types/global';



const router = express.Router();

router.post(
    '/register',
    UserControllers.registerUser);
router.post(
    '/login',
    UserControllers.loginUser);

    // router.put("/update-profile", 
    //      auth("LANDLORD", "TENANT", "ADMIN"),
    //             UserControllers.updateProfile);

    const ALL_ROLES = Object.values(USER_ROLE);

router.put("/update-profile", auth(...ALL_ROLES), UserControllers.updateProfile);

export const UserRoutes = router;