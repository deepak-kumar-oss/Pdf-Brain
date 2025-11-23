import React, { useState, useContext, useEffect } from "react";
import { ChatContext } from "../../context/ChatContext";

const Sidebar = () => {
  const {
    chats,
    newChat,
    selectChat,
    activeChatId,
    pdfList,
    loadPdfList,
    activePdf,
    setActivePdf,
    deletePdf,
  } = useContext(ChatContext);

  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    // refresh PDF list periodically or on mount
    loadPdfList();
    // eslint-disable-next-line
  }, []);

  return (
    <div
      className={`${
        isOpen ? "w-64" : "w-16"
      } transition-all duration-300 bg-gray-100 dark:bg-neutral-900 border-r border-gray-300 dark:border-neutral-700 h-full flex flex-col`}
    >
      <div className="flex items-center justify-between p-3">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 hover:bg-gray-200 dark:hover:bg-neutral-800 rounded"
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
          onClick={() => newChat()}
          className="px-2 py-1 rounded bg-black text-white dark:bg-white dark:text-black text-sm"
        >
          ➕
          {isOpen && <span className="ml-2">New Chat</span>}
        </button>
      </div>

      {/* Chat List */}
      <div className="px-2 pt-2 pb-2 overflow-y-auto flex-1">
        {isOpen && <div className="text-xs text-gray-500 mb-2 px-1">Chats</div>}
        {chats.map((chat) => (
          <div
            key={chat.id}
            onClick={() => selectChat(chat.id)}
            className={`p-2 mb-2 rounded-md cursor-pointer
              ${chat.id === activeChatId ? "bg-black text-white dark:bg-white dark:text-black" : "bg-white dark:bg-neutral-800"}
              border border-gray-300 dark:border-neutral-700 transition text-sm`}
          >
            {isOpen ? chat.title : "💬"}
          </div>
        ))}
      </div>

      <div className="border-t border-gray-200 dark:border-neutral-700 px-2 pt-2 pb-4">
        {isOpen && <div className="text-xs text-gray-500 mb-2">Indexed PDFs</div>}

        {pdfList.length === 0 && isOpen && (
          <p className="text-gray-500 text-sm px-1">No PDFs indexed</p>
        )}

        {pdfList.map((p) => (
          <div
            key={p.filename}
            className={`flex items-center justify-between p-2 mb-2 rounded-md cursor-pointer
              ${p.filename === activePdf ? "bg-gray-200 dark:bg-neutral-700" : "bg-white dark:bg-neutral-800"}
              border border-gray-300 dark:border-neutral-700`}
            onClick={() => setActivePdf(p.filename)}
          >
            <div className="flex items-center gap-2">
              <div className="text-sm">
                <div className="truncate max-w-[160px]">{p.filename}</div>
                <div className="text-xs text-gray-500">Pages: {p.page_count}</div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                title="Delete PDF & vectors"
                onClick={(e) => {
                  e.stopPropagation();
                  deletePdf(p.filename);
                }}
                className="p-1 rounded hover:bg-red-50 dark:hover:bg-red-900"
              >
                <svg className="w-4 h-4 text-red-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 7h12M10 11v6m4-6v6M9 7l1-3h4l1 3" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
