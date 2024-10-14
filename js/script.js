// Управление через свайпы
let touchStartX = 0;
let touchStartY = 0;
let touchEndX = 0;
let touchEndY = 0;

// Устанавливаем минимальное расстояние для свайпов
const minSwipeDistance = 30;

// Следим за началом касания экрана
canvas.addEventListener('touchstart', (event) => {
  touchStartX = event.touches[0].clientX;
  touchStartY = event.touches[0].clientY;
});

// Следим за завершением касания экрана и вычисляем направление свайпа
canvas.addEventListener('touchend', (event) => {
  touchEndX = event.changedTouches[0].clientX;
  touchEndY = event.changedTouches[0].clientY;

  handleSwipe();
});

// Функция для обработки свайпов
function handleSwipe() {
  const deltaX = touchEndX - touchStartX;
  const deltaY = touchEndY - touchStartY;

  // Определяем, является ли движение горизонтальным или вертикальным
  if (Math.abs(deltaX) > Math.abs(deltaY)) {
    // Горизонтальные свайпы
    if (Math.abs(deltaX) > minSwipeDistance) {
      if (deltaX > 0) {
        // Свайп вправо
        moveTetrominoRight();
      } else {
        // Свайп влево
        moveTetrominoLeft();
      }
    }
  } else {
    // Вертикальные свайпы
    if (Math.abs(deltaY) > minSwipeDistance) {
      if (deltaY > 0) {
        // Свайп вниз — ускоряем падение
        moveTetrominoDown();
      }
    }
  }
}

// Отслеживаем нажатие для поворота фигуры
canvas.addEventListener('click', () => {
  rotateTetromino();
});

// Функция для перемещения фигуры влево
function moveTetrominoLeft() {
  const col = tetromino.col - 1;
  if (isValidMove(tetromino.matrix, tetromino.row, col)) {
    tetromino.col = col;
  }
}

// Функция для перемещения фигуры вправо
function moveTetrominoRight() {
  const col = tetromino.col + 1;
  if (isValidMove(tetromino.matrix, tetromino.row, col)) {
    tetromino.col = col;
  }
}

// Функция для ускоренного падения фигуры
function moveTetrominoDown() {
  const row = tetromino.row + 1;
  if (!isValidMove(tetromino.matrix, row, tetromino.col)) {
    tetromino.row = row - 1;
    placeTetromino();  // Устанавливаем фигуру на поле
  } else {
    tetromino.row = row;
  }
}

// Функция для поворота фигуры
function rotateTetromino() {
  const matrix = rotate(tetromino.matrix);
  if (isValidMove(matrix, tetromino.row, tetromino.col)) {
    tetromino.matrix = matrix;
  }
}
