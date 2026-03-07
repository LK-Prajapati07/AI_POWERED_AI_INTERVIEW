import express from "express";
import { verifyAuth } from "../middleware/auth.middleware.js";
import {upload} from '../middleware/multer.js'
import { analyzeResume, finishInterview, generateQuestions, getInterviewReport, getMyInterview, getSingleInterview, submitAnswer } from "../controller/interview.controller.js";

const interviewRouter=express.Router();
interviewRouter.post('/resume',verifyAuth,upload.single("resume"),analyzeResume)
interviewRouter.post('/generate-question',verifyAuth,generateQuestions)
interviewRouter.post('/submit-answer',verifyAuth,submitAnswer)
interviewRouter.post('/finish-interview',verifyAuth,finishInterview)
interviewRouter.get('/get-interview',verifyAuth,getMyInterview)
interviewRouter.get('/report/:id',verifyAuth,getInterviewReport)
interviewRouter.get("/:id", verifyAuth, getSingleInterview);
export default interviewRouter