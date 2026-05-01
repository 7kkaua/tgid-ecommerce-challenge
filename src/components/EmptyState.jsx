import { Frown } from "lucide-react";

export function EmptyState({ searchTerm, onClear }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center animate-in fade-in duration-500">
      <div className="bg-surface-100 dark:bg-surface-800 p-4 rounded-full mb-4">
        <Frown size={40} className="text-surface-400 dark:text-surface-500" />
      </div>
      <h3 className="text-xl font-semibold text-surface-900 dark:text-white mb-2">
        Nenhum produto encontrado
      </h3>
      <p className="text-surface-500 dark:text-surface-300 mb-6 max-w-md">
        Não encontramos resultados para "{searchTerm}". Tente buscar por termos mais genéricos ou verifique a ortografia.
      </p>
      <button 
        onClick={onClear}
        className="text-brand-600 dark:text-brand-400 font-medium hover:text-brand-700 dark:hover:text-brand-300 transition-colors bg-brand-50 dark:bg-brand-900/30 px-6 py-2 rounded-lg hover:bg-brand-100 dark:hover:bg-brand-900/50"
      >
        Limpar busca
      </button>
    </div>
  );
}