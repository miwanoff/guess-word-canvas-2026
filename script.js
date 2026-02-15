const words = ["програма", "фреймворк", "матриця"];
let word = ""; // слово
let remain = 0; // сколько осталось угадать букв
let answer = []; // массив, в который будет записано слово игрока
let guess = ""; // переменная для буквы игрока
let counter = 0; // Сколько было всего сделано ходов

// Настройка элемента холста canvas
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Получаем ширину и высоту элемента canvas
const width = canvas.width; // ширина холста
const height = canvas.height; // высота холста
let figure; // фигура, которую будем рисовать

// Функция для рисования рамки
let drawCanvasBorder = function () {
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(width, 0);
  ctx.lineTo(width, height);
  ctx.lineTo(0, height);
  ctx.lineTo(0, 0);
  ctx.strokeStyle = "red";
  ctx.stroke();
};

// Выводим оставшееся количество ходов
let drawRemain = function () {
  ctx.clearRect(0, 0, width, height); // очистка холста
  ctx.font = "20px Courier";
  ctx.fillStyle = "Black";
  ctx.textAlign = "left";
  ctx.textBaseline = "top";
  ctx.fillText(
    "Залишилось вгадати: " + remain + " Всього було пройдено кроків " + counter,
    10,
    height - 20,
  );
};

// Выводим результат игры
let drawResult = function (res) {
  ctx.font = "20px Courier";
  ctx.fillStyle = "Red";
  ctx.textAlign = "left";
  ctx.textBaseline = "top";
  ctx.fillText("Гру закінчено! " + res, 10, height - 40);
};

// Выводим слово
let drawWord = function () {
  ctx.font = "20px Courier";
  ctx.fillStyle = "Black";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(answer.join(" "), width / 2, 30);
};

// Задаем конструктор Figure (фигура)
let Figure = function () {
  this.n = 0;
};

// Рисуем фигуру в зависимости от номера проигрышного кода
Figure.prototype.drawPart = function () {
  ctx.fillStyle = "Red";
  ctx.beginPath();
  switch (this.n) {
    case 1:
      ctx.moveTo(200, 300);
      ctx.lineTo(200, 100);
      break;
    case 2:
      ctx.moveTo(200, 100);
      ctx.lineTo(200, 100);
      ctx.lineTo(400, 100);
      break;
    case 3:
      ctx.moveTo(200, 300);
      ctx.lineTo(200, 100);
      ctx.lineTo(400, 100);
      ctx.lineTo(400, 300);
      break;
  }
  ctx.stroke();
};

function play() {
  let randomIndex = Math.floor(Math.random() * words.length);
  word = words[randomIndex]; // слово
  remain = word.length - 2; // сколько осталось угадать букв

  answer[0] = word[0];

  // Массив для слова - начальный вид
  answer[word.length - 1] = word[word.length - 1];
  for (let i = 1; i < word.length - 1; i++) {
    answer[i] = "_";
  }

  drawRemain();
  drawWord();
  drawCanvasBorder();

  figure = new Figure();
}

// ход игрока и проверка
function check() {
  guess = prompt("");
  counter++;
  let guessOK = false; // угадал или не угадал букву
  for (let i = 1; i < word.length - 1; i++) {
    if (word[i] === guess) {
      answer[i] = guess;
      guessOK = true;
      remain--;
    }
  }
  if (remain < 0) remain = 0;
  drawRemain();
  drawWord();
  drawCanvasBorder();
  if (!guessOK) {
    figure.n++;
  }
  figure.drawPart();
  if (remain == 0) {
    let res = "Ви виграли!";
    drawResult(res, counter);
  }
}
