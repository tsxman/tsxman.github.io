import mouthCorrect from "./assets/images/mouth-correct.png";
import mouthWrong1 from "./assets/images/mouth-wrong1.jpeg";
import mouthWrong2 from "./assets/images/mouth-wrong2.jpeg";
import mouthWrong3 from "./assets/images/mouth-wrong3.png";

import noseCorrect from "./assets/images/nose-correct.png";
import noseWrong1 from "./assets/images/nose-wrong1.jpeg";
import noseWrong2 from "./assets/images/nose-wrong2.jpeg";
import noseWrong3 from "./assets/images/nose-wrong3.jpeg";
import noseWrong4 from "./assets/images/nose-wrong4.jpeg";

import eyesCorrect from "./assets/images/eyes-correct.jpeg";
import eyesWrong1 from "./assets/images/eyes-wrong1.jpeg";
import eyesWrong2 from "./assets/images/eyes-wrong2.jpeg";
import eyesWrong3 from "./assets/images/eyes-wrong3.jpeg";

import browsCorrect from "./assets/images/brows-correct.jpeg";
import browsWrong1 from "./assets/images/brows-wrong1.png";
import browsWrong2 from "./assets/images/brows-wrong2.jpeg";

import earsCorrect from "./assets/images/ears-correct.jpeg";
import earsWrong1 from "./assets/images/ears-wrong1.jpeg";
import earsWrong2 from "./assets/images/ears-wrong2.jpeg";
import earsWrong3 from "./assets/images/ears-wrong3.jpeg";

import legCorrect from "./assets/images/leg-correct.png";
import legWrong1 from "./assets/images/leg-wrong1.jpeg";
import legWrong2 from "./assets/images/leg-wrong2.jpeg";
import legWrong3 from "./assets/images/leg-wrong3.jpeg";

import fingerCorrect from "./assets/images/finger-correct.jpeg";
import fingerWrong1 from "./assets/images/finger-wrong1.png";
import fingerWrong2 from "./assets/images/finger-wrong2.png";
import fingerWrong3 from "./assets/images/finger-wrong3.png";

interface ImageGameOption {
  id: number;
  imageUrl: string;
  isCorrect: boolean;
}

export interface ImageGameStep {
  key: "mouth" | "nose" | "eyes" | "brows" | "ears" | "leg" | "finger";
  title: string;
  emoji: string;
  options: ImageGameOption[];
}

export const IMAGE_GAME_DATA: ImageGameStep[] = [
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
