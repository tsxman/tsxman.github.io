import React, { useState, type TouchEvent, useEffect, useMemo } from "react";
import confetti from "canvas-confetti";
import "./App.css";

// --- ИМПОРТ ИЗОБРАЖЕНИЙ ---

// 1. Улыбка (Осталась без изменений — 4 варианта)
import mouthCorrect from "./assets/images/mouth-correct.png";
import mouthWrong1 from "./assets/images/mouth-wrong1.jpeg";
import mouthWrong2 from "./assets/images/mouth-wrong2.jpeg";
import mouthWrong3 from "./assets/images/mouth-wrong3.png";

// 2. Нос (5 вариантов)
import noseCorrect from "./assets/images/nose-correct.png";
import noseWrong1 from "./assets/images/nose-wrong1.jpeg";
import noseWrong2 from "./assets/images/nose-wrong2.jpeg";
import noseWrong3 from "./assets/images/nose-wrong3.jpeg";
import noseWrong4 from "./assets/images/nose-wrong4.jpeg";

// 3. Глаза (5 вариантов)
import eyesCorrect from "./assets/images/eyes-correct.jpeg";
import eyesWrong1 from "./assets/images/eyes-wrong1.jpeg";
import eyesWrong2 from "./assets/images/eyes-wrong2.jpeg";
import eyesWrong3 from "./assets/images/eyes-wrong3.jpeg";

// 4. Брови (5 вариантов)
import browsCorrect from "./assets/images/brows-correct.jpeg";
import browsWrong1 from "./assets/images/brows-wrong1.png";
import browsWrong2 from "./assets/images/brows-wrong2.jpeg";

// 5. Ухо (5 вариантов)
import earsCorrect from "./assets/images/ears-correct.jpeg";
import earsWrong1 from "./assets/images/ears-wrong1.jpeg";
import earsWrong2 from "./assets/images/ears-wrong2.jpeg";
import earsWrong3 from "./assets/images/ears-wrong3.jpeg";

// 6. Нога (5 вариантов)
import legCorrect from "./assets/images/leg-correct.png";
import legWrong1 from "./assets/images/leg-wrong1.jpeg";
import legWrong2 from "./assets/images/leg-wrong2.jpeg";
import legWrong3 from "./assets/images/leg-wrong3.jpeg";

// 7. Палец (5 вариантов)
import fingerCorrect from "./assets/images/finger-correct.jpeg";
import fingerWrong1 from "./assets/images/finger-wrong1.png";
import fingerWrong2 from "./assets/images/finger-wrong2.png";
import fingerWrong3 from "./assets/images/finger-wrong3.png";

// ==========================================
// --- ТИПЫ, ИНТЕРФЕЙСЫ И ДАННЫЕ ---
// ==========================================

interface FeatureOption {
  id: number;
  imageUrl: string;
  isCorrect: boolean;
}

interface FeatureStep {
  key: "mouth" | "nose" | "eyes" | "brows" | "ears" | "leg" | "finger";
  title: string;
  emoji: string;
  options: FeatureOption[];
}

