/* eslint-disable @typescript-eslint/no-unused-vars */
import Stripe from "stripe";
import Payment from "./payment.model";
import config from "../../config";
import AppError from "../../errors/AppError";
import TenantRequest from "../tenant/tenant.model";

const stripe = new Stripe(config.stripe_secret_key as string);

const paymentIntent = async (paymentData: any) => {
    const amountForStripe = paymentData.amount * 100;


    const paymentIntent = await stripe.paymentIntents.create({
        amount: amountForStripe,
        currency: "usd",
        payment_method_types: ["card"],
    });

    await Payment.create({
        amount: paymentData.amount,
        status: "pending",
        tenantId: paymentData.tenantId,
        rentalHouseId: paymentData.rentalHouseId,
        landlordId: paymentData.landlordId,
        transactionId: paymentIntent.id,
        tenantRequestId: paymentData.tenantRequestId,
    });


    return paymentIntent.client_secret;
}

const confirmPayment = async (paymentData) => {

    const { transactionId } = paymentData;
    const paymentIntent = await stripe.paymentIntents.retrieve(transactionId);

    if (paymentIntent.status !== "succeeded") {
        throw new AppError(400, "Payment failed");
    }



    const payment = await Payment.findOne({ transactionId });
    if (!payment) {
        throw new AppError(404, "Payment not found");
    }

    payment.status = "succeeded";
    await payment.save();

    const tenantRequest = await TenantRequest.findOne({ _id: payment.tenantRequestId });

    if (!tenantRequest) {
        throw new AppError(404, "Tenant request not found");
    }

    tenantRequest.paymentStatus = "paid";
    await tenantRequest.save();

    return { message: "Payment confirmed successfully" };
}



export const PaymentServices = {
    paymentIntent,
    confirmPayment
}


