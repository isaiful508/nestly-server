import { Request, Response } from "express";
import { RentalHouseService } from "./listing.service";


import { StatusCodes } from 'http-status-codes';
import { sendResponse } from "../../../utils/sendResponse";
import catchAsync from "../../../utils/catchAsync";
// Create rental house
export const createRentalHouse = catchAsync(async (req: Request, res: Response) => {
  const data = req.body;
  const result = await RentalHouseService.createRentalHouseIntoDB(data);

  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: "Rental house created successfully",
    data: result,
  });
});

// Get all rental houses for a landlord with query support
export const getAllRentalHouses = catchAsync(async (req: Request, res: Response) => {
  console.log("check......",req);
   const landlordId = req?.user.id; 
  const query = req.query;

  const result = await RentalHouseService.getAllRentalHousesFromDB(
    query,
     landlordId
  );

  sendResponse(res, {
    statusCode:StatusCodes.OK,
    success: true,
    message: "Rental houses retrieved successfully",
    data: result,
  });
});

// Update rental house
export const updateRentalHouse = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const data = req.body;

  const result = await RentalHouseService.updateRentalHouseIntoDB(id, data);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Rental house updated successfully",
    data: result,
  });
});

// Delete rental house
export const deleteRentalHouse = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await RentalHouseService.deleteRentalHouseFromDB(id);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Rental house deleted successfully",
    data: result,
  });
});

export const getAllRentalRequests = catchAsync(async (req: Request, res: Response) => {
  const landlordId = req?.user?.id;

  const result = await RentalHouseService.getAllRentalRequestsForLandlord(landlordId);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Rental requests retrieved successfully",
    data: result,
  });
});

// Respond to a rental request
export const handleRentalRequestResponse = catchAsync(async (req: Request, res: Response) => {
  const { requestId } = req.params;
  const { status, phoneNumber } = req.body;

  const result = await RentalHouseService.respondToRentalRequest(requestId, status, phoneNumber);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: `Rental request ${status} successfully`,
    data: result,
  });
});
