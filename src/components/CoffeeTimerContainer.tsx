import React, { useState, useEffect, useCallback } from "react";
import Timer from "./Timer";
import Calculator from "./Calculator";
import CurrentExtractionStep from "./CurrentExtractionStep";
import ExtractionBlocks, { prebuiltRecipes } from "./ExtractionBlocks";

interface Block {
  id: string;
  time: number;
  water: number;
  notice?: string;
  step?: string;
}

const CoffeeTimerContainer: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [currentBlock, setCurrentBlock] = useState<Block | null>(null);
  const [blocks, setBlocks] = useState<Block[]>(prebuiltRecipes["James Hoffmann - A Better 1 Cup V60"]);

  const handleTimerUpdate = useCallback((time: number, isRunning: boolean) => {
    setCurrentTime(time);
    setIsTimerRunning(isRunning);
  }, []);

  useEffect(() => {
    if (isTimerRunning) {
      let accumulatedTime = 0;
      let foundBlock: Block | null = null;

      for (let i = 0; i < blocks.length; i++) {
        const block = blocks[i];
        const blockDuration = block.time * 1000; // Convert seconds to milliseconds

        if (
          currentTime >= accumulatedTime &&
          currentTime < accumulatedTime + blockDuration
        ) {
          foundBlock = block;
          break;
        }
        accumulatedTime += blockDuration;
      }
      setCurrentBlock(foundBlock);
    } else {
      setCurrentBlock(null);
    }
  }, [currentTime, isTimerRunning, blocks]);

  return (
    <>
      <style>
        {`
          .container {
              display: grid;
              grid-template-columns: 1fr 400px; /* Two columns, first takes remaining space, second is fixed */
              gap: 2em;
              padding-top: 80px;
              margin: 0 auto;
          }
          .main-content {
              flex-grow: 1;
              display: flex;
              flex-direction: column;
              gap: 2em;
          }
          .right-column {
              flex-shrink: 0;
              overflow-y: auto; /* Make the right column scrollable */
              max-height: calc(100vh - 160px); /* Adjust height as needed */
              scrollbar-width: none; /* For Firefox */
              -ms-overflow-style: none;  /* For Internet Explorer and Edge */
          }

          .right-column::-webkit-scrollbar {
              display: none; /* For Chrome, Safari, and Opera */
          }
          .right-column h2 {
              font-size: 1.5em;
              margin-bottom: 1em;
              border-bottom: 1px solid var(--gray-light);
              padding-bottom: 0.5em;
          }
          .right-column p {
              margin-bottom: 1.5em;
          }
        `}
      </style>
      <main className="container">
        <div className="main-content">
          {isTimerRunning && currentBlock ? (
            <CurrentExtractionStep block={currentBlock} />
          ) : (
            <Calculator />
          )}
          <Timer onTimerUpdate={handleTimerUpdate} />
        </div>
        <div className="right-column">
          <ExtractionBlocks blocks={blocks} setBlocks={setBlocks} />
        </div>
      </main>
    </>
  );
};

export default CoffeeTimerContainer;
