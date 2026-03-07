import mongoose from "mongoose";
import { ENV } from "./env.js";
export const connectDb = async () => {
    try {
        await mongoose.connect(ENV.DB)
        console.log("Connection to the dataset")

    } catch (error) {
        console.error(error);
        console.log('Failed to connect to the database');
    }
}