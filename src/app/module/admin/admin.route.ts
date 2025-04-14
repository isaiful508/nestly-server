import { Router } from "express";
import { AdminController } from "./admin.controller";
import auth from "../../middlewares/auth";
import { TUserRole, USER_ROLE } from "../../types/global";

const router = Router();

router.get("/users", 
    auth(USER_ROLE.ADMIN as TUserRole),
    AdminController.getAllUsers);

router.put("/user/:id", 
    auth(USER_ROLE.ADMIN as TUserRole),
    AdminController.updateUserRole);

router.delete("/user/:id", 
    auth(USER_ROLE.ADMIN as TUserRole),
    AdminController.deleteUser);

router.get("/listings", 
    auth(USER_ROLE.ADMIN as TUserRole),
    AdminController.getAllRentalHouses);

router.delete("/listings/:id", 
    auth(USER_ROLE.ADMIN as TUserRole),
    AdminController.deleteRentalHouse);

export const AdminRoutes = router;
