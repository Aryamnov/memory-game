import { createDeck } from './cards.js';
import { createGame } from './game.js';
import { createModal } from './modal.js';
import { loadResults, saveResult } from './storage.js';
import {
  createGameView,
  createLeaderboardContent,
  createVictoryContent,
  renderCards,
  updateGameView,
} from './ui.js';

const cards = createDeck();
const gameView = createGameView(cards);
const modal = createModal();
const game = createGame(cards, handleGameChange);
const board = gameView.querySelector('.board');
const newGameButton = gameView.querySelector('[data-action="new-game"]');
const leaderboardButton = gameView.querySelector('[data-action="leaderboard"]');
let hasHandledVictory = false;

function handleGameChange(state) {
  updateGameView(gameView, state);

  if (state.isFinished && !hasHandledVictory) {
    hasHandledVictory = true;
    const resultSaved = saveResult(state.moves);
    modal.open(createVictoryContent(state.moves, startNewGame, resultSaved));
  }
}

function startNewGame() {
  modal.close();
  hasHandledVictory = false;
  const nextCards = createDeck();
  renderCards(board, nextCards);
  game.restart(nextCards);
}

newGameButton.addEventListener('click', startNewGame);
leaderboardButton.addEventListener('click', () => {
  modal.open(createLeaderboardContent(loadResults()));
});

board.addEventListener('click', (event) => {
  const button = event.target.closest('.card');

  if (button && board.contains(button)) {
    game.selectCard(button.dataset.cardId);
  }
});

updateGameView(gameView, game.getState());
document.body.append(gameView, modal.element);
