import React, { useState } from "react";
import { motion } from "motion/react";
import { Play, Heart, Star, Disc, Quote, ExternalLink, Sparkles } from "lucide-react";

interface PeepSong {
  id: string;
  title: string;
  emoji: string;
  year: string;
}

export function LilPeepTribute() {
  const [copiedQuote, setCopiedQuote] = useState(false);
  const [isLoved, setIsLoved] = useState(true);

  const songs: PeepSong[] = [
    { id: "star-shopping", title: "Star Shopping", emoji: "⭐", year: "2015" },
    { id: "falling-down", title: "Falling Down", emoji: "💔", year: "2018" },
    { id: "save-that-shit", title: "Save That Shit", emoji: "🥀", year: "2017" },
    { id: "spotlight", title: "Spotlight", emoji: "⚡", year: "2018" },
  ];

  const quotes = [
    "Look at the sky tonight, all of the stars have a reason.",
    "I want people to hear what I have to say, and I want to help as many people as I can.",
    "Music makes me feel like I'm not alone.",
    "I have a feeling that's not gonna last that long, but that's okay.",
  ];

  const [currentQuoteIdx, setCurrentQuoteIdx] = useState(0);

  const playSong = (id: string) => {
    const event = new CustomEvent("trigger-play-music", {
      detail: { trackId: id }
    });
    window.dispatchEvent(event);
  };

  const nextQuote = () => {
    setCurrentQuoteIdx((prev) => (prev + 1) % quotes.length);
  };

  return (
    <motion.section
      id="lil-peep-tribute"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="w-full mt-16 max-w-xl bg-black rounded-3xl border border-white/10 text-white overflow-hidden shadow-2xl relative font-sans"
    >
      {/* Pink & Purple neon abstract glow background */}
      <div className="absolute top-0 right-0 w-44 h-44 bg-pink-500/20 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-44 h-44 bg-purple-600/15 rounded-full blur-3xl -z-10" />

      {/* Main Container */}
      <div className="p-6 sm:p-8">
        
        {/* Header with Title & Status */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Star className="w-5 h-5 text-pink-400 fill-current animate-pulse" />
            <span className="text-xs uppercase tracking-widest text-pink-400 font-bold flex items-center gap-1">
              Миний Шүтээн / My Idol <Sparkles className="w-3.5 h-3.5" />
            </span>
          </div>
          <button 
            onClick={() => setIsLoved(!isLoved)}
            className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-pink-400 hover:text-pink-500 transition-colors cursor-pointer"
          >
            <Heart className={`w-5 h-5 ${isLoved ? "fill-current" : ""}`} />
          </button>
        </div>

        {/* Profile Card Style */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 pb-6 border-b border-white/10">
          <div className="relative">
            {/* Custom abstract CD/Vinyl visual for Lil Peep profile */}
            <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-pink-500 via-purple-600 to-indigo-700 flex items-center justify-center text-3xl shadow-lg shadow-pink-500/10">
              💔
            </div>
            {/* Small glowing star badge */}
            <span className="absolute -bottom-1 -right-1 bg-black text-pink-400 rounded-full p-1 border border-white/20">
              <Star className="w-3.5 h-3.5 fill-current" />
            </span>
          </div>

          <div>
            <h3 className="text-2xl font-bold tracking-tight">Lil Peep</h3>
            <p className="text-xs text-neutral-400 font-mono mt-0.5">Gustav Elijah Åhr (1996 - 2017)</p>
            <p className="text-sm text-pink-300/90 font-medium mt-1.5 flex items-center gap-1.5">
              <span>Emo Rap &amp; Alternative Rock Pioneer</span>
            </p>
          </div>
        </div>

        {/* Tsetsen's feelings about Lil Peep */}
        <div className="mt-6">
          <p className="text-sm text-neutral-300 leading-relaxed italic bg-white/5 border border-white/10 rounded-2xl p-4 relative">
            <span className="absolute -top-3 left-4 bg-black px-2 text-xs text-neutral-400 font-semibold">
              Цэцэний бодол
            </span>
            "Lil Peep бол миний хамгийн дуртай дуучин... mmm. Түүний дуунуудын өвөрмөц хэмнэл, өнгө аяс нь надад гүн төрөгдөл өгч, сонсох бүрд тайвшралыг мэдрүүлдэг. Ганцаараа баймаар санагдсан үед дууг нь тавиад суухаар би ганцаараа биш юм шиг санагддаг даа... thh."
          </p>
        </div>

        {/* Famous Quote interactive block */}
        <div className="mt-6 bg-[#0B0D0E]/80 border border-white/5 rounded-2xl p-5">
          <div className="flex items-center justify-between text-xs text-neutral-400 font-bold mb-2">
            <span className="flex items-center gap-1 text-pink-400/90">
              <Quote className="w-3.5 h-3.5" /> ОНЦЛОХ ИШЛЭЛ
            </span>
            <button 
              onClick={nextQuote}
              className="hover:text-white transition-colors cursor-pointer text-[10px] underline decoration-pink-500/50"
            >
              Дараагийнх &rarr;
            </button>
          </div>
          <p className="text-base font-medium leading-relaxed italic text-white min-h-[50px] flex items-center select-none">
            "{quotes[currentQuoteIdx]}"
          </p>
        </div>

        {/* Interactive Top Songs */}
        <div className="mt-8">
          <h4 className="text-xs uppercase tracking-wider text-neutral-400 font-bold mb-3 flex items-center gap-1.5">
            <Disc className="w-3.5 h-3.5 text-pink-400" /> ДУУНУУД (ДАРЖ ТОГЛУУЛНА УУ)
          </h4>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {songs.map((song) => (
              <button
                key={song.id}
                onClick={() => playSong(song.id)}
                className="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-pink-500/10 border border-white/10 hover:border-pink-500/30 text-left transition-all group cursor-pointer"
              >
                <div className="flex items-center gap-2.5 truncate">
                  <span className="text-lg">{song.emoji}</span>
                  <div className="truncate">
                    <p className="text-xs font-bold text-white group-hover:text-pink-400 transition-colors truncate">
                      {song.title}
                    </p>
                    <p className="text-[10px] text-neutral-400 font-mono">{song.year}</p>
                  </div>
                </div>
                <div className="w-8 h-8 rounded-full bg-white/10 group-hover:bg-pink-500 flex items-center justify-center text-white transition-all shrink-0">
                  <Play className="w-3.5 h-3.5 fill-current text-white" />
                </div>
              </button>
            ))}
          </div>
        </div>

      </div>
    </motion.section>
  );
}
