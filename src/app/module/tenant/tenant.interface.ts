import mongoose from "mongoose";

export type TTenantRequest = {
    rentalHouseId: mongoose.Types.ObjectId;
    tenantId: mongoose.Types.ObjectId;
    message: string;
    status: 'pending' | 'approved' | 'rejected';
    paymentStatus: 'pending' | 'paid' | 'failed';
};
