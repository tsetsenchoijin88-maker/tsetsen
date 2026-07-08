import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Compass, 
  Sparkles, 
  MessageCircle, 
  Heart, 
  ChevronRight,
  Tv,
  Box,
  Snowflake,
  Music,
  Award
} from "lucide-react";

interface Hobby {
  id: string;
  name: string;
  emoji: string;
  shortDesc: string;
  fullDesc: string;
  level: number; // Interest level 0-100
  levelLabel: string;
  color: string; // Tailwind accent color
  bgGradient: string; // Card background color / subtle gradient
  accentBg: string; // Badges or active pill bg
  icon: React.ReactNode;
}

export function ServicePills() {
  const [activeHobbyId, setActiveHobbyId] = useState<string | null>("oceanography");

  const hobbies: Hobby[] = [
    {
      id: "oceanography",
      name: "Далай судлал",
      emoji: "🌊",
      shortDesc: "Далайн хязгааргүй гүн, усан доорх нууцлаг амьтад",
      fullDesc: "Далайн гүн дэх нууцууд, нууцлагдмал амьтад болон экосистемийг судлах нь надад маш сонирхолтой санагддаг! Миний туйлын мөрөөдөл бол ирээдүйд далай судлалын төв байгуулж, олон олон усны амьтдыг хамгаалж аврах байгаа юм 🐬.",
      level: 100,
      levelLabel: "Ирээдүйн мөрөөдөл",
      color: "text-blue-500",
      bgGradient: "from-blue-500/10 to-emerald-500/5",
      accentBg: "bg-blue-500/10 text-blue-600 border-blue-500/20",
      icon: <Compass className="w-5 h-5 text-blue-500" />
    },
    {
      id: "lego",
      name: "Lego тоглох",
      emoji: "🧱",
      shortDesc: "Төсөөллийн ертөнцийг өөрийн гараар угсарч бүтээх",
      fullDesc: "Янз бүрийн Lego-нуудыг угсарч, өөрийнхөө төсөөллөөр шинэ ертөнцийг бүтээх маш дуртай. Анхаарлаа төвлөрүүлж, бүтээлч байдлыг маань хөгжүүлдэг болохоор үнэхээр гоё хобби 🧱! Далайн амьтдыг Lego-гоор угсрах бүр ч дуртай.",
      level: 95,
      levelLabel: "Бүтээлч сэтгэлгээ",
      color: "text-amber-500",
      bgGradient: "from-amber-500/10 to-yellow-500/5",
      accentBg: "bg-amber-500/10 text-amber-600 border-amber-500/20",
      icon: <Box className="w-5 h-5 text-amber-500" />
    },
    {
      id: "music",
      name: "Lil Peep сонсох",
      emoji: "🎵",
      shortDesc: "Гүн мэдрэмж төрүүлэгч аялгуу, дуунуудын цуглуулга",
      fullDesc: "Lil Peep бол миний хамгийн дуртай дуучин. Түүний дуунуудын өвөрмөц хэмнэл, өнгө аяс нь надад гүн төрөгдөл өгч, сонсох бүрд тайвшралыг мэдрүүлдэг. Ганцаараа суухдаа түүний дууг сонсоод Lego угсрах дуртай 🥀.",
      level: 90,
      levelLabel: "Зүрх сэтгэлийн аялгуу",
      color: "text-pink-500",
      bgGradient: "from-pink-500/10 to-purple-500/5",
      accentBg: "bg-pink-500/10 text-pink-600 border-pink-500/20",
      icon: <Music className="w-5 h-5 text-pink-500" />
    },
    {
      id: "volleyball",
      name: "Гар бөмбөг",
      emoji: "🏐",
      shortDesc: "Багийн тоглолт, эрч хүчтэй хөдөлгөөнүүд",
      fullDesc: "Гар бөмбөг (Volleyball) тоглох нь багийн хамтын ажиллагааг сайжруулж, эрч хүч өгдөг миний хамгийн дуртай спорт! Найзуудтайгаа хамт тоглох, бөмбөг давуулах хамгийн гоё байдаг 🏐.",
      level: 85,
      levelLabel: "Багийн хамтын ажиллагаа",
      color: "text-orange-500",
      bgGradient: "from-orange-500/10 to-red-500/5",
      accentBg: "bg-orange-500/10 text-orange-600 border-orange-500/20",
      icon: <Award className="w-5 h-5 text-orange-500" />
    },
    {
      id: "skiing",
      name: "Цанаар гулгах",
      emoji: "⛷️",
      shortDesc: "Өвлийн хүйтэнд салхи сөрөн хурдлах мэдрэмж",
      fullDesc: "Өвлийн улиралд хамгийн гоё нь! Цасан талбай дээгүүр цанаар салхи сөрөн хурдтай гулгах бол миний хамгийн дуртай хоббинуудын нэг ⛷️. Байгалийн гоо үзэсгэлэнг мэдрэх гайхалтай арга шүү.",
      level: 80,
      levelLabel: "Адал явдал хайгч",
      color: "text-cyan-500",
      bgGradient: "from-cyan-500/10 to-blue-500/5",
      accentBg: "bg-cyan-500/10 text-cyan-600 border-cyan-500/20",
      icon: <Snowflake className="w-5 h-5 text-cyan-500" />
    }
  ];

  const handleTalkWithAI = (hobbyName: string) => {
    const event = new CustomEvent("chat-with-hobby", {
      detail: { hobby: hobbyName }
    });
    window.dispatchEvent(event);
  };

  const selectedHobby = hobbies.find(h => h.id === activeHobbyId);

  return (
    <div id="service-section" className="max-w-xl font-sans text-neutral-900 mt-10">
      
      {/* section Header */}
      <div className="mb-6">
        <span className="text-[11px] font-bold tracking-widest text-[#4D6D47] uppercase bg-[#EAECE9] px-2.5 py-1 rounded-full border border-neutral-200/50">
          🌱 СОНИРХОЛ / Hobbies
        </span>
        <h3 className="text-2xl font-black tracking-tight mt-2.5 text-black flex items-center gap-1.5">
          Миний хобби, сонирхол
          <Sparkles className="w-5 h-5 text-emerald-600 animate-pulse" />
        </h3>
        <p className="text-xs text-neutral-500 mt-1">
          Товчлуурууд дээр дарж дэлгэрэнгүйг уншина уу. AI ихэртэй ярилцах боломжтой 💬.
        </p>
      </div>

      {/* Pills of Hobbies */}
      <div className="flex flex-wrap gap-2.5 mb-5">
        {hobbies.map((hobby) => {
          const isActive = hobby.id === activeHobbyId;
          return (
            <motion.button
              key={hobby.id}
              onClick={() => setActiveHobbyId(hobby.id)}
              whileHover={{ y: -1.5, scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className={`text-xs font-bold px-4 py-2.5 rounded-full border transition-all flex items-center gap-2 cursor-pointer ${
                isActive
                  ? "bg-[#1C2E1E] text-white border-[#1C2E1E] shadow-sm"
                  : "bg-neutral-50 hover:bg-neutral-100 text-neutral-700 border-neutral-200"
              }`}
            >
              <span className="text-sm select-none">{hobby.emoji}</span>
              <span>{hobby.name}</span>
            </motion.button>
          );
        })}
      </div>

      {/* Dynamic Detail Panel */}
      <AnimatePresence mode="wait">
        {selectedHobby && (
          <motion.div
            key={selectedHobby.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="bg-white border border-[#EAECE9] rounded-3xl p-5 shadow-xs relative overflow-hidden"
          >
            {/* Ambient subtle glow background */}
            <div className={`absolute -right-16 -top-16 w-32 h-32 bg-gradient-to-b ${selectedHobby.bgGradient} rounded-full blur-2xl opacity-60 -z-10`} />

            {/* Header detail */}
            <div className="flex flex-wrap items-center justify-between gap-2.5 mb-4 pb-3 border-b border-neutral-100">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{selectedHobby.emoji}</span>
                <div>
                  <h4 className="font-bold text-base text-neutral-900">{selectedHobby.name}</h4>
                  <span className={`inline-block text-[9px] font-bold uppercase tracking-widest border px-1.5 py-0.5 rounded-md mt-0.5 ${selectedHobby.accentBg}`}>
                    {selectedHobby.levelLabel}
                  </span>
                </div>
              </div>

              {/* Interest meter */}
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-neutral-400 font-mono font-bold">СОНИРХОЛ:</span>
                <div className="w-16 h-2 bg-neutral-100 rounded-full overflow-hidden relative border border-neutral-200/50">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${selectedHobby.level}%` }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                    className="absolute top-0 left-0 bottom-0 bg-[#1C2E1E] rounded-full"
                  />
                </div>
                <span className="text-[10px] font-black text-neutral-800 font-mono">{selectedHobby.level}%</span>
              </div>
            </div>

            {/* Content text */}
            <p className="text-sm text-neutral-700 leading-relaxed font-normal mb-5 whitespace-pre-wrap">
              {selectedHobby.fullDesc}
            </p>

            {/* Action panel inside card */}
            <div className="flex items-center justify-between gap-3 bg-[#FAFBF9] border border-neutral-100 rounded-2xl p-3.5">
              <span className="text-xs text-neutral-500 font-medium">
                Цэцэнтэй хамт энэ сонирхлоор ярилцах уу?
              </span>
              <button
                onClick={() => handleTalkWithAI(selectedHobby.name)}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-[#1C2E1E] hover:bg-neutral-800 active:scale-95 transition-all py-2 px-3.5 rounded-xl cursor-pointer shadow-sm shrink-0"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Ярилцах</span>
                <ChevronRight className="w-3 h-3" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
