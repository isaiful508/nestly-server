
import { IRentalHouse } from "./listing.interface";
import { RentalHouse } from "./listing.model";


const createRentalHouseIntoDB = async (payload: IRentalHouse) => {
  const result = await RentalHouse.create(payload);
  return result;
};

// const getAllRentalHousesFromDB = async (
//   query: Record<string, unknown>,
//   // landlordId: string
// ) => {
//     // const landlordObjectId = new mongoose.Types.ObjectId(landlordId);

//   const rentalQuery = new QueryBuilder(
//     RentalHouse.find({ landlord: landlordObjectId }),
//     query
//   )
//     .search(RentalHouseSearchableFields)
//     .filter()
//     .sort();

//   const result = await rentalQuery.modelQuery.select('-__v').lean();
//   return result;
// };

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

// const getAllRentalRequestsForLandlord = async (landlordId: string) => {
//   const listings = await RentalHouse.find({ landlord: landlordId }).select('_id');
//   const listingIds = listings.map((house) => house._id);

//   const requests = await RentalRequest.find({
//     listing: { $in: listingIds },
//   }).lean();

//   return requests;
// };

// const respondToRentalRequest = async (
//   requestId: string,
//   status: 'approved' | 'rejected',
//   phoneNumber?: string
// ) => {
//   const request = await RentalRequest.findById(requestId);
//   if (!request) {
//     throw new Error('Rental request not found');
//   }

//   request.status = status;
//   if (status === 'approved' && phoneNumber) {
//     request.landlordPhone = phoneNumber;
//   }

//   await request.save();
//   return request;
// };

export const RentalHouseService = {
  createRentalHouseIntoDB,
  // getAllRentalHousesFromDB,
  updateRentalHouseIntoDB,
  deleteRentalHouseFromDB,
//   getAllRentalRequestsForLandlord,
//   respondToRentalRequest,
};
