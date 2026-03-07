import mongoose from "mongoose";

/* ================================
   Question Schema
================================ */

const questionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
    
  },

  difficulty: {
    type: String,
    enum: ["Easy", "Medium", "Hard"],
    default: "Medium",
  },
  answer: {
    type: String,
    
  },

  feedback: {
    type: String,
    
  },

  score: {
    type: Number,
    default: 0,
    min: 0,
    max: 10,
  },

  confidence: {
    type: Number,
    default: 0,
    min: 0,
    max: 10,
  },

  communication: {
    type: Number,
    default: 0,
    min: 0,
    max: 10,
  },

  correctness: {
    type: Number,
    default: 0,
    min: 0,
    max: 10,
  },
});

/* ================================
   Interview Schema
================================ */

const interviewSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    role: {
      type: String,
      required: true,
      
    },

    experience: {
      type: String,
      required: true,
      
    },

    mode: {
      type: String,
      enum: ["Technical", "HR", "Behavioral", "Mixed"],
      required: true,
    },

    resumeText: {
      type: String,
      required: true,
    },

    questions: {
      type: [questionSchema],
      default: [],
    },

    finalScore: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },

    status: {
      type: String,
      enum: ["Pending", "Completed"],
      default: "Pending",
      index: true,
    },
  },
  { timestamps: true }
);

/* ================================
   Index Optimization
================================ */

interviewSchema.index({ userId: 1, createdAt: -1 });

export const Interview = mongoose.model("Interview", interviewSchema);