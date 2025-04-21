

import QueryBuilder from "../../../builder/QueryBuilder";
import { IRentalHouse } from "./listing.interface";
import { RentalHouse } from "./listing.model";
import { RentalHouseSearchableFields } from "./listing.constant";
import TenantRequest from "../../tenant/tenant.model";
import User from "../../user/user.model";
import { JwtPayload } from "jsonwebtoken";


const createRentalHouseIntoDB = async (payload: IRentalHouse, user: JwtPayload) => {
  const result = await RentalHouse.create({ ...payload, landlord: user.id });
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

const getSingleRentalHouseFromDB = async (id: string) => {
  const result = await RentalHouse.findById({ _id: id }).select('-__v').lean();
  return result;
};

//email er base e data get
const getRentalHousesByEmailService = async (email: string) => {
  const user = await User.findOne({ email }).select('_id');

  if (!user) {
    throw new Error("User with this email not found.");
  }
  const listings = await RentalHouse.find({ landlord: user._id.toString() }).select('-__v').lean();
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
  const result = await TenantRequest.find({ landlordId: landlordId }).populate('tenantId').select('-__v').lean();
  return result;
};

const respondToRentalRequest = async (
  requestId: string,
  payload: {
    action: "pending" | 'approved' | 'rejected',
  }
) => {
  console.log(payload, "payload");
  const request = await TenantRequest.findByIdAndUpdate(requestId, { status: payload.action }, { new: true });
  return request;
};

export const RentalHouseService = {
  createRentalHouseIntoDB,
  getAllRentalHousesFromDB,
  updateRentalHouseIntoDB,
  deleteRentalHouseFromDB,
  getAllRentalRequestsForLandlord,
  respondToRentalRequest,
  getRentalHousesByEmailService,
  getSingleRentalHouseFromDB
};
