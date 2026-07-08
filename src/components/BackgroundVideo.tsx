import { useEffect, useRef, useState } from "react";

const minecraftBg = "/src/assets/images/minecraft_girl_bg_1783486137279.jpg";

export function BackgroundVideo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  // Smooth mouse parallax effect for desktop
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (window.innerWidth < 1024) return;

      const { innerWidth, innerHeight } = window;
      // Calculate normalized mouse positions (-0.5 to 0.5)
      const x = (e.clientX / innerWidth) - 0.5;
      const y = (e.clientY / innerHeight) - 0.5;

      // Maximum offset in pixels
      const maxOffset = 25;
      
      setOffset({
        x: x * maxOffset,
        y: y * maxOffset
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      id="background-video-container"
      className="order-last lg:order-none relative lg:absolute lg:inset-0 lg:z-0 overflow-hidden w-full h-[450px] sm:h-[520px] md:h-[600px] lg:h-full bg-[#0a0f0b]"
    >
      {/* Glow highlight inside background container */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none z-10" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-pink-500/5 rounded-full blur-[100px] pointer-events-none z-10" />

      {/* Parallax Minecraft background image with deep zoom */}
      <div
        className="w-full h-full transition-transform duration-300 ease-out select-none"
        style={{
          transform: `scale(1.28) translate(${-offset.x}px, ${-offset.y}px)`,
          backgroundImage: `url(${minecraftBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center center",
        }}
      >
        <img
          src={minecraftBg}
          alt="Minecraft Tsetsen background"
          className="sr-only"
          referrerPolicy="no-referrer"
        />
      </div>

      {/* Soft dark vignette overlay to make text content readable */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0d120e] via-transparent to-[#0a0d0a]/80 pointer-events-none z-[1]" />
      <div className="absolute inset-0 bg-black/20 pointer-events-none z-[1]" />
    </div>
  );
}

