import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useVerifyPayment } from "../Hooks/Payment.hook";

const PaymentSuccess = () => {
  const { mutate: verifyPayment } = useVerifyPayment();
  const navigate = useNavigate();
  const [status, setStatus] = useState("verifying");

  useEffect(() => {
    const sessionId = new URLSearchParams(window.location.search).get("session_id");

    if (!sessionId) {
      navigate("/");
      return;
    }

    verifyPayment(sessionId, {
      onSuccess: (data) => {
        if (data?.success) {
          setStatus("success");

          setTimeout(() => {
            navigate("/");
          }, 2500);
        } else {
          setStatus("failed");
        }
      },
      onError: () => {
        setStatus("failed");
        setTimeout(() => navigate("/payment"), 2000);
      },
    });
  }, []);

  return (
    <div className="min-h-screen bg-[#0f172a] flex items-center justify-center px-6 relative overflow-hidden">

      {/* Background Glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/10 blur-[120px] rounded-full" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 blur-[120px] rounded-full" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-[#1e293b] rounded-3xl shadow-xl p-10 max-w-md w-full text-center border border-white/10"
      >

        {/* Success Icon */}
        {status === "success" && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="flex justify-center mb-6"
          >
            <div className="bg-emerald-500/10 p-4 rounded-full">
              <CheckCircle className="w-16 h-16 text-emerald-500" />
            </div>
          </motion.div>
        )}

        {/* Title */}
        <h1 className="text-3xl font-bold text-white mb-3">
          {status === "verifying" && "Verifying Payment..."}
          {status === "success" && "Payment Successful 🎉"}
          {status === "failed" && "Payment Verification Failed"}
        </h1>

        {/* Description */}
        <p className="text-gray-400 text-sm mb-8">
          {status === "verifying" &&
            "Please wait while we confirm your payment and add credits to your account."}

          {status === "success" &&
            "Your payment has been verified and credits have been added successfully."}

          {status === "failed" &&
            "Something went wrong while verifying your payment."}
        </p>

        {/* Loader */}
        {status === "verifying" && (
          <div className="flex justify-center">
            <div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        {/* Action Buttons */}
        {status === "failed" && (
          <button
            onClick={() => navigate("/payment")}
            className="mt-4 bg-linear-to-r from-blue-600 to-emerald-600 text-white py-3 px-6 rounded-xl font-semibold hover:brightness-110 transition"
          >
            Try Again
          </button>
        )}
      </motion.div>
    </div>
  );
};

export default PaymentSuccess;

