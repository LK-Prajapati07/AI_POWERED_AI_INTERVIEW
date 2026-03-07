import React, { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth, googleProvider } from "../firebase";
import { useLoginHooks } from "@/Hooks/auth.hooks";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
 const { mutateAsync, isPending } = useLoginHooks()

  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

 const submitData = async (data) => {
  try {
    setLoading(true);

    const userCredential = await signInWithEmailAndPassword(
      auth,
      data.email,
      data.password
    );

    if (!userCredential.user.emailVerified) {
      await signOut(auth);
      toast.warning("Please verify your email before logging in.");
      return;
    }

    const idToken = await userCredential.user.getIdToken();
   await mutateAsync({ idToken })


    toast.success("Login successful 🎉");

    nav("/");

  } catch (error) {
    toast.error(error.message);
  } finally {
    setLoading(false);
  }
};
const handleGoogleSignIn = async () => {
  try {
    setLoading(true);

    const result = await signInWithPopup(auth, googleProvider);

    const idToken = await result.user.getIdToken();
    await mutateAsync({ idToken })
    toast.success("Google login successful 🎉");
    nav("/");
  } catch (error) {
    toast.error(error.message);
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-indigo-600 via-purple-600 to-pink-500 px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8"
      >
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Welcome Back
        </h2>

        <form className="space-y-5" onSubmit={handleSubmit(submitData)}>

          <div>
            <motion.input
              whileFocus={{ scale: 1.02 }}
              type="email"
              placeholder="Enter your email"
              {...register("email", { required: "Email is required" })}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <motion.input
              whileFocus={{ scale: 1.02 }}
              type="password"
              placeholder="Enter your password"
              {...register("password", { required: "Password is required" })}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-2.5 rounded-lg font-semibold hover:bg-indigo-700"
          >
            {loading ? "Logging in..." : "Login"}
          </motion.button>
        </form>

        <div className="flex items-center my-6">
          <hr className="grow border-gray-300" />
          <span className="mx-3 text-gray-500 text-sm">OR</span>
          <hr className="grow border-gray-300" />
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          onClick={handleGoogleSignIn}
          disabled={loading}
          className="w-full flex items-center justify-center gap-3 border py-2.5 rounded-lg hover:bg-gray-100"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="w-5 h-5"
          />
          <span className="font-medium text-gray-700">
            Continue with Google
          </span>
        </motion.button>

        <p className="text-center text-sm text-gray-600 mt-6">
          Don’t have an account?
          <span
            onClick={() => nav("/register")}
            className="text-indigo-600 font-medium cursor-pointer hover:underline"
          >
            Sign Up
          </span>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;