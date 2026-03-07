import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true },
    firebaseUid: { type: String, required: true, unique: true },
    provider: String,
    role: { type: String, default: "candidate" },
    credit: {
      type: Number,
      default: 150,
    },

  },
  { timestamps: true }
);
export const userModel = mongoose.model("User", userSchema);
