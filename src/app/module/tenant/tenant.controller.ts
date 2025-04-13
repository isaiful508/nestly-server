import { Request, Response } from "express";
import { TenantServices } from "./tenant.services";
import { sendResponse } from "../../utils/sendResponse";

const tenantRequest = async (req: Request, res: Response) => {
    const user = req.user;
    const tenantRequest = await TenantServices.createTenantRequest(req.body, user);
    sendResponse(res, {
        success: true,
        message: "Tenant request created successfully",
        data: tenantRequest,
        statusCode: 200
    });
}

export const TenantController = {
    tenantRequest
}
