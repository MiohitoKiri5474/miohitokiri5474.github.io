import { useState, useEffect } from "react";
import MessageList from "./MessageList.tsx";
import MessageInput from "./MessageInput.tsx";
import "../../styles/bubbles.css";

interface Message {
  id: number;
  text: string;
  timestamp: number;
  expired?: boolean;
}

const FloatingMessageBubbles = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [typingText, setTypingText] = useState(""); // New state for typing indicator

  const handleAddMessage = (text: string) => {
    const newMessage = {
      id: Date.now(),
      text,
      timestamp: Date.now(),
    };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setTypingText(""); // Clear typing indicator on send
  };

  // Handler for input changes
  const handleTypingChange = (text: string) => {
    setTypingText(text);
  };

  // Automatically remove messages after 15 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      setMessages((prevMessages) =>
        prevMessages.filter((message) => now - message.timestamp < 15000),
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="app">
      <MessageList messages={messages} />
      <div className="current-input-container">
        {typingText && (
          <div className="message typing-indicator">{typingText}</div>
        )}
      </div>
      <MessageInput
        onSend={handleAddMessage}
        onTypingChange={handleTypingChange}
      />
    </div>
  );
};

export default FloatingMessageBubbles;
