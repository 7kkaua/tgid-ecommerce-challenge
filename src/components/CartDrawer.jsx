import { useContext } from "react";
import { X, Trash2, Plus, Minus, ShoppingBag } from "lucide-react";
import { CartContext } from "../context/CartContext";

export function CartDrawer({ isOpen, onClose }) {
  const { cart, removeFromCart, updateQuantity, cartTotal, clearCart } = useContext(CartContext);

  const formattedTotal = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(cartTotal);

  // Impede que o clique no painel do carrinho feche o drawer, 
  // fechando apenas se clicar no overlay escuro.
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <>
      {/* Overlay escuro de fundo */}
      <div 
        className={`fixed inset-0 bg-surface-900/40 backdrop-blur-sm z-50 transition-opacity duration-300 ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
        onClick={handleOverlayClick}
      >
        {/* Painel lateral do carrinho */}
        <div 
          className={`fixed top-0 right-0 h-full w-full sm:w-[400px] bg-white shadow-2xl transform transition-transform duration-300 ease-in-out flex flex-col ${isOpen ? "translate-x-0" : "translate-x-full"}`}
        >
          {/* Cabeçalho do Drawer */}
          <div className="flex items-center justify-between p-5 border-b border-surface-100">
            <div className="flex items-center gap-2">
              <ShoppingBag className="text-brand-600" size={24} />
              <h2 className="text-xl font-bold text-surface-900 tracking-tight">Seu Carrinho</h2>
            </div>
            <button 
              onClick={onClose}
              className="p-2 text-surface-400 hover:text-surface-900 hover:bg-surface-50 rounded-full transition-colors focus:outline-none"
              aria-label="Fechar carrinho"
            >
              <X size={24} />
            </button>
          </div>

          {/* Lista de Itens do Carrinho */}
          <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-4">
            {cart.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center gap-4">
                <div className="bg-surface-50 p-4 rounded-full">
                  <ShoppingBag size={48} className="text-surface-300" />
                </div>
                <div>
                  <p className="text-surface-900 font-semibold mb-1">Seu carrinho está vazio.</p>
                  <p className="text-sm text-surface-500 mb-4">Adicione produtos para continuar.</p>
                  <button 
                    onClick={onClose}
                    className="text-brand-600 font-medium hover:text-brand-700 transition-colors"
                  >
                    Voltar para a loja
                  </button>
                </div>
              </div>
            ) : (
              cart.map((item) => (
                <div key={item.id} className="flex gap-4 bg-white p-3 rounded-xl border border-surface-100 shadow-sm">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-20 h-20 object-cover rounded-lg border border-surface-50"
                  />
                  <div className="flex-1 flex flex-col justify-between py-1">
                    <div>
                      <h3 className="text-sm font-semibold text-surface-900 line-clamp-1">{item.name}</h3>
                      <span className="text-brand-600 font-bold text-sm block mt-1">
                        {new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(item.price)}
                      </span>
                    </div>
                    
                    {/* Controles de Quantidade e Remoção */}
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-2 bg-surface-50 border border-surface-200 rounded-lg px-2 py-1">
                        <button 
                          onClick={() => updateQuantity(item.id, "decrease")}
                          className="text-surface-500 hover:text-brand-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                          disabled={item.quantity <= 1}
                        >
                          <Minus size={14} />
                        </button>
                        <span className="text-sm font-medium w-6 text-center text-surface-900">
                          {item.quantity}
                        </span>
                        <button 
                          onClick={() => updateQuantity(item.id, "increase")}
                          className="text-surface-500 hover:text-brand-600 transition-colors"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 hover:text-red-700 p-1.5 hover:bg-red-50 rounded-md transition-colors"
                        aria-label="Remover item"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Rodapé do Drawer com Subtotal e Botão de Checkout */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-surface-100 bg-white">
              <div className="flex items-center justify-between mb-4">
                <span className="text-surface-500 font-medium text-sm">Subtotal</span>
                <span className="text-2xl font-bold text-surface-900">{formattedTotal}</span>
              </div>
              <button 
                onClick={() => {
                  // Aqui simularíamos o envio para uma API de pagamentos
                  alert("Compra finalizada com sucesso! Esta é uma simulação.");
                  clearCart();
                  onClose();
                }}
                className="w-full flex items-center justify-center bg-brand-600 hover:bg-brand-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 active:scale-[0.98]"
              >
                Finalizar Compra
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}