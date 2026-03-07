import { configDotenv } from "dotenv";
configDotenv({ quiet: true });
export const ENV={
    
    PORT:process.env.PORT,
    DB:process.env.DB,
    JWT_SECRET:process.env.JWT_SECRET,
    CLIENT_URL:process.env.CLIENT_URL,
    VITE_OPENROUTER_API_KEY:process.env.VITE_OPENROUTER_API_KEY,
    VITE_type:process.env.VITE_type,
    VITE_project_id:process.env.VITE_project_id,
    

}
