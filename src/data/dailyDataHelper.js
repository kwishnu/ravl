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

const allKeys = Object.keys(dailyDataJSON).sort();

// Build a map of day-of-week → keys
// 0=Sunday, 1=Monday, 2=Tuesday, 3=Wednesday, 4=Thursday, 5=Friday, 6=Saturday
const keysByDay = { 0: [], 1: [], 2: [], 3: [], 4: [], 5: [], 6: [] };

allKeys.forEach((key) => {
  // Parse "MM-DD-YYYY" into a Date
  const [mm, dd, yyyy] = key.split('-');
  const date = new Date(`${yyyy}-${mm}-${dd}`);
  const dow = date.getDay();
  keysByDay[dow].push(key);
});

/**
 * Resolves a date string to a valid key from the same day of the week.
 * If the exact date exists, use it. Otherwise pick from the pool of
 * keys that share the same day of the week, cycling deterministically.
 */
function resolveKey(date) {
  if (dailyDataJSON[date]) return date;

  // Get today's day of week
  const [mm, dd, yyyy] = date.split('-');
  const today = new Date(`${yyyy}-${mm}-${dd}`);
  const dow = today.getDay();

  // Get the pool of keys for this day of the week
  const pool = keysByDay[dow];
  if (!pool || pool.length === 0) return allKeys[0]; // ultimate fallback

  // Cycle through the pool using week number for determinism
  const startOfYear = new Date(`${yyyy}-01-01`);
  const weekNumber = Math.floor((today - startOfYear) / (7 * 86400000));
  return pool[weekNumber % pool.length];
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