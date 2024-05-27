const menuLinks = [
  { id: "911356", title: "Главная", path: "#main" },
  {
    id: "911400",
    title: "Услуги",
    path: [
      { id: "911401", title: "Правило", pathService: "#pravilo" },
      { id: "911402", title: "Миофасциальный массаж", pathService: "#massage" },
      { id: "911403", title: "Гвоздестояние", pathService: "#nailstanding" },
      { id: "911404", title: "Кинезиотейпирование", pathService: "#kinezio" },
    ],
  },
  { id: "911361", title: "Обо мне", path: "#about" },
  { id: "911362", title: "Отзывы", path: "#feedbacks" },
  { id: "911363", title: "Написать мне", path: "#contacts" },
  { id: "911364", title: "Вопрос-Ответ", path: "#faq" },
];

export default menuLinks;
