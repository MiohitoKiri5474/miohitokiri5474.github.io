import React, { useState } from "react";
import PropTypes from "prop-types";

const MessageInput = ({ onSend, onTypingChange }) => {
  const [input, setInput] = useState("");

  const handleSendMessage = () => {
    if (input.trim()) {
      onSend(input);
      setInput(""); // Clear the input field
    }
  };

  const handleChange = (e) => {
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
        onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
      />
      <button onClick={handleSendMessage}>Send</button>
    </div>
  );
};

MessageInput.propTypes = {
  onSend: PropTypes.func.isRequired,
  onTypingChange: PropTypes.func.isRequired,
};

export default MessageInput;
