import React from "react";
import ChatPage from "./pages/ChatPage";
import { ChatProvider } from "./context/ChatContext";
import { ThemeProvider } from "./context/ThemeContext";

const App = () => {
  return (
    <ThemeProvider>
      <ChatProvider>
        <ChatPage />
      </ChatProvider>
    </ThemeProvider>
  );
};

export default App;
