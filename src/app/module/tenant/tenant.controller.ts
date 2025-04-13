import { TenantServices } from "./tenant.services";
import { sendResponse } from "../../utils/sendResponse";
import catchAsync from "../../utils/catchAsync";

const tenantRequest = catchAsync(async (req, res) => {
    const user = req.user;
    const tenantRequest = await TenantServices.createTenantRequest(req.body, user);
    sendResponse(res, {
        success: true,
        message: "Tenant request created successfully",
        data: tenantRequest,
        statusCode: 200
    });
});

const getAllTenantRequest = catchAsync(async (req, res) => {
    const user = req.user;
    console.log({user});
    const tenantRequest = await TenantServices.getAllTenantRequest(user);
    sendResponse(res, {
        success: true,
        message: "Tenant request fetched successfully", 
        data: tenantRequest,
        statusCode: 200
    });
});

const updateTenantProfile = catchAsync(async (req, res) => {
    const user = req.user;
    const tenantRequest = await TenantServices.updateTenantProfile(req.body, user);
    sendResponse(res, {
        success: true,
        message: "Tenant profile updated successfully",
        data: tenantRequest,
        statusCode: 200
    });
});

export const TenantController = {
    tenantRequest,
    getAllTenantRequest,
    updateTenantProfile
}
