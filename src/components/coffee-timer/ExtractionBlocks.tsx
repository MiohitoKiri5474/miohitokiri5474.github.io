import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import type { DropResult } from "react-beautiful-dnd";

interface Block {
  id: string;
  time: number | string;
  water: number | string;
  notice?: string;
  step?: string;
}

interface Recipe {
  blocks: Block[];
  notice?: string[];
}

const JamesHoffmannV60: Recipe = {
  blocks: [
    {
      id: "block-a",
      step: "Bloom",
      time: 45,
      water: 50,
      notice: "Gently swirl at 00:10.",
    },
    {
      id: "block-b",
      step: "2nd Pour",
      time: 25,
      water: 50,
      notice: "Stable and average pouring water in the first 15s then rest.",
    },
    {
      id: "block-d",
      step: "3rd Pour",
      time: 20,
      water: 50,
      notice: "Stable and average pouring water in the first 10s then rest.",
    },
    {
      id: "block-f",
      step: "4nd Pour",
      time: 20,
      water: 50,
      notice: "Stable and average pouring water in the first 10s then rest.",
    },
    {
      id: "block-h",
      step: "5th Pour",
      time: 0,
      water: 50,
      notice: "Stable pouring water in the first 10s then gentaly swirl",
    },
  ],
  notice: ["15g beans w/ 250g water"],
};

const KurasuKyotoV60: Recipe = {
  blocks: [
    {
      id: "block-a",
      step: "Bloom",
      time: 30,
      water: 30,
      notice: "Gently stir with a spoon right after pouring.",
    },
    { id: "block-b", step: "2nd Pour", time: 30, water: 70 },
    {
      id: "block-c",
      step: "3rd Pour",
      time: 0,
      water: 100,
      notice:
        "Give it a light stir in the clockwise and counter-clockwise motion after pouring.",
    },
  ],
  notice: ["13g beans w/ 200g water"],
};

const KurasuKyotoV60Iced: Recipe = {
  blocks: [
    {
      id: "block-a",
      step: "Bloom",
      time: 30,
      water: 40,
      notice: "Gently stir with a spoon right after pouring.",
    },
    { id: "block-b", step: "2nd Pour", time: 30, water: 60 },
    {
      id: "block-c",
      step: "3rd Pour",
      time: 0,
      water: 50,
      notice:
        "Give it a light stir in the clockwise and counter-clockwise motion after pouring.",
    },
  ],
  notice: ["16g beans w/ 70g ice and 150g water (91℃)"],
};

const KurasuKyotoV60Iced125: Recipe = {
  blocks: [
    {
      id: "block-a",
      step: "Bloom",
      time: 30,
      water: 50,
      notice: "Gently stir with a spoon right after pouring.",
    },
    { id: "block-b", step: "2nd Pour", time: 30, water: 75 },
    {
      id: "block-c",
      step: "3rd Pour",
      time: 0,
      water: 65,
      notice:
        "Give it a light stir in the clockwise and counter-clockwise motion after pouring.",
    },
  ],
  notice: [
    'This recipe is base on "Kurasu Kyoto - V60 Iced" with 25% more water.',
    "20g beans w/ 85g ice and 150g water (91℃)",
  ],
};

const KurasuKyotoV60LightBasicRecipe: Recipe = {
  blocks: [
    {
      id: "block-a",
      step: "Bloom",
      time: 40,
      water: 40,
      notice: "Gently stir with a spoon right after pouring.",
    },
    { id: "block-b", step: "2nd Pour", time: 30, water: 60 },
    {
      id: "block-c",
      step: "3rd Pour",
      time: 30,
      water: 50,
      notice: "Pour move gentaly compared to 2nd pour.",
    },
    {
      id: "block-d",
      step: "4th Pour",
      time: 0,
      water: 50,
      notice: "Give it a final stir with a tea spoon after pouring.",
    },
  ],
  notice: ["14g beans w/ 200g water (91℃)"],
};

