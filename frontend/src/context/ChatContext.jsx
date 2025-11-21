import React, { createContext, useState } from "react";

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);

  const sendMessage = (userMessage) => {
    setMessages((prev) => [...prev, { sender: "user", text: userMessage }]);

    // Temporary bot response (until backend is connected)
    setMessages((prev) => [
      ...prev,
      { sender: "bot", text: "Thinking..." }
    ]);
  };

  return (
    <ChatContext.Provider value={{ messages, sendMessage }}>
      {children}
    </ChatContext.Provider>
  );
};
