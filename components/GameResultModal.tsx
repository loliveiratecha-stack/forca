'use client';

import React from 'react';
import { Movie } from '@/data/movies';
import { Trophy, Skull, ArrowRight, RotateCcw, Clapperboard, Calendar, User, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface GameResultModalProps {
  isOpen: boolean;
  isWon: boolean;
  movie: Movie;
  streak: number;
  onNextMovie: () => void;
}

export function GameResultModal({
  isOpen,
  isWon,
  movie,
  streak,
  onNextMovie,
}: GameResultModalProps) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ type: 'spring', damping: 25, stiffness: 350 }}
          className="bg-zinc-900 rounded-2xl max-w-md w-full p-6 shadow-2xl border border-zinc-800 text-center relative overflow-hidden"
        >
          {/* Top Banner Accent */}
          <div
            className={`absolute top-0 left-0 right-0 h-2.5 ${
              isWon ? 'bg-emerald-500' : 'bg-rose-500'
            }`}
          />

          {/* Icon Badge */}
          <div className="mx-auto mt-2 mb-3 w-14 h-14 rounded-full flex items-center justify-center shadow-inner">
            {isWon ? (
              <div className="w-14 h-14 rounded-full bg-emerald-950/60 border border-emerald-800 text-emerald-400 flex items-center justify-center">
                <Trophy className="w-7 h-7" />
              </div>
            ) : (
              <div className="w-14 h-14 rounded-full bg-rose-950/60 border border-rose-800 text-rose-400 flex items-center justify-center">
                <Skull className="w-7 h-7" />
              </div>
            )}
          </div>

          {/* Status Title */}
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            {isWon ? 'Parabéns, você acertou!' : 'Você foi enforcado!'}
          </h2>

          <p className="text-xs sm:text-sm text-zinc-400 mt-1 mb-4">
            {isWon ? 'Excelente conhecimento cinematográfico!' : 'O filme correto era:'}
          </p>

          {/* Movie Reveal Card */}
          <div className="bg-zinc-950/80 border border-zinc-800 rounded-xl p-4 text-left mb-5">
            <div className="flex items-start justify-between gap-2">
              <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                {movie.title}
              </h3>
              <span className="shrink-0 text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-950/60 border border-amber-800/80 text-amber-300">
                {movie.category}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-zinc-400 mt-2">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-zinc-500" />
                Ano: {movie.year}
              </span>
              {movie.director && (
                <span className="flex items-center gap-1">
                  <User className="w-3.5 h-3.5 text-zinc-500" />
                  {movie.director}
                </span>
              )}
            </div>

            <p className="text-xs sm:text-sm text-zinc-300 mt-2.5 pt-2.5 border-t border-zinc-800/80 leading-relaxed italic">
              &ldquo;{movie.hint}&rdquo;
            </p>
          </div>

          {/* Streak Info */}
          {isWon && streak > 1 && (
            <div className="mb-4 inline-flex items-center gap-1.5 px-3 py-1 bg-amber-950/40 border border-amber-800/60 rounded-full text-xs font-semibold text-amber-300">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Sequência incrível de {streak} vitórias consecutivas!</span>
            </div>
          )}

          {/* Action Button */}
          <button
            id="result-modal-next-btn"
            type="button"
            autoFocus
            onClick={onNextMovie}
            className={`w-full py-3 px-4 rounded-xl font-semibold text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg transition-all duration-150 cursor-pointer ${
              isWon
                ? 'bg-emerald-600 hover:bg-emerald-500 text-white active:scale-98 shadow-emerald-600/20'
                : 'bg-amber-500 hover:bg-amber-400 text-zinc-950 active:scale-98 shadow-amber-500/20 font-bold'
            }`}
          >
            {isWon ? (
              <>
                <span>Próximo Filme</span>
                <ArrowRight className="w-4 h-4" />
              </>
            ) : (
              <>
                <RotateCcw className="w-4 h-4 stroke-[2.5]" />
                <span>Tentar Outro Filme</span>
              </>
            )}
          </button>
          <span className="text-[11px] text-zinc-500 mt-2 block">
            Pressione <strong>Enter</strong> para continuar
          </span>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
