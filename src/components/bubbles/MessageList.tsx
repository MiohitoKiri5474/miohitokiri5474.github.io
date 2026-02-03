import React from "react";

interface Message {
  id: number;
  text: string;
  timestamp: number;
  expired?: boolean;
}

interface MessageListProps {
  messages: Message[];
}

const MessageList = ({ messages }: MessageListProps) => {
  return (
    <div className="message-list">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`message ${message.expired ? "fade-out" : ""}`}
        >
          {message.text}
        </div>
      ))}
    </div>
  );
};

export default MessageList;
