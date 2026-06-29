import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Play, 
  Pause, 
  SkipForward, 
  SkipBack, 
  Volume2, 
  VolumeX, 
  Music, 
  Plus, 
  ChevronDown, 
  ChevronUp, 
  Disc, 
  ListMusic, 
  Trash2,
  Sparkles
} from "lucide-react";

interface Track {
  id: string;
  title: string;
  artist: string;
  url: string;
  coverColor: string; // Арын фон болгон ашиглах градиент өнгө
  emoji: string;
}

const INITIAL_TRACKS: Track[] = [
  {
    id: "star-shopping",
    title: "Star Shopping",
    artist: "Lil Peep",
    url: "https://archive.org/download/lil-peep-star-shopping_202111/Lil%20Peep%20-%20Star%20Shopping.mp3",
    coverColor: "from-purple-900 via-indigo-950 to-neutral-950",
    emoji: "⭐"
  },
  {
    id: "falling-down",
    title: "Falling Down",
    artist: "Lil Peep & XXXTENTACION",
    url: "https://archive.org/download/lil-peep-xxxtentacion-falling-down/Lil%20Peep%20%26%20XXXTENTACION%20-%20Falling%20Down.mp3",
    coverColor: "from-pink-800 via-purple-950 to-neutral-950",
    emoji: "💔"
  },
  {
    id: "save-that-shit",
    title: "Save That Shit",
    artist: "Lil Peep",
    url: "https://archive.org/download/lil-peep-save-that-shit/Lil%20Peep%20-%20Save%20That%20Shit.mp3",
    coverColor: "from-rose-900 via-pink-950 to-neutral-950",
    emoji: "🥀"
  },
  {
    id: "spotlight",
    title: "Spotlight",
    artist: "Lil Peep & Marshmello",
    url: "https://archive.org/download/lil-peep-spotlight/Lil%20Peep%20-%20Spotlight.mp3",
    coverColor: "from-violet-800 via-fuchsia-950 to-neutral-950",
    emoji: "⚡"
  },
  {
    id: "lofi-rain",
    title: "Midnight Chill (Lofi)",
    artist: "Background Beats",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    coverColor: "from-teal-900 via-slate-900 to-neutral-950",
    emoji: "🌧️"
  }
];

