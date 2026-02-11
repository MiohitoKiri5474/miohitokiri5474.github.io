import React, { useState, useEffect, useCallback } from "react";
import Timer from "./Timer";
import Calculator from "./Calculator";
import CurrentExtractionStep from "./CurrentExtractionStep";
import NextExtractionStep from "./NextExtractionStep";
import ExtractionBlocks from "./ExtractionBlocks";
import type { Block, Recipe } from "./types";

interface CoffeeTimerContainerProps {
  prebuiltRecipes: { [key: string]: Recipe };
}

const CoffeeTimerContainer: React.FC<CoffeeTimerContainerProps> = ({
  prebuiltRecipes,
}) => {
  const [currentTime, setCurrentTime] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [currentBlock, setCurrentBlock] = useState<Block | null>(null);
  const [nextBlock, setNextBlock] = useState<Block | null>(null);
  const [accumulatedWater, setAccumulatedWater] = useState(0);
  const [nextAccumulatedWater, setNextAccumulatedWater] = useState(0);
  const [remainingTime, setRemainingTime] = useState(0);
  const [blocks, setBlocks] = useState<Block[]>(
    Object.values(prebuiltRecipes)[0]?.blocks || [],
  );

  const handleTimerUpdate = useCallback((time: number, isRunning: boolean) => {
    setCurrentTime(time);
    setIsTimerRunning(isRunning);
  }, []);

  useEffect(() => {
    if (isTimerRunning) {
      let accumulatedTime = 0;
      let water = 0;
      let foundBlock: Block = blocks[blocks.length - 1];
      let foundNextBlock: Block | null = null;

      for (let i = 0; i < blocks.length; i++) {
        const block = blocks[i];
        const blockDuration = Number(block.time) * 1000; // Convert seconds to milliseconds

        if (
          currentTime >= accumulatedTime &&
          currentTime < accumulatedTime + blockDuration
        ) {
          foundBlock = block;
          water += Number(block.water);
          if (i + 1 < blocks.length) {
            foundNextBlock = blocks[i + 1];
            setNextAccumulatedWater(water + Number(blocks[i + 1].water));
          } else {
            setNextAccumulatedWater(0);
          }
          const endTime = accumulatedTime + blockDuration;
          setRemainingTime(endTime - currentTime);
          break;
        }
        water += Number(block.water);
        accumulatedTime += blockDuration;
      }

      setCurrentBlock(foundBlock);
      setNextBlock(foundNextBlock);
      setAccumulatedWater(water);
    } else {
      setCurrentBlock(null);
      setNextBlock(null);
      setAccumulatedWater(0);
      setNextAccumulatedWater(0);
      setRemainingTime(0);
    }
  }, [currentTime, isTimerRunning, blocks]);

  return (
    <div>
      <style>
        {`
          .container {
              display: grid;
              grid-template-columns: 1fr 400px; /* Two columns, first takes remaining space, second is fixed */
              gap: 2em;
              padding-top: 80px;
              margin: 0 auto;
              max-height: calc(100vh - 80px);
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
              max-height: calc(100vh - 260px); /* Adjust height as needed */
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
          <div
            style={{
              height: "200px",
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            className="bg-slate-200 dark:bg-slate-800"
          >
            {isTimerRunning && currentBlock ? (
              <div style={{ display: "flex", width: "100%", height: "100%" }}>
                <div style={{ flex: "60%", height: "200px" }}>
                  <CurrentExtractionStep
                    block={currentBlock}
                    accumulatedWater={accumulatedWater}
                    remainingTime={remainingTime}
                  />
                </div>
                <div
                  style={{
                    flex: "40%",
                    height: "200px",
                    borderLeft: "1px solid #ccc",
                    // marginTop: "0.5em",
                    // marginBottom: "0.5em",
                  }}
                >
                  <NextExtractionStep
                    block={nextBlock}
                    accumulatedWater={nextAccumulatedWater}
                    remainingTime={remainingTime}
                  />
                </div>
              </div>
            ) : (
              <Calculator />
            )}
          </div>
          <Timer onTimerUpdate={handleTimerUpdate} />
        </div>
        <div className="right-column">
          <ExtractionBlocks
            blocks={blocks}
            setBlocks={setBlocks}
            prebuiltRecipes={prebuiltRecipes}
          />
        </div>
      </main>
    </div>
  );
};

export default CoffeeTimerContainer;
