import React from "react";
import type { Block } from "./types";

interface CurrentExtractionStepProps {
  block: Block;
  accumulatedWater: number;
  remainingTime: number;
}

const CurrentExtractionStep: React.FC<CurrentExtractionStepProps> = ({
  block,
  accumulatedWater,
}) => {
  return (
    <div
      style={{
        padding: "1em",
        borderRadius: "8px",
        textAlign: "center",
        height: "200px",
      }}
    >
      <h2 style={{ fontSize: "2em", marginBottom: "0.5em" }}>{block.step}</h2>
      <p style={{ fontSize: "1.5em", marginBottom: "0.5em" }}>
        Pour: {block.water}g (total: {accumulatedWater}g)
      </p>
      {block.notice && (
        <p style={{ fontSize: "1.2em", color: "#888" }}>{block.notice}</p>
      )}
    </div>
  );
};

export default CurrentExtractionStep;
