import { useEffect, useState } from "react";

interface AnimatedPercentageProps {
  value: number;
  duration?: number; // в миллисекундах
}

export const AnimatedPercentage = ({
  value,
  duration = 1500,
}: AnimatedPercentageProps) => {
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    let startTimestamp: number | null = null;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);

      // Используем функцию плавности (easeOutQuad) для красивого замедления к концу
      const easeProgress = progress * (2 - progress);

      setCount(Math.floor(easeProgress * value));

      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };

    window.requestAnimationFrame(step);
  }, [value, duration]);

  return <>{count}%</>;
};
