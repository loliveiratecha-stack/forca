'use client';

import React from 'react';
import { motion } from 'motion/react';

interface HangmanDrawingProps {
  mistakes: number;
  maxMistakes: number;
  isLost: boolean;
  isWon: boolean;
}

export function HangmanDrawing({
  mistakes,
  maxMistakes,
  isLost,
  isWon,
}: HangmanDrawingProps) {
  const remaining = Math.max(0, maxMistakes - mistakes);

  return (
    <div className="flex flex-col items-center justify-center p-4">
      {/* SVG Canvas for Gallows & Figure */}
      <div className="relative w-56 h-64 sm:w-64 sm:h-72 flex items-center justify-center">
        <svg
          viewBox="0 0 200 240"
          className="w-full h-full drop-shadow-sm select-none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Base Platform / Gallows */}
          <line
            x1="20"
            y1="220"
            x2="100"
            y2="220"
            stroke="#64748b"
            strokeWidth="5"
            strokeLinecap="round"
          />
          {/* Vertical Post */}
          <line
            x1="60"
            y1="220"
            x2="60"
            y2="20"
            stroke="#64748b"
            strokeWidth="5"
            strokeLinecap="round"
          />
          {/* Top Beam */}
          <line
            x1="58"
            y1="22"
            x2="142"
            y2="22"
            stroke="#64748b"
            strokeWidth="5"
            strokeLinecap="round"
          />
          {/* Diagonal Strut */}
          <line
            x1="60"
            y1="55"
            x2="95"
            y2="22"
            stroke="#64748b"
            strokeWidth="4"
            strokeLinecap="round"
          />
          {/* Rope */}
          <line
            x1="140"
            y1="22"
            x2="140"
            y2="55"
            stroke="#94a3b8"
            strokeWidth="3"
            strokeDasharray={mistakes === 0 ? undefined : '2,2'}
            strokeLinecap="round"
          />
          {/* Noose Loop */}
          <ellipse
            cx="140"
            cy="58"
            rx="5"
            ry="4"
            stroke="#94a3b8"
            strokeWidth="2"
            fill="none"
          />

          {/* 1. Head (mistakes >= 1) */}
          {mistakes >= 1 && (
            <motion.g
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.25 }}
            >
              <circle
                cx="140"
                cy="76"
                r="16"
                stroke={isLost ? '#ef4444' : isWon ? '#10b981' : '#f59e0b'}
                strokeWidth="3.5"
                fill="#18181b"
              />
              {/* Face Details */}
              {isLost ? (
                <>
                  {/* X Eyes for Lost */}
                  <line x1="133" y1="71" x2="137" y2="75" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" />
                  <line x1="137" y1="71" x2="133" y2="75" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" />
                  <line x1="143" y1="71" x2="147" y2="75" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" />
                  <line x1="147" y1="71" x2="143" y2="75" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" />
                  {/* Sad mouth */}
                  <path d="M 134 85 Q 140 81 146 85" stroke="#ef4444" strokeWidth="2" fill="none" strokeLinecap="round" />
                </>
              ) : isWon ? (
                <>
                  {/* Happy eyes */}
                  <circle cx="134" cy="73" r="1.5" fill="#10b981" />
                  <circle cx="146" cy="73" r="1.5" fill="#10b981" />
                  {/* Smile */}
                  <path d="M 134 80 Q 140 86 146 80" stroke="#10b981" strokeWidth="2" fill="none" strokeLinecap="round" />
                </>
              ) : (
                <>
                  {/* Normal eyes */}
                  <circle cx="134" cy="73" r="1.5" fill="#cbd5e1" />
                  <circle cx="146" cy="73" r="1.5" fill="#cbd5e1" />
                  {/* Neutral / nervous mouth */}
                  <line x1="136" y1="82" x2="144" y2="82" stroke="#cbd5e1" strokeWidth="1.8" strokeLinecap="round" />
                </>
              )}
            </motion.g>
          )}

          {/* 2. Torso (mistakes >= 2) */}
          {mistakes >= 2 && (
            <motion.line
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.2 }}
              x1="140"
              y1="92"
              x2="140"
              y2="144"
              stroke={isLost ? '#ef4444' : '#f59e0b'}
              strokeWidth="3.5"
              strokeLinecap="round"
            />
          )}

          {/* 3. Left Arm (mistakes >= 3) */}
          {mistakes >= 3 && (
            <motion.line
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.2 }}
              x1="140"
              y1="104"
              x2="114"
              y2="128"
              stroke={isLost ? '#ef4444' : '#f59e0b'}
              strokeWidth="3.5"
              strokeLinecap="round"
            />
          )}

          {/* 4. Right Arm (mistakes >= 4) */}
          {mistakes >= 4 && (
            <motion.line
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.2 }}
              x1="140"
              y1="104"
              x2="166"
              y2="128"
              stroke={isLost ? '#ef4444' : '#f59e0b'}
              strokeWidth="3.5"
              strokeLinecap="round"
            />
          )}

          {/* 5. Left Leg (mistakes >= 5) */}
          {mistakes >= 5 && (
            <motion.line
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.2 }}
              x1="140"
              y1="144"
              x2="118"
              y2="186"
              stroke={isLost ? '#ef4444' : '#f59e0b'}
              strokeWidth="3.5"
              strokeLinecap="round"
            />
          )}

          {/* 6. Right Leg (mistakes >= 6 - Lost) */}
          {mistakes >= 6 && (
            <motion.line
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.2 }}
              x1="140"
              y1="144"
              x2="162"
              y2="186"
              stroke={isLost ? '#ef4444' : '#f59e0b'}
              strokeWidth="3.5"
              strokeLinecap="round"
            />
          )}
        </svg>
      </div>

      {/* Mistakes Indicator */}
      <div className="mt-2 flex items-center gap-1.5 text-xs font-medium">
        <span className="text-zinc-400">Tentativas:</span>
        <div className="flex gap-1 items-center">
          {Array.from({ length: maxMistakes }).map((_, idx) => {
            const isUsed = idx < mistakes;
            return (
              <span
                key={idx}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  isUsed
                    ? 'bg-rose-500 scale-110 shadow-sm shadow-rose-500/50'
                    : 'bg-zinc-800 border border-zinc-700'
                }`}
                title={`Erro ${idx + 1}`}
              />
            );
          })}
        </div>
        <span
          className={`ml-1 font-semibold ${
            remaining <= 1
              ? 'text-rose-400'
              : remaining <= 3
              ? 'text-amber-400'
              : 'text-zinc-300'
          }`}
        >
          {remaining} restante{remaining === 1 ? '' : 's'}
        </span>
      </div>
    </div>
  );
}
