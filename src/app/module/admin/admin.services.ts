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

export const AdminServices = {
    getAllUsersFromDB,
    updateUserRoleInDB,
    deleteUserFromDB
}
