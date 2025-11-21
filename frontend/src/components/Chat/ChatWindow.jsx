import React, { useContext } from "react";
import { ChatContext } from "../../context/ChatContext";
import MessageBubble from "./MessageBubble";

const ChatWindow = () => {
  const { messages } = useContext(ChatContext);

  return (
    <div className="flex flex-col gap-4 max-w-3xl mx-auto">
      {messages.map((msg, idx) => (
        <MessageBubble key={idx} sender={msg.sender} text={msg.text} />
      ))}
    </div>
  );
};

export default ChatWindow;
