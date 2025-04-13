
import mongoose from "mongoose";
import QueryBuilder from "../../../builder/QueryBuilder";
import { IRentalHouse } from "./listing.interface";
import { RentalHouse } from "./listing.model";
import { RentalHouseSearchableFields } from "./listing.constant";
import TenantRequest from "../../tenant/tenant.model";
import User from "../../user/user.model";
// import User from "../../user/user.model";


const createRentalHouseIntoDB = async (payload: IRentalHouse) => {
  const result = await RentalHouse.create(payload);
  return result;
};

const getAllRentalHousesFromDB = async (
  query: Record<string, unknown>,
  landlordId: string
) => {
    const landlordObjectId = new mongoose.Types.ObjectId(landlordId);

  const rentalQuery = new QueryBuilder(
    RentalHouse.find({ landlord: landlordObjectId }),
    query
  )
    .search(RentalHouseSearchableFields)
    .filter()
    .sort();

  const result = await rentalQuery.modelQuery.select('-__v').lean();
  return result;
};

const updateRentalHouseIntoDB = async (
  id: string,
  payload: Partial<IRentalHouse>
) => {
  const result = await RentalHouse.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteRentalHouseFromDB = async (id: string) => {
  const result = await RentalHouse.findByIdAndDelete(id);
  return result;
};

const getAllRentalRequestsForLandlord = async (landlordId: string) => {
  // Step 1: Get all listings for this landlord
  const listings = await RentalHouse.find({ landlord: landlordId }).select('_id');
  const listingIds = listings.map((house) => house._id);

  // Step 2: Get landlord's phone number from the User collection
  const landlord = await User.findById(landlordId).select('phone').lean();
  if (!landlord || !landlord.phoneNumber) {
    throw new Error("Landlord's phone number not found.");
  }

  // Step 3: Find rental requests related to the landlord
  const requests = await TenantRequest.find({
    listing: { $in: listingIds },
    landlordPhone: landlord.phoneNumber,
  }).lean();

  return requests;
};

const respondToRentalRequest = async (
  requestId: string,
  status: 'approved' | 'rejected',
  phoneNumber?: string
) => {
  const request = await TenantRequest.findById(requestId);
  if (!request) {
    throw new Error('Rental request not found');
  }

  request.status = status;
  if (status === 'approved' && phoneNumber) {
    request.landlordPhone = phoneNumber;
  }

  await request.save();
  return request;
};

export const RentalHouseService = {
  createRentalHouseIntoDB,
  getAllRentalHousesFromDB,
  updateRentalHouseIntoDB,
  deleteRentalHouseFromDB,
  getAllRentalRequestsForLandlord,
  respondToRentalRequest,
};
