'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  MOVIES,
  Movie,
  MovieCategory,
} from '@/data/movies';
import {
  getMistakesCount,
  isWordComplete,
  MAX_MISTAKES,
  normalizeChar,
  isLetter,
} from '@/lib/game';
import { sounds } from '@/lib/sound';
import { HangmanDrawing } from '@/components/HangmanDrawing';
import { WordDisplay } from '@/components/WordDisplay';
import { Keyboard } from '@/components/Keyboard';
import { CategorySelector } from '@/components/CategorySelector';
import { GameHeader } from '@/components/GameHeader';
import { HelpModal } from '@/components/HelpModal';
import { GameResultModal } from '@/components/GameResultModal';
import { Lightbulb, Film, Sparkles } from 'lucide-react';

export default function HangmanGamePage() {
  // Category selection
  const [selectedCategory, setSelectedCategory] = useState<MovieCategory>('Todas');

  // Random initial movie on load
  const [currentMovie, setCurrentMovie] = useState<Movie>(() => {
    const randomIndex = Math.floor(Math.random() * MOVIES.length);
    return MOVIES[randomIndex];
  });

  const [guessedLetters, setGuessedLetters] = useState<Set<string>>(() => new Set());
  const [showHint, setShowHint] = useState<boolean>(false);
  const [isHelpOpen, setIsHelpOpen] = useState<boolean>(false);

  // Statistics loaded lazily
  const [wins, setWins] = useState<number>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('cineforca_wins');
      if (saved) return parseInt(saved, 10) || 0;
    }
    return 0;
  });

  const [losses, setLosses] = useState<number>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('cineforca_losses');
      if (saved) return parseInt(saved, 10) || 0;
    }
    return 0;
  });

  const [streak, setStreak] = useState<number>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('cineforca_streak');
      if (saved) return parseInt(saved, 10) || 0;
    }
    return 0;
  });

  const [bestStreak, setBestStreak] = useState<number>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('cineforca_best_streak');
      if (saved) return parseInt(saved, 10) || 0;
    }
    return 0;
  });

  const [soundEnabled, setSoundEnabled] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('cineforca_sound');
      if (saved !== null) {
        const enabled = saved === 'true';
        sounds.enabled = enabled;
        return enabled;
      }
    }
    return true;
  });

  // Modal display for game over results
  const [showResultModal, setShowResultModal] = useState<boolean>(false);

  // Filter movies for current category
  const categoryMovies = useMemo(() => {
    if (selectedCategory === 'Todas') {
      return MOVIES;
    }
    return MOVIES.filter((m) => m.category === selectedCategory);
  }, [selectedCategory]);

  // Function to pick a new movie
  const pickNewMovie = useCallback(
    (category: MovieCategory = selectedCategory, excludeId?: string) => {
      let pool = category === 'Todas' ? MOVIES : MOVIES.filter((m) => m.category === category);
      if (pool.length === 0) pool = MOVIES;

      if (excludeId && pool.length > 1) {
        pool = pool.filter((m) => m.id !== excludeId);
      }

      const randomIndex = Math.floor(Math.random() * pool.length);
      const chosen = pool[randomIndex];

      setCurrentMovie(chosen);
      setGuessedLetters(new Set());
      setShowHint(false);
      setShowResultModal(false);
    },
    [selectedCategory]
  );

  // Handle category change
  const handleCategoryChange = (newCategory: MovieCategory) => {
    setSelectedCategory(newCategory);
    pickNewMovie(newCategory);
  };

  // Sound toggle
  const handleToggleSound = () => {
    setSoundEnabled((prev) => {
      const next = !prev;
      sounds.enabled = next;
      try {
        localStorage.setItem('cineforca_sound', String(next));
      } catch {}
      return next;
    });
  };

  // Current game state derivations
  const mistakes = useMemo(() => {
    return getMistakesCount(currentMovie.title, guessedLetters);
  }, [currentMovie.title, guessedLetters]);

  const isWon = useMemo(() => {
    return isWordComplete(currentMovie.title, guessedLetters);
  }, [currentMovie.title, guessedLetters]);

  const isLost = mistakes >= MAX_MISTAKES;
  const isGameOver = isWon || isLost;

  // Handle letter guess
  const handleGuess = useCallback(
    (letter: string) => {
      if (isGameOver) return;
      const normalized = normalizeChar(letter);
      if (!isLetter(normalized)) return;
      if (guessedLetters.has(normalized)) return;

      const nextGuessed = new Set(guessedLetters);
      nextGuessed.add(normalized);
      setGuessedLetters(nextGuessed);

      // Check if letter is in word
      const targetNormalizedLetters = new Set(
        currentMovie.title
          .split('')
          .filter((c) => isLetter(c))
          .map((c) => normalizeChar(c))
      );

      const isHit = targetNormalizedLetters.has(normalized);
      if (isHit) {
        sounds.playCorrect();
        if (isWordComplete(currentMovie.title, nextGuessed)) {
          sounds.playWin();
          setWins((prev) => {
            const next = prev + 1;
            try {
              localStorage.setItem('cineforca_wins', String(next));
            } catch {}
            return next;
          });
          setStreak((prev) => {
            const next = prev + 1;
            setBestStreak((best) => {
              const newBest = Math.max(best, next);
              try {
                localStorage.setItem('cineforca_best_streak', String(newBest));
              } catch {}
              return newBest;
            });
            try {
              localStorage.setItem('cineforca_streak', String(next));
            } catch {}
            return next;
          });
          setTimeout(() => setShowResultModal(true), 600);
        }
      } else {
        sounds.playWrong();
        const currentMistakes = getMistakesCount(currentMovie.title, nextGuessed);
        if (currentMistakes >= MAX_MISTAKES) {
          sounds.playLose();
          setLosses((prev) => {
            const next = prev + 1;
            try {
              localStorage.setItem('cineforca_losses', String(next));
            } catch {}
            return next;
          });
          setStreak(0);
          try {
            localStorage.setItem('cineforca_streak', '0');
          } catch {}
          setTimeout(() => setShowResultModal(true), 700);
        }
      }
    },
    [currentMovie.title, guessedLetters, isGameOver]
  );

  // Keyboard listener for physical typing
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      if (e.key === 'Enter') {
        if (showResultModal) {
          pickNewMovie(selectedCategory, currentMovie.id);
        }
        return;
      }

      if (e.key === 'Escape') {
        setIsHelpOpen(false);
        return;
      }

      if (/^[a-zA-ZáàâãéêíóôõúçÁÀÂÃÉÊÍÓÔÕÚÇ]$/.test(e.key)) {
        e.preventDefault();
        handleGuess(e.key);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleGuess, showResultModal, pickNewMovie, selectedCategory, currentMovie.id]);

  return (
    <main className="min-h-screen bg-black text-zinc-100 flex flex-col items-center justify-between p-3 sm:p-6 antialiased">
      <div className="w-full max-w-4xl mx-auto flex flex-col flex-1">
        {/* Header with Title and Global Controls */}
        <GameHeader
          streak={streak}
          wins={wins}
          soundEnabled={soundEnabled}
          onToggleSound={handleToggleSound}
          onResetGame={() => pickNewMovie(selectedCategory, currentMovie.id)}
          onOpenHelp={() => setIsHelpOpen(true)}
        />

        {/* Categories Bar */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-1.5 px-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
              Gêneros Cinematográficos:
            </span>
            <span className="text-xs text-zinc-500">
              {categoryMovies.length} títulos nesta seleção
            </span>
          </div>
          <CategorySelector
            selectedCategory={selectedCategory}
            onSelectCategory={handleCategoryChange}
          />
        </div>

        {/* Main Game Stage */}
        <div className="bg-zinc-900/90 rounded-2xl border border-zinc-800 shadow-2xl shadow-black/80 p-4 sm:p-6 mb-4 flex-1 flex flex-col justify-between backdrop-blur-xs">
          {/* Top Info Bar inside Stage */}
          <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-zinc-800 text-xs sm:text-sm">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 font-semibold text-zinc-200 bg-zinc-800 px-2.5 py-1 rounded-md border border-zinc-700/60">
                <Film className="w-3.5 h-3.5 text-amber-400" />
                {currentMovie.category}
              </span>
              <span
                className={`px-2 py-0.5 rounded text-[11px] font-medium ${
                  currentMovie.difficulty === 'Fácil'
                    ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-800/80'
                    : currentMovie.difficulty === 'Médio'
                    ? 'bg-amber-950/60 text-amber-400 border border-amber-800/80'
                    : 'bg-rose-950/60 text-rose-400 border border-rose-800/80'
                }`}
              >
                {currentMovie.difficulty}
              </span>
            </div>

            {/* Hint Button */}
            <button
              id="hint-toggle-btn"
              type="button"
              onClick={() => setShowHint((prev) => !prev)}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                showHint
                  ? 'bg-amber-950/70 text-amber-300 border border-amber-700/80 shadow-xs'
                  : 'bg-zinc-800 hover:bg-zinc-750 text-amber-400 border border-zinc-700'
              }`}
            >
              <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
              <span>{showHint ? 'Ocultar Dica' : 'Ver Dica'}</span>
            </button>
          </div>

          {/* Revealable Hint Box */}
          {showHint && (
            <div className="my-2 p-3 bg-amber-950/30 border border-amber-800/50 rounded-xl text-xs sm:text-sm text-amber-200 flex items-start gap-2.5 animate-in fade-in">
              <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-amber-300">
                  Ano: {currentMovie.year}
                  {currentMovie.director ? ` • Direção: ${currentMovie.director}` : ''}
                </p>
                <p className="text-amber-200/90 italic mt-0.5">&ldquo;{currentMovie.hint}&rdquo;</p>
              </div>
            </div>
          )}

          {/* Center Stage: Hangman Drawing & Words */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center my-auto py-2">
            {/* Hangman Graphic */}
            <div className="md:col-span-4 flex flex-col items-center justify-center">
              <HangmanDrawing
                mistakes={mistakes}
                maxMistakes={MAX_MISTAKES}
                isLost={isLost}
                isWon={isWon}
              />
            </div>

            {/* Word Display Slot */}
            <div className="md:col-span-8 flex flex-col items-center justify-center">
              <p className="text-xs uppercase tracking-wider text-zinc-400 font-semibold mb-2 text-center">
                Descubra o Título do Filme
              </p>
              <WordDisplay
                word={currentMovie.title}
                guessedLetters={guessedLetters}
                revealAll={isLost}
              />

              {/* Status Message */}
              <div className="h-7 mt-2 flex items-center justify-center">
                {isWon && (
                  <p className="text-emerald-400 font-bold text-sm sm:text-base flex items-center gap-1.5 animate-in fade-in">
                    <Sparkles className="w-4 h-4 text-emerald-400" />
                    Você acertou! Filme desbloqueado!
                  </p>
                )}
                {isLost && (
                  <p className="text-rose-400 font-bold text-sm sm:text-base flex items-center gap-1.5 animate-in fade-in">
                    Fim de jogo! O título era: &quot;{currentMovie.title}&quot;
                  </p>
                )}
                {!isGameOver && (
                  <p className="text-zinc-500 text-xs">
                    Digite no seu teclado ou toque nas teclas abaixo
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Virtual Keyboard */}
          <div className="mt-4 pt-4 border-t border-zinc-800">
            <Keyboard
              onGuess={handleGuess}
              guessedLetters={guessedLetters}
              word={currentMovie.title}
              disabled={isGameOver}
            />
          </div>
        </div>

        {/* Footer Statistics & Records */}
        <footer className="w-full flex flex-wrap items-center justify-between gap-3 text-xs text-zinc-400 px-2 py-2 select-none">
          <div className="flex items-center gap-4">
            <span>
              Vitórias: <strong className="text-zinc-200">{wins}</strong>
            </span>
            <span>
              Derrotas: <strong className="text-zinc-200">{losses}</strong>
            </span>
            <span>
              Recorde de Sequência: <strong className="text-amber-400">{bestStreak}</strong>
            </span>
          </div>

          <div className="flex items-center gap-2 text-zinc-500">
            <span>Use o teclado físico ou toque nas teclas</span>
          </div>
        </footer>
      </div>

      {/* Result Modal upon Win or Loss */}
      <GameResultModal
        isOpen={showResultModal}
        isWon={isWon}
        movie={currentMovie}
        streak={streak}
        onNextMovie={() => pickNewMovie(selectedCategory, currentMovie.id)}
      />

      {/* Rules & Help Modal */}
      <HelpModal isOpen={isHelpOpen} onClose={() => setIsHelpOpen(false)} />
    </main>
  );
}
