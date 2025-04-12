import { Router } from "express";
import { UserRoutes } from "../module/user/user.route";

const router = Router();

const moduleRouters = [

    {
        path: "/auth",
        route: UserRoutes,
    },
    

    
]

moduleRouters.forEach((route) => router.use(route.path, route.route));

export default router;