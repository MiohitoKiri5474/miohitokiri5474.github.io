import React, { useState } from "react";

interface MessageInputProps {
  onSend: (text: string) => void;
  onTypingChange: (text: string) => void;
}

const MessageInput = ({ onSend, onTypingChange }: MessageInputProps) => {
  const [input, setInput] = useState("");

  const handleSendMessage = () => {
    if (input.trim()) {
      onSend(input);
      setInput(""); // Clear the input field
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    if (onTypingChange) {
      onTypingChange(e.target.value);
    }
  };

  return (
    <div className="message-input">
      <input
        type="text"
        value={input}
        onChange={handleChange}
        placeholder="Type a message..."
        onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
          e.key === "Enter" && handleSendMessage()
        }
      />
      <button onClick={handleSendMessage}>Send</button>
    </div>
  );
};

export default MessageInput;
