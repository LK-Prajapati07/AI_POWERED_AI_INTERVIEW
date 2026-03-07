import express from "express";
import { firebaseLogin, getCurrentUser, logout } from "../controller/auth.controller.js"
import { verifyAuth } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/firebase-login", firebaseLogin);
router.post("/logout",logout)
router.get('/me',verifyAuth,getCurrentUser)
router.get('/protected',verifyAuth,(req,res)=>{
    res.json({
        message:"Acces Granted",
        user:req.user 
    })
}) 
export default router;