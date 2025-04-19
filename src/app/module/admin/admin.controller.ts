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

const getAllRentalHouses = catchAsync(async (req, res) => {
    const houses = await AdminServices.getAllRentalHousesFromDB();
    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Rental houses fetched successfully",
        data: houses
    });
});

const deleteRentalHouse = catchAsync(async (req, res) => {
    const id = req.params.id;
    const house = await AdminServices.deleteRentalHouseFromDB(id);
    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Rental house deleted successfully",
        data: house
    });
});

const updateRentalHouse = catchAsync(async (req, res) => {
    const id = req.params.id;
    const { status } = req.body;

    const updatedHouse = await AdminServices.updateRentalHouseStatusInDB(id, status);

    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: `Rental house status updated to ${status}`,
        data: updatedHouse
    });
});





export const AdminController = {
    getAllUsers,
    updateUserRole,
    deleteUser,
    getAllRentalHouses,
    deleteRentalHouse,
    updateRentalHouse
}
