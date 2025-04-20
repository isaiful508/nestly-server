import { Schema, model } from "mongoose";
import { TPayment } from "./payment.interface";

const paymentSchema = new Schema<TPayment>({
    amount: { type: String, required: true },
    status: { type: String,  enum: ["pending", "succeeded", "canceled"],default: "pending"},
    tenantId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    rentalHouseId: { type: Schema.Types.ObjectId, ref: "RentalHouse", required: true },
    landlordId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    tenantRequestId: { type: Schema.Types.ObjectId, ref: "TenantRequest", required: true },
    transactionId: { type: String, required: true },
}, { timestamps: true });

const Payment = model<TPayment>("Payment", paymentSchema);

export default Payment;

