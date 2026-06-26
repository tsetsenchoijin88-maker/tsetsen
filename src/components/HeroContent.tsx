import { motion } from "motion/react";
import { useTypewriter } from "../hooks/useTypewriter";

export function HeroContent() {
  // Бидний бичсэн typewriter hook-ийг дуудаж байна
  const { displayed, done } = useTypewriter("my name is Tsetsen\ni'm 13 years old", 35, 600);

  return (
    <>
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
    </>
  );
}
