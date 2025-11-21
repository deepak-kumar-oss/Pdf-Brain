import React from "react";

const MessageBubble = ({ sender, text }) => {
  const isUser = sender === "user";

  return (
    <div
      className={`max-w-[75%] p-3 rounded-xl text-sm whitespace-pre-wrap
      ${isUser 
          ? "bg-blue-600 text-white self-end rounded-br-none" 
          : "bg-gray-200 dark:bg-gray-700 dark:text-white rounded-bl-none"
      }`}
    >
      {text}
    </div>
  );
};

export default MessageBubble;
