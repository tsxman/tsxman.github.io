import React, { useState, TouchEvent, useEffect } from "react";
import confetti from "canvas-confetti";
import "./App.css";

// --- ТИПЫ И ИНТЕРФЕЙСЫ ---
interface FeatureOption {
  id: number;
  imageUrl: string;
  isCorrect: boolean;
  hint?: string;
}

interface FeatureStep {
  key: "eyes" | "nose" | "mouth" | "ears";
  title: string;
  emoji: string;
  options: FeatureOption[];
}

// --- ДАННЫЕ ИГРЫ ---
const GAME_DATA: FeatureStep[] = [
  {
    key: "eyes",
    title: "Угадай глаза",
    emoji: "👁️",
    options: [
      {
        id: 1,
        imageUrl:
          "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&q=80",
        isCorrect: false,
        hint: "Слишком грустный взгляд?",
      },
      {
        id: 2,
        imageUrl:
          "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&q=80",
        isCorrect: true,
        hint: "Те самые любимые глаза! ❤️",
      },
      {
        id: 3,
        imageUrl:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
        isCorrect: false,
        hint: "Хмм, кажется, это не они.",
      },
    ],
  },
  {
    key: "nose",
    title: "Угадай нос",
    emoji: "👃",
    options: [
      {
        id: 1,
        imageUrl:
          "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=400&q=80",
        isCorrect: false,
      },
      {
        id: 2,
        imageUrl:
          "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80",
        isCorrect: false,
      },
      {
        id: 3,
        imageUrl:
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80",
        isCorrect: true,
        hint: "Идеальный носик! ✨",
      },
    ],
  },
  {
    key: "mouth",
    title: "Угадай улыбку",
    emoji: "👄",
    options: [
      {
        id: 1,
        imageUrl:
          "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&q=80",
        isCorrect: true,
        hint: "Самая лучезарная улыбка! 😍",
      },
      {
        id: 2,
        imageUrl:
          "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&q=80",
        isCorrect: false,
      },
      {
        id: 3,
        imageUrl:
          "https://images.unsplash.com/photo-1489980508314-941910ded1f4?w=400&q=80",
        isCorrect: false,
      },
    ],
  },
  {
    key: "ears",
    title: "Угадай уши",
    emoji: "👂",
    options: [
      {
        id: 1,
        imageUrl:
          "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=400&q=80",
        isCorrect: false,
      },
      {
        id: 2,
        imageUrl:
          "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&q=80",
        isCorrect: true,
        hint: "Ушки-ракушки нашли своего владельца!",
      },
      {
        id: 3,
        imageUrl:
          "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=400&q=80",
        isCorrect: false,
      },
    ],
  },
];

