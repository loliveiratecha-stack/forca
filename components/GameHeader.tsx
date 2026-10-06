'use client';

import React from 'react';
import { Film, Volume2, VolumeX, Flame, RotateCcw, HelpCircle } from 'lucide-react';

interface GameHeaderProps {
  streak: number;
  wins: number;
  soundEnabled: boolean;
  onToggleSound: () => void;
  onResetGame: () => void;
  onOpenHelp: () => void;
}

export function GameHeader({
  streak,
  wins,
  soundEnabled,
  onToggleSound,
  onResetGame,
  onOpenHelp,
}: GameHeaderProps) {
  return (
    <header className="w-full flex items-center justify-between py-3 border-b border-zinc-800/80 mb-4 select-none">
      {/* Title / Brand */}
      <div className="flex items-center gap-2.5">
        <div className="w-9 h-9 rounded-lg bg-amber-500 text-zinc-950 flex items-center justify-center shadow-md shadow-amber-500/10">
          <Film className="w-5 h-5 stroke-[2.5]" />
        </div>
        <div>
          <h1 className="text-lg sm:text-xl font-bold tracking-tight text-white leading-none">
            CineForca
          </h1>
          <p className="text-[11px] sm:text-xs text-zinc-400 font-medium">
            Jogo da Forca dos Filmes
          </p>
        </div>
      </div>

      {/* Right Controls: Stats & Quick Actions */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Streak Counter */}
        <div
          className="flex items-center gap-1.5 px-2.5 py-1 bg-amber-950/40 border border-amber-800/60 rounded-lg text-amber-300 text-xs sm:text-sm font-semibold"
          title={`Sequência de vitórias: ${streak}`}
        >
          <Flame className="w-4 h-4 text-amber-400 fill-amber-400" />
          <span>{streak}</span>
          <span className="hidden sm:inline text-xs text-amber-300/80 font-normal">
            vitória{streak === 1 ? '' : 's'} seguidas
          </span>
        </div>

        {/* Total Wins */}
        <div
          className="hidden md:flex items-center px-2.5 py-1 bg-zinc-900 border border-zinc-800 rounded-lg text-zinc-300 text-xs font-medium"
          title={`Total de vitórias: ${wins}`}
        >
          Total: {wins}
        </div>

        {/* Audio Toggle */}
        <button
          id="toggle-sound-btn"
          type="button"
          onClick={onToggleSound}
          className="w-8 h-8 flex items-center justify-center rounded-lg border border-zinc-800 text-zinc-300 hover:bg-zinc-800 hover:text-white transition-colors cursor-pointer"
          title={soundEnabled ? 'Silenciar som' : 'Ativar som'}
        >
          {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4 text-zinc-500" />}
        </button>

        {/* Help button */}
        <button
          id="help-btn"
          type="button"
          onClick={onOpenHelp}
          className="w-8 h-8 flex items-center justify-center rounded-lg border border-zinc-800 text-zinc-300 hover:bg-zinc-800 hover:text-white transition-colors cursor-pointer"
          title="Regras do Jogo"
        >
          <HelpCircle className="w-4 h-4" />
        </button>

        {/* Restart Game */}
        <button
          id="new-word-btn"
          type="button"
          onClick={onResetGame}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500 text-zinc-950 hover:bg-amber-400 text-xs sm:text-sm font-semibold transition-colors shadow-sm shadow-amber-500/20 cursor-pointer"
          title="Sortear outro filme"
        >
          <RotateCcw className="w-3.5 h-3.5 stroke-[2.5]" />
          <span className="hidden xs:inline">Novo Filme</span>
        </button>
      </div>
    </header>
  );
}
