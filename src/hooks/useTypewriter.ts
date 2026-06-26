import { useState, useEffect } from "react";

/**
 * Текстийг үсэг үсгээр нь шивж байгаа мэт харагдуулах Custom Hook.
 * @param text Шивэгдэх үндсэн текст
 * @param speed Үсэг хоорондын секунд (миллисекундээр)
 * @param startDelay Эхлэхээс өмнөх хүлээх хугацаа
 */
export function useTypewriter(text: string, speed = 38, startDelay = 600) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    // Текст эсвэл хугацаа солигдох үед төлөвийг эхний байдалд оруулна
    setDisplayed("");
    setDone(false);

    let timeoutId: ReturnType<typeof setTimeout>;
    let intervalId: ReturnType<typeof setInterval>;
    let currentIndex = 0;

    timeoutId = setTimeout(() => {
      intervalId = setInterval(() => {
        currentIndex++;
        setDisplayed(text.slice(0, currentIndex));

        if (currentIndex >= text.length) {
          setDone(true);
          clearInterval(intervalId);
        }
      }, speed);
    }, startDelay);

    // Санах ойг цэвэрлэх (Cleanup)
    return () => {
      clearTimeout(timeoutId);
      clearInterval(intervalId);
    };
  }, [text, speed, startDelay]);

  return { displayed, done };
}
