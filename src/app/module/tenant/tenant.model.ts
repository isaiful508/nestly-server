import { Schema, model } from "mongoose";
import { TTenantRequest } from "./tenant.interface";

const tenantRequestSchema = new Schema<TTenantRequest>({
    rentalHouseId: { type: Schema.Types.ObjectId, ref: "RentalHouse", required: true },
    tenantId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    message: { type: String, required: true },
    status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
    paymentStatus: { type: String, enum: ['pending', 'paid', 'failed'], default: 'pending' },
    landlordPhone: { type: String }, 
    moveInDate: { type: String, required: true },
    rentalDuration: { type: String, required: true },
}, { timestamps: true });

const TenantRequest = model("TenantRequest", tenantRequestSchema);

export default TenantRequest;