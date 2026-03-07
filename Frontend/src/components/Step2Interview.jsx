import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import malevideo from "../assets/video/male-ai.mp4";
import femalevideo from "../assets/video/female-ai.mp4";

import { useCountdown } from "@/Hooks/useCountdown";
import { useSubmitAnswer, useFinishInterview } from "@/Hooks/Interview.hooks";
import { useVoiceAnswer } from "@/Hooks/useVoiceAnswer";

const Step2Interview = ({ interviewData, onNext, onFinish }) => {
  const {
    question,
    username,
    currentIndex = 0,
    totalQuestions = 0,
    interviewId,
  } = interviewData;

  if (!question) return null;

  const [answer, setAnswer] = useState("");
  const hasSpoken = useRef(false);
  const hasSubmittedRef = useRef(false);

  const { mutate: submitAnswer, isPending } = useSubmitAnswer();
  const { mutateAsync: finishInterview } = useFinishInterview();

  const totalTime = question?.timeLimit ;

  const handleTimeUp = () => {
    stop();
    handleSubmit(true);
  };

  const { timeLeft } = useCountdown(totalTime, handleTimeUp, currentIndex);
  const timeUsed = totalTime - timeLeft;
  const percentage = (timeLeft / totalTime) * 100;

  const { start, stop, isRecording } = useVoiceAnswer((transcript) => {
    setAnswer(transcript);
  });

  useEffect(() => {
    if (!question?.question) return;
    if (hasSpoken.current) return;

    const utterance = new SpeechSynthesisUtterance(question.question);
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);

    hasSpoken.current = true;

    return () => {
      window.speechSynthesis.cancel();
      hasSpoken.current = false;
    };
  }, [question]);

  useEffect(() => {
    stop(); 
    setAnswer("");
    hasSubmittedRef.current = false;
    start(); 
  }, [currentIndex]);

  const handleSubmit = async (isAuto = false) => {
    if (isPending || hasSubmittedRef.current) return;

    hasSubmittedRef.current = true;

    submitAnswer(
      {
        interviewId,
        questionIndex: currentIndex,
        answer,
        timeTaken: timeUsed,
      },
      {
        onSuccess: async (data) => {
          setAnswer("");
          hasSubmittedRef.current = false;

          if (data?.hasNext) {
            onNext();
          } else {
            const report = await finishInterview({ interviewId });
            onFinish(report);
          }
        },
        onError: () => {
          hasSubmittedRef.current = false;
        },
      },
    );
  };

  const handleSkip = () => {
    stop();
    setAnswer("");
    handleSubmit(false);
  };

  const handleMicToggle = () => {
    if (isRecording) {
      stop();
    } else {
      start();
    }
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const formattedTime = `${minutes}:${seconds.toString().padStart(2, "0")}`;

  let pathColor = "#22c55e";
  if (percentage <= 50) pathColor = "#eab308";
  if (percentage <= 20) pathColor = "#ef4444";

  const selectedVideo = username === "female" ? femalevideo : malevideo;

  const remainingQuestions = totalQuestions - (currentIndex + 1);

  return (
    <div className="w-full min-h-screen bg-linear-to-br from-slate-100 via-white to-slate-200 flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-7xl"
      >
        <Card className="rounded-3xl shadow-2xl overflow-hidden">
          <CardContent className="p-0 flex flex-col lg:flex-row">
            <div className="lg:w-[35%] bg-linear-to-b from-slate-900 to-slate-800 text-white p-6 flex flex-col items-center justify-between">
              <video
                src={selectedVideo}
                autoPlay
                loop
                muted
                playsInline
                className="w-full rounded-2xl border border-slate-700"
              />

              <div className="mt-6 w-32 h-32">
                <CircularProgressbar
                  value={percentage}
                  text={formattedTime}
                  styles={buildStyles({
                    pathColor,
                    textColor: "#ffffff",
                    trailColor: "#334155",
                  })}
                />
              </div>

              <div className="mt-6 text-center space-y-2">
                <Badge className="bg-emerald-500 animate-pulse">
                  🎙 {isRecording ? "Recording..." : "Mic Muted"}
                </Badge>

                <p className="text-sm text-slate-300">
                  Question {currentIndex + 1} of {totalQuestions}
                </p>

                <p className="text-xs text-slate-400">
                  {remainingQuestions} remaining
                </p>
              </div>
            </div>
            <div className="lg:w-[65%] bg-white p-10 flex flex-col justify-between">
              <div className="space-y-8">
                <div className="flex items-center justify-between">
                  <h2 className="text-3xl font-bold">
                    Question {currentIndex + 1}
                  </h2>

                  <span className="px-3 py-1 text-xs rounded-full bg-slate-100 text-slate-600">
                    ⏱ {totalTime}s
                  </span>
                </div>

                <div className="p-8 rounded-3xl bg-slate-50 border shadow-md">
                  <p className="text-xl text-slate-700 font-medium">
                    {question?.question}
                  </p>
                </div>

                <textarea
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  placeholder="Speak or type your answer..."
                  disabled={isPending}
                  className="w-full h-48 p-6 rounded-2xl border focus:ring-2 focus:ring-blue-500 resize-none text-lg"
                />

                <div className="flex justify-between items-center">
                  <div className="flex gap-3">
                    <button
                      onClick={handleMicToggle}
                      className="px-6 py-2 rounded-xl bg-gray-200 hover:bg-gray-300 transition"
                    >
                      {isRecording ? "Mute Mic" : "Unmute Mic"}
                    </button>

                    <button
                      onClick={handleSkip}
                      className="px-6 py-2 rounded-xl bg-yellow-500 text-white hover:bg-yellow-600 transition"
                    >
                      Skip
                    </button>
                  </div>

                  <button
                    onClick={() => handleSubmit(false)}
                    disabled={isPending}
                    className="px-8 py-3 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition"
                  >
                    {isPending ? "Submitting..." : "Submit Answer"}
                  </button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Step2Interview;
