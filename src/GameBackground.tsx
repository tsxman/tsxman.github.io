import React, { useMemo } from "react";

interface GameBackgroundProps {
  mode:
    | "sparkling"
    | "emerald"
    | "cosmic"
    | "sunset"
    | "mint"
    | "candy"
    | "lemon"
    | "lavender";
  children: React.ReactNode;
}

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

const CosmicBackground: React.FC = () => {
  const stars = useMemo(() => {
    // Палитра космических цветов (белый, голубой, фиолетовый/розовый, золотистый)
    const colors = [
      "rgba(255, 255, 255, 1)", // Белый
      "rgba(173, 216, 230, 1)", // Светло-голубой
      "rgba(255, 182, 193, 1)", // Нежно-розовый
      "rgba(255, 223, 186, 1)", // Золотистый/кремовый
      "rgba(224, 176, 255, 1)", // Лавандовый
    ];

    // Увеличили количество до 150
    return Array.from({ length: 150 }).map((_, i) => {
      const color = colors[Math.floor(Math.random() * colors.length)];

      return {
        id: i,
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        size: `${Math.random() * 3 + 1}px`,
        delay: `${Math.random() * 5}s`,
        duration: `${Math.random() * 4 + 2}s`,
        opacity: Math.random() * 0.7 + 0.3,
        color: color,
      };
    });
  }, []);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
        zIndex: 1,
      }}
    >
      <style>{`
        @keyframes cosmicPulse {
          0%, 100% { opacity: 0.2; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1.3); }
        }
      `}</style>
      {stars.map((star) => (
        <div
          key={star.id}
          style={{
            position: "absolute",
            top: star.top,
            left: star.left,
            width: star.size,
            height: star.size,
            backgroundColor: star.color,
            borderRadius: "50%",
            // Свечение теперь соответствует цвету самой звезды
            boxShadow: `0 0 8px ${star.color.replace("1)", "0.8)")}`,
            opacity: star.opacity,
            animation: `cosmicPulse ${star.duration} ease-in-out infinite`,
            animationDelay: star.delay,
          }}
        />
      ))}
    </div>
  );
};

const SunsetBackground: React.FC = () => {
  const hearts = useMemo(() => {
    return Array.from({ length: 150 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      size: `${Math.random() * 10 + 12}px`,
      delay: `${Math.random() * 8}s`,
      duration: `${Math.random() * 6 + 5}s`,
    }));
  }, []);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
        zIndex: 1,
      }}
    >
      <style>{`
        @keyframes floatUpHeart {
          0% { transform: translateY(105vh) scale(0.8) rotate(0deg); opacity: 0; }
          10% { opacity: 0.6; }
          90% { opacity: 0.6; }
          100% { transform: translateY(-10vh) scale(1.2) rotate(25deg); opacity: 0; }
        }
      `}</style>
      {hearts.map((heart) => (
        <div
          key={heart.id}
          style={{
            position: "absolute",
            left: heart.left,
            top: 0,
            fontSize: heart.size,
            animation: `floatUpHeart ${heart.duration} linear infinite`,
            animationDelay: heart.delay,
            transform: "translateY(105vh)",
          }}
        >
          ❤️
        </div>
      ))}
    </div>
  );
};

const MintBackground: React.FC = () => {
  const bubbles = useMemo(() => {
    return Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      size: `${Math.random() * 15 + 8}px`,
      delay: `${Math.random() * 6}s`,
      duration: `${Math.random() * 7 + 5}s`,
    }));
  }, []);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
        zIndex: 1,
      }}
    >
      <style>{`
        @keyframes mintFloat {
          0% { transform: translateY(105vh) translateX(0); opacity: 0; }
          10% { opacity: 0.5; }
          50% { transform: translateY(50vh) translateX(15px); opacity: 0.5; }
          90% { opacity: 0.5; }
          100% { transform: translateY(-10vh) translateX(-15px); opacity: 0; }
        }
      `}</style>
      {bubbles.map((bubble) => (
        <div
          key={bubble.id}
          style={{
            position: "absolute",
            left: bubble.left,
            top: 0,
            width: bubble.size,
            height: bubble.size,
            borderRadius: "50%",
            border: "2px solid rgba(255, 255, 255, 0.6)",
            background: "rgba(255, 255, 255, 0.15)",
            boxShadow: "0 0 6px rgba(255, 255, 255, 0.3)",
            animation: `mintFloat ${bubble.duration} ease-in-out infinite`,
            animationDelay: bubble.delay,
            transform: "translateY(105vh)",
          }}
        />
      ))}
    </div>
  );
};

