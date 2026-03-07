import React from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
  sendEmailVerification,
  signOut,
} from "firebase/auth";
import { auth, googleProvider } from "../firebase";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useLoginHooks } from "@/Hooks/auth.hooks";
import { Loader2 } from "lucide-react";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const {mutateAsync, isPending } = useLoginHooks();

  const submitForm = async (data) => {
    if (data.password !== data.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password,
      );
      const user = userCredential.user;

      await updateProfile(user, {
        displayName: data.fullName,
      });
      await user.reload();
      const idToken = await user.getIdToken(true); 
      await sendEmailVerification(user);
      mutateAsync({ idToken });
      await signOut(auth);
      toast.success("Account created! Please verify your email.");
      navigate("/auth");
    } catch (error) {
      handleFirebaseError(error);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);

      const idToken = await result.user.getIdToken();

      mutate({ idToken });
      navigate("auth");
    } catch (error) {
      handleFirebaseError(error);
    }
  };

  const handleFirebaseError = (error) => {
    switch (error.code) {
      case "auth/email-already-in-use":
        toast.error("Email is already registered.");
        break;
      case "auth/weak-password":
        toast.error("Password must be at least 6 characters.");
        break;
      case "auth/invalid-email":
        toast.error("Invalid email address.");
        break;
      default:
        toast.error(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-indigo-700 via-purple-700 to-pink-600 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md backdrop-blur-xl bg-white/20 border border-white/30 rounded-3xl shadow-2xl p-8 text-white"
      >
        <h2 className="text-3xl font-bold text-center mb-6">Create Account</h2>

        <form className="space-y-4" onSubmit={handleSubmit(submitForm)}>
          <div>
            <input
              type="text"
              placeholder="Full Name"
              {...register("fullName", {
                required: "Full name is required",
              })}
              className="w-full px-4 py-2 rounded-lg bg-white/30 focus:outline-none"
            />
            {errors.fullName && (
              <p className="text-red-200 text-sm mt-1">
                {errors.fullName.message}
              </p>
            )}
          </div>

          <div>
            <input
              type="email"
              placeholder="Email Address"
              {...register("email", {
                required: "Email is required",
              })}
              className="w-full px-4 py-2 rounded-lg bg-white/30 focus:outline-none"
            />
            {errors.email && (
              <p className="text-red-200 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <input
              type="password"
              placeholder="Password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Minimum 6 characters required",
                },
              })}
              className="w-full px-4 py-2 rounded-lg bg-white/30 focus:outline-none"
            />
            {errors.password && (
              <p className="text-red-200 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <div>
            <input
              type="password"
              placeholder="Confirm Password"
              {...register("confirmPassword", {
                required: "Confirm your password",
              })}
              className="w-full px-4 py-2 rounded-lg bg-white/30 focus:outline-none"
            />
            {errors.confirmPassword && (
              <p className="text-red-200 text-sm mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            disabled={isPending}
            className="w-full bg-white text-indigo-700 py-2 rounded-lg font-semibold flex items-center justify-center gap-2"
          >
            {isPending ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Creating...
              </>
            ) : (
              "Register"
            )}
          </motion.button>
        </form>

        <div className="flex items-center my-6 text-gray-200">
          <hr className="grow border-white/40" />
          <span className="mx-3 text-sm">OR</span>
          <hr className="grow border-white/40" />
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          onClick={handleGoogleSignIn}
          disabled={isPending}
          className="w-full flex items-center justify-center gap-3 bg-white text-gray-700 py-2.5 rounded-lg shadow hover:bg-gray-100"
        >
          {isPending ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <>
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="Google"
                className="w-5 h-5"
              />
              Continue with Google
            </>
          )}
        </motion.button>

        {/* LOGIN LINK */}
        <p className="text-center text-sm text-gray-200 mt-6">
          Already have an account?
          <span
            onClick={() => navigate("/auth")}
            className="font-semibold underline cursor-pointer"
          >
            Login
          </span>
        </p>
      </motion.div>
    </div>
  );
};

export default Register;
