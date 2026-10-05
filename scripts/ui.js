import { createElement } from './dom.js';

export function createCard(card, index) {
  const back = createElement('span', {
    className: 'cardBack',
    text: '?',
  });

  const image = createElement('img', {
    className: 'cardImage',
    attributes: {
      src: card.image,
      alt: card.label,
      width: '128',
      height: '128',
      draggable: 'false',
    },
  });

  const front = createElement('span', {
    className: 'cardFront',
    attributes: { hidden: '' },
    children: [image],
  });

  const button = createElement('button', {
    className: 'card',
    attributes: {
      type: 'button',
      'data-card-id': card.id,
      'data-pair-id': card.pairId,
      'aria-label': `Карточка ${index + 1}. Закрыта.`,
    },
    children: [back, front],
  });

  return createElement('li', {
    className: 'boardItem',
    children: [button],
  });
}

export function renderCards(board, cards) {
  board.replaceChildren(...cards.map(createCard));
}

function createHeader() {
  const title = createElement('h1', {
    className: 'gameTitle',
    text: 'Memory Game',
  });

  const newGameButton = createElement('button', {
    className: 'button',
    text: 'Новая игра',
    attributes: { type: 'button', 'data-action': 'new-game' },
  });

  const leaderboardButton = createElement('button', {
    className: 'button buttonSecondary',
    text: 'Таблица лидеров',
    attributes: { type: 'button', 'data-action': 'leaderboard' },
  });

  const actions = createElement('div', {
    className: 'gameActions',
    children: [newGameButton, leaderboardButton],
  });

  return createElement('header', {
    className: 'gameHeader',
    children: [title, actions],
  });
}

function createStats(totalPairs) {
  const moves = createElement('strong', {
    text: '0',
    attributes: { 'data-counter': 'moves' },
  });

  const pairs = createElement('strong', {
    text: '0',
    attributes: { 'data-counter': 'pairs' },
  });

  const movesStat = createElement('p', {
    className: 'gameStat',
    children: ['Ходы: ', moves],
  });

  const pairsStat = createElement('p', {
    className: 'gameStat',
    children: ['Пары: ', pairs, ` из ${totalPairs}`],
  });

  return createElement('div', {
    className: 'gameStats',
    children: [movesStat, pairsStat],
  });
}

export function createGameView(cards) {
  const header = createHeader();
  const stats = createStats(cards.length / 2);

  const board = createElement('ul', {
    className: 'board',
  });

  renderCards(board, cards);

  return createElement('main', {
    className: 'game',
    children: [header, stats, board],
  });
}
