import { useState } from "react";
import { GameBackground } from "./GameBackground";
import { QUIZ_GAME_DATA, type QuizGameStep } from "./QuizGameData";
import { AnimatedPercentage } from "./AnimatedPercentage";

interface GameStepProps {
  step: QuizGameStep;
  onAnswer: (answerId: number) => void;
  onBack: () => void;
  canGoBack: boolean;
}

const GameStep = ({ step, onAnswer, onBack, canGoBack }: GameStepProps) => {
  const [selectedAnswer, setSelectedAnswer] = useState<number>(0);

  const handleSelectAnswer = (id: number) => {
    setSelectedAnswer(id);
  };

  return (
    <div className="max-w-md w-full mx-auto p-6 rounded-3xl bg-white/10 backdrop-blur-md border border-purple-300/20 shadow-xl text-center text-white select-none animate-[fadeIn_0.4s_ease-out]">
      <div className="mb-6">
        <div className="relative inline-flex items-center justify-center mb-3 h-14 w-14 mx-auto select-none animate-[bounce_4s_infinite_ease-in-out]">
          {/* Стили для цикличного сверкания и выброса энергии */}
          <style>{`
    @keyframes flare {
      0%, 80%, 100% {
        transform: scale(0.0);
        box-shadow: 0 0 10px rgba(168, 85, 247, 0.2), 
                    inset 0 0 10px rgba(236, 72, 153, 0.2);
        opacity: 0.3;
      }
      85% {
        transform: scale(1.1);
        box-shadow: 0 0 25px rgba(236, 72, 153, 0.8), 
                    0 0 40px rgba(168, 85, 247, 0.6),
                    inset 0 0 15px rgba(255, 255, 255, 0.6);
        opacity: 0.9;
      }
      90% {
        transform: scale(1.25);
        box-shadow: 0 0 35px rgba(255, 255, 255, 0.9), 
                    0 0 50px rgba(236, 72, 153, 0.7),
                    inset 0 0 20px rgba(255, 255, 255, 0.8);
        opacity: 1;
      }
      95% {
        transform: scale(1.4);
        box-shadow: 0 0 45px rgba(168, 85, 247, 0), 
                    0 0 60px rgba(236, 72, 153, 0),
                    inset 0 0 30px rgba(255, 255, 255, 0);
        opacity: 0;
      }
    }
    .animate-flare {
      animation: flare 8s infinite cubic-bezier(0.25, 1, 0.5, 1);
    }
  `}</style>

          {/* Сверкающая обводка-аура на заднем плане */}
          <div className="absolute inset-0 rounded-full border border-purple-300/40 bg-gradient-to-tr from-purple-500/20 to-pink-500/20 backdrop-blur-sm animate-flare" />

          {/* Дополнительное мягкое свечение внутри обводки */}
          <div className="absolute inset-2 rounded-full bg-white/10 blur-sm animate-pulse" />

          {/* Твой эмодзи, который остается четким и качается вместе с обводкой */}
          <span className="relative text-4xl z-10 drop-shadow-[0_2px_8px_rgba(255,255,255,0.3)]">
            ✨
          </span>
        </div>
        <h2 className="text-xl font-bold tracking-wide bg-gradient-to-r from-purple-200 to-pink-200 bg-clip-text text-transparent">
          {step.question}
        </h2>
      </div>

      <div className="space-y-3 mb-6" style={{ minWidth: "325px" }}>
        {step.answers.map((answer, index) => {
          const isSelected = selectedAnswer === answer.id;

          // Рассчитываем небольшую задержку появления для каждого варианта ответа, чтобы они всплывали по очереди
          const animationDelay = `${index * 70}ms`;

          return (
            <label
              key={answer.id}
              style={{ animationDelay }}
              className={`flex items-center justify-between px-5 py-4 rounded-2xl cursor-pointer border-2 transition-all duration-300 transform active:scale-95 animate-[slideUp_0.4s_ease-out_both] ${
                isSelected
                  ? "bg-gradient-to-r from-purple-500/40 to-pink-500/40 border-purple-400 shadow-[0_0_20px_rgba(168,85,247,0.5)] font-bold scale-[1.01]"
                  : "bg-purple-950/40 border-purple-800/40 hover:border-purple-500/50 hover:bg-purple-900/30 hover:shadow-[0_0_10px_rgba(168,85,247,0.15)] text-purple-200/90"
              }`}
            >
              <span className="text-left text-purple-100 transition-colors duration-300">
                {answer.text}
              </span>

              <div className="relative flex items-center justify-center">
                <input
                  type="radio"
                  name={`question-${step.id}`}
                  checked={isSelected}
                  onChange={() => handleSelectAnswer(answer.id)}
                  className="sr-only"
                />
                <div
                  className={`w-5 h-5 rounded-full border-2 transition-all duration-300 ${
                    isSelected
                      ? "border-pink-300 bg-pink-400 scale-110 shadow-[0_0_8px_rgba(244,63,94,0.6)]"
                      : "border-purple-400 hover:scale-105"
                  }`}
                >
                  {isSelected && (
                    <div className="absolute inset-0 m-auto w-2 h-2 bg-white rounded-full animate-ping opacity-75" />
                  )}
                </div>
              </div>
            </label>
          );
        })}
      </div>

      {/* Контейнер для кнопок с плавной анимацией смены кнопок */}
      <div className="h-16 flex items-center justify-center">
        {selectedAnswer ? (
          <button
            onClick={() => onAnswer(selectedAnswer)}
            className="w-full py-4 px-6 bg-gradient-to-r from-purple-400 via-purple-600 to-purple-800 text-white rounded-2xl font-extrabold text-sm uppercase tracking-widest shadow-lg hover:shadow-pink-400/30 hover:scale-[1.02] active:scale-98 transition-all mt-2 animate-[popIn_0.2s_ease-out]"
          >
            Ответить
          </button>
        ) : (
          canGoBack && (
            <button
              onClick={onBack}
              className="w-full py-4 px-6 bg-purple-950/20 hover:bg-purple-900/40 text-purple-300/80 hover:text-purple-200 border border-purple-400/20 hover:border-purple-400/40 rounded-2xl font-bold text-sm uppercase tracking-widest active:scale-98 transition-all mt-2 animate-[popIn_0.2s_ease-out]"
            >
              ← Назад
            </button>
          )
        )}
      </div>
    </div>
  );
};

