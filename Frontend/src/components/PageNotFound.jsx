import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="relative flex items-center justify-center min-h-screen overflow-hidden bg-slate-950 text-white">

      {/* Animated Background Glow */}
      <motion.div
        className="absolute w-125 h-125 bg-purple-600 rounded-full blur-[150px] opacity-30"
        animate={{
          x: [0, 200, -200, 0],
          y: [0, -100, 100, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 15,
        }}
      />

      {/* Floating Shape */}
      <motion.div
        className="absolute top-20 left-20 w-24 h-24 bg-pink-500 rounded-2xl blur-2xl opacity-40"
        animate={{ y: [0, -30, 0] }}
        transition={{ repeat: Infinity, duration: 4 }}
      />

      <motion.div
        className="absolute bottom-20 right-20 w-32 h-32 bg-blue-500 rounded-full blur-2xl opacity-40"
        animate={{ y: [0, 40, 0] }}
        transition={{ repeat: Infinity, duration: 5 }}
      />

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-center z-10"
      >

        {/* Animated 404 */}
        <motion.h1
          initial={{ scale: 0.8 }}
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ repeat: Infinity, duration: 4 }}
          className="text-8xl font-extrabold bg-linear-to-r from-purple-400 via-pink-500 to-blue-500 text-transparent bg-clip-text"
        >
          404
        </motion.h1>

        <h2 className="text-3xl font-semibold mt-6">
          Oops! Page not found
        </h2>

        <p className="text-gray-400 mt-3 max-w-md mx-auto">
          The page you are trying to access doesn't exist or has been moved.
        </p>

        {/* Buttons */}
        <div className="flex justify-center gap-4 mt-10">

          <motion.div whileHover={{ scale: 1.1 }}>
            <Button
              variant="outline"
              className="flex gap-2 items-center"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft size={18} />
              Go Back
            </Button>
          </motion.div>

          <motion.div whileHover={{ scale: 1.1 }}>
            <Button
              className="flex gap-2 items-center"
              onClick={() => navigate("/")}
            >
              <Home size={18} />
              Home
            </Button>
          </motion.div>

        </div>
      </motion.div>
    </div>
  );
};

export default NotFound;