import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Check, ArrowRight } from "lucide-react";

export function ServicePills() {
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const availableInterests = ["Далай судлал 🌊", "Гар бөмбөг 🏐", "Цанаар гулгах ⛷️", "Lil Peep 🎵", "Lego тоглох 🧱"];

  const interestDetails: Record<string, string> = {
    "Далай судлал 🌊": "Далайн гүн дэх нууцууд, нууцлагдмал амьтад болон экосистемийг судлах нь надад маш сонирхолтой санагддаг! Хязгааргүй далайн усыг судлах нь үнэхээр гайхалтай 🌊.",
    "Гар бөмбөг 🏐": "Гар бөмбөг (Volleyball) тоглох нь багийн хамтын ажиллагааг сайжруулж, эрч хүч өгдөг миний хамгийн дуртай спорт! Найзуудтайгаа хамт тоглох, бөмбөг давуулах хамгийн гоё байдаг 🏐.",
    "Цанаар гулгах ⛷️": "Өвлийн улиралд хамгийн гоё нь! Цасан талбай дээгүүр цанаар салхи сөрөн хурдтай гулгах бол миний хамгийн дуртай хоббинуудын нэг ⛷️.",
    "Lil Peep 🎵": "Lil Peep бол миний хамгийн дуртай дуучин. Түүний дуунуудын өвөрмөц хэмнэл, өнгө аяс нь надад гүн төрөгдөл өгч, сонсох бүрд тайвшралыг мэдрүүлдэг 🎵.",
    "Lego тоглох 🧱": "Янз бүрийн Lego-нуудыг угсарч, өөрийнхөө төсөөллөөр шинэ ертөнцийг бүтээх маш дуртай. Анхаарлаа төвлөрүүлж, бүтээлч байдлыг маань хөгжүүлдэг болохоор үнэхээр гоё хобби 🧱!"
  };

  // Товчлуур дарах үед сонгогдсон жагсаалтанд нэмэх эсвэл хасах
  const handleToggleInterest = (interest: string) => {
    setSelectedInterests((prev) =>
      prev.includes(interest)
        ? prev.filter((i) => i !== interest)
        : [...prev, interest]
    );
  };

  return (
    <div id="service-section" className="max-w-xl">
      <h3 className="text-2xl font-bold tracking-tight mb-2 text-black">
        Миний хобби, сонирхол
      </h3>
      <p className="opacity-85 text-[#738273] mb-8 text-sm sm:text-base">
        Дэлгэрэнгүй уншихыг хүссэн сонирхлоо сонгоорой (олноор сонгож болно)
      </p>

      {/* Олон сонголттой товчлуурууд */}
      <div className="flex flex-wrap gap-2.5 mb-8">
        {availableInterests.map((interest) => {
          const isActive = selectedInterests.includes(interest);
          return (
            <motion.button
              key={interest}
              id={`pill-${interest.replace(/\s+/g, '-').toLowerCase()}`}
              onClick={() => handleToggleInterest(interest)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`inline-flex items-center text-sm md:text-base px-5 py-2.5 rounded-full transition-all duration-200 cursor-pointer font-medium select-none ${
                isActive
                  ? "bg-[#1C2E1E] text-white shadow-md shadow-emerald-950/5 transform"
                  : "bg-white text-[#1C2E1E] border border-[#F1F3F1] hover:bg-[#F1F3F1]/55 shadow-xs"
              }`}
            >
              <AnimatePresence mode="popLayout" initial={false}>
                {isActive && (
                  <motion.span
                    initial={{ scale: 0, opacity: 0, width: 0 }}
                    animate={{ scale: 1, opacity: 1, width: "auto" }}
                    exit={{ scale: 0, opacity: 0, width: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="inline-flex mr-2 shrink-0 items-center justify-center overflow-hidden"
                  >
                    <Check className="w-4 h-4 text-white" />
                  </motion.span>
                )}
              </AnimatePresence>
              {interest}
            </motion.button>
          );
        })}
      </div>

      {/* Сонголтын хариу үйлдэл үзүүлэх баннер болон тайлбар картууд */}
      <AnimatePresence mode="wait">
        {selectedInterests.length === 0 ? (
          <motion.div
            key="empty-state"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 0.5, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2 }}
            className="text-xs text-neutral-500 italic pl-1 py-1"
          >
            Дээрх сонирхлуудаас дарж тайлбарыг нээнэ үү.
          </motion.div>
        ) : (
          <motion.div
            key="active-state"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ type: "spring", stiffness: 280, damping: 26 }}
            className="overflow-hidden w-full space-y-3"
          >
            {/* Сонгосон сонирхлуудын дэлгэрэнгүй жагсаалт */}
            {selectedInterests.map((interest) => (
              <motion.div
                key={`detail-${interest}`}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="bg-[#FAFBF9] border border-[#EAECE9] rounded-2xl p-4 sm:p-5 flex flex-col gap-2 shadow-xs"
              >
                <div className="text-xs text-[#4D6D47] tracking-wider uppercase font-bold">
                  {interest}
                </div>
                <p className="text-sm md:text-base text-neutral-800 leading-relaxed font-normal">
                  {interestDetails[interest]}
                </p>
              </motion.div>
            ))}

            <div className="bg-[#1C2E1E] text-white rounded-2xl p-4 sm:p-5 mt-4 flex flex-row items-center justify-between gap-4 shadow-sm">
              <span className="text-xs sm:text-sm font-medium tracking-wide">
                Цэцэнтэй хамт сонирхлоо хуваалцах уу? 🌊
              </span>
              <button
                onClick={() =>
                  alert(`Цэцэнтэй холбогдох хүсэлт илгээгдлээ! Сонгосон хоббинууд: ${selectedInterests.join(", ")}`)
                }
                className="inline-flex items-center gap-1.5 text-[#1C2E1E] bg-white hover:bg-[#FAFBF9] active:scale-95 text-xs font-bold uppercase tracking-wider transition-all py-2 px-3.5 rounded-xl shrink-0 cursor-pointer"
              >
                <span>Холбогдох</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
