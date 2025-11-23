import React, { useState } from "react";

const Sidebar = ({ chats, onNewChat, onSelectChat }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div
      className={`
        ${isOpen ? "w-64" : "w-16"} 
        transition-all duration-300
        bg-gray-100 dark:bg-neutral-900 
        border-r border-gray-300 dark:border-neutral-700 
        h-full flex flex-col
      `}
    >
  
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-3 hover:bg-gray-200 dark:hover:bg-neutral-800 transition"
      >
        <svg
          className="w-6 h-6 text-gray-700 dark:text-gray-200"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            d={`${isOpen ? "M6 18L18 12L6 6" : "M18 6L6 12L18 18"}`}
          />
        </svg>
      </button>


      <button
        onClick={onNewChat}
        className="
          mx-3 mt-2 mb-4 
          px-3 py-2 
          rounded-lg 
          bg-black text-white dark:bg-white dark:text-black
          hover:opacity-80 transition
          flex items-center gap-2
        "
      >
        ➕ {isOpen && "New Chat"}
      </button>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto px-3 pb-4">
        {chats.length === 0 && isOpen && (
          <p className="text-gray-500 text-sm">No chats yet</p>
        )}

        {chats.map((chat, index) => (
          <div
            key={index}
            onClick={() => onSelectChat(index)}
            className="
              p-2 mb-2 rounded-md cursor-pointer
              bg-white dark:bg-neutral-800 
              hover:bg-gray-200 dark:hover:bg-neutral-700
              border border-gray-300 dark:border-neutral-700
              transition
              text-sm
            "
          >
            {isOpen ? chat.title : "💬"}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
