import { OpenRouter } from "@openrouter/sdk";
import { ENV } from "../config/env.js";
import axios from "axios"; 
export const askAI = async (messages) => {
  try {
    if (!Array.isArray(messages) || messages.length === 0) {
      throw new Error("Messages array invalid.");
    }

    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "openai/gpt-4o-mini",
        messages: messages,
        temperature: 0.3,
      },
      {
        headers: {
          Authorization: `Bearer ${ENV.VITE_OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "http://localhost:5173", // your frontend
          "X-Title": "AI Interview App"
        }
      }
    );

    const content = response.data?.choices?.[0]?.message?.content;

    if (!content) {
      throw new Error("AI returned empty response");
    }

    return content.trim();

  } catch (error) {
    console.error("OpenRouter Error:",
      error.response?.data || error.message
    );
    throw error;
  }
};