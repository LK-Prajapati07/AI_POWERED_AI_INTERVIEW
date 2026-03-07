import axios from "axios";

const API = axios.create({
  baseURL: "https://ai-powered-ai-interview.onrender.com",
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
