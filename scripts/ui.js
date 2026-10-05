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

export function updateGameView(view, state) {
  state.cards.forEach((card, index) => {
    const button = view.querySelector(`[data-card-id="${card.id}"]`);
    button.querySelector('.cardBack').hidden = card.isOpen;
    button.querySelector('.cardFront').hidden = !card.isOpen;
    button.classList.toggle('cardOpen', card.isOpen);
    button.classList.toggle('cardMatched', card.isMatched);

    const status = card.isMatched ? 'Пара найдена.' : 'Открыта.';
    const label = card.isOpen
      ? `Карточка ${index + 1}. ${card.label}. ${status}`
      : `Карточка ${index + 1}. Закрыта.`;
    button.setAttribute('aria-label', label);
  });

  view.querySelector('[data-counter="moves"]').textContent = String(state.moves);
  view.querySelector('[data-counter="pairs"]').textContent = String(state.matchedPairs);
  view.querySelector('.board').classList.toggle('boardLocked', state.isLocked);
}

export function createVictoryContent(moves, onNewGame, resultSaved = true) {
  const result = createElement('strong', { text: String(moves) });
  const message = createElement('p', {
    children: ['Все пары найдены. Ходы: ', result, '.'],
  });

  if (!resultSaved) {
    message.append(createElement('span', {
      className: 'saveNotice',
      text: 'Результат не удалось сохранить.',
    }));
  }

  const newGameButton = createElement('button', {
    className: 'button',
    text: 'Новая игра',
    attributes: { type: 'button' },
  });

  newGameButton.addEventListener('click', onNewGame);

  return { title: 'Победа!', content: message, actions: [newGameButton] };
}

function formatDate(timestamp) {
  const date = new Date(timestamp);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  return `${day}.${month}.${date.getFullYear()}`;
}

export function createLeaderboardContent(results) {
  if (results.length === 0) {
    return {
      title: 'Таблица лидеров',
      content: createElement('p', { text: 'Пока нет результатов.' }),
    };
  }

  const headingRow = createElement('tr', {
    children: ['Место', 'Ходы', 'Дата'].map((text) => createElement('th', {
      text,
      attributes: { scope: 'col' },
    })),
  });

  const tableHead = createElement('thead', { children: [headingRow] });
  const rows = results.map((result, index) => createElement('tr', {
    children: [
      createElement('th', {
        text: String(index + 1),
        attributes: { scope: 'row' },
      }),
      createElement('td', { text: String(result.moves) }),
      createElement('td', { text: formatDate(result.timestamp) }),
    ],
  }));

  const tableBody = createElement('tbody', { children: rows });
  const table = createElement('table', {
    className: 'leaderboardTable',
    children: [tableHead, tableBody],
  });

  return { title: 'Таблица лидеров', content: table };
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