export const QuizGame = () => {
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [answersHistory, setAnswersHistory] = useState<boolean[]>([]);

  const currentStep = QUIZ_GAME_DATA[currentStepIndex];

  const handleAnswer = (answerId: number) => {
    if (!currentStep) return;
    const chosenAnswer = currentStep.answers.find((ans) => ans.id === answerId);
    const isCorrect = !!chosenAnswer?.isCorrect;

    setAnswersHistory((prev) => [...prev, isCorrect]);
    setCurrentStepIndex((prev) => prev + 1);
  };

  const handleBack = () => {
    if (currentStepIndex > 0) {
      setAnswersHistory((prev) => prev.slice(0, -1));
      setCurrentStepIndex((prev) => prev - 1);
    }
  };

  const correctAnswersCount = answersHistory.filter(Boolean).length;
  const totalQuestions = QUIZ_GAME_DATA.length;
  const correctPercent =
    totalQuestions > 0
      ? Math.round((correctAnswersCount / totalQuestions) * 100)
      : 0;

  const handleRestart = () => {
    setCurrentStepIndex(0);
    setAnswersHistory([]);
  };

  return (
    <GameBackground mode="cosmic">
      {/* Добавлены кастомные стили keyframes прямо внутри, чтобы анимации работали «из коробки» без настройки tailwind.config.js */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.98); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes popIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes pulseGlow {
          0%, 100% {
            text-shadow: 0 0 16px rgba(255, 255, 255, 0.5),
                         0 0 30px rgba(255, 255, 255, 0.2);
          }
          50% {
            text-shadow: 0 0 35px rgba(255, 255, 255, 0.9),
                         0 0 50px rgba(255, 255, 255, 0.5),
                         0 0 70px rgba(255, 255, 255, 0.3);
          }
        }
      `}</style>

      <div className="min-h-screen flex items-center justify-center p-4 bg-radial-gradient">
        {currentStep ? (
          <GameStep
            key={currentStepIndex}
            step={currentStep}
            onAnswer={handleAnswer}
            onBack={handleBack}
            canGoBack={currentStepIndex > 0}
          />
        ) : (
          <div className="text-center p-8 bg-white/10 backdrop-blur-md rounded-3xl border border-purple-300/20 text-white max-w-sm w-full mx-auto animate-[fadeIn_0.5s_ease-out]">
            <span className="text-5xl block mb-4 animate-[bounce_2s_infinite]">
              🎉
            </span>
            <h2 className="text-2xl font-black text-purple-200 tracking-wide animate-[pulse_3s_infinite]">
              Ура, игра окончена!
            </h2>

            <div className="bg-gradient-to-br mt-6 from-purple-500/10 to-teal-500/10 rounded-2xl p-6 w-full mb-6 border border-purple-300/30 shadow-inner group transition-all duration-500 hover:border-purple-400/50">
              <p className="text-xs text-purple-200 font-extrabold uppercase tracking-widest transition-transform duration-300 group-hover:scale-105">
                Ты знаешь его на
              </p>
              <div className="text-7xl font-black text-white my-3 tracking-tighter animate-[pulseGlow_2s_infinite_ease-in-out]">
                <AnimatedPercentage value={correctPercent} />
              </div>
              <p className="text-sm text-purple-300/80 mt-1">
                Правильных ответов: {correctAnswersCount} из {totalQuestions}
              </p>
            </div>

            <button
              onClick={handleRestart}
              className="w-full py-3 px-6 bg-purple-600/40 hover:bg-purple-600/60 text-white border border-purple-400/40 rounded-xl font-bold text-sm uppercase tracking-wider transition-all active:scale-95 hover:shadow-[0_0_15px_rgba(168,85,247,0.3)]"
            >
              Попробовать снова
            </button>
          </div>
        )}
      </div>
    </GameBackground>
  );
};
