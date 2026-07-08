import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  MessageSquare, 
  X, 
  Send, 
  Sparkles, 
  CornerDownLeft, 
  VolumeX, 
  Volume2,
  HelpCircle
} from "lucide-react";

interface Message {
  id: string;
  sender: "user" | "bot";
  text: string;
  timestamp: Date;
}

const PRESET_QUESTIONS = [
  "Далай судлал болон мөрөөдлийн чинь талаар? 🌊",
  "Ямар хөгжимд дуртай вэ? 🎵",
  "Lego-гоор юу хийх дуртай вэ? 🧱",
  "Чи ямар зантай хүн бэ? 🤍",
];

export function AIChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      sender: "bot",
      text: "Сайн уу... mmm. Намайг Цэцэний AI хувилбар гэдэг. Надаас Цэцэний сонирхол, мөрөөдөл, хобби эсвэл өөр сонирхсон зүйлийнх нь талаар асуугаарай... aanhan.",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [unreadCount, setUnreadCount] = useState(1); // Эхний мэссэж уншаагүй

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Сүүл рүү автоматаар гүйлгэх
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isLoading]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setUnreadCount(0);
    }
  };

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || isLoading) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: textToSend.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    setIsLoading(true);

    try {
      // Илгээх түүхийг бэлтгэх (Gemini API-д зориулж сүүлийн 10 мэссэжийг илгээнэ)
      const chatHistory = [...messages, userMsg].map((msg) => ({
        sender: msg.sender,
        text: msg.text,
      })).slice(-10); // Хэт урт түүх явуулахаас сэргийлнэ

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages: chatHistory }),
      });

      if (!response.ok) {
        throw new Error("Сүлжээний алдаа гарлаа.");
      }

      const data = await response.json();
      
      const botMsg: Message = {
        id: `bot-${Date.now()}`,
        sender: "bot",
        text: data.text || "Уучлаарай... mmm, хариулт авч чадсангүй... thh.",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (error) {
      console.error("AI Chat Error:", error);
      const errorMsg: Message = {
        id: `err-${Date.now()}`,
        sender: "bot",
        text: "Уучлаарай... mmm, холболтонд түр зуурын алдаа гарлаа... thh. Дараа дахин оролдоорой.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessageRef = useRef(handleSendMessage);
  useEffect(() => {
    handleSendMessageRef.current = handleSendMessage;
  });

  useEffect(() => {
    const handleOpenWithHobby = (e: Event) => {
      const customEvent = e as CustomEvent<{ hobby: string }>;
      if (customEvent.detail && customEvent.detail.hobby) {
        setIsOpen(true);
        setUnreadCount(0);
        handleSendMessageRef.current(`Цэцэн ээ, чиний "${customEvent.detail.hobby}" сонирхол үнэхээр сонирхолтой юмаа. Энэ талаар надад илүү ихийг ярьж өгөөч... mmm`);
      }
    };
    window.addEventListener("chat-with-hobby", handleOpenWithHobby as EventListener);
    return () => {
      window.removeEventListener("chat-with-hobby", handleOpenWithHobby as EventListener);
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage(inputValue);
  };

  return (
    <div className="fixed bottom-6 left-6 z-[9999] font-sans">
      <AnimatePresence>
        {/* ХӨВӨГЧ ЧАТНЫ ХАЙРЦАГ */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="w-[330px] sm:w-[380px] h-[500px] rounded-3xl bg-white text-neutral-900 border border-[#EAECE9] shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Толгойн хэсэг */}
            <div className="bg-[#1C2E1E] text-white px-5 py-4 flex items-center justify-between select-none">
              <div className="flex items-center gap-2.5">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-emerald-900 border border-emerald-800/50 flex items-center justify-center font-bold text-white text-lg">
                    🌊
                  </div>
                  {/* Онлайн статус */}
                  <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-400 border-2 border-[#1C2E1E]" />
                </div>
                <div>
                  <h3 className="font-bold text-sm tracking-tight flex items-center gap-1.5">
                    Цэцэний AI Ихэр
                    <Sparkles className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                  </h3>
                  <p className="text-[10px] text-emerald-300/80 font-medium">
                    "mmm, thh... туслах уу?"
                  </p>
                </div>
              </div>
              <button
                onClick={toggleChat}
                className="p-1.5 hover:bg-white/10 rounded-full transition-colors cursor-pointer text-white/80 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Мэссэжүүдийн хэсэг */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-[#FAFBF9]">
              {messages.map((msg) => {
                const isUser = msg.sender === "user";
                return (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10, x: isUser ? 10 : -10 }}
                    animate={{ opacity: 1, y: 0, x: 0 }}
                    className={`flex ${isUser ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                        isUser
                          ? "bg-[#1C2E1E] text-white rounded-tr-none shadow-xs"
                          : "bg-white text-neutral-800 border border-[#EAECE9] rounded-tl-none shadow-2xs"
                      }`}
                    >
                      <p className="whitespace-pre-wrap">{msg.text}</p>
                      <span
                        className={`block text-[9px] mt-1 text-right ${
                          isUser ? "text-emerald-300/60" : "text-neutral-400"
                        }`}
                      >
                        {msg.timestamp.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                  </motion.div>
                );
              })}

              {/* Уншиж буй анимаци */}
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="bg-white border border-[#EAECE9] rounded-2xl rounded-tl-none px-4 py-3 shadow-2xs text-xs text-neutral-500 flex items-center gap-2">
                    <span>Цэцэн бодож байна... mmm</span>
                    <span className="flex gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-700 animate-bounce [animation-delay:-0.3s]" />
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-700 animate-bounce [animation-delay:-0.15s]" />
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-700 animate-bounce" />
                    </span>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Түргэн асуултууд (Preset Questions) */}
            <div className="px-4 py-2.5 border-t border-[#EAECE9] bg-white flex flex-wrap gap-1.5 select-none">
              {PRESET_QUESTIONS.map((question) => (
                <button
                  key={question}
                  onClick={() => handleSendMessage(question)}
                  disabled={isLoading}
                  className="text-[11px] text-neutral-600 bg-[#F1F3F1] hover:bg-[#EAECE9] disabled:opacity-50 transition-colors py-1 px-2.5 rounded-full cursor-pointer max-w-full truncate font-medium border border-[#EAECE9]/40"
                >
                  {question}
                </button>
              ))}
            </div>

            {/* Оруулах хэсэг */}
            <form
              onSubmit={handleSubmit}
              className="p-3 bg-white border-t border-[#EAECE9] flex items-center gap-2"
            >
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Мэссэж бичих... mmm"
                disabled={isLoading}
                className="flex-1 bg-[#FAFBF9] border border-[#EAECE9] rounded-xl px-3.5 py-2 text-sm focus:outline-none focus:border-[#1C2E1E] transition-colors disabled:opacity-60"
              />
              <button
                type="submit"
                disabled={!inputValue.trim() || isLoading}
                className="p-2.5 bg-[#1C2E1E] text-white rounded-xl hover:bg-neutral-900 disabled:opacity-40 transition-all flex items-center justify-center shrink-0 cursor-pointer shadow-sm active:scale-95"
                title="Илгээх"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* НЭЭХ/ХААХ ТОВЧ */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={toggleChat}
        className="flex items-center justify-center w-14 h-14 rounded-full bg-[#1C2E1E] text-white shadow-xl cursor-pointer relative group"
        title="Цэцэний AI Ихэртэй чатлах"
      >
        <MessageSquare className="w-6 h-6 text-white" />
        
        {/* Уншаагүй мэссэжний тэмдэглэгээ */}
        {!isOpen && unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-[10px] font-bold text-white border-2 border-[#1C2E1E]">
            {unreadCount}
          </span>
        )}
      </motion.button>
    </div>
  );
}