export function AudioPlayer() {
  const [tracks, setTracks] = useState<Track[]>(INITIAL_TRACKS);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isOpen, setIsOpen] = useState(true); // Тоглуулагч дэлгэрэнгүй нээлттэй эсэх
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showPlaylist, setShowPlaylist] = useState(false);
  
  // Шинэ дуу нэмэх формны төлөвүүд
  const [customTitle, setCustomTitle] = useState("");
  const [customUrl, setCustomUrl] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const currentTrack = tracks[currentTrackIndex];

  // Гаднаас (Navbar гэх мэт) дуу тоглуулах дохиог хүлээн авах сонсогч
  useEffect(() => {
    const handleTriggerPlay = (e: Event) => {
      const customEvent = e as CustomEvent<{ trackId?: string }>;
      if (customEvent.detail && customEvent.detail.trackId) {
        const foundIndex = tracks.findIndex((t) => t.id === customEvent.detail?.trackId);
        if (foundIndex !== -1) {
          setCurrentTrackIndex(foundIndex);
        }
      }
      setIsOpen(true);
      setIsPlaying(true);
    };
    window.addEventListener("trigger-play-music", handleTriggerPlay as EventListener);
    return () => {
      window.removeEventListener("trigger-play-music", handleTriggerPlay as EventListener);
    };
  }, [tracks]);

  // Дуу ачаалах ба тоглуулах логик
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = currentTrack.url;
      audioRef.current.load();
      if (isPlaying) {
        audioRef.current.play().catch((err) => {
          console.warn("Дуу тоглуулахад алдаа гарлаа (хөтчийн хамгаалалт):", err);
          setIsPlaying(false);
        });
      }
    }
  }, [currentTrackIndex]);

  // Тоглуулах эсвэл зогсоох төлөв өөрчлөгдөх үед
  useEffect(() => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.play().catch((err) => {
        console.warn("Тоглож чадсангүй:", err);
        setIsPlaying(false);
      });
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  // Дууны чанга сул өөрчлөгдөх үед
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  // Цаг шинэчлэх, дуу дуусах үед дараагийн дуу руу шилжих
  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleTrackEnded = () => {
    handleNext();
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    setCurrentTrackIndex((prevIndex) => (prevIndex + 1) % tracks.length);
    setIsPlaying(true);
  };

  const handlePrev = () => {
    setCurrentTrackIndex((prevIndex) => (prevIndex - 1 + tracks.length) % tracks.length);
    setIsPlaying(true);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    setCurrentTime(time);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  // Шинэ дуу хэрэглэгчээс нэмэх
  const handleAddTrack = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!customTitle.trim()) {
      setErrorMessage("Дууны нэрийг оруулна уу.");
      return;
    }

    if (!customUrl.trim()) {
      setErrorMessage("Дууны холбоосыг (MP3 URL) оруулна уу.");
      return;
    }

    // Энгийн URL формат шалгалт
    if (!customUrl.startsWith("http://") && !customUrl.startsWith("https://")) {
      setErrorMessage("Зөв холбоос (http:// эсвэл https://-ээр эхэлсэн) оруулна уу.");
      return;
    }

    const newTrack: Track = {
      id: `custom-${Date.now()}`,
      title: customTitle.trim(),
      artist: "Миний дуу",
      url: customUrl.trim(),
      coverColor: "from-neutral-800 via-neutral-900 to-black",
      emoji: "🎵"
    };

    const updatedTracks = [...tracks, newTrack];
    setTracks(updatedTracks);
    setCurrentTrackIndex(updatedTracks.length - 1);
    setIsPlaying(true);

    // Төлөвийг цэвэрлэх
    setCustomTitle("");
    setCustomUrl("");
    setShowAddForm(false);
  };

  // Дуу устгах (Урьдчилан бэлдсэнээс бусад хэрэглэгчийн нэмсэн дуунуудыг устгах боломжтой)
  const handleDeleteTrack = (id: string, index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (tracks.length <= 1) return; // Хамгийн сүүлийн дууг устгахгүй
    
    const updatedTracks = tracks.filter((t) => t.id !== id);
    setTracks(updatedTracks);
    
    if (currentTrackIndex === index) {
      // Хэрэв одоо тоглож буй дууг устгавал өмнөх эсвэл эхний дуу руу шилжинэ
      const nextIndex = index >= updatedTracks.length ? updatedTracks.length - 1 : index;
      setCurrentTrackIndex(nextIndex);
    } else if (currentTrackIndex > index) {
      setCurrentTrackIndex(currentTrackIndex - 1);
    }
  };

  // Хугацааг минут:секунд формат руу хөрвүүлэх
  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div className="fixed bottom-6 right-6 z-[9999] font-sans">
      {/* HTML5 Audio объект */}
      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleTrackEnded}
      />

      {/* 1. ХУМИГДСАН ТӨЛӨВ - Зөөлөн эргэлддэг хөвөгч товчлуур */}
      <AnimatePresence mode="wait">
        {!isOpen && (
          <motion.button
            key="collapsed-button"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className="flex items-center justify-center w-14 h-14 rounded-full bg-black hover:bg-neutral-900 text-white shadow-xl cursor-pointer relative overflow-hidden group"
          >
            {/* Арын ягаан неон гэрэлтүүлэг - Lil Peep Vibe */}
            <div className="absolute inset-0 bg-gradient-to-tr from-pink-500 via-purple-600 to-indigo-500 opacity-20 group-hover:opacity-40 transition-opacity duration-300" />
            
            {/* Хөгжим тоглож байгаа үед эргэлдэх дүрс */}
            <motion.div
              animate={isPlaying ? { rotate: 360 } : { rotate: 0 }}
              transition={isPlaying ? { repeat: Infinity, duration: 4, ease: "linear" } : { duration: 0.5 }}
              className="relative z-10 flex items-center justify-center"
            >
              {isPlaying ? (
                <Disc className="w-7 h-7 text-pink-400" />
              ) : (
                <Music className="w-6 h-6 text-neutral-200" />
              )}
            </motion.div>

            {/* Хөгжим тоглож байх үеийн хөгжилтэй долгионууд */}
            {isPlaying && (
              <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-pink-500"></span>
              </span>
            )}
          </motion.button>
        )}

        {/* 2. ДЭЛГЭРЭНГҮЙ ТОГЛУУЛАГЧИЙН ХАЙРЦАГ */}
        {isOpen && (
          <motion.div
            key="expanded-player"
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="w-[320px] sm:w-[350px] rounded-3xl bg-black/90 backdrop-blur-xl border border-white/15 text-white shadow-2xl overflow-hidden"
          >
            {/* Тоглуулагчийн толгойн хэсэг болон Хумих товч */}
            <div className="flex items-center justify-between px-5 py-3 border-b border-white/10 bg-white/5">
              <div className="flex items-center gap-1.5">
                <span className="text-pink-400 text-base">🎵</span>
                <span className="text-xs uppercase font-bold tracking-wider text-pink-400/90 flex items-center gap-1">
                  Lil Peep &amp; Vibe <Sparkles className="w-3 h-3 animate-pulse" />
                </span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-white/10 rounded-full transition-colors cursor-pointer text-neutral-400 hover:text-white"
                title="Тоглуулагчийг хумих"
              >
                <ChevronDown className="w-5 h-5" />
              </button>
            </div>

            {/* Одоо тоглож буй дууны Ковер / Градиент хэсэг */}
            <div className={`relative px-6 py-8 bg-gradient-to-b ${currentTrack.coverColor} transition-all duration-500 flex flex-col items-center justify-center overflow-hidden`}>
              {/* Арын неон туяа */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-pink-500/20 rounded-full blur-2xl" />

              {/* Дууны Эможи / Дүрс анимац */}
              <motion.div
                animate={isPlaying ? { scale: [1, 1.05, 1] } : { scale: 1 }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-3xl shadow-lg relative z-10 mb-4 select-none"
              >
                {currentTrack.emoji}
              </motion.div>

              {/* Дууны мэдээлэл */}
              <div className="text-center relative z-10 w-full px-2">
                <h4 className="font-bold text-lg leading-snug truncate drop-shadow-sm select-none">
                  {currentTrack.title}
                </h4>
                <p className="text-xs text-neutral-300 font-medium truncate mt-0.5 select-none">
                  {currentTrack.artist}
                </p>
              </div>

              {/* Хөгжмийн долгионы анимаци (Visualizer) */}
              <div className="flex items-end justify-center gap-1 h-8 mt-5 w-full">
                {[...Array(12)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-1 bg-pink-500 rounded-t-sm"
                    animate={isPlaying ? {
                      height: [
                        "15%", 
                        `${Math.random() * 85 + 15}%`, 
                        `${Math.random() * 85 + 15}%`, 
                        "15%"
                      ]
                    } : { height: "15%" }}
                    transition={{
                      repeat: Infinity,
                      duration: 0.8 + i * 0.05,
                      ease: "easeInOut"
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Тоглуулагчийн Хяналтын Хэсэг */}
            <div className="p-5 space-y-4">
              
              {/* Хугацааны шугам (Progress Bar) */}
              <div className="space-y-1">
                <input
                  type="range"
                  min="0"
                  max={duration || 100}
                  value={currentTime}
                  onChange={handleSeek}
                  className="w-full h-1 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-pink-500 focus:outline-none"
                  style={{
                    background: `linear-gradient(to right, #ec4899 0%, #ec4899 ${
                      duration ? (currentTime / duration) * 100 : 0
                    }%, #262626 ${
                      duration ? (currentTime / duration) * 100 : 0
                    }%, #262626 100%)`
                  }}
                />
                <div className="flex justify-between text-[10px] text-neutral-400 font-mono">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>

              {/* Хөгжмийг Удирдах Товчлуурууд */}
              <div className="flex items-center justify-between">
                {/* Жагсаалт харах товч */}
                <button
                  onClick={() => {
                    setShowPlaylist(!showPlaylist);
                    setShowAddForm(false);
                  }}
                  className={`p-2 rounded-full transition-colors cursor-pointer ${
                    showPlaylist ? "text-pink-400 bg-white/5" : "text-neutral-400 hover:text-white"
                  }`}
                  title="Дууны жагсаалт"
                >
                  <ListMusic className="w-5 h-5" />
                </button>

                <div className="flex items-center gap-4">
                  {/* Өмнөх дуу */}
                  <button
                    onClick={handlePrev}
                    className="p-2 text-neutral-300 hover:text-white transition-colors cursor-pointer"
                    title="Өмнөх"
                  >
                    <SkipBack className="w-5 h-5 fill-current" />
                  </button>

                  {/* Тоглуулах / Зогсоох */}
                  <button
                    onClick={handlePlayPause}
                    className="w-12 h-12 rounded-full bg-white text-black hover:bg-neutral-100 flex items-center justify-center transition-transform hover:scale-105 active:scale-95 cursor-pointer shadow-md"
                    title={isPlaying ? "Зогсоох" : "Тоглуулах"}
                  >
                    {isPlaying ? (
                      <Pause className="w-5 h-5 fill-current" />
                    ) : (
                      <Play className="w-5 h-5 fill-current translate-x-0.5" />
                    )}
                  </button>

                  {/* Дараагийн дуу */}
                  <button
                    onClick={handleNext}
                    className="p-2 text-neutral-300 hover:text-white transition-colors cursor-pointer"
                    title="Дараагийн"
                  >
                    <SkipForward className="w-5 h-5 fill-current" />
                  </button>
                </div>

                {/* Шинэ дуу нэмэх товч */}
                <button
                  onClick={() => {
                    setShowAddForm(!showAddForm);
                    setShowPlaylist(false);
                  }}
                  className={`p-2 rounded-full transition-colors cursor-pointer ${
                    showAddForm ? "text-pink-400 bg-white/5" : "text-neutral-400 hover:text-white"
                  }`}
                  title="Өөрийн дууг нэмэх"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>

              {/* Дууны түвшин (Volume Control) */}
              <div className="flex items-center gap-2 pt-1 border-t border-white/5">
                <button
                  onClick={toggleMute}
                  className="text-neutral-400 hover:text-white transition-colors cursor-pointer"
                >
                  {isMuted || volume === 0 ? (
                    <VolumeX className="w-4 h-4" />
                  ) : (
                    <Volume2 className="w-4 h-4" />
                  )}
                </button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={isMuted ? 0 : volume}
                  onChange={(e) => {
                    setVolume(parseFloat(e.target.value));
                    setIsMuted(false);
                  }}
                  className="w-full h-1 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-neutral-200"
                  style={{
                    background: `linear-gradient(to right, #e5e5e5 0%, #e5e5e5 ${
                      (isMuted ? 0 : volume) * 100
                    }%, #262626 ${
                      (isMuted ? 0 : volume) * 100
                    }%, #262626 100%)`
                  }}
                />
              </div>
            </div>

            {/* 3. ДУУНЫ ЖАГСААЛТ Overlay */}
            <AnimatePresence>
              {showPlaylist && (
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: "auto", maxHeight: "250px" }}
                  exit={{ height: 0 }}
                  className="overflow-hidden border-t border-white/10 bg-neutral-950"
                >
                  <div className="p-4 space-y-2 overflow-y-auto max-h-[250px] scrollbar-thin scrollbar-thumb-neutral-800">
                    <div className="flex justify-between items-center text-xs text-neutral-400 font-bold mb-2">
                      <span>ДУУНУУД ({tracks.length})</span>
                      <span className="text-[10px] text-pink-400/80">Сонгож тоглуулна уу</span>
                    </div>
                    
                    <div className="space-y-1">
                      {tracks.map((track, idx) => {
                        const isCurrent = idx === currentTrackIndex;
                        return (
                          <div
                            key={track.id}
                            onClick={() => {
                              setCurrentTrackIndex(idx);
                              setIsPlaying(true);
                            }}
                            className={`flex items-center justify-between p-2 rounded-xl cursor-pointer text-left transition-colors ${
                              isCurrent 
                                ? "bg-white/10 text-pink-400 font-semibold" 
                                : "text-neutral-300 hover:bg-white/5 hover:text-white"
                            }`}
                          >
                            <div className="flex items-center gap-2.5 truncate w-[85%]">
                              <span className="text-base select-none">{track.emoji}</span>
                              <div className="truncate">
                                <div className="text-xs truncate">{track.title}</div>
                                <div className="text-[10px] text-neutral-400 truncate">{track.artist}</div>
                              </div>
                            </div>
                            
                            {/* Хэрэглэгчийн нэмсэн дууг устгах боломж (INITIAL_TRACKS-аас бусад) */}
                            {track.id.startsWith("custom-") && (
                              <button
                                onClick={(e) => handleDeleteTrack(track.id, idx, e)}
                                className="p-1 text-neutral-500 hover:text-red-400 transition-colors cursor-pointer"
                                title="Устгах"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            )}

                            {isCurrent && isPlaying && (
                              <span className="w-2 h-2 rounded-full bg-pink-500 animate-pulse shrink-0" />
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* 4. ӨӨРИЙН ДУУНЫ ХОЛБООС НЭМЭХ Overlay */}
            <AnimatePresence>
              {showAddForm && (
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: "auto" }}
                  exit={{ height: 0 }}
                  className="overflow-hidden border-t border-white/10 bg-neutral-950"
                >
                  <form onSubmit={handleAddTrack} className="p-4 space-y-3">
                    <div className="text-xs text-pink-400 font-bold uppercase tracking-wider flex items-center justify-between">
                      <span>Дуу нэмэх</span>
                      <span className="text-[10px] text-neutral-400 font-normal normal-case">Direct MP3 Link</span>
                    </div>
                    
                    <div className="space-y-2 text-xs">
                      <div>
                        <label className="block text-neutral-400 mb-1">Дууны нэр</label>
                        <input
                          type="text"
                          value={customTitle}
                          onChange={(e) => setCustomTitle(e.target.value)}
                          placeholder="Жишээ: Star Shopping Live"
                          className="w-full bg-white/5 border border-white/10 rounded-lg p-2 text-white placeholder-neutral-500 focus:outline-none focus:border-pink-500"
                        />
                      </div>
                      <div>
                        <label className="block text-neutral-400 mb-1">Дууны MP3 холбоос (URL)</label>
                        <input
                          type="text"
                          value={customUrl}
                          onChange={(e) => setCustomUrl(e.target.value)}
                          placeholder="https://mysite.com/song.mp3"
                          className="w-full bg-white/5 border border-white/10 rounded-lg p-2 text-white placeholder-neutral-500 focus:outline-none focus:border-pink-500 font-mono"
                        />
                      </div>
                    </div>

                    {errorMessage && (
                      <div className="text-[11px] text-red-400 leading-tight">
                        ⚠️ {errorMessage}
                      </div>
                    )}

                    <button
                      type="submit"
                      className="w-full py-2 rounded-xl bg-pink-500 hover:bg-pink-600 font-bold text-xs text-white transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer shadow-md"
                    >
                      Жагсаалтад нэмээд тоглуулах
                    </button>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
