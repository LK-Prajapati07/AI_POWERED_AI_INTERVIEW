import axios from "axios";



const API = axios.create({
  baseURL: import.meta.env.VITE_baseURL, 
  withCredentials: true,
});



export const analyzeResume = async (file) => {
  const formData = new FormData();
  formData.append("resume", file); 

  const res = await API.post("/interview/resume", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data;
};


export const generateQuestions = async (data) => {
  const res = await API.post("/interview/generate-question", data);
  return res.data;
};


export const submitAnswerAPI = async (data) => {
  const res = await API.post("/interview/submit-answer", data);
  return res.data;
};



export const finishInterview = async (data) => {
  const res = await API.post("/interview/finish-interview", data);
  return res.data;
};



export const getMyInterview=async ()=>{
  const res=await API.get('/interview/get-interview')
  return res.data
}





export const getInterviewReport=async (id)=>{
  const res=await API.get(`/interview/report/${id}`)
  return res.data
}


export const getSingleInterview = async (id) => {
  const res = await API.get(`/interview/${id}`);
  return res.data;
};
