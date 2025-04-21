import { Router } from "express";
import { PaymentController } from "./payment.controller";

const router = Router();

router.post("/payment-intent", PaymentController.createPaymentIntent);
router.post("/confirm-payment", PaymentController.confirmPayment);

export const PaymentRoutes = router;
