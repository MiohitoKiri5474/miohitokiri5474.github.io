import React from "react";

interface Block {
  id: string;
  time: number;
  water: number;
  notice?: string;
  step?: string;
}

interface NextExtractionStepProps {
  block: Block | null;
  accumulatedWater: number;
  remainingTime: number;
}

const NextExtractionStep: React.FC<NextExtractionStepProps> = ({
  block,
  accumulatedWater,
  remainingTime,
}) => {
  const remainingSeconds = Math.ceil(remainingTime / 1000);
  if (!block) {
    return (
      <div
        style={{
          padding: "1em",
          borderRadius: "8px",
          textAlign: "center",
          opacity: 0.5,
        }}
      >
        <h2 style={{ fontSize: "1.5em", marginBottom: "0.5em" }}>Next Step</h2>
        <p style={{ fontSize: "1.2em" }}>Last step!</p>
      </div>
    );
  }

  return (
    <div
      style={{
        padding: "1em",
        borderRadius: "8px",
        textAlign: "center",
        opacity: 0.5,
      }}
    >
      <p style={{ fontSize: "1.2em", marginTop: "0.5em" }}>
        Next step in {remainingSeconds} seconds
      </p>
      <h2 style={{ fontSize: "1.5em", marginBottom: "0.5em" }}>{block.step}</h2>
      <p style={{ fontSize: "1.2em", marginBottom: "0.5em" }}>
        Pour: {block.water}g (total: {accumulatedWater}g)
      </p>
      {block.notice && (
        <p style={{ fontSize: "1em", color: "#888" }}>{block.notice}</p>
      )}
    </div>
  );
};

export default NextExtractionStep;
