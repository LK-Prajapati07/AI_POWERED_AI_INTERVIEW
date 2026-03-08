import Stripe from "stripe";
import Payment from "../model/payment.model.js";
import { userModel } from "../model/user.model.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);


// CREATE CHECKOUT SESSION
export const createCheckoutSession = async (req, res) => {
    try {

        const { planId, credit, amount } = req.body;

        const firebaseUid = req.user.uid;

        const user = await userModel.findOne({ firebaseUid });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        const userId = user._id;

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            mode: "payment",
            line_items: [
                {
                    price_data: {
                        currency: "inr",
                        product_data: {
                            name: `Interview Credits (${credit})`,
                        },
                        unit_amount: amount * 100,
                    },
                    quantity: 1,
                },
            ],
            success_url: `https://ai-powered-ai-interview-2.onrender.com/payment-success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `https://ai-powered-ai-interview-2.onrender.com/payment-cancel`,
        });

        await Payment.create({
            userId,
            planId,
            credit,
            amount,
            stripeSessionId: session.id,
            status: "pending",
        });

        res.json({
            success: true,
            url: session.url,
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Checkout creation failed" });
    }
};



// VERIFY PAYMENT AFTER REDIRECT
export const verifyPayment = async (req, res) => {
  try {
    const { session_id } = req.query;

    if (!session_id) {
      return res.status(400).json({
        success: false,
        message: "Session ID missing",
      });
    }

    const session = await stripe.checkout.sessions.retrieve(session_id);


    if (session.payment_status !== "paid") {
      return res.json({
        success: false,
        message: "Payment not completed",
      });
    }

    const payment = await Payment.findOne({
      stripeSessionId: session_id,
    });


    if (!payment) {
      return res.status(404).json({
        success: false,
        message: "Payment record not found",
      });
    }

    if (payment.status === "completed") {
      return res.json({
        success: true,
        message: "Payment already processed",
      });
    }

    payment.status = "completed";
    payment.stripePaymentIntentId = session.payment_intent;

    await payment.save();

    

    
    const user = await userModel.findById(payment.userId);



    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const purchasedCredits = Number(payment.credit) || 0;

    user.credit = Number(user.credit || 0) + purchasedCredits;

    await user.save();

   

    return res.json({
      success: true,
      message: "Payment verified and credits added",
    });

  } catch (error) {
    console.error("Verification Error:", error);

    return res.status(500).json({
      success: false,
      message: "Payment verification failed",
    });
  }
};
