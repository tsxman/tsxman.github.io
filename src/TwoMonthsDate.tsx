import {
  Briefcase,
  Building2,
  Calendar,
  Clock,
  Heart,
  Home,
  MapPin,
  Shirt,
  Sparkles,
  Star,
} from "lucide-react";
import React, { useEffect, useState } from "react";

interface Petal {
  id: number;
  left: number;
  size: number;
  animationDuration: number;
  animationDelay: number;
  opacity: number;
  rotate: number;
}

const PetalsBackground: React.FC = () => {
  const [petals, setPetals] = useState<Petal[]>([]);

  useEffect(() => {
    const generatedPetals: Petal[] = Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: Math.random() * 18 + 12,
      animationDuration: Math.random() * 8 + 8,
      animationDelay: Math.random() * 10,
      opacity: Math.random() * 0.7 + 0.3,
      rotate: Math.random() * 360,
    }));
    setPetals(generatedPetals);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {petals.map((p) => (
        <div
          key={p.id}
          className="absolute animate-petal-fall"
          style={{
            left: `${p.left}%`,
            width: `${p.size}px`,
            height: `${p.size * 1.3}px`,
            opacity: p.opacity,
            animationDuration: `${p.animationDuration}s`,
            animationDelay: `${p.animationDelay}s`,
            transform: `rotate(${p.rotate}deg)`,
          }}
        >
          <svg viewBox="0 0 30 40" className="w-full h-full drop-shadow-sm">
            <path
              d="M15,0 C25,10 30,22 25,32 C20,40 10,40 5,32 C0,22 5,10 15,0 Z"
              fill="url(#petal-gradient)"
            />
            <defs>
              <linearGradient
                id="petal-gradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#f3e8ff" stopOpacity="0.9" />
                <stop offset="50%" stopColor="#d8b4fe" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#c084fc" stopOpacity="0.9" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      ))}
    </div>
  );
};

export const TwoMonthsDate: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-fuchsia-50 to-indigo-50 text-slate-800 flex items-center justify-center p-3 sm:p-6 relative overflow-x-hidden font-sans">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Great+Vibes&family=Montserrat:wght@300;400;500;600;700&display=swap');

        .font-serif-luxury {
          font-family: 'Cormorant Garamond', serif;
        }
        .font-cursive {
          font-family: 'Great Vibes', cursive;
        }
        .font-sans-clean {
          font-family: 'Montserrat', sans-serif;
        }

        @keyframes petalFall {
          0% {
            top: -10%;
            transform: translateX(0) rotate(0deg);
          }
          50% {
            transform: translateX(60px) rotate(180deg);
          }
          100% {
            top: 110%;
            transform: translateX(-30px) rotate(360deg);
          }
        }

        .animate-petal-fall {
          animation: petalFall linear infinite;
        }

        @keyframes pulseGlow {
          0%, 100% {
            box-shadow: 0 10px 40px rgba(192, 132, 252, 0.25), 0 0 20px rgba(233, 213, 255, 0.4);
          }
          50% {
            box-shadow: 0 15px 50px rgba(168, 85, 247, 0.35), 0 0 30px rgba(192, 132, 252, 0.6);
          }
        }

        .glow-card {
          animation: pulseGlow 5s infinite ease-in-out;
        }

        @keyframes shimmer {
          0% {
            background-position: -200% center;
          }
          100% {
            background-position: 200% center;
          }
        }

        @keyframes textGlow {
          0%, 100% {
            filter: drop-shadow(0 0 8px rgba(192, 132, 252, 0.4));
          }
          50% {
            filter: drop-shadow(0 0 18px rgba(216, 180, 254, 0.8));
          }
        }

        .sparkle-text {
          background: linear-gradient(
            110deg,
            #6b21a8 0%,
            #c084fc 25%,
            #ffffff 45%,
            #e879f9 55%,
            #4c1d95 100%
          );
          background-size: 200% auto;
          color: transparent;
          -webkit-background-clip: text;
          background-clip: text;
          animation: shimmer 3.5s linear infinite, textGlow 3s ease-in-out infinite;
        }
      `}</style>

      <PetalsBackground />

      <div className="fixed top-1/4 -left-32 w-96 h-96 bg-purple-300/30 rounded-full blur-3xl pointer-events-none" />
      <div className="fixed bottom-1/4 -right-32 w-96 h-96 bg-fuchsia-300/30 rounded-full blur-3xl pointer-events-none" />
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-200/40 rounded-full blur-[120px] pointer-events-none" />

      <main className="max-w-xl w-full bg-white/80 backdrop-blur-xl border border-purple-200/80 rounded-[2.5rem] shadow-xl overflow-hidden relative z-10 glow-card my-6 transition-all duration-500 font-sans-clean">
        <div className="px-6 pt-6 pb-2 flex items-center justify-between">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-100/80 border border-purple-200 text-purple-700 text-xs tracking-wider uppercase font-semibold">
            <Sparkles
              className="w-3.5 h-3.5 text-purple-500 animate-spin"
              style={{ animationDuration: "6s" }}
            />
            Особенное свидание
          </div>
        </div>

        <div className="p-6 text-center space-y-4">
          <div className="space-y-1">
            <p className="font-cursive text-3xl sm:text-4xl text-purple-600 font-normal">
              Моя дорогая
            </p>

            <h1 className="font-serif-luxury text-5xl sm:text-6xl font-bold tracking-wide sparkle-text inline-block py-1">
              Вера
            </h1>

            <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-purple-300 to-transparent mx-auto mt-2" />
          </div>

          <p className="text-purple-900/80 text-sm max-w-md mx-auto font-normal leading-relaxed">
            Приглашаю тебя отметить наши 2 месяца отношений высоко над городом!
          </p>

          <div className="relative group max-w-sm mx-auto my-4 rounded-3xl overflow-hidden border-2 border-purple-200 shadow-lg bg-purple-50">
            <div className="aspect-[4/3] w-full overflow-hidden relative">
              <img
                src={
                  "https://sun9-85.vkuserphoto.ru/s/v1/ig2/H6xsoMbIQqQwslnEXFaBWr-AU4K37RXxQThcm1rsgIlhbgwiZnz9owjEWXTEIZHePnj5NhyD4Bjzh2YVUIcqlxQq.jpg?quality=95&as=32x24,48x36,72x54,108x81,160x120,240x180,360x270,480x360,540x405,640x480,720x540,1080x810,1280x960,1440x1080,2560x1920&from=bu&cs=2560x0"
                }
                alt="Наша фотка из Питера"
                className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-purple-950/40 via-transparent to-transparent" />

              <div className="absolute top-3 right-3 bg-white/80 backdrop-blur-md px-3 py-1 rounded-full border border-purple-200 flex items-center gap-1.5 text-xs text-purple-800 font-medium shadow-sm">
                <Heart className="w-3.5 h-3.5 fill-fuchsia-500 text-fuchsia-500" />
                <span>2 месяца вместе</span>
              </div>
            </div>
          </div>
        </div>

        <div className="px-6 pb-6 space-y-4">
          <div className="text-center">
            <h2 className="font-serif-luxury text-2xl text-purple-950 font-bold tracking-wide flex items-center justify-center gap-2">
              <Star className="w-4 h-4 text-purple-400 fill-purple-300" />
              Всё о нашем свидании
              <Star className="w-4 h-4 text-purple-400 fill-purple-300" />
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="bg-purple-50/60 border border-purple-200/60 rounded-2xl p-4 flex items-center gap-3 hover:border-purple-300 hover:-translate-y-0.5 transition-all shadow-sm">
              <div className="p-3 bg-white text-purple-600 rounded-xl border border-purple-100 shrink-0 shadow-sm">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[11px] text-purple-600/80 font-medium uppercase tracking-wider">
                  Дата
                </p>
                <p className="text-base font-bold text-slate-800">
                  4 августа 2026
                </p>
              </div>
            </div>

            <div className="bg-purple-50/60 border border-purple-200/60 rounded-2xl p-4 flex items-center gap-3 hover:border-purple-300 hover:-translate-y-0.5 transition-all shadow-sm">
              <div className="p-3 bg-white text-purple-600 rounded-xl border border-purple-100 shrink-0 shadow-sm">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[11px] text-purple-600/80 font-medium uppercase tracking-wider">
                  Время
                </p>
                <p className="text-base font-bold text-slate-800">19:30</p>
              </div>
            </div>

            <div className="bg-purple-50/60 border border-purple-200/60 rounded-2xl p-4 flex flex-col gap-3 sm:col-span-2 hover:border-purple-300 hover:-translate-y-0.5 transition-all shadow-sm">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-white text-purple-600 rounded-xl border border-purple-100 shrink-0 shadow-sm">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[11px] text-purple-600/80 font-medium uppercase tracking-wider">
                    Место встречи
                  </p>
                  <p className="text-base font-bold text-slate-800">
                    Москва-Сити, выход 2
                  </p>
                  <p className="text-xs text-purple-700/80 font-medium mt-0.5">
                    Буду ждать тебя там с букетом цветов 💐
                  </p>
                </div>
              </div>

              <div className="flex flex-col items-center gap-2 pt-3 border-t border-purple-200/50 text-center">
                <span className="text-[11px] text-purple-700/70 font-semibold uppercase tracking-wider">
                  Как добраться?
                </span>

                <div className="flex flex-col sm:flex-row gap-2 w-full pt-1">
                  <a
                    href="https://yandex.ru/maps/213/moscow/?ll=37.583856%2C55.779808&mode=routes&rtext=55.810395%2C37.557906~55.748709%2C37.533333&rtt=mt&ruri=ymapsbm1%3A%2F%2Fgeo%3Fdata%3DCgg1Njc2MTgyMxI70KDQvtGB0YHQuNGPLCDQnNC-0YHQutCy0LAsINGD0LvQuNGG0LAg0JLRg9GH0LXRgtC40YfQsCwgMTMiCg1MOxZCFdg9X0I%2C~&z=12.88"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white hover:bg-purple-100/50 border border-purple-200/80 text-purple-800 text-xs font-semibold shadow-sm transition-all duration-200 active:scale-95"
                  >
                    <Home className="w-4 h-4 text-purple-500" />
                    <span>Из дома</span>
                  </a>

                  <a
                    href="https://yandex.ru/maps/213/moscow/?ll=37.574700%2C55.778357&mode=routes&rtext=55.801203%2C37.551748~55.748709%2C37.533333&rtt=mt&ruri=ymapsbm1%3A%2F%2Forg%3Foid%3D1103721537~&z=13.03"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white hover:bg-purple-100/50 border border-purple-200/80 text-purple-800 text-xs font-semibold shadow-sm transition-all duration-200 active:scale-95"
                  >
                    <Briefcase className="w-4 h-4 text-purple-500" />
                    <span>С работы</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-purple-100 via-fuchsia-50 to-indigo-100 border border-purple-200/80 p-5 shadow-sm">
            <div className="flex items-start gap-3.5 relative z-10">
              <div className="p-3 bg-gradient-to-br from-purple-600 to-fuchsia-600 text-white rounded-xl shadow-md shrink-0">
                <Building2 className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-purple-200 text-purple-800 tracking-wider">
                    354 МЕТРА НАД ЗЕМЛЕЙ
                  </span>
                </div>
                <h3 className="font-serif-luxury text-xl font-bold text-slate-800">
                  Ресторан на вершине самой высокой башни
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                  Уютный вечер на огромной высоте: отличный панорамный вид,
                  вкусная еда и мы вдвоём 💜
                </p>
              </div>
            </div>
          </div>

          <div className="bg-amber-50/80 border border-amber-200/80 rounded-2xl p-4 flex items-start gap-3.5 shadow-sm">
            <div className="p-2.5 bg-amber-100 text-amber-700 rounded-xl border border-amber-200 shrink-0 mt-0.5">
              <Shirt className="w-5 h-5" />
            </div>
            <div className="space-y-0.5">
              <p className="text-xs font-bold text-amber-800 flex items-center gap-1.5">
                <span>Дресс-код</span>
              </p>
              <p className="text-xs text-amber-900/80 leading-relaxed">
                В ресторане лёгкий вечерний стиль (без спортивной одежды)
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
