import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useTypewriter } from "../hooks/useTypewriter";
import { Maximize2, X, Sparkles, Wand2 } from "lucide-react";

export function HeroContent() {
  // Бидний бичсэн typewriter hook-ийг дуудаж байна
  const { displayed, done } = useTypewriter("my name is Tsetsen\ni'm 13 years old", 35, 600);
  const [isZoomed, setIsZoomed] = useState(false);
  const avatarBg = "/src/assets/images/minecraft_girl_full_portrait_1783486996051.jpg";

  return (
    <>
      {/* 3D Minecraft Profile Card / Avatar */}
      <motion.div
        id="minecraft-profile-card"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-4 mb-8"
      >
        <div className="relative group">
          {/* Animated glow ring around avatar */}
          <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 via-emerald-500 to-blue-500 rounded-full blur opacity-40 group-hover:opacity-75 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
          
          <button
            onClick={() => setIsZoomed(true)}
            className="relative w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-2 border-white shadow-lg cursor-pointer transform hover:scale-105 transition-all duration-300 flex items-center justify-center bg-black"
          >
            <img
              src={avatarBg}
              alt="Minecraft Tsetsen Avatar"
              className="w-full h-full object-cover object-top scale-100 hover:scale-110 transition-transform duration-500"
              referrerPolicy="no-referrer"
            />
            {/* Hover overlay icon */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
              <Maximize2 className="w-5 h-5 text-white animate-pulse" />
            </div>
          </button>
        </div>

        <div>
          <div className="flex items-center gap-1.5 bg-[#EAECE9] border border-neutral-200/60 px-2.5 py-1 rounded-full text-xs font-bold text-neutral-800 w-fit">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span>Minecraft Дүр / Character</span>
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
          </div>
          <button
            onClick={() => setIsZoomed(true)}
            className="text-xs text-neutral-500 hover:text-black font-semibold mt-1.5 flex items-center gap-1 cursor-pointer transition-colors"
          >
            Томоор харах (Click to zoom) 🔍
          </button>
        </div>
      </motion.div>

      {/* Анимацтай орж ирэх Толгой гарчиг */}
      <motion.div
        id="headline-container"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl md:text-6xl lg:text-[76px] font-bold tracking-tight text-black leading-[1.08] mb-6 select-none w-full whitespace-pre-wrap">
          {displayed}
          {/* Шивж дуусаагүй үед анивчдаг босоо шугамыг байрлуулна */}
          {!done && (
            <span className="inline-block w-[3px] h-[0.95em] bg-black align-middle ml-[2px] animate-blink" />
          )}
        </h1>
      </motion.div>

      {/* Хоёрдогч Дэд тайлбар (0.1с сааталтайгаар орж ирнэ) */}
      <motion.div
        id="description-container"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <p className="text-lg md:text-xl text-[#4A534A] leading-relaxed font-normal mb-10 max-w-2xl">
          Сайн уу! Намайг <span className="font-bold text-[#1C2E1E]">Цэцэн</span> гэдэг. Би одоо 13 настай. Миний сонирхдог зүйлс болон хоббинуудыг доорх товчлууруудаас сонгон танилцаарай.
        </p>
      </motion.div>

      {/* Lightbox Modal for Minecraft Character */}
      <AnimatePresence>
        {isZoomed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
            onClick={() => setIsZoomed(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative max-w-2xl w-full bg-[#0a0d0a] rounded-3xl border border-white/10 overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Top Bar inside modal */}
              <div className="p-4 border-b border-white/10 flex items-center justify-between text-white bg-black/30">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="font-mono text-xs text-neutral-400 font-bold uppercase tracking-wider">Tsetsen's Minecraft Character</span>
                </div>
                <button
                  onClick={() => setIsZoomed(false)}
                  className="p-1.5 rounded-full hover:bg-white/10 text-neutral-400 hover:text-white transition-all cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Character Image Body - Clear of any overlays */}
              <div className="relative flex-grow bg-black flex justify-center items-center overflow-hidden p-4">
                <img
                  src={avatarBg}
                  alt="Minecraft Character Big"
                  className="max-h-[55vh] md:max-h-[60vh] w-auto max-w-full object-contain rounded-2xl select-none"
                  referrerPolicy="no-referrer"
                />
              </div>
              
              {/* Bottom Info Bar (No longer floating/overlapping) */}
              <div className="bg-neutral-950 border-t border-white/10 p-5 text-white flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h4 className="text-sm font-bold flex items-center gap-1.5 text-pink-400">
                    <span>Цэцэн / Tsetsen</span>
                    <span className="text-xs font-mono text-neutral-400">(Cool Teen Girl Skin)</span>
                  </h4>
                  <p className="text-[11px] text-neutral-300 mt-1">
                    Нүүр царай, бүтэн бие нь тод харагдах миний Minecraft дүр 💖.
                  </p>
                </div>
                <div className="flex items-center gap-1.5 shrink-0 bg-pink-500/15 border border-pink-500/30 px-3.5 py-2 rounded-xl text-xs font-bold text-pink-300">
                  <Wand2 className="w-3.5 h-3.5" />
                  <span>Full 3D Render ✨</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

