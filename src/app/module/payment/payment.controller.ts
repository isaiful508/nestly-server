import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { PaymentServices } from "./payment.services";
const createPaymentIntent = catchAsync(async (req: Request, res: Response) => {
    const paymentIntent = await PaymentServices.paymentIntent(req.body);
    sendResponse(res, {
        success: true,
        message: "Payment intent created successfully",
        data: paymentIntent ,
        statusCode: 200
    });
});




const confirmPayment = catchAsync(async (req: Request, res: Response) => {
    const payment = await PaymentServices.confirmPayment(req.body);
    sendResponse(res, {
        success: true,
        message: "Payment confirmed successfully",
        data: payment,
        statusCode: 200
    });
});

export const PaymentController = {
    createPaymentIntent,
    confirmPayment
}

