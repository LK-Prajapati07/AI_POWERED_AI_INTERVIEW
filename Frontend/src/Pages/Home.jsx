import React, { useMemo } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { HiSparkles } from "react-icons/hi";
import {
  BsRobot,
  BsMic,
  BsClock,
  BsBarChart,
  BsFileEarmarkText,
  BsGraphUp,
  BsShieldCheck
} from "react-icons/bs";
import { useNavigate } from "react-router-dom";

import hrImage from "../assets/HR.png";
import techImg from "../assets/tech.png";
import confidenceImg from "../assets/confi.png";
import creditImg from "../assets/credit.png";
import evalImg from "../assets/ai-ans.png";
import resumeImg from "../assets/resume.png";
import pdfImg from "../assets/pdf.png";
import analyticsImg from "../assets/history.png";


const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 }
};

const Home = () => {
  const navigate = useNavigate();
  const steps = useMemo(() => [
    {
      icon: <BsRobot size={26} />,
      title: "Role & Experience Selection",
      desc: "AI adjusts interview difficulty based on your selected job role."
    },
    {
      icon: <BsMic size={26} />,
      title: "Smart Voice Interview",
      desc: "Dynamic follow-up questions based on your answers."
    },
    {
      icon: <BsClock size={26} />,
      title: "Timer Based Simulation",
      desc: "Real-time interview pressure with time tracking."
    }
  ], []);

  const coreFeatures = useMemo(() => [
    {
      image: evalImg,
      icon: <BsBarChart size={22} />,
      title: "AI Answer Evaluation",
      desc: "Score communication, technical accuracy and confidence."
    },
    {
      image: resumeImg,
      icon: <BsFileEarmarkText size={22} />,
      title: "Resume Analysis",
      desc: "Generate tailored interview questions from your resume."
    },
    {
      image: pdfImg,
      icon: <BsShieldCheck size={22} />,
      title: "Secure PDF Reports",
      desc: "Download detailed AI-powered performance reports."
    },
    {
      image: hrImage,
      icon: <BsRobot size={22} />,
      title: "HR Interview Simulation",
      desc: "Practice realistic HR behavioral interview scenarios."
    }
  ], []);

  const growthFeatures = useMemo(() => [
    {
      image: techImg,
      icon: <BsRobot size={22} />,
      title: "Technical Mode",
      desc: "Advanced domain-specific technical interview simulations."
    },
    {
      image: confidenceImg,
      icon: <BsMic size={22} />,
      title: "Confidence Scoring",
      desc: "Evaluate speech clarity and confidence level."
    },
    {
      image: creditImg,
      icon: <BsGraphUp size={22} />,
      title: "Credit Management",
      desc: "Track and manage interview usage credits."
    },
    {
      image: analyticsImg,
      icon: <BsBarChart size={22} />,
      title: "Performance Analytics",
      desc: "Monitor improvement trends and interview history."
    }
  ], []);

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col">
      <Navbar />

      <main className="flex-1 flex flex-col items-center px-6 py-20">

        <section className="text-center space-y-8 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 
              bg-slate-100 text-slate-700
              text-sm font-medium px-5 py-3 
              rounded-full shadow-md"
          >
            <HiSparkles className="text-green-500" size={18} />
            AI Powered Smart Interview Platform
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold text-white leading-tight"
          >
            Practice Interviews With{" "}
            <span className="bg-linear-to-r from-green-400 to-emerald-600 bg-clip-text text-transparent">
              AI Intelligence
            </span>
          </motion.h1>

          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Simulate real interviews, receive instant AI feedback,
            and improve performance with structured evaluation.
          </p>

          <div className="flex justify-center gap-4 pt-4">
            <button
              onClick={() => navigate("/interview")}
              className="bg-green-600 hover:bg-green-700 
                text-white px-6 py-3 rounded-lg transition"
            >
              Start Interview
            </button>

            <button
              onClick={() => navigate("/history")}
              className="border border-slate-600 hover:border-green-500 
                text-slate-300 hover:text-white 
                px-6 py-3 rounded-lg transition"
            >
              View History
            </button>
          </div>
        </section>

        <section className="relative mt-24 w-full max-w-6xl">
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-slate-800 -translate-y-1/2 z-0" />

          <div className="relative flex flex-col md:flex-row gap-12 justify-center items-center z-10">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="relative bg-slate-900 border border-slate-800 
                  p-8 rounded-2xl w-80 text-center 
                  hover:border-green-500 hover:scale-105 transition"
              >
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 
                  bg-green-600 text-white w-10 h-10 
                  rounded-full flex items-center justify-center">
                  {index + 1}
                </div>

                <div className="flex justify-center mb-6 text-green-500 mt-4">
                  {step.icon}
                </div>

                <h3 className="text-lg font-semibold text-white mb-2">
                  {step.title}
                </h3>

                <p className="text-slate-400 text-sm">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <FeatureSection title="Core AI Capabilities" features={coreFeatures} />
        <FeatureSection title="Growth & Insights" features={growthFeatures} />

      </main>

      <Footer />
    </div>
  );
};

const FeatureSection = React.memo(({ title, features }) => (
  <section className="w-full max-w-6xl mt-32">
    <motion.h2
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="text-4xl font-bold text-white text-center mb-16"
    >
      {title}
    </motion.h2>

    <div className="grid md:grid-cols-2 gap-10">
      {features.map((feature) => (
        <motion.div
          key={feature.title}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-slate-900 border border-slate-800 
            rounded-2xl p-6 flex gap-6 items-center
            hover:border-green-500 transition"
        >
          <img
            src={feature.image}
            alt={feature.title}
            loading="lazy"
            className="w-24 h-24 object-contain"
          />

          <div>
            <div className="text-green-500 mb-2">{feature.icon}</div>
            <h3 className="text-lg font-semibold text-white mb-2">
              {feature.title}
            </h3>
            <p className="text-slate-400 text-sm">
              {feature.desc}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  </section>
));

export default Home;