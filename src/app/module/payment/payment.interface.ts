import { Types } from "mongoose";

export type TPayment = {
    tenantId: Types.ObjectId;
    rentalHouseId: Types.ObjectId;
    landlordId: Types.ObjectId;
    tenantRequestId: Types.ObjectId;

    amount: string;
    status: "pending" | "succeeded" | "canceled";

    transactionId: string;
}

