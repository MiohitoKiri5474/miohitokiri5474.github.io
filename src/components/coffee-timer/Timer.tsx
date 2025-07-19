import React, { useState, useEffect, useRef } from "react";

interface TimerProps {
  onTimerUpdate: (time: number, isRunning: boolean) => void;
}

const Timer: React.FC<TimerProps> = ({ onTimerUpdate }) => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const toggleTimer = () => {
    setIsRunning((prevIsRunning) => !prevIsRunning);
  };

  const resetTimer = () => {
    setTime(0);
    setIsRunning(false);
  };

  useEffect(() => {
    onTimerUpdate(time, isRunning);
  }, [time, isRunning, onTimerUpdate]);

  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isRunning]);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    const milliseconds = time % 1000;

    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}.${Math.floor(milliseconds / 10)
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "30%",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          width: "100%",
          height: "80%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "10vw",
          fontFamily: "monospace",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        {formatTime(time)}
      </div>
      <div
        style={{
          display: "flex",
          gap: "1em",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <button
          onClick={toggleTimer}
          style={{ fontSize: "2em", padding: "0.5em 1em" }}
        >
          {isRunning ? "Stop" : "Start"}
        </button>
        {!isRunning && (
          <button
            onClick={resetTimer}
            disabled={time === 0}
            style={{ fontSize: "2em", padding: "0.5em 1em" }}
          >
            Clear
          </button>
        )}
      </div>
    </div>
  );
};

export default Timer;