const GAME_DATA: FeatureStep[] = [
  {
    key: "mouth",
    title: "Угадай улыбку",
    emoji: "👄",
    options: [
      { id: 1, imageUrl: mouthWrong1, isCorrect: false },
      { id: 2, imageUrl: mouthCorrect, isCorrect: true },
      { id: 3, imageUrl: mouthWrong2, isCorrect: false },
      { id: 4, imageUrl: mouthWrong3, isCorrect: false },
    ],
  },
  {
    key: "nose",
    title: "Угадай нос",
    emoji: "👃",
    options: [
      { id: 1, imageUrl: noseWrong1, isCorrect: false },
      { id: 2, imageUrl: noseWrong2, isCorrect: false },
      { id: 3, imageUrl: noseCorrect, isCorrect: true },
      { id: 4, imageUrl: noseWrong3, isCorrect: false },
      { id: 5, imageUrl: noseWrong4, isCorrect: false },
    ],
  },
  {
    key: "eyes",
    title: "Угадай глаза",
    emoji: "👁️",
    options: [
      { id: 1, imageUrl: eyesWrong1, isCorrect: false },
      { id: 2, imageUrl: eyesWrong2, isCorrect: false },
      { id: 3, imageUrl: eyesWrong3, isCorrect: false },
      { id: 4, imageUrl: eyesCorrect, isCorrect: true },
    ],
  },
  {
    key: "brows",
    title: "Угадай брови",
    emoji: "🤨",
    options: [
      { id: 1, imageUrl: browsCorrect, isCorrect: true },
      { id: 2, imageUrl: browsWrong1, isCorrect: false },
      { id: 3, imageUrl: browsWrong2, isCorrect: false },
    ],
  },
  {
    key: "ears",
    title: "Угадай ухо",
    emoji: "👂",
    options: [
      { id: 1, imageUrl: earsWrong1, isCorrect: false },
      { id: 2, imageUrl: earsWrong2, isCorrect: false },
      { id: 3, imageUrl: earsCorrect, isCorrect: true },
      { id: 4, imageUrl: earsWrong3, isCorrect: false },
    ],
  },
  {
    key: "leg",
    title: "Угадай ногу",
    emoji: "🦶",
    options: [
      { id: 1, imageUrl: legWrong1, isCorrect: false },
      { id: 2, imageUrl: legWrong2, isCorrect: false },
      { id: 3, imageUrl: legWrong3, isCorrect: false },
      { id: 5, imageUrl: legCorrect, isCorrect: true },
    ],
  },
  {
    key: "finger",
    title: "Угадай палец",
    emoji: "👍",
    options: [
      { id: 1, imageUrl: fingerWrong1, isCorrect: false },
      { id: 2, imageUrl: fingerCorrect, isCorrect: true },
      { id: 3, imageUrl: fingerWrong2, isCorrect: false },
      { id: 4, imageUrl: fingerWrong3, isCorrect: false },
    ],
  },
];

// ==========================================
// --- ВСПОМОГАТЕЛЬНЫЕ КОМПОНЕНТЫ ФОНА ---
// ==========================================

const SparklesBackground: React.FC = () => {
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

  return (
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
  );
};

const EmeraldParticlesBackground: React.FC = () => {
  const resultParticles = useMemo(() => {
    return Array.from({ length: 25 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      size: `${Math.random() * 7 + 4}px`,
      delay: `${Math.random() * 6}s`,
      duration: `${Math.random() * 5 + 4}s`,
    }));
  }, []);

  return (
    <div className="emerald-particles-container">
      {resultParticles.map((part) => (
        <div
          key={part.id}
          className="emerald-bubble"
          style={{
            left: part.left,
            width: part.size,
            height: part.size,
            animationDelay: part.delay,
            animationDuration: part.duration,
          }}
        />
      ))}
    </div>
  );
};

// ==========================================
// --- МЕЛКИЕ КОМПОНЕНТЫ ИНТЕРФЕЙСА ---
// ==========================================

interface ProgressBarProps {
  current: number;
  total: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ current, total }) => (
  <div className="w-full bg-pink-100 h-2.5 rounded-full mb-6 mt-8 overflow-hidden">
    <div
      className="bg-gradient-to-r from-pink-500 to-purple-500 h-full rounded-full transition-all duration-300"
      style={{ width: `${(current / total) * 100}%` }}
    />
  </div>
);

interface ImageSliderProps {
  imageUrl: string;
  onPrev: () => void;
  onNext: () => void;
}

const ImageSlider: React.FC<ImageSliderProps> = ({
  imageUrl,
  onPrev,
  onNext,
}) => {
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
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
    if (distance > minSwipeDistance) {
      onNext();
    } else if (distance < -minSwipeDistance) {
      onPrev();
    }
  };

  return (
    <div className="relative w-full aspect-square max-w-[200px] mx-auto my-4 group">
      {/* Левая стрелка */}
      <button
        onClick={onPrev}
        className="absolute left-[-24px] top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow-md active:scale-95 transition-transform border border-pink-100 hover:bg-pink-50"
        aria-label="Previous image"
      >
        <span className="text-pink-500 font-black text-lg">←</span>
      </button>

      {/* Контейнер картинки на 100% ширины с сохранением пропорций */}
      <div
        className="w-full h-full rounded-2xl overflow-hidden shadow-inner border-4 border-white bg-white relative cursor-grab active:cursor-grabbing flex items-center justify-center"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <img
          src={imageUrl}
          alt="Feature Option"
          className="w-full max-h-full object-contain pointer-events-none"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-pink-900/10 to-transparent pointer-events-none" />
      </div>

      {/* Правая стрелка */}
      <button
        onClick={onNext}
        className="absolute right-[-24px] top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow-md active:scale-95 transition-transform border border-pink-100 hover:bg-pink-50"
        aria-label="Next image"
      >
        <span className="text-pink-500 font-black text-lg">→</span>
      </button>
    </div>
  );
};

