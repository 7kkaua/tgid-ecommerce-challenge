import { Trash2, Plus, Minus } from "lucide-react";
import { formatCurrency } from "../utils/format";

export function CartItem({ item, onUpdateQuantity, onRemove }) {
  return (
    <div className="flex gap-4 bg-white dark:bg-surface-800 p-3 rounded-xl border border-surface-100 dark:border-surface-700 shadow-sm transition-colors">
      <img 
        src={item.image} 
        alt={item.name} 
        className="w-20 h-20 object-cover rounded-lg border border-surface-50 dark:border-surface-900" 
      />
      
      <div className="flex-1 flex flex-col justify-between py-1">
        <div>
          <h3 className="text-sm font-semibold text-surface-900 dark:text-white line-clamp-1">
            {item.name}
          </h3>
          <span className="text-brand-600 dark:text-brand-400 font-bold text-sm block mt-1">
            {formatCurrency(item.price)}
          </span>
        </div>

        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center gap-2 bg-surface-50 dark:bg-surface-900 border border-surface-200 dark:border-surface-700 rounded-lg px-2 py-1">
            <button 
              onClick={() => onUpdateQuantity(item.id, "decrease")} 
              className="text-surface-500 dark:text-surface-400 hover:text-brand-600 transition-colors"
              disabled={item.quantity <= 1}
            >
              <Minus size={14} />
            </button>
            <span className="text-sm font-medium w-6 text-center text-surface-900 dark:text-white">
              {item.quantity}
            </span>
            <button 
              onClick={() => onUpdateQuantity(item.id, "increase")} 
              className="text-surface-500 dark:text-surface-400 hover:text-brand-600 transition-colors"
            >
              <Plus size={14} />
            </button>
          </div>

          <button 
            onClick={() => onRemove(item.id)} 
            className="text-red-500 hover:text-red-700 p-1.5 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md transition-colors"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}