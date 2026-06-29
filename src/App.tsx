/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Navbar } from "./components/Navbar";
import { HeroContent } from "./components/HeroContent";
import { ServicePills } from "./components/ServicePills";
import { BackgroundVideo } from "./components/BackgroundVideo";
import { AudioPlayer } from "./components/AudioPlayer";
import { AIChatBot } from "./components/AIChatBot";

export default function App() {
  return (
    <div
      id="relative-container"
      className="relative bg-white text-neutral-900 font-sans selection:bg-[#EAECE9] selection:text-[#1C2E1E] antialiased overflow-x-hidden flex flex-col lg:block lg:min-h-screen"
    >
      {/* 1. Толгойн Цэс (Navbar) */}
      <Navbar />

      {/* 2. Агуулгын хэсэг */}
      <div className="relative z-10 flex flex-col order-first lg:order-none w-full bg-white lg:bg-transparent pb-8 lg:pb-0 lg:min-h-screen">
        <main
          id="spade-hero"
          className="w-full max-w-7xl mx-auto px-6 py-24 sm:py-28 md:py-32 flex-1 flex flex-col justify-center"
        >
          {/* Толгой гарчиг болон Дэд тайлбар */}
          <HeroContent />

          {/* Сонгодог багц үйлчилгээнүүд */}
          <ServicePills />
        </main>
      </div>

      {/* 3. Арын дэвсгэр видео ба Хулганы хөдөлгөөнөөр удирдах хэсэг */}
      <BackgroundVideo />

      {/* 4. Интерактив Хөгжим Тоглуулагч */}
      <AudioPlayer />

      {/* 5. AI Chat Туслах */}
      <AIChatBot />
    </div>
  );
}
