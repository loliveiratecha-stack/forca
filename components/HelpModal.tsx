'use client';

import React from 'react';
import { X, Film, CheckCircle2, AlertCircle, Lightbulb } from 'lucide-react';

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function HelpModal({ isOpen, onClose }: HelpModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-in fade-in">
      <div className="bg-zinc-900 rounded-2xl max-w-md w-full p-6 shadow-2xl border border-zinc-800 text-zinc-100">
        <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
          <div className="flex items-center gap-2">
            <Film className="w-5 h-5 text-amber-500" />
            <h2 className="text-lg font-bold text-white">Como Jogar CineForca</h2>
          </div>
          <button
            id="close-help-modal-btn"
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="mt-4 space-y-3.5 text-sm text-zinc-300">
          <div className="flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <p>
              <strong className="text-white">Categorias de Filmes:</strong> Escolha entre Ficção, Ação, Terror, Comédia, Animação, Clássicos, Drama ou Cinema Nacional.
            </p>
          </div>

          <div className="flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <p>
              <strong className="text-white">Acentos automáticos:</strong> Chutar a letra <em>A</em> descobre também <em>Á</em>, <em>Ã</em>, <em>Â</em>; a letra <em>C</em> descobre <em>Ç</em>. Espaços e números já vêm visíveis!
            </p>
          </div>

          <div className="flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
            <p>
              <strong className="text-white">Limite de 6 erros:</strong> A cada letra incorreta, uma parte do corpo do boneco é desenhada. No 6º erro, a partida é encerrada.
            </p>
          </div>

          <div className="flex items-start gap-2.5">
            <Lightbulb className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <p>
              <strong className="text-white">Dica de Cinema:</strong> Clique no botão de lâmpada para revelar o ano, diretor e sinopse se estiver em dúvida.
            </p>
          </div>
        </div>

        <div className="mt-6 pt-3 border-t border-zinc-800 flex justify-end">
          <button
            id="help-modal-ok-btn"
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-amber-500 text-zinc-950 font-semibold rounded-lg text-sm hover:bg-amber-400 transition-colors shadow-sm shadow-amber-500/20 cursor-pointer"
          >
            Entendi, vamos jogar!
          </button>
        </div>
      </div>
    </div>
  );
}
