import React, { useState, useContext } from "react";
import { ChatContext } from "../../context/ChatContext";

const ChatInput = () => {
  const [input, setInput] = useState("");
  const { sendMessage } = useContext(ChatContext);

  const handleSend = () => {
    if (!input.trim()) return;
    sendMessage(input);
    setInput("");
  };

  return (
    <div className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-black">
      <div className="max-w-4xl mx-auto px-6 py-4">
        <div className="flex gap-3 items-center">
          <input
            className="flex-1 px-4 py-3 bg-transparent border border-gray-300 dark:border-gray-700 rounded-full text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:border-black dark:focus:border-white transition-colors duration-200 font-light"
            placeholder="Ask something..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />

          <button
            onClick={handleSend}
            disabled={!input.trim()}
            className="w-11 h-11 flex items-center justify-center rounded-full bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 disabled:bg-gray-300 dark:disabled:bg-gray-800 disabled:cursor-not-allowed transition-colors duration-200"
          >
            <svg 
              className="w-5 h-5" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M14 5l7 7m0 0l-7 7m7-7H3" 
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInput;