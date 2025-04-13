import { Router } from "express";
import { AdminController } from "./admin.controller";
import auth from "../../middlewares/auth";
import { TUserRole, USER_ROLE } from "../../types/global";

const router = Router();

router.get("/users", 
    auth(USER_ROLE.ADMIN as TUserRole),
    AdminController.getAllUsers);

router.put("/users/:id", 
    auth(USER_ROLE.ADMIN as TUserRole),
    AdminController.updateUserRole);

router.delete("/users/:id", 
    auth(USER_ROLE.ADMIN as TUserRole),
    AdminController.deleteUser);

export const AdminRoutes = router;
