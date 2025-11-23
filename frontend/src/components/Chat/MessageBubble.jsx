import React from "react";

const MessageBubble = ({ sender, text, file }) => {
  const isUser = sender === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`
          max-w-[80%] px-4 py-3 rounded-2xl shadow 
          text-sm leading-relaxed font-medium
          ${isUser 
            ? "bg-black text-white dark:bg-white dark:text-black rounded-br-none" 
            : "bg-white text-black dark:bg-neutral-800 dark:text-white border border-gray-200 dark:border-neutral-700 rounded-bl-none"
          }
        `}
      >
    
        {text && <p className="whitespace-pre-wrap">{text}</p>}

  
        {file && (
          <div className="mt-3">
            {file.type?.startsWith("image/") ? (
              <img
                src={URL.createObjectURL(file)}
                alt="uploaded"
                className="w-48 rounded-lg shadow-sm border border-gray-300 dark:border-neutral-700"
              />
            ) : (
              <a
                href={URL.createObjectURL(file)}
                download={file.name}
                className="text-blue-500 underline text-sm"
              >
                📄 {file.name}
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageBubble;
