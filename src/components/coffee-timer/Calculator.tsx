import React, { useState, useEffect } from "react";

const Calculator = () => {
  const [beanWeight, setBeanWeight] = useState<number | string>(15);
  const [waterWeight, setWaterWeight] = useState<number | string>("");
  const [ratio, setRatio] = useState<number | string>(16);

  useEffect(() => {
    if (beanWeight && ratio) {
      setWaterWeight(Number(beanWeight) * Number(ratio));
    }
  }, [beanWeight, ratio]);

  useEffect(() => {
    if (waterWeight && ratio) {
      setBeanWeight(Number(waterWeight) / Number(ratio));
    }
  }, [waterWeight, ratio]);

  const roundUp = () => {
    if (waterWeight) {
      setWaterWeight(Math.ceil(Number(waterWeight)));
    }
    if (beanWeight) {
      setBeanWeight(Math.ceil(Number(beanWeight)));
    }
  };

  return (
    <div
      style={{
        padding: "1em",
        borderRadius: "8px",
      }}
    >
      <h1 style={{ textAlign: "center" }}>Coffee Calculator</h1>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          marginBottom: "1em",
          gap: "1rem",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <label style={{ textAlign: "center" }}>Bean Weight (g)</label>
          <input
            type="number"
            value={beanWeight}
            onChange={(e) => setBeanWeight(e.target.value)}
            style={{
              width: "80%",
              backgroundColor: "transparent",
              color: "inherit",
              border: "1px solid #ccc",
              borderRadius: "4px",
              textAlign: "center",
              MozAppearance: "textfield",
              WebkitAppearance: "none",
              margin: "0",
            }}
          />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <label style={{ textAlign: "center" }}>Water Weight (g)</label>
          <input
            type="number"
            value={waterWeight}
            onChange={(e) => setWaterWeight(e.target.value)}
            style={{
              width: "80%",
              backgroundColor: "transparent",
              color: "inherit",
              border: "1px solid #ccc",
              borderRadius: "4px",
              textAlign: "center",
              MozAppearance: "textfield",
              WebkitAppearance: "none",
              margin: "0",
            }}
          />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <label style={{ textAlign: "center" }}>Ratio (1:n)</label>
          <input
            type="number"
            value={ratio}
            onChange={(e) => setRatio(e.target.value)}
            style={{
              width: "80%",
              backgroundColor: "transparent",
              color: "inherit",
              border: "1px solid #ccc",
              borderRadius: "4px",
              textAlign: "center",
              MozAppearance: "textfield",
              WebkitAppearance: "none",
              margin: "0",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Calculator;
