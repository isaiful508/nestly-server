import catchAsync from "../../utils/catchAsync";
import { AdminServices } from "./admin.services";
import { sendResponse } from "../../utils/sendResponse";

const getAllUsers = catchAsync(async (req, res) => {
    const users = await AdminServices.getAllUsersFromDB();
    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Users fetched successfully",
        data: users
    });
});

const updateUserRole = catchAsync(async (req, res) => {
    const id = req.params.id;
    const user = await AdminServices.updateUserRoleInDB(id, req.body.role);
    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "User role updated successfully",
        data: user
    });
});

const deleteUser = catchAsync(async (req, res) => {
    const id = req.params.id;
    const user = await AdminServices.deleteUserFromDB(id);
    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "User deleted successfully",
        data: user
    });
});

export const AdminController = {
    getAllUsers,
    updateUserRole,
    deleteUser
}
