import React from "react";

interface Block {
  id: string;
  time: number;
  water: number;
  notice?: string;
  step?: string;
}

interface CurrentExtractionStepProps {
  block: Block;
}

const CurrentExtractionStep: React.FC<CurrentExtractionStepProps> = ({
  block,
}) => {
  return (
    <div
      style={{
        padding: "1em",
        borderRadius: "8px",
        textAlign: "center",
      }}
    >
      <h2 style={{ fontSize: "2em", marginBottom: "0.5em" }}>{block.step}</h2>
      <p style={{ fontSize: "1.5em", marginBottom: "0.5em" }}>
        Pour: {block.water}g
      </p>
      {block.notice && (
        <p style={{ fontSize: "1.2em", color: "#888" }}>{block.notice}</p>
      )}
    </div>
  );
};

export default CurrentExtractionStep;
