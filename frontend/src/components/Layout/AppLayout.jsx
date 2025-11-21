import React, { useState, createContext } from "react";
import Header from "../Layout/Header";
import ChatWindow from "../Chat/ChatWindow";
import ChatInput from "../Chat/ChatInput";
import SettingsModal from "../Modals/SettingModal";

export const ThemeContext = createContext();

const AppLayout = () => {
  const [theme, setTheme] = useState("light");
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const toggleTheme = () => {
    setTheme(prev => (prev === "light" ? "dark" : "light"));
  };

  const openSettings = () => setIsSettingsOpen(true);
  const closeSettings = () => setIsSettingsOpen(false);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={`${theme === "light" ? "bg-gray-100" : "bg-gray-900"} h-screen w-screen flex flex-col`}>
        <Header openSettings={openSettings} />

      
        <main className="flex-1 overflow-y-auto p-4">
          <ChatWindow />
        </main>

   
        <ChatInput />

       
        {isSettingsOpen && (
          <SettingsModal 
            closeSettings={closeSettings}
            toggleTheme={toggleTheme}
            currentTheme={theme}
          />
        )}
      </div>
    </ThemeContext.Provider>
  );
};

export default AppLayout;
