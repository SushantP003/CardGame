const board = document.getElementById('game-board');
const popup = document.getElementById('popup');
const popupMessage = document.getElementById('popup-message');
const timerDisplay = document.getElementById('timer');
const movesDisplay = document.getElementById('moves');

const fruits = ["🍎", "🍌", "🍒", "🍉", "🍇", "🍍", "🥭", "🍓"];
let cards = [];
let flippedCards = [];
let matchedPairs = 0;
let moves = 0;
let totalPairs = fruits.length;
let timer;
let timeElapsed = 0;
let gameStarted = false;

function createBoard() {
  board.innerHTML = '';
  const values = [...fruits, ...fruits];
  values.sort(() => Math.random() - 0.5);

  values.forEach(value => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.value = value;
    card.innerText = '❓';
    card.addEventListener('click', () => flipCard(card));
    board.appendChild(card);
    cards.push(card);
  });

  shuffleCards();
}

function startGame() {
  clearInterval(timer);
  popup.classList.add('hidden');
  cards = [];
  flippedCards = [];
  matchedPairs = 0;
  moves = 0;
  timeElapsed = 0;
  gameStarted = false;
  updateStats();
  createBoard();
}

function flipCard(card) {
  if (!gameStarted) {
    startTimer();
    gameStarted = true;
  }

  if (flippedCards.length < 2 && !card.classList.contains('flipped')) {
    card.classList.add('flipped');
    card.innerText = card.dataset.value;
    flippedCards.push(card);

    if (flippedCards.length === 2) {
      setTimeout(checkMatch, 500);
    }
  }
}

function checkMatch() {
  const [card1, card2] = flippedCards;
  if (card1.dataset.value === card2.dataset.value) {
    highlightMatched(card1, card2);
    matchedPairs++;
    if (matchedPairs === totalPairs) {
      setTimeout(showPopup, 500);
    }
  } else {
    card1.classList.remove('flipped');
    card2.classList.remove('flipped');
    card1.innerText = '❓';
    card2.innerText = '❓';
  }
  
  flippedCards = [];
  moves++;
  updateStats();
}

function highlightMatched(card1, card2) {
  card1.classList.add('matched');
  card2.classList.add('matched');
}

function shuffleCards() {
  cards.forEach(card => {
    card.classList.add('shuffle');
    setTimeout(() => card.classList.remove('shuffle'), 500);
  });
}

function showPopup() {
  clearInterval(timer);
  popup.classList.remove('hidden');
  popupMessage.innerText = `You matched all fruits in ${moves} moves and ${timeElapsed} seconds! 🍎🍌🍒`;
}

function updateStats() {
  movesDisplay.innerText = moves;
  timerDisplay.innerText = timeElapsed;
}

function startTimer() {
  timer = setInterval(() => {
    timeElapsed++;
    updateStats();
  }, 1000);
}

startGame();
