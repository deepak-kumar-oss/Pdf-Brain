import React, { useState, useContext } from "react";
import { ChatContext } from "../../context/ChatContext";
import UploadButton from "./UploadButton";

const ChatInput = () => {
  const [input, setInput] = useState("");
  const [file, setFile] = useState(null);
  const { sendMessage } = useContext(ChatContext);

  const handleSend = async () => {
    if (!input.trim() && !file) return;
    await sendMessage({ text: input, file });
    setInput("");
    setFile(null);
  };

  return (
    <div className="
      fixed bottom-0 left-0 right-0 
      bg-gradient-to-t from-gray-100/90 dark:from-gray-900/90 
      backdrop-blur-sm 
      pb-6 pt-4 flex justify-center
    ">
      <div className="w-full max-w-3xl px-4">
        {file && (
          <div className="mb-2 flex items-center gap-3 bg-gray-200 dark:bg-neutral-800 px-3 py-2 rounded-xl border border-gray-300 dark:border-neutral-700 shadow-sm">
            <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
              {file.name}
            </span>
            <button onClick={() => setFile(null)} className="text-red-500">✕</button>
          </div>
        )}

        <div className="flex items-center bg-white dark:bg-neutral-900 border border-gray-300 dark:border-neutral-700 rounded-full px-4 py-2 shadow-lg">
          <UploadButton onFileSelect={setFile} />

          <input
            className="flex-1 bg-transparent px-3 outline-none text-sm"
            placeholder="Message PDF Brian..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />

          <button
            onClick={handleSend}
            className={`
              px-3 py-2 rounded-full text-white text-sm
              ${input.trim() || file
                ? "bg-black dark:bg-white dark:text-black"
                : "bg-gray-300 dark:bg-neutral-700 cursor-not-allowed text-gray-500"}
            `}
          >
            ➤
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInput;
