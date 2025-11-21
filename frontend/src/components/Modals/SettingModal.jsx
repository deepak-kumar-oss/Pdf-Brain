import React, { useState } from "react";

const SettingsModal = ({ closeSettings, toggleTheme, currentTheme }) => {
  const [apiKey, setApiKey] = useState("");

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">

      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-80 shadow-lg animate-fadeIn">

        <h2 className="text-xl font-semibold mb-4 dark:text-white">
          Settings
        </h2>

        {/* API KEY */}
        <div className="mb-4">
          <label className="block mb-1 text-sm dark:text-gray-300">API Key</label>
          
          <input
            type="password"
            className="w-full px-3 py-2 rounded-md border dark:border-gray-700 dark:bg-gray-700 dark:text-white"
            placeholder="Enter API key"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
          />
        </div>

        {/* THEME SWITCH */}
        <div className="flex items-center justify-between mb-4">
          <span className="dark:text-gray-300">Theme</span>
          
          <button
            onClick={toggleTheme}
            className="px-3 py-1 rounded bg-gray-200 dark:bg-gray-600 dark:text-white"
          >
            {currentTheme === "light" ? "Dark Mode" : "Light Mode"}
          </button>
        </div>

        {/* CLOSE */}
        <button
          onClick={closeSettings}
          className="w-full mt-2 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Close
        </button>

      </div>
    </div>
  );
};

export default SettingsModal;
