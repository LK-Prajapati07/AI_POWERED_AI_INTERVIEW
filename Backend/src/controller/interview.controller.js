import fs from "fs";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";
import { askAI } from "../Services/openRouter.service.js";
import { Interview } from "../model/interview.model.js";
import { userModel } from "../model/user.model.js";
export const analyzeResume = async (req, res) => {
  let filePath;

  try {
    if (!req.file) {
      return res.status(400).json({ message: "Resume Required" });
    }

    filePath = req.file.path;

    // Read file
    const fileBuffer = await fs.promises.readFile(filePath);
    const uint8Array = new Uint8Array(fileBuffer);

    const pdf = await pdfjsLib.getDocument({ data: uint8Array }).promise;

    let resumeText = "";

    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
      const page = await pdf.getPage(pageNum);
      const content = await page.getTextContent();

      const pageText = content.items.map((item) => item.str).join(" ");
      resumeText += pageText + "\n";
    }

    resumeText = resumeText.replace(/\s+/g, " ").trim();

    const message = [
      {
        role: "system",
        content: `
Extract structured data from resume also Which Project Current Working And Skills .
Return strictly valid JSON:

{
  "role": "string",
  "experience": "string",
  "projects": ["Project1", "Project2"],
  "skills": ["skill1", "skill2"]
}
`,
      },
      {
        role: "user",
        content: resumeText,
      },
    ];

    const aiResponse = await askAI(message);

    // Parse AI JSON safely
    let parsed;
    try {
      parsed = JSON.parse(aiResponse);
    } catch (err) {
      console.error("AI returned invalid JSON:", aiResponse);
      throw new Error("AI returned invalid JSON format");
    }

    // Delete file safely
    if (fs.existsSync(filePath)) {
      await fs.promises.unlink(filePath);
    }

    return res.json({
      role: parsed.role,
      experience: parsed.experience,
      projects: parsed.projects,
      skills: parsed.skills,
      resumeText,
    });
  } catch (error) {
    // Cleanup file if error occurs
    if (filePath && fs.existsSync(filePath)) {
      await fs.promises.unlink(filePath);
    }

    console.error("Error in analyzeResume:", error);

    return res.status(500).json({
      message: error.message,
    });
  }
};

export const generateQuestions = async (req, res) => {
  try {
    let { role, experience, mode, resumeText, projects, skills } = req.body;
    role = role?.trim();
    experience = experience?.trim();
    mode = mode?.trim();
    if (!role || !experience || !mode) {
      return res.status(400).json({
        message: "Role, Experience and Mode are required",
      });
    }
    const user = await userModel.findOne({ firebaseUid: req.user.uid });
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    if (user.credit < 50) {
      return res.status(400).json({
        message: "Not enough credit. Minimum 50 required",
      });
    }
    const skillsText =
      Array.isArray(skills) && skills.length ? skills.join(", ") : "None";

    const projectText =
      Array.isArray(projects) && projects.length ? projects.join(", ") : "None";

    const safeResume = resumeText?.trim() || "None";

    const userPrompt = `
Role: ${role}
Experience: ${experience}
Interview Mode: ${mode}
Projects: ${projectText}
Skills: ${skillsText}
Resume Summary: ${safeResume}
`;
    const messages = [
      {
        role: "system",
        content: `
You are a professional human interviewer.

Generate exactly 5 interview questions based on the candidate profile.

Return strictly valid JSON in this format:

{
  "questions": [
    {
      "question": "string",
      "timeLimit": number
    }
  ]
}

Rules:
- Questions must match role and experience.
- Mix technical and behavioral questions.
- Time limit should be realistic (60-180 seconds).
- DO NOT return text outside JSON.
`,
      },
      {
        role: "user",
        content: userPrompt,
      },
    ];
    const aiResponse = await askAI(messages);

    if (!aiResponse || !aiResponse.trim()) {
      return res.status(500).json({
        message: "AI returned empty response",
      });
    }
    let parsed;

    try {
      parsed = JSON.parse(aiResponse);
    } catch (err) {
      console.error("Invalid AI JSON:", aiResponse);
      return res.status(500).json({
        message: "AI returned invalid JSON format",
      });
    }

    const questionsArray = parsed?.questions;

    if (!Array.isArray(questionsArray) || questionsArray.length !== 5) {
      return res.status(500).json({
        message: "AI did not return valid questions",
      });
    }

    user.credit -= 50;
    await user.save();
    const interview = await Interview.create({
      userId: user._id,
      role,
      experience,
      resumeText: safeResume,
      mode,
      questions: questionsArray.map((q) => ({
        question: q.question,
        timeLimit: q.timeLimit || 90,
        difficulty: ["Easy", "Medium", "Hard"][Math.floor(Math.random() * 3)],
      })),
    });
    return res.status(200).json({
      interviewId: interview._id,
      creditLeft: user.credit,
      username: user.name,
      question: interview.questions,
      message: "Interview generated successfully",
    });
  } catch (error) {
    console.error("Generate Question Error:", error);
    return res.status(500).json({
      message: error.message || "Internal Server Error",
    });
  }
};

