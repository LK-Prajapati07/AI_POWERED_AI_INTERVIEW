import { now } from "mongoose";
import admin from "../config/firebaseAdmin.js";
import {userModel} from "../model/user.model.js";

export const firebaseLogin = async (req, res) => {
  try {
    const { idToken } = req.body;

    if (!idToken) {
      return res.status(400).json({ message: "Token required" });
    }

    const decodedToken = await admin.auth().verifyIdToken(idToken);

    const { uid, email, name, firebase } = decodedToken;

    const provider = firebase?.sign_in_provider;

    // 🔒 Only block password users if not verified
    if (provider === "password" && !decodedToken.email_verified) {
      return res.status(403).json({
        message: "Please verify your email before login",
      });
    }

    const expiresIn = 7 * 24 * 60 * 60 * 1000;

    const sessionCookie = await admin
      .auth()
      .createSessionCookie(idToken, { expiresIn });

    res.cookie("session", sessionCookie, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: expiresIn,
    });

    let user = await userModel.findOne({ firebaseUid: uid });

    if (!user) {
      user = await userModel.create({
        name: name || "User",
        email,
        firebaseUid: uid,
        credit: 100, // ⚠ don't take credit from token
        provider,
      });
    }

    return res.status(200).json({
      message: "Authenticated successfully",
      user,
    });

  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};



export const logout = (req, res) => {
  res.clearCookie("session");
  res.json({ message: "Logged out successfully" });
};



export const getCurrentUser = async (req, res) => {
  try {
    

    const uid = req.user.uid;
    const user = await userModel.findOne({ firebaseUid: uid });

    if (!user) {
      return res.status(404).json({ message: "User Not Found" });
    }

    res.json(user);

  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};