import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
{
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  planId: {
    type: String,
  },

  amount: {
    type: Number,
    required: true,
  },

  currency: {
    type: String,
    default: "inr",
  },

  credit: {
    type: Number,
  },

  stripeSessionId: {
    type: String,
  },

  stripePaymentIntentId: {
    type: String,
  },

  stripeCustomerId: {
    type: String,
  },

  status: {
    type: String,
    enum: ["pending", "completed", "failed"],
    default: "pending",
  }

},
{ timestamps: true }
);

const Payment = mongoose.model("Payment", paymentSchema);

export default Payment;