export const submitAnswer = async (req, res) => {
  try {
    const { interviewId, questionIndex, answer, timeTaken = 0 } = req.body;

    const interview = await Interview.findById(interviewId);

    if (!interview) {
      return res.status(404).json({
        message: "Interview Not Found",
      });
    }

    const question = interview.questions[questionIndex];

    if (!question) {
      return res.status(400).json({
        message: "Invalid question index",
      });
    }

    /* ===============================
       1. No Answer Case
    =============================== */

    if (!answer || !answer.trim()) {
      question.score = 0;
      question.communication = 0;
      question.correctness = 0;
      question.confidence = 0;
      question.feedback = "No answer provided";
      question.answer = "";
      await interview.save();

      const hasNext = questionIndex < interview.questions.length - 1;

      return res.status(200).json({
        feedback: question.feedback,
        score: 0,
        hasNext,
        nextIndex: hasNext ? questionIndex + 1 : null,
      });
    }

    /* ===============================
       2. Time Exceeded Case
    =============================== */

    if (timeTaken > question.timeLimit) {
      question.score = 0;
      question.communication = 0;
      question.correctness = 0;
      question.confidence = 0;
      question.feedback = "Time limit exceeded";
      question.answer = answer;
      question.isTimedOut = true;

      await interview.save();

      const hasNext = questionIndex < interview.questions.length - 1;

      return res.status(200).json({
        feedback: question.feedback,
        score: 0,
        hasNext,
        nextIndex: hasNext ? questionIndex + 1 : null,
      });
    }

    /* ===============================
       3. AI Evaluation
    =============================== */

    const aiPrompt = [
      {
        role: "system",
        content: `
You are an expert interviewer evaluating a candidate's answer.

Return strictly valid JSON:

{
  "score": number,
  "communication": number,
  "correctness": number,
  "confidence": number,
  "feedback": "string"
}
`,
      },
      {
        role: "user",
        content: `
Question: ${question.question}
Candidate Answer: ${answer}
`,
      },
    ];

    const aiResponse = await askAI(aiPrompt);

    let parsed;

    try {
      parsed = JSON.parse(aiResponse);
    } catch (err) {
      console.error("Invalid AI JSON:", aiResponse);
      return res.status(500).json({
        message: "AI returned invalid JSON",
      });
    }

    question.score = parsed.score || 0;
    question.communication = parsed.communication || 0;
    question.correctness = parsed.correctness || 0;
    question.confidence = parsed.confidence || 0;
    question.feedback = parsed.feedback || "";
    question.answer = answer;

    await interview.save();

    const hasNext = questionIndex < interview.questions.length - 1;

    return res.status(200).json({
      feedback: question.feedback,
      score: question.score,
      hasNext,
      nextIndex: hasNext ? questionIndex + 1 : null,
    });
  } catch (error) {
    console.error("Submit Answer Error:", error);
    return res.status(500).json({
      message: error.message || "Internal Server Error",
    });
  }
};



