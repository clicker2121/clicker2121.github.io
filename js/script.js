let clickCount = 0;
let clickPower = 1;
let coinCount = 0;
let coinPerSecond = 0;
let coinIntervalStarted = false;
let energy = 1500;
let maxEnergy = 1500;
let energyRegen = 1;

// Изначальные цены для улучшений кликов
let upgradePricesGroup1 = [10, 20, 30, 40, 50];

// Цены для улучшений монет в секунду
let coinUpgradePrices = [5, 10, 15, 20, 25];

// Цены для улучшений энергии
let energyUpgradePrices = [75, 100, 150, 200, 300];

// Функция обработки клика
function handleClick() {
    if (energy >= clickPower) { // Убедимся, что у пользователя достаточно энергии
        clickCount += clickPower;
        energy -= clickPower;  // Энергия уменьшается пропорционально кликам
        updateStats();
    } else {
        alert('Недостаточно энергии для клика!');
    }
}

// Функция для отображения кнопок "Купить" по выбранной группе (1, 2 или 3)
function showBuyButtons(group) {
    const buyButtonsGroup1 = document.getElementById('buy-buttons-1');
    const buyButtonsGroup2 = document.getElementById('buy-buttons-2');
    const buyButtonsGroup3 = document.getElementById('buy-buttons-3');

    if (group === 1) {
        buyButtonsGroup1.style.display = (buyButtonsGroup1.style.display === 'none') ? 'block' : 'none';
        buyButtonsGroup2.style.display = 'none';
        buyButtonsGroup3.style.display = 'none';
    } else if (group === 2) {
        buyButtonsGroup2.style.display = (buyButtonsGroup2.style.display === 'none') ? 'block' : 'none';
        buyButtonsGroup1.style.display = 'none';
        buyButtonsGroup3.style.display = 'none';
    } else if (group === 3) {
        buyButtonsGroup3.style.display = (buyButtonsGroup3.style.display === 'none') ? 'block' : 'none';
        buyButtonsGroup1.style.display = 'none';
        buyButtonsGroup2.style.display = 'none';
    }
}

// Функция покупки для первой группы улучшений (увеличение кликов за клик)
function buy(powerIncrease, index) {
    const cost = upgradePricesGroup1[index];
    if (clickCount >= cost) {
        clickCount -= cost;
        clickPower += powerIncrease;
        upgradePricesGroup1[index] = Math.floor(upgradePricesGroup1[index] * 1.5);
        document.getElementById(`buy-btn-${index + 1}`).textContent =
            `Купить ${index + 1} (+${powerIncrease} кликов за клик, ${upgradePricesGroup1[index]} кликов)`;
        updateStats();
    } else {
        alert('Недостаточно кликов для покупки!');
    }
}

// Функция покупки улучшений для монет в секунду
function buyCoins(coinAmount, cost, index) {
    if (clickCount >= cost) {
        clickCount -= cost;
        coinPerSecond += coinAmount;
        coinUpgradePrices[index] = Math.floor(coinUpgradePrices[index] * 1.5);
        document.getElementById(`coin-btn-${index + 1}`).textContent =
            `Купить ${index + 1} (${coinAmount} монет в секунду, ${coinUpgradePrices[index]} кликов)`;

        if (!coinIntervalStarted) {
            startCoinGeneration();
            coinIntervalStarted = true;
        }
        updateStats();
    } else {
        alert('Недостаточно кликов для покупки!');
    }
}

// Функция покупки улучшений для энергии
function buyEnergyUpgrade(type, cost, value) {
    const index = energyUpgradePrices.indexOf(cost);
    if (clickCount >= cost) {
        clickCount -= cost;
        if (type === 'maxEnergy') {
            maxEnergy += value;
        } else if (type === 'regen') {
            energyRegen += value;
        }
        energyUpgradePrices[index] = Math.floor(cost * 1.5);
        document.getElementById(`energy-btn-${index + 1}`).textContent =
            `Купить ${index + 1} (+${value} ${type === 'maxEnergy' ? 'максимальной энергии' : 'к восстановлению энергии в секунду'}, ${energyUpgradePrices[index]} кликов)`;
        updateStats();
    } else {
        alert('Недостаточно кликов для покупки!');
    }
}

// Запуск генерации монет
function startCoinGeneration() {
    setInterval(function () {
        coinCount += coinPerSecond;
        updateStats();
    }, 1000);
}

// Восстановление энергии
function regenerateEnergy() {
    setInterval(function () {
        if (energy < maxEnergy) {
            energy += energyRegen;
            updateStats();
        }
    }, 1000);
}

// Обновление статистики (клики, монеты, энергия)
function updateStats() {
    document.getElementById('click-count').textContent = clickCount;
    document.getElementById('coin-count').textContent = coinCount;
    document.getElementById('energy-count').textContent = energy;
    document.getElementById('max-energy').textContent = maxEnergy;
    document.getElementById('energy-regen').textContent = energyRegen;

    const energyBar = document.getElementById('energy-bar');
    energyBar.style.width = (energy / maxEnergy) * 100 + '%';
}


// Запуск восстановления энергии
regenerateEnergy();
