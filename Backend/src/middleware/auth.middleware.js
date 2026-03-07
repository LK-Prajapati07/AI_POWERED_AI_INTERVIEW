import admin from "../config/firebaseAdmin.js";

export const verifyAuth = async (req, res, next) => {
  try {
    const sessionCookie = req.cookies.session;
    // console.log("Cookies:", req.cookies);

    if (!sessionCookie) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const decoded = await admin
      .auth()
      .verifySessionCookie(sessionCookie, true);
    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid session" });
  }
};