import { RentalHouse } from "../LandLord/Listings/listing.model";
import User from "../user/user.model";

const getAllUsersFromDB = async () => {
    const users = await User.find({role: {$ne: "admin"}});
    return users;
}

const updateUserRoleInDB = async (id: string, role: string) => {    
    const user = await User.findByIdAndUpdate(id, {role}, {new: true});
    return user;
}

const deleteUserFromDB = async (id: string) => {
    const user = await User.findByIdAndDelete(id);
    return user;
}

const getAllRentalHousesFromDB = async () => {
    const houses = await RentalHouse.find();
    return houses;
}

const deleteRentalHouseFromDB = async (id: string) => {
    const house = await RentalHouse.findByIdAndDelete(id);
    return house;
}

const updateRentalHouseStatusInDB = async (id: string, status: string) => {
    const allowedStatuses = ["approved", "rejected"];
    if (!allowedStatuses.includes(status)) {
        throw new Error("Invalid status value. Allowed values are: approved, rejected.");
    }

    const house = await RentalHouse.findByIdAndUpdate(
        id,
        { status },
        { new: true }
    );

    return house;
};



export const AdminServices = {
    getAllUsersFromDB,
    updateUserRoleInDB,
    deleteUserFromDB,
    getAllRentalHousesFromDB,
    deleteRentalHouseFromDB,
    updateRentalHouseStatusInDB
}
