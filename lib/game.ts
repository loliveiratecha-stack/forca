export function normalizeChar(char: string): string {
  return char
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toUpperCase();
}

export function isLetter(char: string): boolean {
  const norm = normalizeChar(char);
  return norm >= 'A' && norm <= 'Z';
}

export function isCharRevealed(char: string, guessedLetters: Set<string>): boolean {
  if (!isLetter(char)) {
    return true; // Spaces, hyphens, numbers, punctuation are always revealed
  }
  const normalized = normalizeChar(char);
  return guessedLetters.has(normalized);
}

export function isWordComplete(word: string, guessedLetters: Set<string>): boolean {
  for (let i = 0; i < word.length; i++) {
    const char = word[i];
    if (isLetter(char)) {
      const normalized = normalizeChar(char);
      if (!guessedLetters.has(normalized)) {
        return false;
      }
    }
  }
  return true;
}

export function getMistakesCount(word: string, guessedLetters: Set<string>): number {
  const normalizedCharsInWord = new Set(
    word
      .split('')
      .filter((c) => isLetter(c))
      .map((c) => normalizeChar(c))
  );

  let mistakes = 0;
  for (const letter of guessedLetters) {
    if (!normalizedCharsInWord.has(letter)) {
      mistakes++;
    }
  }
  return mistakes;
}

export const MAX_MISTAKES = 6;
