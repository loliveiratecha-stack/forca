'use client';

import React from 'react';
import { normalizeChar, isLetter } from '@/lib/game';
import { motion } from 'motion/react';

interface WordDisplayProps {
  word: string;
  guessedLetters: Set<string>;
  revealAll?: boolean;
}

export function WordDisplay({ word, guessedLetters, revealAll = false }: WordDisplayProps) {
  // Split title into words to wrap whole words properly
  const words = word.split(' ');

  return (
    <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-4 py-4 px-2 max-w-3xl mx-auto select-none">
      {words.map((wordItem, wordIdx) => (
        <div key={wordIdx} className="flex items-center gap-1.5 sm:gap-2">
          {wordItem.split('').map((char, charIdx) => {
            const isAlpha = isLetter(char);
            const normalized = normalizeChar(char);
            const isGuessed = guessedLetters.has(normalized);
            const showChar = isGuessed || revealAll || !isAlpha;
            const wasMissed = revealAll && !isGuessed && isAlpha;

            if (!isAlpha) {
              return (
                <div
                  key={charIdx}
                  className="w-5 sm:w-6 h-10 sm:h-12 flex items-center justify-center text-lg sm:text-xl font-bold text-zinc-400"
                >
                  {char}
                </div>
              );
            }

            return (
              <motion.div
                key={charIdx}
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                className={`relative w-8 h-10 sm:w-11 sm:h-14 flex items-center justify-center rounded-lg border-b-4 font-mono font-bold text-xl sm:text-2xl transition-all duration-200 ${
                  showChar
                    ? wasMissed
                      ? 'bg-rose-950/60 border-rose-500 text-rose-300 shadow-sm'
                      : isGuessed
                      ? 'bg-amber-950/40 border-amber-500 text-amber-200 shadow-sm shadow-amber-500/10'
                      : 'bg-zinc-800 border-zinc-600 text-zinc-100'
                    : 'bg-zinc-900 border-zinc-700 text-transparent shadow-xs'
                }`}
              >
                {showChar ? (
                  <motion.span
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    {char}
                  </motion.span>
                ) : (
                  <span className="opacity-0">?</span>
                )}
              </motion.div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
