import React from "react";
import PropTypes from "prop-types";

const MessageList = ({ messages }) => {
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

MessageList.propTypes = {
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      text: PropTypes.string.isRequired,
      timestamp: PropTypes.number.isRequired,
      expired: PropTypes.bool.isRequired,
    }),
  ).isRequired,
};

export default MessageList;
