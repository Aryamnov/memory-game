const cardTypes = [
  { pairId: 'html', label: 'HTML', image: './assets/images/html.svg' },
  { pairId: 'css', label: 'CSS', image: './assets/images/css.svg' },
  { pairId: 'javascript', label: 'JavaScript', image: './assets/images/javascript.svg' },
  { pairId: 'typescript', label: 'TypeScript', image: './assets/images/typescript.svg' },
  { pairId: 'python', label: 'Python', image: './assets/images/python.svg' },
  { pairId: 'node', label: 'Node.js', image: './assets/images/node.svg' },
  { pairId: 'git', label: 'Git', image: './assets/images/git.svg' },
  { pairId: 'sass', label: 'Sass', image: './assets/images/sass.svg' },
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
