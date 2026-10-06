'use client';

import React from 'react';
import { MOVIE_CATEGORIES, MovieCategory } from '@/data/movies';

interface CategorySelectorProps {
  selectedCategory: MovieCategory;
  onSelectCategory: (category: MovieCategory) => void;
  disabled?: boolean;
}

export function CategorySelector({
  selectedCategory,
  onSelectCategory,
  disabled = false,
}: CategorySelectorProps) {
  return (
    <div className="w-full overflow-x-auto pb-1 scrollbar-thin">
      <div className="flex items-center gap-1.5 min-w-max px-1">
        {MOVIE_CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              id={`cat-btn-${cat.id.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
              type="button"
              disabled={disabled}
              onClick={() => onSelectCategory(cat.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-150 whitespace-nowrap cursor-pointer ${
                isSelected
                  ? 'bg-amber-500 text-zinc-950 font-bold shadow-md shadow-amber-500/10'
                  : 'bg-zinc-900/90 hover:bg-zinc-800 text-zinc-300 border border-zinc-800'
              } ${disabled ? 'opacity-40 cursor-not-allowed' : ''}`}
            >
              <span>{cat.icon}</span>
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
