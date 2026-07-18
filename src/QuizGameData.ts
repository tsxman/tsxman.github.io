interface QuizGameAnswser {
  id: number;
  text: string;
  isCorrect: boolean;
}

export interface QuizGameStep {
  id: number;
  question: string;
  answers: QuizGameAnswser[];
}

export const QUIZ_GAME_DATA: QuizGameStep[] = [
  {
    id: 1,
    question: "Любимый цвет",
    answers: [
      { id: 1, text: "Синий", isCorrect: false },
      { id: 2, text: "Зеленый", isCorrect: false },
      { id: 3, text: "Белый", isCorrect: false },
      { id: 4, text: "Серый", isCorrect: true },
    ],
  },
  {
    id: 2,
    question: "Нелюбимый предмет в школе",
    answers: [
      { id: 1, text: "Иностранный язык", isCorrect: true },
      { id: 2, text: "Алгебра", isCorrect: false },
      { id: 3, text: "Биология", isCorrect: false },
      { id: 4, text: "Информатика", isCorrect: false },
    ],
  },
  {
    id: 3,
    question: "Какой напиток я возьму в баре первым?",
    answers: [
      { id: 1, text: "Виски с колой", isCorrect: false },
      { id: 2, text: "Пиво", isCorrect: true },
      { id: 3, text: "Джин", isCorrect: false },
      { id: 4, text: "Безалкогольный мохито", isCorrect: false },
    ],
  },
  {
    id: 4,
    question: "Из этих десертов я выберу:",
    answers: [
      { id: 1, text: "Мороженое", isCorrect: false },
      { id: 2, text: "Шоколад", isCorrect: false },
      { id: 3, text: "Тирамису", isCorrect: false },
      { id: 4, text: "Тарталетка с ягодами", isCorrect: true },
    ],
  },
  {
    id: 5,
    question: "Какую музыку я включу в машине, когда еду один?",
    answers: [
      { id: 1, text: "Рок / металл", isCorrect: false },
      { id: 2, text: "Русский рэп", isCorrect: false },
      { id: 3, text: "Поп-музыка", isCorrect: true },
      { id: 4, text: "Тишина - лучший друг", isCorrect: false },
    ],
  },
  {
    id: 6,
    question: "Машина мечты?",
    answers: [
      { id: 1, text: "Спортивный купе (Porsche / Ferrari)", isCorrect: false },
      {
        id: 2,
        text: "Внедорожник (Land Cruiser / Range Rover)",
        isCorrect: true,
      },
      { id: 3, text: "Классический ретро-автомобиль", isCorrect: false },
      { id: 4, text: "Электрокар (Tesla)", isCorrect: false },
    ],
  },
  {
    id: 7,
    question: "Как я проведу идеальный выходной?",
    answers: [
      { id: 1, text: "Посплю до обеда, потом фильм", isCorrect: true },
      { id: 2, text: "Поеду на природу / шашлыки", isCorrect: false },
      { id: 3, text: "Встречусь с друзьями в баре", isCorrect: false },
      {
        id: 4,
        text: "Буду делать ремонт / что-то мастерить",
        isCorrect: false,
      },
    ],
  },
  {
    id: 8,
    question: "Если бы мне пришлось всю жизнь есть только одно блюдо, то это:",
    answers: [
      { id: 1, text: "Борщ", isCorrect: false },
      { id: 2, text: "Лагман", isCorrect: true },
      { id: 3, text: "Стейк с картошкой фри", isCorrect: false },
      { id: 4, text: "Роллы / суши", isCorrect: false },
    ],
  },
  {
    id: 9,
    question: "Если бы я обладал суперспособностью, то выбрал бы:",
    answers: [
      { id: 1, text: "Невидимость", isCorrect: false },
      { id: 2, text: "Уметь летать", isCorrect: false },
      { id: 3, text: "Умение читать мысли Кати", isCorrect: false },
      { id: 4, text: "Телепортация", isCorrect: true },
    ],
  },
  {
    id: 10,
    question: "В детстве я мечтал стать:",
    answers: [
      { id: 1, text: "Врачом", isCorrect: false },
      { id: 2, text: "Бухгалтером", isCorrect: false },
      { id: 3, text: "Мечтал ничего не делать", isCorrect: false },
      { id: 4, text: "Дизайнером автомобилей", isCorrect: true },
    ],
  },
  {
    id: 11,
    question: "В какой исторической эпохе я хотел бы пожить неделю:",
    answers: [
      { id: 1, text: "Средневековая Европа", isCorrect: false },
      { id: 2, text: "Древняя Греция/Древний Рим", isCorrect: false },
      { id: 3, text: "Эпоха динозавров", isCorrect: false },
      { id: 4, text: "После 3000 года", isCorrect: true },
    ],
  },
  {
    id: 12,
    question: "Если бы я выбирал фильм для просмотра с Катей, это было бы:",
    answers: [
      { id: 1, text: "Комедия", isCorrect: false },
      { id: 2, text: "Мелодрама", isCorrect: false },
      { id: 3, text: "Боевик / триллер", isCorrect: true },
      { id: 4, text: "Документалка / познавательное", isCorrect: false },
    ],
  },
  {
    id: 13,
    question: "Что я сделаю первым делом, когда мы проснёмся в день свадьбы?",
    answers: [
      { id: 1, text: "Поцелую невесту", isCorrect: false },
      { id: 2, text: "Зайду на кухню и съем бутерброд", isCorrect: false },
      { id: 3, text: "Лягу обратно и скажу «ещё 5 минут»", isCorrect: true },
      { id: 4, text: "Позвоню другу-свидетелю", isCorrect: false },
    ],
  },
  {
    id: 14,
    question:
      "Какой Катин подарок за всё время ваших отношений понравился тебе больше всего:",
    answers: [
      { id: 1, text: "Духи", isCorrect: false },
      { id: 2, text: "Электрическая зубная щетка", isCorrect: true },
      { id: 3, text: "Домкрат", isCorrect: false },
      { id: 4, text: "Часы", isCorrect: false },
    ],
  },
  {
    id: 15,
    question: "Какую фразу я говорю Кате чаще всего?",
    answers: [
      { id: 1, text: "«Я тебя люблю»", isCorrect: false },
      { id: 2, text: "«Что есть покушать?»", isCorrect: false },
      { id: 3, text: "«Ты самая красивая на земле»", isCorrect: false },
      { id: 5, text: "Ты моя сладенькая", isCorrect: true },
    ],
  },
];