export default function App() {
  // Состояния игры
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [currentOptionIndex, setCurrentOptionIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [isFinished, setIsFinished] = useState<boolean>(false);

  // Состояния для анимации перелистывания картинок
  const [slideDirection, setSlideDirection] = useState<"left" | "right" | "">("");
  const [isAnimating, setIsAnimating] = useState<boolean>(false);

  // Для обработки свайпов
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const currentStep = GAME_DATA[currentStepIndex];
  const totalSteps = GAME_DATA.length;

  // --- ПОДСЧЕТ РЕЗУЛЬТАТОВ ---
  const calculateScore = () => {
    let score = 0;
    GAME_DATA.forEach((step) => {
      const userAnswerId = answers[step.key];
      const correctOption = step.options.find((opt) => opt.isCorrect);
      if (correctOption && userAnswerId === correctOption.id) {
        score += 1;
      }
    });
    return score;
  };

  const score = calculateScore();

  // --- ЭФФЕКТ САЛЮТА ПРИ МАКСИМАЛЬНОМ БАЛЛЕ ---
  useEffect(() => {
    if (isFinished && score === totalSteps) {
      // Запускаем несколько залпов конфетти
      const duration = 3 * 1000;
      const end = Date.now() + duration;

      const frame = () => {
        confetti({
          particleCount: 5,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ["#ec4899", "#a855f7", "#3b82f6"],
        });
        confetti({
          particleCount: 5,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ["#ec4899", "#a855f7", "#3b82f6"],
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };
      frame();
    }
  }, [isFinished, score, totalSteps]);

  // --- ЛОГИКА НАВИГАЦИИ ПО ВАРИАНТАМ ---
  const handlePrev = () => {
    if (isAnimating) return;
    setSlideDirection("right");
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentOptionIndex((prev) =>
        prev === 0 ? currentStep.options.length - 1 : prev - 1,
      );
      setSlideDirection("");
      setIsAnimating(false);
    }, 200); // Совпадает со временем CSS-перехода
  };

  const handleNext = () => {
    if (isAnimating) return;
    setSlideDirection("left");
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentOptionIndex((prev) =>
        prev === currentStep.options.length - 1 ? 0 : prev + 1,
      );
      setSlideDirection("");
      setIsAnimating(false);
    }, 200);
  };

  // --- ОБРАБОТКА СВАЙПОВ ---
  const minSwipeDistance = 50;

  const onTouchStart = (e: TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      handleNext();
    } else if (isRightSwipe) {
      handlePrev();
    }
  };

  // --- ВЫБОР ВАРИАНТА ---
  const handleSelectOption = () => {
    const selectedOption = currentStep.options[currentOptionIndex];

    setAnswers((prev) => ({
      ...prev,
      [currentStep.key]: selectedOption.id,
    }));

    if (currentStepIndex < totalSteps - 1) {
      setCurrentStepIndex((prev) => prev + 1);
      setCurrentOptionIndex(0);
    } else {
      setIsFinished(true);
    }
  };

  // --- СБРОС ИГРЫ ---
  const handleRestart = () => {
    setCurrentStepIndex(0);
    setCurrentOptionIndex(0);
    setAnswers({});
    setIsFinished(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-pink-300 via-purple-300 to-indigo-200 flex flex-col items-center justify-between p-4 font-sans text-gray-800 select-none overflow-x-hidden">
      {/* Шапка */}
      <header className="w-full max-w-md text-center mt-4">
        <h1 className="text-3xl font-extrabold text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.15)] tracking-wide">
          Девичник квиз ✨
        </h1>
        <p className="text-sm text-pink-800 font-medium mt-1">
          Насколько хорошо ты знаешь жениха?
        </p>
      </header>

      {/* Основной контент */}
      <main className="w-full max-w-md flex-1 flex flex-col justify-center my-6">
        {!isFinished ? (
          // key={currentStepIndex} заставляет React пересоздавать компонент при переходе на новый шаг, 
          // запуская CSS-анимацию "step-fade-in"
          <div 
            key={currentStepIndex}
            className="bg-white/80 backdrop-blur-md rounded-3xl p-6 shadow-xl border border-pink-100 flex flex-col items-center animate-step-in"
          >
            {/* Прогресс-бар */}
            <div className="w-full bg-pink-100 h-2.5 rounded-full mb-6 overflow-hidden">
              <div
                className="bg-gradient-to-r from-pink-500 to-purple-500 h-full rounded-full transition-all duration-300"
                style={{
                  width: `${((currentStepIndex + 1) / totalSteps) * 100}%`,
                }}
              />
            </div>

            {/* Иконка и Название этапа */}
            <div className="text-center mb-4">
              <span className="text-4xl" role="img" aria-label="step-emoji">
                {currentStep.emoji}
              </span>
              <h2 className="text-2xl font-bold text-gray-800 mt-2 animate-pulse-slow">
                {currentStep.title}
              </h2>
              <p className="text-xs text-gray-500 mt-1">
                Вариант {currentOptionIndex + 1} из {currentStep.options.length}{" "}
                (проведи свайп 👇)
              </p>
            </div>

            {/* Слайдер с фото */}
            <div className="relative w-full aspect-square max-w-[280px] my-2 group">
              {/* Левая стрелка */}
              <button
                onClick={handlePrev}
                className="absolute left-[-16px] top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow-md active:scale-95 transition-transform border border-pink-100 hover:bg-pink-50"
                aria-label="Previous"
              >
                <span className="text-pink-500 font-bold text-lg">←</span>
              </button>

              {/* Зона изображения со свайпом */}
              <div
                className="w-full h-full rounded-2xl overflow-hidden shadow-inner border-4 border-white bg-pink-50 relative cursor-grab active:cursor-grabbing"
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
              >
                <img
                  src={currentStep.options[currentOptionIndex].imageUrl}
                  alt="Feature Option"
                  className={`w-full h-full object-cover pointer-events-none transition-transform duration-200 ease-out ${
                    slideDirection === "left"
                      ? "-translate-x-full opacity-0"
                      : slideDirection === "right"
                      ? "translate-x-full opacity-0"
                      : "translate-x-0 opacity-100"
                  }`}
                />

                {/* Нежное свечение на фото */}
                <div className="absolute inset-0 bg-gradient-to-t from-pink-900/10 to-transparent pointer-events-none" />
              </div>

              {/* Правая стрелка */}
              <button
                onClick={handleNext}
                className="absolute right-[-16px] top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow-md active:scale-95 transition-transform border border-pink-100 hover:bg-pink-50"
                aria-label="Next"
              >
                <span className="text-pink-500 font-bold text-lg">→</span>
              </button>
            </div>

            {/* Точки-индикаторы (Dots) */}
            <div className="flex gap-2 my-4">
              {currentStep.options.map((_, index) => (
                <div
                  key={index}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    index === currentOptionIndex
                      ? "w-6 bg-pink-500"
                      : "w-2.5 bg-pink-200"
                  }`}
                />
              ))}
            </div>

            {/* Кнопка выбора */}
            <button
              onClick={handleSelectOption}
              className="w-full py-4 px-6 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-2xl font-bold text-lg shadow-lg hover:shadow-pink-300/50 hover:scale-[1.02] active:scale-98 transition-all mt-2"
            >
              Выбрать этот вариант ✨
            </button>
          </div>
        ) : (
          /* Экран результатов с анимацией появления */
          <div className="bg-white/80 backdrop-blur-md rounded-3xl p-8 shadow-xl border border-pink-100 flex flex-col items-center text-center animate-result-in">
            <span className="text-6xl mb-4 animate-bounce-gentle">🎉</span>
            <h2 className="text-3xl font-extrabold text-pink-600 mb-2">
              Игра окончена!
            </h2>
            <p className="text-gray-600 mb-6">
              Давай посмотрим, насколько хорошо ты справилась!
            </p>

            {/* Результат */}
            <div className="bg-pink-50 rounded-2xl p-6 w-full mb-6 border border-pink-100 animate-pulse-light">
              <p className="text-sm text-pink-800 font-semibold uppercase tracking-wider">
                Твой результат
              </p>
              <div className="text-5xl font-black text-purple-600 my-2">
                {score} / {totalSteps}
              </div>
              <p className="text-xs text-gray-500 mt-1">правильных ответов</p>
            </div>

            <div className="text-gray-700 font-medium px-2 mb-8 text-sm leading-relaxed">
              {score === totalSteps &&
                "👑 Абсолютный триумф! Ты лучшая подружка невесты! Знаешь зятя как свои пять пальцев. Срочно требуй у невесты звание почетной гостьи!"}
              {score >= 2 &&
                score < totalSteps &&
                "🥂 Отличный результат! С женихом вы точно знакомы не понаслышке. На свадьбе будет о чём поболтать!"}
              {score < 2 &&
                "🕵️‍♀️ Ой-ой! Кажется, вы слишком редко ходите на двойные свидания! Отличный повод получше рассмотреть жениха на грядущей свадьбе!"}
            </div>

            {/* Кнопка "Начать заново" */}
            <button
              onClick={handleRestart}
              className="w-full py-4 px-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl font-bold text-lg shadow-lg hover:scale-[1.02] active:scale-98 transition-all"
            >
              Пройти ещё раз 🔄
            </button>
          </div>
        )}
      </main>
    </div>
  );
}