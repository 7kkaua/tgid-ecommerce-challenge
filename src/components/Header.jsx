import { useContext } from "react";
import { ShoppingBag, Store } from "lucide-react";
import { CartContext } from "../context/CartContext";

export function Header({ onOpenCart }) {
  const { cartCount } = useContext(CartContext);

  return (
    <header className="sticky top-0 z-40 w-full bg-white border-b border-surface-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer transition-opacity hover:opacity-80">
            <div className="bg-brand-600 p-2 rounded-lg text-white flex items-center justify-center">
              <Store size={24} strokeWidth={2.5} />
            </div>
            <span className="text-xl font-bold text-surface-900 tracking-tight">
              TGID<span className="text-brand-600">Store</span>
            </span>
          </div>

          {/* Carrinho */}
          <button
            onClick={onOpenCart}
            className="relative p-2 flex items-center justify-center text-surface-600 hover:text-brand-600 transition-colors focus:outline-none rounded-full hover:bg-surface-50"
            aria-label="Abrir carrinho de compras"
          >
            <ShoppingBag size={24} />
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 inline-flex items-center justify-center min-w-[20px] h-[20px] px-1 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-brand-600 rounded-full border-2 border-white">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}