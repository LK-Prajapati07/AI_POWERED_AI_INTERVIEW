import { createCheckoutSession, verifyPayment } from "@/API/payment";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";


// CREATE CHECKOUT
export const useCreateCheckoutSession = () => {
  return useMutation({
    mutationFn: createCheckoutSession,

    onSuccess: (data) => {

      const url = data?.data?.url || data?.url;

      if (url) {
        window.location.assign(url);
      } else {
        toast.error("Failed to create checkout session");
      }
    },

    onError: (error) => {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to create checkout session";

      toast.error(message);
    },
  });
};


// VERIFY PAYMENT
export const useVerifyPayment = () => {
  return useMutation({
    mutationFn: verifyPayment,

    onSuccess: (data) => {

      const response = data?.data || data;

      if (response?.success) {
        toast.success("Payment verified successfully");
      } else {
        toast.error("Payment verification failed");
      }
    },

    onError: (error) => {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to verify payment";

      toast.error(message);
    },
  });
};