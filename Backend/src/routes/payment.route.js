import express from "express";
import { createCheckoutSession, verifyPayment } from "../controller/payment.controller.js";
import { verifyAuth } from "../middleware/auth.middleware.js";

const Paymentrouter = express.Router();

Paymentrouter.post("/create-checkout",verifyAuth, createCheckoutSession);
Paymentrouter.get("/verify-payment", verifyAuth, verifyPayment);

export default Paymentrouter;