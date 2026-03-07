import React from "react";
import {
  CircularProgressbar,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const Timer = ({ timeLeft, totalTime }) => {
  const percentage = (timeLeft / totalTime) * 100;

  // Format mm:ss
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${minutes}:${seconds
    .toString()
    .padStart(2, "0")}`;

  // Dynamic color logic
  let pathColor = "#22c55e"; // green

  if (percentage <= 50) pathColor = "#eab308"; // yellow
  if (percentage <= 20) pathColor = "#ef4444"; // red

  return (
    <div className="w-40 h-40 mx-auto">
      <CircularProgressbar
        value={percentage}
        text={formattedTime}
        styles={buildStyles({
          pathColor: pathColor,
          textColor: "#111827",
          trailColor: "#e5e7eb",
          strokeLinecap: "round",
          textSize: "18px",
        })}
      />
    </div>
  );
};

export default Timer;