import { Router } from "express";
import { ListingRoutes } from "../module/LandLord/Listings/listing.route";


const router = Router();

const moduleRouters = [


    {
        path:"/landlords",
        route:ListingRoutes
    }
    

    
]

moduleRouters.forEach((route) => router.use(route.path, route.route));

export default router;