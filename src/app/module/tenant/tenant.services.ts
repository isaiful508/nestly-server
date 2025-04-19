import { JwtPayload } from "jsonwebtoken";
import { TTenantRequest } from "./tenant.interface";
import TenantRequest from "./tenant.model";
import User from "../user/user.model";
const createTenantRequest = async (payload: TTenantRequest, user: JwtPayload) => {
    const tenantRequest = await TenantRequest.create({
        ...payload,
        tenantId: user.id
    });
    return tenantRequest;
}

const getAllTenantRequest = async (user: JwtPayload) => {
    const tenantRequest = await TenantRequest.find({    
        tenantId: user.id
    });
    return tenantRequest;
}

const updateTenantProfile = async (payload: TTenantRequest, user: JwtPayload) => {
    const tenantRequest = await User.findByIdAndUpdate(user.id, payload, {new: true});
    return tenantRequest;
}

export const TenantServices = {
    createTenantRequest,
    getAllTenantRequest,
    updateTenantProfile
}   
