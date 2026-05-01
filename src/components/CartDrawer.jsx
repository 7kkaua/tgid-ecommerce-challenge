import { useContext, useState } from "react";
import { X, ShoppingBag, CheckCircle } from "lucide-react";
import { CartContext } from "../context/CartContext";
import { formatCurrency } from "../utils/format";
import { CartItem } from "./CartItem";

export function CartDrawer({ isOpen, onClose }) {
  const { cart, removeFromCart, updateQuantity, cartTotal, clearCart } = useContext(CartContext);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleClose = () => {
    onClose();
    setTimeout(() => setIsSuccess(false), 300);
  };

  const handleCheckout = () => {
    clearCart();
    setIsSuccess(true);
  };

  return (
    <>
      <div 
        className={`fixed inset-0 bg-surface-900/60 backdrop-blur-sm z-50 transition-opacity duration-300 ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
        onClick={(e) => e.target === e.currentTarget && handleClose()}
      >
        <div className={`fixed top-0 right-0 h-full w-full sm:w-[400px] bg-white dark:bg-surface-900 shadow-2xl transform transition-transform duration-300 flex flex-col ${isOpen ? "translate-x-0" : "translate-x-full"}`}>
          
          <div className="flex items-center justify-between p-5 border-b border-surface-100 dark:border-surface-800">
            <div className="flex items-center gap-2">
              <ShoppingBag className="text-brand-600 dark:text-brand-400" size={24} />
              <h2 className="text-xl font-bold dark:text-white tracking-tight">Seu Carrinho</h2>
            </div>
            <button onClick={handleClose} className="p-2 text-surface-400 hover:text-surface-900 dark:hover:text-white transition-colors">
              <X size={24} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-4">
            {isSuccess ? (
              <div className="flex flex-col items-center justify-center h-full p-8 text-center animate-in zoom-in duration-300">
                <div className="bg-green-100 dark:bg-green-900/20 p-5 rounded-full mb-6">
                  <CheckCircle size={64} className="text-green-500 dark:text-green-400" />
                </div>
                <h2 className="text-2xl font-bold text-surface-900 dark:text-white mb-2">Compra Finalizada!</h2>
                <p className="text-surface-500 text-sm">Seu pedido foi processado com sucesso.</p>
                <button onClick={handleClose} className="w-full bg-surface-100 dark:bg-surface-800 text-surface-900 dark:text-white font-semibold py-3 rounded-xl mt-8">Continuar Comprando</button>
              </div>
            ) : cart.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center gap-4">
                <ShoppingBag size={48} className="text-surface-200 dark:text-surface-700" />
                <p className="dark:text-surface-400 font-medium">Seu carrinho está vazio.</p>
              </div>
            ) : (
              cart.map((item) => (
                <CartItem 
                  key={item.id} 
                  item={item} 
                  onUpdateQuantity={updateQuantity} 
                  onRemove={removeFromCart} 
                />
              ))
            )}
          </div>

          {!isSuccess && cart.length > 0 && (
            <div className="p-5 border-t border-surface-100 dark:border-surface-800 bg-white dark:bg-surface-900">
              <div className="flex items-center justify-between mb-4">
                <span className="text-surface-500 dark:text-surface-400">Total</span>
                <span className="text-2xl font-bold dark:text-white">{formatCurrency(cartTotal)}</span>
              </div>
              <button onClick={handleCheckout} className="w-full bg-brand-600 hover:bg-brand-700 text-white font-semibold py-3 rounded-xl transition-all active:scale-95">
                Finalizar Compra
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}