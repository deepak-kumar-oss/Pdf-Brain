import { createContext, useState, useEffect } from "react";

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [pdfList, setPdfList] = useState([]);
  const [activePdf, setActivePdf] = useState(""); 

  const loadPdfList = async () => {
    try {
      const res = await fetch("http://localhost:8000/list-pdfs");
      const data = await res.json();
      setPdfList(data.pdfs);
    } catch (err) {
      console.error("Failed to load PDFs:", err);
    }
  };

  useEffect(() => {
    loadPdfList();
  }, []);


  const uploadPdf = async (file) => {
    const apiKey = localStorage.getItem("api_key");
    if (!apiKey) return alert("Add API key in settings");

    const form = new FormData();
    form.append("file", file);
    form.append("api_key", apiKey);

    const res = await fetch("http://localhost:8000/upload-pdf", {
      method: "POST",
      body: form,
    });

    const data = await res.json();

    if (data.error) {
      return alert(data.error);
    }

   
    setMessages((prev) => [
      ...prev,
      { sender: "user", text: `Uploaded PDF: ${file.name}` },
      {
        sender: "bot",
        text: `📄 PDF "${file.name}" indexed successfully.\nYou can now select it and ask questions.`,
      },
    ]);

   
    loadPdfList();
  };


  const sendMessage = async ({ text, file }) => {
    const apiKey = localStorage.getItem("api_key");
    if (!apiKey) return alert("Add API key in settings");

    
    if (file) return await uploadPdf(file);

   
    const userMsg = { sender: "user", text };
    const botMsgIndex = messages.length + 1;

    setMessages((prev) => [...prev, userMsg, { sender: "bot", text: "" }]);

   
    const formData = new FormData();
    formData.append("question", text);
    formData.append("api_key", apiKey);
    formData.append("pdf_name", activePdf); 

    const response = await fetch("http://localhost:8000/ask-stream", {
      method: "POST",
      body: formData,
    });

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let fullText = "";

    while (true) {
      const { value, done } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value, { stream: true });
      fullText += chunk;

      setMessages((prev) => {
        const updated = [...prev];
        updated[botMsgIndex] = { sender: "bot", text: fullText };
        return updated;
      });
    }
  };

  return (
    <ChatContext.Provider
      value={{
        messages,
        sendMessage,
        pdfList,
        activePdf,
        setActivePdf,
        loadPdfList,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
