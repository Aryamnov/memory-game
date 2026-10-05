import { createDeck } from './cards.js';
import { createGame } from './game.js';
import { createGameView, renderCards, updateGameView } from './ui.js';

const cards = createDeck();
const gameView = createGameView(cards);
const game = createGame(cards, (state) => updateGameView(gameView, state));
const board = gameView.querySelector('.board');
const newGameButton = gameView.querySelector('[data-action="new-game"]');

function startNewGame() {
  const nextCards = createDeck();
  renderCards(board, nextCards);
  game.restart(nextCards);
}

newGameButton.addEventListener('click', startNewGame);

board.addEventListener('click', (event) => {
  const button = event.target.closest('.card');

  if (button && board.contains(button)) {
    game.selectCard(button.dataset.cardId);
  }
});

updateGameView(gameView, game.getState());
document.body.append(gameView);
