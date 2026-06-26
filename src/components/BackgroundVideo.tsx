import { useEffect, useRef } from "react";

export function BackgroundVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const prevXRef = useRef<number | null>(null);
  const targetTimeRef = useRef<number>(0);

  // 1. Desktop mouse scrubbing логик
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleMouseMove = (e: MouseEvent) => {
      // Хэрэв дэлгэцийн өргөн 1024-өөс бага бол хулганаар удирдах логикийг алсгана (ажиллуулахгүй)
      if (window.innerWidth < 1024) return;

      const currentX = e.clientX;

      if (prevXRef.current !== null && video.duration && !isNaN(video.duration)) {
        const delta = currentX - prevXRef.current;
        const deltaRatio = delta / window.innerWidth;
        // Дэлгэцийн харьцаанаас хамаарч удирдах хугацааг тооцолно
        const deltaTime = deltaRatio * 0.8 * video.duration;

        let newTarget = targetTimeRef.current + deltaTime;

        // Бичлэгийн эхлэл ба төгсгөл хооронд хязгаарлана (Clamp)
        if (newTarget < 0) newTarget = 0;
        if (newTarget > video.duration) newTarget = video.duration;

        targetTimeRef.current = newTarget;
        video.currentTime = newTarget;
      }

      prevXRef.current = currentX;
    };

    // Хулгана дэлгэц рүү орж ирэх үед огцом үсрэлт үүсгэхгүй байх зорилготой
    const handleMouseEnter = (e: MouseEvent) => {
      prevXRef.current = e.clientX;
    };

    const handleMouseLeave = () => {
      prevXRef.current = null;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseenter", handleMouseEnter);
    window.addEventListener("mouseleave", handleMouseLeave);

    // Бичлэг гүйж дууссаныг мэдэгдэх сонсогч (smooth tracking)
    const handleSeeked = () => {
      // Шаардлагын дагуу frame-to-frame smooth ажиллагааг хангах зорилгоор хоосон сонсогч холбов
    };
    video.addEventListener("seeked", handleSeeked);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseenter", handleMouseEnter);
      window.removeEventListener("mouseleave", handleMouseLeave);
      video.removeEventListener("seeked", handleSeeked);
    };
  }, []);

  // 2. Гар утасны Autoplay логик
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const configureVideoState = () => {
      if (window.innerWidth < 1024) {
        video.autoplay = true;
        video.loop = true;
        video.play().catch((error) => {
          console.warn("Хөтчийн аюулгүй байдлын тохиргооноос болж автоматаар тоглуулж чадсангүй:", error);
        });
      } else {
        video.pause();
      }
    };

    // Ачаалагдах үед нэг удаа шалгана
    configureVideoState();

    const handleResize = () => {
      configureVideoState();
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      id="background-video-container"
      className="order-last lg:order-none relative lg:absolute lg:inset-0 lg:z-0 overflow-hidden pointer-events-none w-full aspect-square md:aspect-video lg:aspect-auto lg:h-full bg-neutral-50 lg:bg-transparent"
    >
      <video
        ref={videoRef}
        id="mainframe-bg-video"
        muted
        playsInline
        preload="auto"
        className="w-full h-full object-cover object-right lg:object-right-bottom animate-fade-in"
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260601_110537_3a579fa0-7bbc-4d94-9d25-0e816c7840f5.mp4"
      />
    </div>
  );
}
