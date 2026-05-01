import { useContext, useState } from "react";
import { X, Trash2, Plus, Minus, ShoppingBag, CheckCircle } from "lucide-react";
import { CartContext } from "../context/CartContext";
import { formatCurrency } from "../utils/format";

export function CartDrawer({ isOpen, onClose }) {
  const { cart, removeFromCart, updateQuantity, cartTotal, clearCart } = useContext(CartContext);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setIsSuccess(false);
    }, 300);
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  const handleCheckout = () => {
    clearCart();
    setIsSuccess(true);
  };

  return (
    <>
      <div 
        className={`fixed inset-0 bg-surface-900/60 backdrop-blur-sm z-50 transition-opacity duration-300 ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
        onClick={handleOverlayClick}
      >
        <div 
          className={`fixed top-0 right-0 h-full w-full sm:w-[400px] bg-white dark:bg-surface-900 shadow-2xl transform transition-transform duration-300 ease-in-out flex flex-col ${isOpen ? "translate-x-0" : "translate-x-full"}`}
        >
          {isSuccess ? (
            <div className="flex flex-col items-center justify-center h-full p-8 text-center animate-in fade-in zoom-in duration-500">
              <div className="bg-green-100 dark:bg-green-900/20 p-5 rounded-full mb-6">
                <CheckCircle size={64} className="text-green-500 dark:text-green-400" />
              </div>
              <h2 className="text-2xl font-bold text-surface-900 dark:text-white mb-2 tracking-tight">
                Compra Finalizada!
              </h2>
              <p className="text-surface-500 dark:text-surface-400 mb-8">
                Seu pedido foi processado com sucesso. Esta é uma simulação para o desafio técnico da TGID.
              </p>
              <button 
                onClick={handleClose}
                className="w-full bg-surface-100 dark:bg-surface-800 hover:bg-surface-200 dark:hover:bg-surface-700 text-surface-900 dark:text-white font-semibold py-3 px-4 rounded-xl transition-colors duration-200"
              >
                Continuar Comprando
              </button>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between p-5 border-b border-surface-100 dark:border-surface-800">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="text-brand-600 dark:text-brand-400" size={24} />
                  <h2 className="text-xl font-bold text-surface-900 dark:text-white tracking-tight">Seu Carrinho</h2>
                </div>
                <button 
                  onClick={handleClose}
                  className="p-2 text-surface-400 hover:text-surface-900 dark:hover:text-white hover:bg-surface-50 dark:hover:bg-surface-800 rounded-full transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-4">
                {cart.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center gap-4">
                    <div className="bg-surface-50 dark:bg-surface-800 p-4 rounded-full">
                      <ShoppingBag size={48} className="text-surface-300 dark:text-surface-600" />
                    </div>
                    <div>
                      <p className="text-surface-900 dark:text-white font-semibold mb-1">Seu carrinho está vazio.</p>
                      <p className="text-sm text-surface-500 dark:text-surface-400 mb-4">Adicione produtos para continuar.</p>
                      <button onClick={handleClose} className="text-brand-600 dark:text-brand-400 font-medium">
                        Voltar para a loja
                      </button>
                    </div>
                  </div>
                ) : (
                  cart.map((item) => (
                    <div key={item.id} className="flex gap-4 bg-white dark:bg-surface-800 p-3 rounded-xl border border-surface-100 dark:border-surface-700 shadow-sm">
                      <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg border border-surface-50 dark:border-surface-900" />
                      <div className="flex-1 flex flex-col justify-between py-1">
                        <div>
                          <h3 className="text-sm font-semibold text-surface-900 dark:text-white line-clamp-1">{item.name}</h3>
                          <span className="text-brand-600 dark:text-brand-400 font-bold text-sm block mt-1">
                            {formatCurrency(item.price)}
                          </span>
                        </div>
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center gap-2 bg-surface-50 dark:bg-surface-900 border border-surface-200 dark:border-surface-700 rounded-lg px-2 py-1">
                            <button onClick={() => updateQuantity(item.id, "decrease")} className="text-surface-500 dark:text-surface-400 hover:text-brand-600" disabled={item.quantity <= 1}>
                              <Minus size={14} />
                            </button>
                            <span className="text-sm font-medium w-6 text-center text-surface-900 dark:text-white">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.id, "increase")} className="text-surface-500 dark:text-surface-400 hover:text-brand-600">
                              <Plus size={14} />
                            </button>
                          </div>
                          <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:text-red-700 p-1.5 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md transition-colors">
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {cart.length > 0 && (
                <div className="p-5 border-t border-surface-100 dark:border-surface-800 bg-white dark:bg-surface-900">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-surface-500 dark:text-surface-400 font-medium text-sm">Total</span>
                    <span className="text-2xl font-bold text-surface-900 dark:text-white">{formatCurrency(cartTotal)}</span>
                  </div>
                  <button 
                    onClick={handleCheckout}
                    className="w-full flex items-center justify-center bg-brand-600 hover:bg-brand-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 focus:outline-none"
                  >
                    Finalizar Compra
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}