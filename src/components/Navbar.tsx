import { useState } from "react";
import { Music } from "lucide-react";

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const playMusic = () => {
    const event = new CustomEvent("trigger-play-music");
    window.dispatchEvent(event);
  };

  return (
    <>
      {/* Үндсэн Header хэсэг */}
      <header
        id="app-header"
        className="fixed top-0 inset-x-0 z-10 px-5 sm:px-8 py-4 sm:py-5 flex flex-row justify-between items-center bg-transparent"
      >
        {/* Зүүн талын Лого хэсэг */}
        <div id="brand-logo" className="flex flex-row items-center gap-3">
          <span className="text-[21px] sm:text-[26px] tracking-tight text-black font-semibold select-none">
            Tsetsen&reg;
          </span>
          <span className="text-[25px] sm:text-[30px] text-black select-none tracking-[-0.02em] font-medium leading-none mb-1">
            &#10033;
          </span>
        </div>

        {/* Desktop компьютерт зориулсан цэс (Дэлгэцийн өргөн md-ээс дээш үед харагдана) */}
        <nav id="desktop-links" className="hidden md:flex flex-row items-center text-[23px] text-black font-normal">
          <a href="#labs" className="hover:opacity-60 transition-opacity">Labs</a>
          <span className="opacity-40">,&nbsp;</span>
          <a href="#studio" className="hover:opacity-60 transition-opacity">Studio</a>
          <span className="opacity-40">,&nbsp;</span>
          <a href="#openings" className="hover:opacity-60 transition-opacity">Openings</a>
          <span className="opacity-40">,&nbsp;</span>
          <a href="#shop" className="hover:opacity-60 transition-opacity">Shop</a>
        </nav>

        {/* Баруун талын "Get in touch" товч / холбоос */}
        <div id="desktop-cta-link" className="hidden md:flex items-center gap-6">
          <button
            onClick={playMusic}
            className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-black hover:bg-neutral-900 text-white text-[15px] font-bold tracking-tight shadow-md cursor-pointer transition-all hover:scale-105 active:scale-95"
          >
            <Music className="w-4 h-4 text-pink-400 animate-bounce" />
            <span>Lil Peep - Star Shopping ⭐</span>
          </button>
          <a
            href="#contact"
            className="text-[23px] text-black underline underline-offset-2 hover:opacity-60 transition-opacity"
          >
            Get in touch
          </a>
        </div>

        {/* Гар утас болон жижиг дэлгэцэнд зориулсан Hamburger товчлуур */}
        <div className="md:hidden flex items-center gap-3">
          <button
            onClick={playMusic}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black text-white text-xs font-bold cursor-pointer transition-transform active:scale-95 shadow"
            aria-label="Play Star Shopping"
          >
            <Music className="w-3.5 h-3.5 text-pink-400 animate-bounce" />
            <span>Star Shopping ⭐</span>
          </button>
          <button
            id="hamburger-btn"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="flex flex-col justify-between w-6 h-4 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-black rounded p-0.5"
            aria-label="Toggle mobile menu"
            aria-expanded={isMobileMenuOpen}
          >
            {/* Хэрэв цэс нээлттэй бол дундах шугам арилж, дээд доод шугамууд "X" хэлбэртэй болж хувирна */}
            <span
              className={`w-full h-[2px] bg-black transition-all duration-300 origin-left ${
                isMobileMenuOpen ? "rotate-45 translate-y-[3px]" : ""
              }`}
            />
            <span
              className={`w-full h-[2px] bg-black transition-all duration-300 ${
                isMobileMenuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`w-full h-[2px] bg-black transition-all duration-300 origin-left ${
                isMobileMenuOpen ? "-rotate-45 -translate-y-[3px]" : ""
              }`}
            />
          </button>
        </div>
      </header>

      {/* Гар утасны бүтэн дэлгэцийн Overlay цэс */}
      <div
        id="mobile-navigation-overlay"
        className={`fixed inset-0 z-[9] bg-white/95 backdrop-blur-sm transition-all duration-300 flex flex-col justify-center items-center md:hidden ${
          isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col gap-8 text-center px-6">
          {["Labs", "Studio", "Openings", "Shop"].map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-3xl font-medium text-black hover:opacity-60 transition-opacity"
            >
              {link}
            </a>
          ))}
          <div className="border-t border-neutral-100 my-4 w-24 mx-auto" />
          <a
            href="#contact"
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-3xl font-medium text-black underline underline-offset-4 hover:opacity-100/60 transition-opacity"
          >
            Get in touch
          </a>
        </div>
      </div>
    </>
  );
}
