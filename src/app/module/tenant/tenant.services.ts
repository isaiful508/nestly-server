import { JwtPayload } from "jsonwebtoken";
import { TTenantRequest } from "./tenant.interface";
import TenantRequest from "./tenant.model";

const createTenantRequest = async (payload: TTenantRequest, user: JwtPayload) => {
    console.log({user});
    const tenantRequest = await TenantRequest.create({
        ...payload,
        tenantId: user.id
    });
    return tenantRequest;
}

export const TenantServices = {
    createTenantRequest
}   
