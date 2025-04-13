import { Router } from "express";
import validateRequest from "../../../middlewares/validateRequest";
import { createRentalHouseValidationSchema, updateRentalHouseValidationSchema } from "./listing.validation";
import { createRentalHouse, deleteRentalHouse, getAllRentalHouses, getAllRentalRequests, handleRentalRequestResponse, updateRentalHouse } from "./listing.controller";
import auth from "../../../middlewares/auth";
import { USER_ROLE } from "../../../types/global";

const router = Router();
router.post("/listings",
    validateRequest(createRentalHouseValidationSchema),
    createRentalHouse,
)
router.get("/listings", auth(USER_ROLE.LANDLORD), getAllRentalHouses);
router.put('/listings/:id',
    validateRequest(updateRentalHouseValidationSchema),
    updateRentalHouse,
)
router.delete("/listings/:id", 
    deleteRentalHouse
)
//rental request
router.get("/requestes", auth(USER_ROLE.LANDLORD), getAllRentalRequests);
router.patch("/requests/:requestId", auth(USER_ROLE.LANDLORD), handleRentalRequestResponse);
export const ListingRoutes = router;