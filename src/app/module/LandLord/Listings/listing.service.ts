

import QueryBuilder from "../../../builder/QueryBuilder";
import { IRentalHouse } from "./listing.interface";
import { RentalHouse } from "./listing.model";
import { RentalHouseSearchableFields } from "./listing.constant";
import TenantRequest from "../../tenant/tenant.model";
import User from "../../user/user.model";
import { JwtPayload } from "jsonwebtoken";


const createRentalHouseIntoDB = async (payload: IRentalHouse, user: JwtPayload) => {
  console.log(user);
  const result = await RentalHouse.create({ ...payload, landlord: user._id });
  return result;
};

const getAllRentalHousesFromDB = async (query: Record<string, unknown>) => {
  const rentalQuery = new QueryBuilder(
    RentalHouse.find(),
    query
  )
    .search(RentalHouseSearchableFields)
    .filter()
    .sort();

  const result = await rentalQuery.modelQuery.select('-__v').lean();
  return result;
};
//email er base e data get
const getRentalHousesByEmailService = async (email: string) => {
  const user = await User.findOne({ email }).select('_id');
 console.log("user....",user);
  if (!user) {
    throw new Error("User with this email not found.");
  }
  const listings = await RentalHouse.find({ landlord: user._id.toString() }).select('-__v').lean();
  console.log("listings....",listings);
  return listings;
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
  // Get all listings for this landlord
  const listings = await RentalHouse.find({ landlord: landlordId }).select('_id');
  const listingIds = listings.map((house) => house._id);

  //  Get landlord's phone number from the User collection
  const landlord = await User.findById(landlordId).select('phoneNumber').lean();
  if (!landlord || !landlord.phoneNumber) {
    throw new Error("Landlord's phone number not found.");
  }

  //  Find rental requests related to the landlord
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
  getRentalHousesByEmailService
};
