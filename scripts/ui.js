import { createElement } from './dom.js';

export function createCard(card, index) {
  const back = createElement('span', {
    className: 'card__back',
    text: '?',
  });

  const front = createElement('span', {
    className: 'card__front',
    text: card.label,
    attributes: { hidden: '' },
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
    className: 'board__item',
    children: [button],
  });
}

export function renderCards(board, cards) {
  board.replaceChildren(...cards.map(createCard));
}

export function createGameView(cards) {
  const title = createElement('h1', {
    className: 'game__title',
    text: 'Memory Game',
  });

  const board = createElement('ul', {
    className: 'board',
  });

  renderCards(board, cards);

  return createElement('main', {
    className: 'game',
    children: [title, board],
  });
}
