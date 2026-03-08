import axios from "axios";
const API = axios.create({
  baseURL: "https://ai-powered-ai-interview-1.onrender.com",
  withCredentials: true,
});
export const loginAPI = async (payload) => {
  const res = await API.post("/auth/firebase-login", payload);
  return res.data;
};
export const logoutApi=async ()=>{
  const res=await API.post('/auth/logout')
  return res.data
}
export const getCurrentUser=async()=>{
  const res=await API.get('/auth/me')
  return res.data
}
export const protectUserAPI=async()=>{
  const res=await API.get('/auth/protected')
  return res.data
}
