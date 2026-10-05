const storageKey = 'memory-game-results';
const resultsLimit = 10;

function getTopResults(results) {
  return results
    .sort((first, second) => first.moves - second.moves || first.timestamp - second.timestamp)
    .slice(0, resultsLimit);
}

export function loadResults() {
  try {
    const results = JSON.parse(localStorage.getItem(storageKey) ?? '[]');

    if (!Array.isArray(results)) {
      return [];
    }

    const validResults = results.filter((result) => result
      && Number.isInteger(result.moves)
      && result.moves >= 8
      && Number.isFinite(result.timestamp)
      && result.timestamp >= 0
      && !Number.isNaN(new Date(result.timestamp).getTime()));

    return getTopResults(validResults);
  } catch {
    return [];
  }
}

export function saveResult(moves) {
  const results = loadResults();
  results.push({ moves, timestamp: Date.now() });

  try {
    localStorage.setItem(storageKey, JSON.stringify(getTopResults(results)));
    return true;
  } catch {
    return false;
  }
}
