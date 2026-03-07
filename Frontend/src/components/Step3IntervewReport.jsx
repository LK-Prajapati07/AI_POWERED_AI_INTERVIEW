import React from "react";
import { Spinner } from "./ui/spinner";
import { FaArrowLeft, FaDownload } from "react-icons/fa";
import { motion } from "framer-motion";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import { useNavigate } from "react-router-dom";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

import jsPDF from "jspdf";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.2 } },
};

const card = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0 },
};

const Step3IntervewReport = ({ report }) => {
  const nav = useNavigate();

  if (!report) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner className="w-10 h-10 animate-spin text-emerald-600" />
      </div>
    );
  }

  const {
    finalScore = 0,
    confidence = 0,
    communication = 0,
    correctness = 0,
    questionWiseScore = [],
  } = report;

  const skills = [
    { label: "Confidence", value: confidence },
    { label: "Communication", value: communication },
    { label: "Correctness", value: correctness },
  ];

  const percentage = (finalScore / 10) * 100;

  let pathColor = "#22c55e";
  if (percentage <= 50) pathColor = "#eab308";
  if (percentage <= 20) pathColor = "#ef4444";

  const performanceData = questionWiseScore.map((q, index) => ({
    question: `Q${index + 1}`,
    score: q.score || 0,
  }));



  const downloadPDF = () => {
  const doc = new jsPDF("p", "mm", "a4");
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;
  const contentWidth = pageWidth - (margin * 2);

  let y = 0;

  // --- 1. HEADER (Increased Padding) ---
  doc.setFillColor(16, 185, 129);
  doc.rect(0, 0, pageWidth, 35, "F"); // Height increased from 20 to 35

  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  doc.setTextColor(255, 255, 255);
  doc.text("Interview Performance Report", margin, 22);

  y = 50; // Large gap after header

  // --- 2. SUMMARY SECTION (Grid Style) ---
  doc.setTextColor(31, 41, 55); // Slate gray for better readability
  doc.setFontSize(14);
  doc.text("Overall Metrics", margin, y);
  
  y += 12; // Gap between title and data

  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");
  
  // Data points with generous vertical spacing
  const summaryItems = [
    { label: "Final Score", value: `${finalScore}/10` },
    { label: "Confidence", value: `${confidence}/10` },
    { label: "Communication", value: `${communication}/10` },
    { label: "Correctness", value: `${correctness}/10` }
  ];

  summaryItems.forEach(item => {
    doc.setFont("helvetica", "bold");
    doc.text(item.label + ":", margin, y);
    doc.setFont("helvetica", "normal");
    doc.text(item.value, margin + 40, y);
    y += 10; // Comfortable line height
  });

  y += 15; // Gap before Question Section

  // --- 3. QUESTION CARDS (With Internal Padding) ---
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.text("Question-by-Question Analysis", margin, y);
  y += 10;

  questionWiseScore.forEach((q, index) => {
    const cardPadding = 8;
    const lineSpacing = 7;
    
    // Split text early to calculate dynamic card height
    const feedbackText = `Feedback: ${q.feedback || "No feedback provided."}`;
    const feedbackLines = doc.splitTextToSize(feedbackText, contentWidth - (cardPadding * 2));
    
    // Calculate total height needed for this card
    const cardHeight = (cardPadding * 2) + (lineSpacing * 2) + (feedbackLines.length * 5) + 5;

    // Page Break Logic
    if (y + cardHeight > pageHeight - 30) {
      doc.addPage();
      y = 25;
    }

    // Draw Card Background
    doc.setFillColor(249, 250, 251); // Very light gray
    doc.roundedRect(margin, y, contentWidth, cardHeight, 3, 3, "F");

    let currentY = y + cardPadding + 2;

    // Question Title & Score
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(16, 185, 129); // Accent color for question number
    doc.text(`QUESTION ${index + 1}`, margin + cardPadding, currentY);
    
    doc.setTextColor(107, 114, 128);
    doc.text(`Score: ${q.score}/10`, pageWidth - margin - cardPadding - 15, currentY);

    // Metrics Row
    currentY += lineSpacing;
    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(75, 85, 99);
    const metrics = `Confidence: ${q.confidence}  |  Communication: ${q.communication}  |  Correctness: ${q.correctness}`;
    doc.text(metrics, margin + cardPadding, currentY);

    // Feedback Section (More Space)
    currentY += lineSpacing + 2;
    doc.setTextColor(31, 41, 55);
    doc.setFontSize(10);
    doc.text(feedbackLines, margin + cardPadding, currentY);

    // Move Y for next card + 10mm gap between cards
    y += cardHeight + 10; 
  });

  // --- 4. FOOTER ---
  const pageCount = doc.internal.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(9);
    doc.setTextColor(156, 163, 175);
    doc.text(`AI Interview Report - Page ${i} of ${pageCount}`, pageWidth / 2, pageHeight - 12, { align: "center" });
  }

  doc.save("Spaced-Interview-Report.pdf");
};

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-emerald-50 py-10 px-4">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="max-w-6xl mx-auto bg-white rounded-3xl shadow-xl p-8"
      >

        <motion.div variants={card} className="flex items-center gap-4 mb-10">
          <button
            className="p-3 rounded-full bg-gray-100 hover:bg-gray-200"
            onClick={() => nav("/history")}
          >
            <FaArrowLeft />
          </button>

          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Interview Analytics Dashboard
            </h1>

            <p className="text-gray-500">
              AI Powered Interview Performance Analysis
            </p>
          </div>

          <button
            onClick={downloadPDF}
            className="ml-auto flex items-center gap-2 bg-emerald-500 text-white px-4 py-2 rounded-lg hover:bg-emerald-600"
          >
            <FaDownload />
            Download Report
          </button>
        </motion.div>

      

        <div className="grid lg:grid-cols-3 gap-8">

          <motion.div
            variants={card}
            whileHover={{ scale: 1.05 }}
            className="bg-linear-to-br from-white to-gray-50 rounded-2xl shadow-lg p-6 text-center"
          >
            <h3 className="text-lg font-semibold mb-6 text-gray-700">
              Final Score
            </h3>

            <div className="w-40 h-40 mx-auto">
              <CircularProgressbar
                value={percentage}
                text={`${finalScore}/10`}
                styles={buildStyles({
                  pathColor,
                  textColor: "#111827",
                  trailColor: "#e5e7eb",
                  strokeLinecap: "round",
                  textSize: "16px",
                })}
              />
            </div>
          </motion.div>

          

          <motion.div
            variants={card}
            className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-6"
          >
            <h3 className="text-lg font-semibold mb-6 text-gray-700">
              Skill Analysis
            </h3>

            <div className="space-y-6">
              {skills.map((skill, i) => (
                <div key={i}>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-gray-600">{skill.label}</span>

                    <span className="text-sm font-semibold">
                      {skill.value}/10
                    </span>
                  </div>

                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.value * 10}%` }}
                      transition={{ duration: 1 }}
                      className="h-3 bg-emerald-500 rounded-full"
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>


        <motion.div
          variants={card}
          className="mt-12 bg-white rounded-2xl shadow-lg p-6"
        >
          <h3 className="text-lg font-semibold mb-6 text-gray-700">
            Performance Trend Analysis
          </h3>

          <div className="w-full h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={performanceData}>
                <defs>
                  <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>

                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="question" />

                <YAxis domain={[0, 10]} />

                <Tooltip />

                <Area
                  type="monotone"
                  dataKey="score"
                  stroke="#10b981"
                  fill="url(#colorScore)"
                  strokeWidth={3}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Step3IntervewReport;
