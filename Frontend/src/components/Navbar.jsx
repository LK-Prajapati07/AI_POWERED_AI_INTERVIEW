import React, { useState } from "react";
import { useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useLogoutHook } from "@/Hooks/auth.hooks";

const Navbar = () => {
  const { user, isAuthenticated } = useSelector((store) => store.auth);

  const [showUserPopup, setShowUserPopup] = useState(false);
  const navigate = useNavigate();
  const { mutate: logout } = useLogoutHook();

  return (
    <nav className="w-full bg-slate-950 px-6 py-4 shadow-lg ">
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-7xl mx-auto flex justify-between items-center"
      >
       
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-sky-600 rounded-xl flex items-center justify-center text-white font-bold text-lg">
            AI
          </div>
          <span className="text-white font-bold text-xl tracking-wide">
            AI Interview
          </span>
        </Link>

        
        <div className="hidden md:flex items-center gap-6">
          <Link
            to="/"
            className="text-gray-300 hover:text-white text-sm font-medium transition"
          >
            Home
          </Link>
          <Link
            to="/dashboard"
            className="text-gray-300 hover:text-white text-sm font-medium transition"
          >
            Dashboard
          </Link>
        </div>

       
        <div className="flex items-center gap-4 relative">
          {isAuthenticated && user ? (
            <>
             
              <div className="text-sm text-white font-medium bg-slate-800 px-3 py-1 rounded-lg border border-slate-700">
                Credit: {user.credit}
              </div>

            
              <button
                onClick={() => navigate("/payment")}
                className="bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 rounded-lg text-sm font-medium transition"
              >
                Add Credit
              </button>

            
              <button
                onClick={() => setShowUserPopup(!showUserPopup)}
                className="w-10 h-10 rounded-full bg-sky-600 flex items-center justify-center 
                           text-white font-bold text-lg 
                           border-2 border-white 
                           hover:scale-105 transition"
              >
                {user.name?.charAt(0).toUpperCase()}
              </button>

              {/* Dropdown */}
              <AnimatePresence>
                {showUserPopup && (
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 5 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 top-full mt-3 w-60 bg-white rounded-xl shadow-xl border border-gray-200 p-4 z-50"
                  >
                    <div className="mb-3 border-b pb-2">
                      <p className="text-sm font-semibold text-gray-800">
                        {user.name}
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        setShowUserPopup(false);
                        navigate("/history");
                      }}
                      className="w-full text-left text-sm text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-lg transition"
                    >
                      Interview History
                    </button>

                    <button
                      onClick={() => {
                        setShowUserPopup(false);
                        logout();
                      }}
                      className="w-full text-left text-sm text-red-600 hover:bg-red-50 px-3 py-2 rounded-lg transition mt-1"
                    >
                      Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </>
          ) : (
            <div className="flex items-center gap-4">
              <Link
                to="/auth"
                className="text-gray-300 hover:text-white text-sm font-medium"
              >
                Login
              </Link>

              <Link
                to="/auth/register"
                className="bg-sky-600 hover:bg-sky-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
              >
                Get Started
              </Link>
            </div>
          )}
        </div>
      </motion.div>
    </nav>
  );
};

export default Navbar;
