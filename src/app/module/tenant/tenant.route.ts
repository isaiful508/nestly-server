import { Router } from "express";
import { TenantController } from "./tenant.controller";
import auth from "../../middlewares/auth";
import { TUserRole, USER_ROLE } from "../../types/global";

const router = Router();

router.post('/requests',
    auth(USER_ROLE.TENANT as TUserRole),
    // dataValidator(createTenantRequestValidation),
    TenantController.tenantRequest);

router.get('/requests',
    auth(USER_ROLE.TENANT as TUserRole),
    TenantController.getAllTenantRequest);

router.put('/profile',
    auth(USER_ROLE.TENANT as TUserRole),
    TenantController.updateTenantProfile);

router.get('/requests/:id',
    auth(USER_ROLE.TENANT as TUserRole),
    TenantController.getSingleTenantRequest);

export const TenantRoutes = router;  
