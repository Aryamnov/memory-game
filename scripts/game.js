const mismatchDelay = 1000;

function createGameCards(cards) {
  return cards.map((card) => ({
    ...card,
    isOpen: false,
    isMatched: false,
  }));
}

export function createGame(cards, onChange = () => {}) {
  let gameCards = createGameCards(cards);

  let selectedCards = [];
  let moves = 0;
  let matchedPairs = 0;
  let isLocked = false;
  let isFinished = false;
  let mismatchTimerId = null;

  function getState() {
    return {
      cards: gameCards.map((card) => ({ ...card })),
      moves,
      matchedPairs,
      isLocked,
      isFinished,
    };
  }

  function restart(nextCards) {
    clearTimeout(mismatchTimerId);
    mismatchTimerId = null;
    gameCards = createGameCards(nextCards);
    selectedCards = [];
    moves = 0;
    matchedPairs = 0;
    isLocked = false;
    isFinished = false;
    onChange(getState());
  }

  function selectCard(cardId) {
    if (isLocked || isFinished) {
      return;
    }

    const card = gameCards.find((item) => item.id === cardId);

    if (!card || card.isOpen || card.isMatched) {
      return;
    }

    card.isOpen = true;
    selectedCards.push(card);

    if (selectedCards.length === 1) {
      onChange(getState());
      return;
    }

    moves += 1;
    const [firstCard, secondCard] = selectedCards;

    if (firstCard.pairId === secondCard.pairId) {
      firstCard.isMatched = true;
      secondCard.isMatched = true;
      matchedPairs += 1;
      selectedCards = [];
      isFinished = matchedPairs === gameCards.length / 2;
      onChange(getState());
      return;
    }

    isLocked = true;

    mismatchTimerId = setTimeout(() => {
      mismatchTimerId = null;
      firstCard.isOpen = false;
      secondCard.isOpen = false;
      selectedCards = [];
      isLocked = false;
      onChange(getState());
    }, mismatchDelay);
    onChange(getState());
  }

  return { getState, selectCard, restart };
}
