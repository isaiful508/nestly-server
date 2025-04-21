import { Request, Response } from "express";
import { RentalHouseService } from "./listing.service";


import { StatusCodes } from 'http-status-codes';
import { sendResponse } from "../../../utils/sendResponse";
import catchAsync from "../../../utils/catchAsync";
// Create rental house
export const createRentalHouse = catchAsync(async (req: Request, res: Response) => {
  const data = req.body;
  const user = req.user;
  const result = await RentalHouseService.createRentalHouseIntoDB(data, user);

  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: "Rental house created successfully",
    data: result,
  });
});

// Get all rental houses for a landlord with query support
export const getAllRentalHouses = catchAsync(async (req: Request, res: Response) => {
  const query = req.query;

  const result = await RentalHouseService.getAllRentalHousesFromDB(query);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Rental houses retrieved successfully",
    data: result,
  });
});

export const getSingleRentalHouse = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await RentalHouseService.getSingleRentalHouseFromDB(id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Rental house retrieved successfully",
    data: result,
  });
});



//Get rental houses by email
export const getRentalHousesByEmail = catchAsync(async (req: Request, res: Response) => {
  const { email } = req.params;
  console.log(email);
  if (!email) {
    res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      message: "Email is required and must be a string.",
    });
    return;
  }

  const result = await RentalHouseService.getRentalHousesByEmailService(email as string);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Rental houses fetched by email successfully",
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
  console.log(landlordId, "landlordId");
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

  const result = await RentalHouseService.respondToRentalRequest(requestId, req.body);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: `Rental request updated successfully`,
    data: result,
  });
});
