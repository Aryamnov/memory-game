const cardTypes = [
  { pairId: 'html', label: 'HTML' },
  { pairId: 'css', label: 'CSS' },
  { pairId: 'javascript', label: 'JavaScript' },
  { pairId: 'typescript', label: 'TypeScript' },
  { pairId: 'python', label: 'Python' },
  { pairId: 'node', label: 'Node.js' },
  { pairId: 'git', label: 'Git' },
  { pairId: 'sass', label: 'Sass' },
];

export function createDeck() {
  const cards = cardTypes.flatMap((type) => [
    { ...type, id: `${type.pairId}-1` },
    { ...type, id: `${type.pairId}-2` },
  ]);

  for (let index = cards.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [cards[index], cards[randomIndex]] = [cards[randomIndex], cards[index]];
  }

  return cards;
}
