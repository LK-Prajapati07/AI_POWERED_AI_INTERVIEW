import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";
import InterviewPage from "@/Pages/InterviewPage";
import InterviewHistory from "@/Pages/InterviewHistory";
import Pricing from "@/Pages/Pricing";
import InterviewReport from "@/Pages/InterviewReport";
import PageNotFound from "../components/PageNotFound";
import PaymentCancel from "@/Pages/PaymentCancel";
import PaymentSuccess from "@/Pages/PaymentSuccess";
import Dashboard from "@/Pages/Dashboard";


const AppRoutes = () => {
  return (
    <Routes>
     
      <Route
        path="/auth"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />

      <Route
        path="/register"
        element={
          <PublicRoute>
            <Register />
          </PublicRoute>
        }
      />

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route
        path="/interview"
        element={
          <ProtectedRoute>
            <InterviewPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/interview/:id"
        element={
          <ProtectedRoute>
            <InterviewPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/history"
        element={
          <ProtectedRoute>
            <InterviewHistory />
          </ProtectedRoute>
        }
      />
      <Route
        path="/payment"
        element={
          <ProtectedRoute>
            <Pricing />
          </ProtectedRoute>
        }
      />
      <Route
        path="/interviewReport/:id"
        element={
          <ProtectedRoute>
            <InterviewReport />
          </ProtectedRoute>
        }
      />
      <Route
        path="/payment-success"
        element={
          <ProtectedRoute>
            <PaymentSuccess />
          </ProtectedRoute>
        }
      />

      <Route
        path="/payment-cancel"
        element={
          <ProtectedRoute>
            <PaymentCancel />
          </ProtectedRoute>
        }
      />
      <Route
        path="dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default AppRoutes;