// ==========================================
// --- КАРТОЧКА ШАГА ИГРЫ (КВИЗ) ---
// ==========================================

interface QuizCardProps {
  step: FeatureStep;
  stepIndex: number;
  totalSteps: number;
  optionIndex: number;
  onPrevOption: () => void;
  onNextOption: () => void;
  onSelectOption: () => void;
  onGoBackStep: () => void;
}

const QuizCard: React.FC<QuizCardProps> = ({
  step,
  stepIndex,
  totalSteps,
  optionIndex,
  onPrevOption,
  onNextOption,
  onSelectOption,
  onGoBackStep,
}) => {
  return (
    <div className="w-full bg-white/85 backdrop-blur-md rounded-3xl p-6 shadow-2xl border border-pink-100 flex flex-col items-center animate-step-in relative">
      {stepIndex > 0 && (
        <button
          onClick={onGoBackStep}
          className="absolute left-6 top-6 text-xs font-bold text-pink-500 hover:text-pink-600 transition-colors flex items-center gap-1 uppercase tracking-wider"
        >
          <span>←</span> Назад
        </button>
      )}

      <ProgressBar current={stepIndex + 1} total={totalSteps} />

      <div className="text-center mb-4">
        <span
          className="text-5xl animate-bounce-gentle inline-block"
          role="img"
          aria-label="step-emoji"
        >
          {step.emoji}
        </span>
        <h2 className="text-2xl font-extrabold text-gray-800 mt-2 tracking-tight">
          {step.title}
        </h2>
        <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-2">
          Вариант {optionIndex + 1} из {step.options.length} (свайп 👇)
        </p>
      </div>

      <ImageSlider
        imageUrl={step.options[optionIndex].imageUrl}
        onPrev={onPrevOption}
        onNext={onNextOption}
      />

      {/* Точки-индикаторы */}
      <div className="flex gap-2 my-4">
        {step.options.map((_, index) => (
          <div
            key={index}
            className="h-2 rounded-full transition-all duration-300"
            style={{
              width: index === optionIndex ? "24px" : "8px",
              backgroundColor: index === optionIndex ? "#ec4899" : "#fbcfe8",
            }}
          />
        ))}
      </div>

      <button
        onClick={onSelectOption}
        className="w-full py-4 px-6 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-2xl font-extrabold text-sm uppercase tracking-widest shadow-lg hover:shadow-pink-300/50 hover:scale-[1.02] active:scale-98 transition-all mt-2"
      >
        Выбрать этот вариант ✨
      </button>
    </div>
  );
};

// ==========================================
// --- КАРТОЧКА ФИНАЛЬНЫХ РЕЗУЛЬТАТОВ ---
// ==========================================

interface ResultCardProps {
  score: number;
  totalSteps: number;
  onRestart: () => void;
}

