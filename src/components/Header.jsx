import { useContext } from "react";
import { ShoppingBag, Store, Moon, Sun } from "lucide-react";
import { CartContext } from "../context/CartContext";

export function Header({ onOpenCart, toggleTheme, isDarkMode }) {
  const { cartCount } = useContext(CartContext);

  return (
    <header className="sticky top-0 z-40 w-full bg-white dark:bg-black border-b border-surface-100 dark:border-surface-800 shadow-sm transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2 cursor-pointer">
            <div className="bg-brand-600 p-2 rounded-lg text-white flex items-center justify-center">
              <Store size={24} strokeWidth={2.5} />
            </div>
            <span className="text-xl font-bold text-surface-900 dark:text-white tracking-tight">
              TGID<span className="text-brand-600">Store</span>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-2 text-surface-600 dark:text-white hover:text-brand-600 dark:hover:text-brand-400 transition-colors rounded-full hover:bg-surface-50 dark:hover:bg-surface-800"
              aria-label="Alternar tema"
            >
              {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
            </button>

            <button
              onClick={onOpenCart}
              className="relative p-2 flex items-center justify-center text-surface-600 dark:text-white hover:text-brand-600 dark:hover:text-brand-400 transition-colors rounded-full hover:bg-surface-50 dark:hover:bg-surface-800"
            >
              <ShoppingBag size={24} />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center min-w-[20px] h-[20px] px-1 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-brand-600 rounded-full border-2 border-white dark:border-black">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}