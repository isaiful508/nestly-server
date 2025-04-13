import { Router } from "express";
import validateRequest from "../../../middlewares/validateRequest";
import { createRentalHouseValidationSchema, updateRentalHouseValidationSchema } from "./listing.validation";
import { createRentalHouse, deleteRentalHouse, getAllRentalHouses, updateRentalHouse } from "./listing.controller";
import auth from "../../../middlewares/auth";
import { USER_ROLE } from "../../../types/global";

const router = Router();
router.post("/listings",
    validateRequest(createRentalHouseValidationSchema),
    createRentalHouse,
)
router.get("/listings", auth(USER_ROLE.landlord ), getAllRentalHouses);
router.patch('/:id',
    validateRequest(updateRentalHouseValidationSchema),
    updateRentalHouse,
)
router.delete("/listings/:id", 
    deleteRentalHouse
)
export const ListingRoutes = router;