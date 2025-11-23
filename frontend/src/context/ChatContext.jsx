import { createContext, useState, useEffect } from "react";

export const ChatContext = createContext();

const STORAGE_KEY = "pdfbrian_messages_v1"; 
const ACTIVE_PDF_KEY = "pdfbrian_active_pdf_v1";
const CHATS_KEY = "pdfbrian_chats_v1";

const makeId = () => `${Date.now()}_${Math.floor(Math.random()*10000)}`;

export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [pdfList, setPdfList] = useState([]);
  const [activePdf, setActivePdf] = useState(localStorage.getItem(ACTIVE_PDF_KEY) || "");
  const [chats, setChats] = useState(() => {
    const raw = localStorage.getItem(CHATS_KEY);
    return raw ? JSON.parse(raw) : [{ id: "default", title: "Chat 1" }];
  });
  const [activeChatId, setActiveChatId] = useState(chats[0]?.id || "default");

 
  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    let store = raw ? JSON.parse(raw) : {};
    const chatMsgs = store[activeChatId] || [];
    setMessages(chatMsgs);
  }, [activeChatId]);


  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    let store = raw ? JSON.parse(raw) : {};
    store[activeChatId] = messages;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
  }, [messages, activeChatId]);


  useEffect(() => {
    localStorage.setItem(CHATS_KEY, JSON.stringify(chats));
  }, [chats]);

  useEffect(() => {
    localStorage.setItem(ACTIVE_PDF_KEY, activePdf || "");
  }, [activePdf]);

  const loadPdfList = async () => {
    try {
      const res = await fetch("http://localhost:8000/list-pdfs");
      const data = await res.json();
      setPdfList(data.pdfs || []);
    } catch (err) {
      console.error("Failed to load PDFs:", err);
      setPdfList([]);
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

    try {
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
        { id: makeId(), sender: "user", text: `Uploaded PDF: ${file.name}`, timestamp: Date.now() },
        {
          id: makeId(),
          sender: "bot",
          text: `📄 PDF "${file.name}" indexed successfully.\nYou can now select it and ask questions.`,
          timestamp: Date.now()
        },
      ]);

      await loadPdfList();
    } catch (err) {
      console.error("Upload error:", err);
      alert("Upload failed: " + err.message);
    }
  };

  const deletePdf = async (pdfName) => {
    if (!confirm(`Delete PDF '${pdfName}'? This will remove its vectors.`)) return;

    try {
      const res = await fetch(`http://localhost:8000/delete-pdf/${encodeURIComponent(pdfName)}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.error) {
        alert(data.error);
        return;
      }


      await loadPdfList();

    
      setMessages((prev) => prev.filter(m => !(m.text && m.text.includes(`Uploaded PDF: ${pdfName}`))));

      alert(data.message || "Deleted");
    } catch (err) {
      console.error("Delete error:", err);
      alert("Delete failed: " + err.message);
    }
  };

  
  const sendMessage = async ({ text, file }) => {
    const apiKey = localStorage.getItem("api_key");
    if (!apiKey) return alert("Add API key in settings");

    if (file) {
      return await uploadPdf(file);
    }

    
    const userMsg = { id: makeId(), sender: "user", text, timestamp: Date.now() };
    const botId = makeId();
    const botPlaceholder = { id: botId, sender: "bot", text: "", timestamp: Date.now() };

   
    setMessages(prev => [...prev, userMsg, botPlaceholder]);

    const formData = new FormData();
    formData.append("question", text);
    formData.append("api_key", apiKey);
    formData.append("pdf_name", activePdf || "");

    try {
      const response = await fetch("http://localhost:8000/ask-stream", {
        method: "POST",
        body: formData,
      });

     
      if (!response.body) {
        const data = await response.text();
        setMessages(prev => prev.map(m => m.id === botId ? { ...m, text: data } : m));
        return;
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let fullText = "";

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        fullText += chunk;

       
        setMessages(prev => prev.map(m => (m.id === botId ? { ...m, text: fullText } : m)));
      }
    } catch (err) {
      console.error("Ask error:", err);
      setMessages(prev => prev.map(m => (m.id === botId ? { ...m, text: `Error: ${err.message}` } : m)));
    }
  };

  const newChat = (title) => {
    const id = makeId();
    const t = title || `Chat ${chats.length + 1}`;
    const newChats = [{ id, title: t }, ...chats];
    setChats(newChats);
    setActiveChatId(id);
    
    setMessages([]);
  };

  const selectChat = (id) => {
    setActiveChatId(id);
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
        uploadPdf,
        deletePdf,
        chats,
        newChat,
        activeChatId,
        selectChat,
        setMessages,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