const ResultCard: React.FC<ResultCardProps> = ({
  score,
  totalSteps,
  onRestart,
}) => {
  return (
    <div className="bg-white/90 backdrop-blur-md rounded-3xl p-8 shadow-2xl border border-emerald-100 flex flex-col items-center text-center animate-result-in relative">
      <span className="text-6xl mb-4 animate-bounce-gentle inline-block">
        🎉
      </span>
      <h2 className="text-3xl font-black text-emerald-800 mb-2 tracking-tight">
        Игра окончена!
      </h2>
      <p className="text-emerald-600/80 font-bold mb-6 text-xs uppercase tracking-widest">
        Давай посмотрим, насколько хорошо ты справилась!
      </p>

      {/* Оценка */}
      <div className="bg-gradient-to-br from-emerald-500/10 to-teal-500/10 rounded-2xl p-6 w-full mb-8 border border-emerald-100 shadow-inner">
        <p className="text-xs text-emerald-800 font-extrabold uppercase tracking-widest">
          Твой результат
        </p>
        <div className="text-7xl font-black text-emerald-600 my-2">
          {score} <span className="text-emerald-400 text-4xl">/</span>{" "}
          {totalSteps}
        </div>
        <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">
          правильных ответов
        </p>
      </div>

      <button
        onClick={onRestart}
        className="w-full py-4 px-6 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-2xl font-extrabold text-sm uppercase tracking-widest shadow-lg hover:shadow-emerald-400/50 hover:scale-[1.02] active:scale-98 transition-all"
      >
        Пройти ещё раз 🔄
      </button>
    </div>
  );
};

// ==========================================
// --- ОСНОВНОЙ КОМПОНЕНТ ПРИЛОЖЕНИЯ ---
// ==========================================

export default function App() {
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [currentOptionIndex, setCurrentOptionIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [isFinished, setIsFinished] = useState<boolean>(false);

  const currentStep = GAME_DATA[currentStepIndex];
  const totalSteps = GAME_DATA.length;

  // Расчет баллов
  const score = useMemo(() => {
    let currentScore = 0;
    GAME_DATA.forEach((step) => {
      const userAnswerId = answers[step.key];
      const correctOption = step.options.find((opt) => opt.isCorrect);
      if (correctOption && userAnswerId === correctOption.id) {
        currentScore += 1;
      }
    });
    return currentScore;
  }, [answers]);

  // Салют в конце игры при максимуме баллов
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
          colors: ["#10b981", "#34d399", "#6ee7b7", "#a7f3d0"],
        });
        confetti({
          particleCount: 4,
          angle: 120,
          spread: 55,
          origin: { x: 1, y: 0.8 },
          colors: ["#10b981", "#34d399", "#6ee7b7", "#a7f3d0"],
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };
      frame();
    }
  }, [isFinished, score, totalSteps]);

  // Смена вариантов картинок
  const handlePrevOption = () => {
    setCurrentOptionIndex((prev) =>
      prev === 0 ? currentStep.options.length - 1 : prev - 1,
    );
  };

  const handleNextOption = () => {
    setCurrentOptionIndex((prev) =>
      prev === currentStep.options.length - 1 ? 0 : prev + 1,
    );
  };

  // Выбор варианта и переход вперед
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

  // Возврат на предыдущий шаг
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

  const handleRestart = () => {
    setCurrentStepIndex(0);
    setCurrentOptionIndex(0);
    setAnswers({});
    setIsFinished(false);
  };

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-between p-4 select-none overflow-x-hidden relative transition-all duration-1000 ${
        isFinished ? "emerald-glow-bg" : "sparkling-bg"
      }`}
    >
      {/* Декоративный динамический фон */}
      {isFinished ? <EmeraldParticlesBackground /> : <SparklesBackground />}

      {/* Верхний заголовок девичника (скрывается в конце) */}
      {!isFinished && (
        <header className="w-full max-w-md text-center mt-4 z-10">
          <h1 className="text-4xl font-black text-white drop-shadow-[0_4px_6px_rgba(0,0,0,0.15)] tracking-wide title-shadow">
            Девичник квиз ✨
          </h1>
          <p className="text-2xl text-pink-900 font-romantic mt-2 font-medium">
            Кто из них Гриша?
          </p>
        </header>
      )}

      {/* Главный контейнер игры */}
      <main className="w-full max-w-md flex-1 flex flex-col justify-center my-6 z-10">
        {!isFinished ? (
          <QuizCard
            key={currentStepIndex}
            step={currentStep}
            stepIndex={currentStepIndex}
            totalSteps={totalSteps}
            optionIndex={currentOptionIndex}
            onPrevOption={handlePrevOption}
            onNextOption={handleNextOption}
            onSelectOption={handleSelectOption}
            onGoBackStep={handleGoBackStep}
          />
        ) : (
          <ResultCard
            score={score}
            totalSteps={totalSteps}
            onRestart={handleRestart}
          />
        )}
      </main>
    </div>
  );
}
