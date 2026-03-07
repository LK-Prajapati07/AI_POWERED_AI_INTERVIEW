
import Step1Setup from "@/components/Step1Setup";
import Step2Interview from "@/components/Step2Interview";
import Step3IntervewReport from "@/components/Step3IntervewReport";
import { useGetSingleInterview } from "@/Hooks/Interview.hooks";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const InterviewPage = () => {

  const { id } = useParams(); // interview id from URL

  const [step, setStep] = useState(1);
  const [interviewId, setInterviewId] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [report, setReport] = useState(null);

  const { data } = useGetSingleInterview(id);

  // Resume interview if id exists
  useEffect(() => {

    if (!id || !data) return;

    setInterviewId(data._id);
    setQuestions(data.questions || []);
    setCurrentIndex(data.currentQuestionIndex || 0);

    setStep(2);

  }, [id, data]);

  const handleStart = (data) => {

    setInterviewId(data.interviewId);

    const questionsArray = data.question || data.questions || [];

    setQuestions(questionsArray);

    setCurrentIndex(0);

    setStep(2);

  };

  const handleNext = () => {

    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
    }

  };

  const handleFinish = (finalReport) => {

    setReport(finalReport);

    setStep(3);

  };

  return (
    <div className="min-h-screen bg-gray-50">

      {step === 1 && !id && (
        <Step1Setup onStart={handleStart} />
      )}

      {step === 2 && (
        <Step2Interview
          interviewData={{
            interviewId,
            question: questions[currentIndex],
            currentIndex,
            totalQuestions: questions.length,
          }}
          onNext={handleNext}
          onFinish={handleFinish}
        />
      )}

      {step === 3 && (
        <Step3IntervewReport report={report} />
      )}

    </div>
  );
};

export default InterviewPage;

