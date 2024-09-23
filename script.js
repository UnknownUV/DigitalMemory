const cardsContainer = document.getElementById('cards');
const messageDisplay = document.getElementById('message');
const levelDisplay = document.getElementById('level');

let cardValues = [];
let attempts = 0;
let level = 1;

// Генерация значений для карточек
function generateCardValues() {
    cardValues = [];
    const numCards = 4 + Math.floor((level - 1) / 3); // Начальное количество карточек +1 каждые 3 уровня

    for (let i = 1; i <= numCards; i++) {
        cardValues.push(i); // Добавляем числа от 1 до numCards
    }

    // Перемешивание
    for (let i = cardValues.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cardValues[i], cardValues[j]] = [cardValues[j], cardValues[i]];
    }
}

// Создание карточек
function createCards() {
    cardsContainer.innerHTML = ''; // Очищаем предыдущие карточки
    cardValues.forEach((value) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.value = value;
        card.innerText = '';
        cardsContainer.appendChild(card);
    });

    setTimeout(revealCards, 300); // Установка времени показа на 1 секунду
}

// Показываем карточки
function revealCards() {
    const cards = document.querySelectorAll('.card');
    cards.forEach((card, index) => {
        card.innerText = cardValues[index];
        card.classList.add('revealed');
    });

    setTimeout(hideCards, 500);
}

// Скрываем карточки
function hideCards() {
    const cards = document.querySelectorAll('.card');
    cards.forEach((card) => {
        card.innerText = '';
        card.classList.remove('revealed');
        card.addEventListener('click', () => handleCardClick(card));
    });
}

// Обработка клика по карточке
function handleCardClick(card) {
    if (!card.classList.contains('revealed')) {
        const value = parseInt(card.dataset.value);
        attempts++;

        // Проверяем, сколько раз нажали на карточку
        if (attempts <= value) {
            card.innerText = value;
        }

        if (attempts === value) {
            card.classList.add('revealed');
            card.removeEventListener('click', () => handleCardClick(card));
            checkWin();
        }
	else {
	    resetGame();
	    level = 1;
	    levelDisplay.innerText = `Уровень: ${level}`;
	}
    }
}

// Проверка на выигрыш
function checkWin() {
    const allRevealed = Array.from(document.querySelectorAll('.card')).every(card => card.classList.contains('revealed'));
    if (allRevealed) {
        level++;
        levelDisplay.innerText = `Уровень: ${level}`;
        setTimeout(() => {
            resetGame();
        }, 1000);
    }
}

// Сброс игры
function resetGame() {
    attempts = 0;
    generateCardValues();
    createCards();
    messageDisplay.innerText = '';
}

// Инициализация
generateCardValues();
createCards();
