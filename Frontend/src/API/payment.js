import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_baseURL,
  withCredentials: true,
});

// Create checkout
export const createCheckoutSession = async (plan) => {
  const res = await API.post("/payment/create-checkout", plan);
  return res.data;
};

// Verify payment
export const verifyPayment = async (sessionId) => {
  const res = await API.get(`/payment/verify-payment?session_id=${sessionId}`);
  return res.data;
};
