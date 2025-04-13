import { Router } from "express";
import { TenantController } from "./tenant.controller";
import auth from "../../middlewares/auth";
import { TUserRole, USER_ROLE } from "../../types/global";

const router = Router();

router.post('/requests',
    auth(USER_ROLE.TENANT as TUserRole),
    TenantController.tenantRequest);

export const TenantRoutes = router;  