export const prebuiltRecipes: { [key: string]: Recipe } = {
  "James Hoffmann - A Better 1 Cup V60": JamesHoffmannV60,
  "Kurasu Kyoto - V60": KurasuKyotoV60,
  "Kurasu Kyoto - V60 Iced": KurasuKyotoV60Iced,
  "Kurasu Kyoto - V60 Iced 125%": KurasuKyotoV60Iced125,
  "Kurasu Kyoto - V60 Light Roast": KurasuKyotoV60LightBasicRecipe,
};

interface ExtractionBlocksProps {
  blocks: Block[];
  setBlocks: React.Dispatch<React.SetStateAction<Block[]>>;
}

const ExtractionBlocks: React.FC<ExtractionBlocksProps> = ({
  blocks,
  setBlocks,
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState<string>(
    "James Hoffmann - A Better 1 Cup V60",
  );

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Effect to detect custom modifications
  useEffect(() => {
    if (selectedRecipe !== "Custom") {
      const currentRecipeBlocks = prebuiltRecipes[selectedRecipe].blocks;
      // Simple deep comparison for demonstration. A more robust comparison might be needed.
      const isModified =
        JSON.stringify(blocks) !== JSON.stringify(currentRecipeBlocks);
      if (isModified) {
        setSelectedRecipe("Custom");
      }
    }
  }, [blocks, selectedRecipe]);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }

    const newBlocks = Array.from(blocks);
    const [reorderedItem] = newBlocks.splice(result.source.index, 1);
    newBlocks.splice(result.destination.index, 0, reorderedItem);

    setBlocks(newBlocks);
  };

  const addBlock = () => {
    const newBlock: Block = {
      id: `block-${Date.now()}`,
      step: `Pour Block ${blocks.length + 1}`,
      time: 0,
      water: 0,
    };
    setBlocks([...blocks, newBlock]);
  };

  const deleteBlock = (id: string) => {
    setBlocks(blocks.filter((block) => block.id !== id));
  };

  const handleInputChange = (id: string, field: keyof Block, value: string) => {
    const newBlocks = blocks.map((block) => {
      if (block.id === id) {
        return { ...block, [field]: value };
      }
      return block;
    });
    setBlocks(newBlocks);
  };

  const handleRecipeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newRecipeName = event.target.value;
    setSelectedRecipe(newRecipeName);
    if (newRecipeName !== "Custom") {
      setBlocks(prebuiltRecipes[newRecipeName].blocks);
    }
  };

  if (!isMounted) {
    return null;
  }

  return (
    <div
      style={{
        padding: "1em",
        borderRadius: "8px",
      }}
      className="bg-slate-200 dark:bg-slate-800"
    >
      <h1 style={{ textAlign: "center" }}>Extraction Recipe</h1>
      <div style={{ marginBottom: "1em", textAlign: "center" }}>
        <label htmlFor="recipe-select" style={{ marginRight: "0.5em" }}>
          Select Recipe:
        </label>
        <select
          id="recipe-select"
          value={selectedRecipe}
          onChange={handleRecipeChange}
          className="bg-slate-300 dark:bg-slate-700 text-slate-900 dark:text-slate-100 rounded-md p-2"
        >
          {Object.keys(prebuiltRecipes).map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
          <option value="Custom">Custom</option>
        </select>
      </div>

      {selectedRecipe !== "Custom" &&
      prebuiltRecipes[selectedRecipe].notice ? (
        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            gap: "0.5em", // smaller gap for lines of text
            marginBottom: "1.5em",
            padding: "1.5em",
            border: "1px solid #ccc",
            borderRadius: "8px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
            textAlign: "center",
          }}
          className="bg-slate-400 dark:bg-slate-500"
        >
          {prebuiltRecipes[selectedRecipe].notice?.map((line, index) => (
            <p key={index} style={{ margin: 0 }}>
              {line}
            </p>
          ))}
        </div>
      ) : (
        ""
      )}

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="blocks">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {blocks.map((block, index) => (
                <Draggable key={block.id} draggableId={block.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={{
                        position: "relative",
                        display: "flex",
                        flexDirection: "column",
                        gap: "1em",
                        marginBottom: "1.5em",
                        padding: "1.5em",
                        border: "1px solid #ccc",
                        borderRadius: "8px",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                        ...provided.draggableProps.style,
                      }}
                      className="bg-slate-400 dark:bg-slate-500"
                    >
                      <button
                        onClick={() => deleteBlock(block.id)}
                        style={{
                          position: "absolute",
                          top: "0.5em",
                          right: "0.5em",
                          background: "transparent",
                          border: "none",
                          fontSize: "1.2em",
                          color: "#888",
                          cursor: "pointer",
                        }}
                        aria-label="Delete block"
                      >
                        ×
                      </button>
                      <div style={{ width: "100%" }}>
                        <label
                          style={{
                            fontWeight: "bold",
                            display: "block",
                            marginBottom: "0.25em",
                          }}
                        >
                          Step
                        </label>
                        <input
                          type="text"
                          value={block.step}
                          onChange={(e) =>
                            handleInputChange(block.id, "step", e.target.value)
                          }
                          placeholder={
                            index === 0 ? `Blooming` : `Step ${index}`
                          }
                          style={{
                            width: "100%",
                            backgroundColor: "transparent",
                            color: "inherit",
                            border: "1px solid #ccc",
                            borderRadius: "4px",
                            textAlign: "center",
                            padding: "0.5em",
                          }}
                        />
                      </div>
                      <div
                        style={{ display: "flex", gap: "1em", width: "100%" }}
                      >
                        <div style={{ flex: 1 }}>
                          <label
                            style={{
                              fontWeight: "bold",
                              display: "block",
                              marginBottom: "0.25em",
                            }}
                          >
                            Time (sec)
                          </label>
                          <input
                            type="number"
                            value={block.time}
                            onChange={(e) =>
                              handleInputChange(
                                block.id,
                                "time",
                                e.target.value,
                              )
                            }
                            style={{
                              width: "100%",
                              backgroundColor: "transparent",
                              color: "inherit",
                              border: "1px solid #ccc",
                              borderRadius: "4px",
                              textAlign: "center",
                              padding: "0.5em",
                            }}
                          />
                        </div>
                        <div style={{ flex: 1 }}>
                          <label
                            style={{
                              fontWeight: "bold",
                              display: "block",
                              marginBottom: "0.25em",
                            }}
                          >
                            Water (g)
                          </label>
                          <input
                            type="number"
                            value={block.water}
                            onChange={(e) =>
                              handleInputChange(
                                block.id,
                                "water",
                                e.target.value,
                              )
                            }
                            style={{
                              width: "100%",
                              backgroundColor: "transparent",
                              color: "inherit",
                              border: "1px solid #ccc",
                              borderRadius: "4px",
                              textAlign: "center",
                              padding: "0.5em",
                            }}
                          />
                        </div>
                      </div>
                      <div style={{ width: "100%" }}>
                        <label
                          style={{
                            fontWeight: "bold",
                            display: "block",
                            marginBottom: "0.25em",
                          }}
                        >
                          Notice
                        </label>
                        <input
                          type="text"
                          value={block.notice ?? ""}
                          onChange={(e) =>
                            handleInputChange(
                              block.id,
                              "notice",
                              e.target.value,
                            )
                          }
                          placeholder="Add notice here"
                          style={{
                            width: "100%",
                            backgroundColor: "transparent",
                            color: "inherit",
                            border: "1px solid #ccc",
                            borderRadius: "4px",
                            textAlign: "center",
                            padding: "0.5em",
                          }}
                        />
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <button
        onClick={addBlock}
        style={{
          display: "block",
          margin: "1em auto",
          padding: "0.5em 1em",
          borderRadius: "4px",
        }}
      >
        Add Block
      </button>
    </div>
  );
};

export default ExtractionBlocks;
