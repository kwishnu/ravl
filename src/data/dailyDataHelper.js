//import dailyDataJSON from '../data/dailyDataJSON.json';

//export function puzzTitle(date) {
//  return dailyDataJSON[date].title?dailyDataJSON[date].title:"Sorry, no daily puzzles available";
//}
//export function puzzDescription(date) {
//  return dailyDataJSON[date].description?dailyDataJSON[date].description:"Sorry, no daily puzzles available";
//}
//export function numPuzzles(date) {
//  return dailyDataJSON[date].words?dailyDataJSON[date].words.length:0;
//}
//export function puzzles(date) {
//  return dailyDataJSON[date].words?dailyDataJSON[date].words:[[],[],[]];
//}


import dailyDataJSON from '../data/dailyDataJSON.json';

// Get all available puzzle keys, sorted so cycling is deterministic
const allKeys = Object.keys(dailyDataJSON).sort();

/**
 * Resolves any date string to a valid key in the JSON.
 * If the date exists, use it directly.
 * If not (supply exhausted), cycle through the pool by day-of-year offset
 * so every day gets a consistent, different puzzle.
 */
function resolveKey(date) {
  if (dailyDataJSON[date]) return date;
  // Use days since a fixed epoch to pick a stable daily puzzle
  const epoch = new Date('2023-04-14'); // first puzzle date
  const today = new Date(date.replace(/(\d{2})-(\d{2})-(\d{4})/, '$3-$1-$2'));
  const dayOffset = Math.floor((today - epoch) / 86400000);
  return allKeys[((dayOffset % allKeys.length) + allKeys.length) % allKeys.length];
}

export function puzzTitle(date) {
  const key = resolveKey(date);
  return dailyDataJSON[key].title ?? "Today's RavL";
}

export function puzzDescription(date) {
  const key = resolveKey(date);
  return dailyDataJSON[key].description ?? "Today's puzzle";
}

export function numPuzzles(date) {
  const key = resolveKey(date);
  return dailyDataJSON[key].words ? dailyDataJSON[key].words.length : 0;
}

export function puzzles(date) {
  const key = resolveKey(date);
  return dailyDataJSON[key].words ?? [[], [], []];
}