import React, { useState, TouchEvent, useEffect, useMemo } from "react";
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
  // --- СОСТОЯНИЯ ИГРЫ ---
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [currentOptionIndex, setCurrentOptionIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [isFinished, setIsFinished] = useState<boolean>(false);

  // --- ОБРАБОТКА СВАЙПОВ ---
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const currentStep = GAME_DATA[currentStepIndex];
  const totalSteps = GAME_DATA.length;

  // --- СГЕНЕРИРОВАННЫЕ ЗВЕЗДОЧКИ ДЛЯ ФОНА ---
  const sparkles = useMemo(() => {
    return Array.from({ length: 18 }).map((_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: `${Math.random() * 4 + 2}px`,
      delay: `${Math.random() * 5}s`,
      duration: `${Math.random() * 3 + 2}s`,
    }));
  }, []);

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
      const duration = 4 * 1000;
      const end = Date.now() + duration;

      const frame = () => {
        confetti({
          particleCount: 4,
          angle: 60,
          spread: 55,
          origin: { x: 0, y: 0.8 },
          colors: ["#ff007f", "#a855f7", "#3b82f6", "#facc15"],
        });
        confetti({
          particleCount: 4,
          angle: 120,
          spread: 55,
          origin: { x: 1, y: 0.8 },
          colors: ["#ff007f", "#a855f7", "#3b82f6", "#facc15"],
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };
      frame();
    }
  }, [isFinished, score, totalSteps]);

  // --- МГНОВЕННАЯ НАВИГАЦИЯ ПО КАРТИНКАМ ---
  const handlePrev = () => {
    setCurrentOptionIndex((prev) =>
      prev === 0 ? currentStep.options.length - 1 : prev - 1,
    );
  };

  const handleNext = () => {
    setCurrentOptionIndex((prev) =>
      prev === currentStep.options.length - 1 ? 0 : prev + 1,
    );
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

  // --- ВОЗВРАТ НА ПРЕДЫДУЩИЙ ШАГ ---
  const handleGoBackStep = () => {
    if (currentStepIndex > 0) {
      const prevStepIndex = currentStepIndex - 1;
      const prevStep = GAME_DATA[prevStepIndex];

      const previousAnswerId = answers[prevStep.key];
      const savedOptionIndex = prevStep.options.findIndex(
        (opt) => opt.id === previousAnswerId,
      );

      setCurrentStepIndex(prevStepIndex);
      setCurrentOptionIndex(savedOptionIndex !== -1 ? savedOptionIndex : 0);
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
    <div className="min-h-screen sparkling-bg flex flex-col items-center justify-between p-4 select-none overflow-x-hidden relative">
      {/* Сверкающий задний план со звездами */}
      <div className="sparkles-container">
        {sparkles.map((sparkle) => (
          <div
            key={sparkle.id}
            className="sparkle"
            style={{
              top: sparkle.top,
              left: sparkle.left,
              width: sparkle.size,
              height: sparkle.size,
              animationDelay: sparkle.delay,
              animationDuration: sparkle.duration,
            }}
          />
        ))}
      </div>

      {/* Шапка */}
      <header className="w-full max-w-md text-center mt-4 z-10">
        <h1 className="text-4xl font-black text-white drop-shadow-[0_4px_6px_rgba(0,0,0,0.15)] tracking-wide title-shadow">
          Девичник квиз ✨
        </h1>
        <p className="text-2xl text-pink-900 font-romantic mt-2 font-medium">
          Насколько хорошо ты знаешь жениха?
        </p>
      </header>

      {/* Основной контент */}
      <main className="w-full max-w-md flex-1 flex flex-col justify-center my-6 z-10">
        {!isFinished ? (
          /* Контейнер карточки квиза */
          <div
            key={currentStepIndex}
            className="bg-white/85 backdrop-blur-md rounded-3xl p-6 shadow-2xl border border-pink-100 flex flex-col items-center animate-step-in relative"
          >
            {/* Кнопка "Назад" */}
            {currentStepIndex > 0 && (
              <button
                onClick={handleGoBackStep}
                className="absolute left-6 top-6 text-xs font-bold text-pink-500 hover:text-pink-600 transition-colors flex items-center gap-1 uppercase tracking-wider"
              >
                <span>←</span> Назад
              </button>
            )}

            {/* Прогресс-бар */}
            <div className="w-full bg-pink-100 h-2.5 rounded-full mb-6 mt-8 overflow-hidden">
              <div
                className="bg-gradient-to-r from-pink-500 to-purple-500 h-full rounded-full transition-all duration-300"
                style={{
                  width: `${((currentStepIndex + 1) / totalSteps) * 100}%`,
                }}
              />
            </div>

            {/* Иконка и Название этапа */}
            <div className="text-center mb-4">
              <span
                className="text-5xl animate-bounce-gentle inline-block"
                role="img"
                aria-label="step-emoji"
              >
                {currentStep.emoji}
              </span>
              <h2 className="text-2xl font-extrabold text-gray-800 mt-2 tracking-tight">
                {currentStep.title}
              </h2>
              <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-2">
                Вариант {currentOptionIndex + 1} из {currentStep.options.length}{" "}
                (свайп 👇)
              </p>
            </div>

            {/* Слайдер с фото */}
            <div className="relative w-full aspect-square max-w-[280px] my-2 group">
              {/* Левая стрелка */}
              <button
                onClick={handlePrev}
                className="absolute left-[-16px] top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow-md active:scale-95 transition-transform border border-pink-100 hover:bg-pink-50"
                aria-label="Previous image"
              >
                <span className="text-pink-500 font-black text-lg">←</span>
              </button>

              {/* Зона изображения */}
              <div
                className="w-full h-full rounded-2xl overflow-hidden shadow-inner border-4 border-white bg-pink-50 relative cursor-grab active:cursor-grabbing"
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
              >
                <img
                  src={currentStep.options[currentOptionIndex].imageUrl}
                  alt="Feature Option"
                  className="w-full h-full object-cover pointer-events-none"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-pink-900/10 to-transparent pointer-events-none" />
              </div>

              {/* Правая стрелка */}
              <button
                onClick={handleNext}
                className="absolute right-[-16px] top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow-md active:scale-95 transition-transform border border-pink-100 hover:bg-pink-50"
                aria-label="Next image"
              >
                <span className="text-pink-500 font-black text-lg">→</span>
              </button>
            </div>

            {/* Точки-индикаторы */}
            <div className="flex gap-2 my-4">
              {currentStep.options.map((_, index) => (
                <div
                  key={index}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentOptionIndex
                      ? "w-6 bg-pink-500"
                      : "w-2 bg-pink-200"
                  }`}
                />
              ))}
            </div>

            {/* Кнопка выбора */}
            <button
              onClick={handleSelectOption}
              className="w-full py-4 px-6 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-2xl font-extrabold text-sm uppercase tracking-widest shadow-lg hover:shadow-pink-300/50 hover:scale-[1.02] active:scale-98 transition-all mt-2"
            >
              Выбрать этот вариант ✨
            </button>
          </div>
        ) : (
          /* Экран результатов */
          <div className="bg-white/85 backdrop-blur-md rounded-3xl p-8 shadow-2xl border border-pink-100 flex flex-col items-center text-center animate-result-in">
            <span className="text-6xl mb-4 animate-bounce-gentle inline-block">
              🎉
            </span>
            <h2 className="text-3xl font-black text-pink-600 mb-2 tracking-tight">
              Игра окончена!
            </h2>
            <p className="text-gray-500 font-medium mb-6 text-sm">
              Давай посмотрим, насколько хорошо ты справилась!
            </p>

            {/* Результат */}
            <div className="bg-pink-50 rounded-2xl p-6 w-full mb-6 border border-pink-100 animate-pulse-light">
              <p className="text-xs text-pink-800 font-bold uppercase tracking-widest">
                Твой результат
              </p>
              <div className="text-6xl font-black text-purple-600 my-2">
                {score} / {totalSteps}
              </div>
              <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mt-1">
                правильных ответов
              </p>
            </div>

            {/* Заключение */}
            <div className="text-gray-750 font-medium px-2 mb-8 text-sm leading-relaxed">
              {score === totalSteps && (
                <>
                  <span className="block text-3xl text-pink-500 font-romantic font-bold mb-3">
                    Абсолютный триумф!
                  </span>
                  👑 Ты лучшая подружка невесты! Знаешь зятя как свои пять
                  пальцев. Срочно требуй у невесты звание почетной гостьи!
                </>
              )}
              {score >= 2 && score < totalSteps && (
                <>
                  <span className="block text-3xl text-pink-500 font-romantic font-bold mb-3">
                    Отличный результат!
                  </span>
                  🥂 С женихом вы точно знакомы не понаслышке. На свадьбе будет
                  о чём поболтать!
                </>
              )}
              {score < 2 && (
                <>
                  <span className="block text-3xl text-pink-500 font-romantic font-bold mb-3">
                    Ой-ой!
                  </span>
                  🕵️‍♀️ Кажется, вы слишком редко ходите на двойные свидания!
                  Отличный повод получше рассмотреть жениха на грядущей свадьбе!
                </>
              )}
            </div>

            {/* Кнопка "Пройти ещё раз" */}
            <button
              onClick={handleRestart}
              className="w-full py-4 px-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl font-extrabold text-sm uppercase tracking-widest shadow-lg hover:shadow-purple-300/50 hover:scale-[1.02] active:scale-98 transition-all"
            >
              Пройти ещё раз 🔄
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
