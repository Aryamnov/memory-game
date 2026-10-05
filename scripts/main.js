import { createDeck } from './cards.js';
import { createGameView } from './ui.js';

const cards = createDeck();
const gameView = createGameView(cards);

document.body.append(gameView);
