import { Router } from "express";
import { ListingRoutes } from "../module/LandLord/Listings/listing.route";

import { UserRoutes } from "../module/user/user.route";
import { TenantRoutes } from "../module/tenant/tenant.route";
import { AdminRoutes } from "../module/admin/admin.route";

const router = Router();

const moduleRouters = [


    {
        path:"/landlords",
        route:ListingRoutes
    },
    {
        path: "/auth",
        route: UserRoutes,
    },
    {
        path: "/tenants",
        route: TenantRoutes,
    },
    {
        path: "/admin",
        route: AdminRoutes,
    },
    

    
]

moduleRouters.forEach((route) => router.use(route.path, route.route));

export default router;