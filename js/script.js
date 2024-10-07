const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const startButton = document.getElementById('startButton');

// Размер ячейки змейки и сетки
const box = 20;
canvas.width = 320;
canvas.height = 320;

// Начальные настройки игры
let snake = [{ x: 160, y: 160 }];
let direction = 'RIGHT';
let food = {
    x: Math.floor(Math.random() * (canvas.width / box)) * box,
    y: Math.floor(Math.random() * (canvas.height / box)) * box
};
let score = 0;
let game; // Для хранения интервала игры

// Координаты для обработки свайпов
let touchStartX = 0;
let touchStartY = 0;
let touchEndX = 0;
let touchEndY = 0;

// Функция для обработки направления свайпа
function handleSwipe() {
    const deltaX = touchEndX - touchStartX;
    const deltaY = touchEndY - touchStartY;

    if (Math.abs(deltaX) > Math.abs(deltaY)) {
        // Горизонтальный свайп
        if (deltaX > 0 && direction !== 'LEFT') {
            direction = 'RIGHT'; // Свайп вправо
        } else if (deltaX < 0 && direction !== 'RIGHT') {
            direction = 'LEFT'; // Свайп влево
        }
    } else {
        // Вертикальный свайп
        if (deltaY > 0 && direction !== 'UP') {
            direction = 'DOWN'; // Свайп вниз
        } else if (deltaY < 0 && direction !== 'DOWN') {
            direction = 'UP'; // Свайп вверх
        }
    }
}

// Рисуем змейку и еду
function draw() {
    // Очищаем поле
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Рисуем змейку
    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = (i === 0) ? 'green' : 'white';
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
        ctx.strokeStyle = 'black';
        ctx.strokeRect(snake[i].x, snake[i].y, box, box);
    }

    // Рисуем еду
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, box, box);

    // Движение змейки
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (direction === 'LEFT') snakeX -= box;
    if (direction === 'UP') snakeY -= box;
    if (direction === 'RIGHT') snakeX += box;
    if (direction === 'DOWN') snakeY += box;

    // Проверка на столкновение с едой
    if (snakeX === food.x && snakeY === food.y) {
        score++;
        food = {
            x: Math.floor(Math.random() * (canvas.width / box)) * box,
            y: Math.floor(Math.random() * (canvas.height / box)) * box
        };
    } else {
        snake.pop();
    }

    // Добавляем новую голову змейки
    let newHead = { x: snakeX, y: snakeY };
    snake.unshift(newHead);

    // Проверка на столкновение с границей или самой собой
    if (
        snakeX < 0 || snakeY < 0 ||
        snakeX >= canvas.width || snakeY >= canvas.height ||
        collision(newHead, snake)
    ) {
        clearInterval(game);
        alert('Игра окончена! Ваш счёт: ' + score);
    }
}

// Проверка столкновения змейки самой с собой
function collision(head, array) {
    for (let i = 1; i < array.length; i++) {
        if (head.x === array[i].x && head.y === array[i].y) {
            return true;
        }
    }
    return false;
}

// Управление через свайпы
canvas.addEventListener('touchstart', function(e) {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
});

canvas.addEventListener('touchend', function(e) {
    touchEndX = e.changedTouches[0].clientX;
    touchEndY = e.changedTouches[0].clientY;
    handleSwipe();
});

// Старт игры
function startGame() {
    snake = [{ x: 160, y: 160 }];
    direction = 'RIGHT';
    score = 0;

    // Запускаем игру с интервалом 200 мс (замедленная скорость)
    game = setInterval(draw, 200);
}

// Добавляем событие на кнопку
startButton.addEventListener('click', startGame);
