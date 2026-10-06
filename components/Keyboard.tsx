'use client';

import React from 'react';
import { normalizeChar, isLetter } from '@/lib/game';

interface KeyboardProps {
  onGuess: (letter: string) => void;
  guessedLetters: Set<string>;
  word: string;
  disabled: boolean;
}

const KEYBOARD_ROWS = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['Z', 'X', 'C', 'V', 'B', 'N', 'M'],
];

export function Keyboard({ onGuess, guessedLetters, word, disabled }: KeyboardProps) {
  // Letters in the word normalized
  const lettersInWord = React.useMemo(() => {
    const set = new Set<string>();
    for (const char of word) {
      if (isLetter(char)) {
        set.add(normalizeChar(char));
      }
    }
    return set;
  }, [word]);

  return (
    <div className="w-full max-w-xl mx-auto flex flex-col gap-1.5 sm:gap-2 px-2 select-none">
      {KEYBOARD_ROWS.map((row, rowIdx) => (
        <div key={rowIdx} className="flex justify-center gap-1 sm:gap-1.5 w-full">
          {row.map((letter) => {
            const isGuessed = guessedLetters.has(letter);
            const isCorrect = isGuessed && lettersInWord.has(letter);
            const isWrong = isGuessed && !lettersInWord.has(letter);

            let buttonStyle = 'bg-zinc-800 hover:bg-zinc-700 text-zinc-100 border-zinc-700 shadow-xs active:scale-95 cursor-pointer';

            if (isCorrect) {
              buttonStyle = 'bg-emerald-600 text-white border-emerald-500 shadow-sm shadow-emerald-600/20 cursor-default';
            } else if (isWrong) {
              buttonStyle = 'bg-zinc-900/60 text-zinc-600 border-zinc-800/70 line-through opacity-40 cursor-default';
            } else if (disabled) {
              buttonStyle = 'bg-zinc-900 text-zinc-600 border-zinc-850 cursor-not-allowed';
            }

            return (
              <button
                key={letter}
                id={`key-${letter.toLowerCase()}`}
                type="button"
                disabled={isGuessed || disabled}
                onClick={() => onGuess(letter)}
                className={`flex-1 max-w-[48px] h-11 sm:h-12 min-h-[44px] flex items-center justify-center font-semibold text-sm sm:text-base rounded-lg border transition-all duration-150 ${buttonStyle}`}
              >
                {letter}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
}