const CandyBackground: React.FC = () => {
  const shapes = useMemo(() => {
    const colors = ["#ffedff", "#ffd3e8", "#d1f5ff", "#fffcd1"];
    return Array.from({ length: 25 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: `${Math.random() * 6 + 4}px`,
      color: colors[Math.floor(Math.random() * colors.length)],
      delay: `${Math.random() * 4}s`,
      duration: `${Math.random() * 4 + 3}s`,
    }));
  }, []);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
        zIndex: 1,
      }}
    >
      <style>{`
        @keyframes candySpin {
          0% { transform: rotate(0deg) scale(0.8); opacity: 0.3; }
          50% { transform: rotate(180deg) scale(1.2); opacity: 0.8; }
          100% { transform: rotate(360deg) scale(0.8); opacity: 0.3; }
        }
      `}</style>
      {shapes.map((shape) => (
        <div
          key={shape.id}
          style={{
            position: "absolute",
            left: shape.left,
            top: shape.top,
            width: shape.size,
            height: shape.size,
            backgroundColor: shape.color,
            borderRadius: Math.random() > 0.5 ? "50%" : "3px",
            animation: `candySpin ${shape.duration} ease-in-out infinite`,
            animationDelay: shape.delay,
          }}
        />
      ))}
    </div>
  );
};

const LemonBackground: React.FC = () => {
  const petals = useMemo(() => {
    return Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 7}s`,
      duration: `${Math.random() * 8 + 6}s`,
      size: `${Math.random() * 8 + 6}px`,
    }));
  }, []);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
        zIndex: 1,
      }}
    >
      <style>{`
        @keyframes petalFall {
          0% { transform: translateY(-10vh) rotate(0deg); opacity: 0; }
          10% { opacity: 0.7; }
          90% { opacity: 0.7; }
          100% { transform: translateY(105vh) rotate(360deg); opacity: 0; }
        }
      `}</style>
      {petals.map((petal) => (
        <div
          key={petal.id}
          style={{
            position: "absolute",
            left: petal.left,
            top: 0,
            width: petal.size,
            height: `calc(${petal.size} * 1.4)`,
            backgroundColor: "#fffbeb",
            borderRadius: "100% 0% 100% 0%",
            boxShadow: "0 2px 5px rgba(251, 191, 36, 0.2)",
            animation: `petalFall ${petal.duration} linear infinite`,
            animationDelay: petal.delay,
            transform: "translateY(-10vh)",
          }}
        />
      ))}
    </div>
  );
};

const LavenderBackground: React.FC = () => {
  const specks = useMemo(() => {
    return Array.from({ length: 25 }).map((_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: `${Math.random() * 5 + 3}px`,
      delay: `${Math.random() * 5}s`,
      duration: `${Math.random() * 6 + 4}s`,
    }));
  }, []);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
        zIndex: 1,
      }}
    >
      <style>{`
        @keyframes lavenderGlow {
          0%, 100% { transform: scale(1) translate(0, 0); opacity: 0.2; }
          50% { transform: scale(1.3) translate(10px, -10px); opacity: 0.7; }
        }
      `}</style>
      {specks.map((speck) => (
        <div
          key={speck.id}
          style={{
            position: "absolute",
            top: speck.top,
            left: speck.left,
            width: speck.size,
            height: speck.size,
            backgroundColor: "#eeddff",
            borderRadius: "50%",
            boxShadow: "0 0 10px #c084fc",
            animation: `lavenderGlow ${speck.duration} ease-in-out infinite`,
            animationDelay: speck.delay,
          }}
        />
      ))}
    </div>
  );
};

export const GameBackground: React.FC<GameBackgroundProps> = ({
  mode,
  children,
}) => {
  const style = useMemo(() => {
    switch (mode) {
      case "cosmic":
        return {
          background:
            "linear-gradient(135deg, #0f0c20 0%, #15103c 50%, #2b1055 100%)",
        };
      case "sunset":
        return {
          background: "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)",
        };
      case "mint":
        return {
          background: "linear-gradient(135deg, #96e6a1 0%, #d4fc79 100%)",
        };
      case "candy":
        return {
          background: "linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 100%)",
        };
      case "lemon":
        return {
          background: "linear-gradient(135deg, #f6d365 0%, #fda085 100%)",
        };
      case "lavender":
        return {
          background: "linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)",
        };
      case "emerald":
      case "sparkling":
      default:
        return {};
    }
  }, [mode]);

  const bgClass = useMemo(() => {
    switch (mode) {
      case "emerald":
        return "emerald-glow-bg";
      case "sparkling":
        return "sparkling-bg";
      default:
        return "";
    }
  }, [mode]);

  return (
    <div
      style={style}
      className={`min-h-screen flex flex-col items-center justify-between p-4 select-none overflow-x-hidden relative transition-all duration-1000 ${bgClass}`}
    >
      {mode === "sparkling" && <SparklesBackground />}
      {mode === "emerald" && <EmeraldParticlesBackground />}
      {mode === "cosmic" && <CosmicBackground />}
      {mode === "sunset" && <SunsetBackground />}
      {mode === "mint" && <MintBackground />}
      {mode === "candy" && <CandyBackground />}
      {mode === "lemon" && <LemonBackground />}
      {mode === "lavender" && <LavenderBackground />}
      {children}
    </div>
  );
};
