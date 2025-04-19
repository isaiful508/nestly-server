import { Router } from "express";
import validateRequest from "../../../middlewares/validateRequest";
import { updateRentalHouseValidationSchema } from "./listing.validation";
import { createRentalHouse, deleteRentalHouse, getAllRentalHouses, getAllRentalRequests, getRentalHousesByEmail, handleRentalRequestResponse, updateRentalHouse } from "./listing.controller";
import auth from "../../../middlewares/auth";
import { TUserRole, USER_ROLE } from "../../../types/global";

const router = Router();

router.post("/listings",
    auth(USER_ROLE.LANDLORD as TUserRole),
    // dataValidator(createRentalHouseValidationSchema),
    createRentalHouse,
)
router.get("/listings", getAllRentalHouses);
router.get("/listings/:email", getRentalHousesByEmail);
router.put('/listings/:id',
    auth(USER_ROLE.LANDLORD as TUserRole),
    validateRequest(updateRentalHouseValidationSchema),
    updateRentalHouse,
)
router.delete("/listings/:id",
    auth(USER_ROLE.LANDLORD as TUserRole),
    deleteRentalHouse
)
//rental request
router.get("/requests", auth(USER_ROLE.LANDLORD as TUserRole), getAllRentalRequests);
router.patch("/requests/:requestId", auth(USER_ROLE.LANDLORD as TUserRole), handleRentalRequestResponse);
export const ListingRoutes = router;