export const finishInterview = async (req, res) => {
  try {
    const { interviewId } = req.body;

    if (!interviewId) {
      return res.status(400).json({
        message: "Interview ID is required",
      });
    }

    const user = await userModel.findOne({
      firebaseUid: req.user.uid,
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    /* ===============================
       FIND INTERVIEW
    =============================== */

    const interview = await Interview.findOne({
      _id: interviewId,
      userId: user._id,
    }).populate("userId", "name email");

    if (!interview) {
      return res.status(404).json({
        message: "Interview not found or access denied",
      });
    }

    /* ===============================
       MARK INTERVIEW COMPLETE
    =============================== */

    if (interview.status !== "Completed") {
      interview.status = "Completed";
    }

    const totalQuestions = interview.questions.length;

    if (totalQuestions === 0) {
      return res.status(400).json({
        message: "No questions found for this interview",
      });
    }

    /* ===============================
       SCORE CALCULATION
    =============================== */

    const avgCommunication =
      interview.questions.reduce((acc, q) => acc + (q.communication || 0), 0) /
      totalQuestions;

    const avgCorrectness =
      interview.questions.reduce((acc, q) => acc + (q.correctness || 0), 0) /
      totalQuestions;

    const avgConfidence =
      interview.questions.reduce((acc, q) => acc + (q.confidence || 0), 0) /
      totalQuestions;

    const finalScore =
      ((avgCommunication + avgCorrectness + avgConfidence) / 3) * 10;

    interview.finalScore = Number(finalScore.toFixed(2));

    await interview.save();

    /* ===============================
       PERFORMANCE LEVEL
    =============================== */

    let level = "Beginner";

    if (finalScore >= 85) level = "Excellent";
    else if (finalScore >= 70) level = "Advanced";
    else if (finalScore >= 50) level = "Intermediate";

    /* ===============================
       AI PERFORMANCE SUMMARY
    =============================== */

    const aiPrompt = [
      {
        role: "system",
        content: `
You are a professional technical interviewer.

Generate a short professional performance summary.

Rules:
- 3 to 5 sentences
- Mention strengths
- Mention areas for improvement
- Be constructive and concise
- Return plain text only
`,
      },
      {
        role: "user",
        content: `
Candidate Role: ${interview.role}
Interview Mode: ${interview.mode}
Experience Level: ${interview.experience}

Final Score: ${finalScore.toFixed(2)}%

Communication Average: ${avgCommunication.toFixed(2)}
Correctness Average: ${avgCorrectness.toFixed(2)}
Confidence Average: ${avgConfidence.toFixed(2)}

Performance Level: ${level}
`,
      },
    ];

    let aiSummary = "Performance summary unavailable";

    try {
      const response = await askAI(aiPrompt);
      if (response && response.trim()) {
        aiSummary = response.trim();
      }
    } catch (err) {
      console.error("AI Summary Error:", err);
    }

    /* ===============================
       RESPONSE
    =============================== */

    return res.status(200).json({
      success: true,
      candidate: {
        name: interview.userId?.name || "Candidate",
        email: interview.userId?.email || "",
      },
      role: interview.role,
      mode: interview.mode,
      experience: interview.experience,
      finalScore: interview.finalScore,
      performanceLevel: level,
      averages: {
        communication: avgCommunication.toFixed(2),
        correctness: avgCorrectness.toFixed(2),
        confidence: avgConfidence.toFixed(2),
      },
      summary: aiSummary,
      questionBreakdown: interview.questions.map((q, index) => ({
        questionNumber: index + 1,
        score: q.score || 0,
        communication: q.communication || 0,
        correctness: q.correctness || 0,
        confidence: q.confidence || 0,
        timedOut: q.isTimedOut || false,
      })),
    });
  } catch (error) {
    console.error("Finish Interview Error:", error);

    return res.status(500).json({
      message: error.message || "Internal Server Error",
    });
  }
};



export const getMyInterview = async (req, res) => {
  try {
    const user = await userModel.findOne({
      firebaseUid: req.user.uid,
    });
    const interview = await Interview.find({ userId: user._id })
      .sort({ createdAt: -1 })
      .select("role experience mode finalScore status createdAt");
    if (!interview) {
      return res.status(404).json({
        message: "No interview found for this user",
      });
    }
    return res.status(200).json(interview);
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Internal Server Error",
    });
  }
};



export const getInterviewReport = async (req, res) => {
  try {
    const interview = await Interview.findById(req.params.id);

    if (!interview) {
      return res.status(404).json({
        message: "Interview not found",
      });
    }

    const totalQuestions = interview.questions.length;

    if (totalQuestions === 0) {
      return res.status(400).json({
        message: "No questions available for this interview",
      });
    }

    const avgCommunication =
      interview.questions.reduce((acc, q) => acc + (q.communication || 0), 0) /
      totalQuestions;

    const avgCorrectness =
      interview.questions.reduce((acc, q) => acc + (q.correctness || 0), 0) /
      totalQuestions;

    const avgConfidence =
      interview.questions.reduce((acc, q) => acc + (q.confidence || 0), 0) /
      totalQuestions;

    return res.status(200).json({
      finalScore: interview.finalScore,
      confidence: avgConfidence.toFixed(2),
      correctness: avgCorrectness.toFixed(2),
      communication: avgCommunication.toFixed(2),
      questionWiseScore: interview.questions,
    });
  } catch (error) {
    console.error("Get Interview Report Error:", error);

    return res.status(500).json({
      message: error.message || "Internal Server Error",
    });
  }
};



export const getSingleInterview = async (req, res) => {
  try {

    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        message: "Interview ID is required"
      });
    }

    const interview = await Interview.findById(id);

    if (!interview) {
      return res.status(404).json({
        message: "Interview not found"
      });
    }

    return res.status(200).json({
      _id: interview._id,
      role: interview.role,
      experience: interview.experience,
      mode: interview.mode,
      questions: interview.questions,
      currentQuestionIndex: interview.currentQuestionIndex || 0,
      status: interview.status
    });

  } catch (error) {

    console.error("Get Single Interview Error:", error);

    return res.status(500).json({
      message: "Failed to fetch interview"
    });

  }
};

