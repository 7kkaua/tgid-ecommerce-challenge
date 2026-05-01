import { X, ShoppingCart, Scale, Move } from "lucide-react";

export function ProductModal({ product, isOpen, onClose, onAddToCart }) {
  if (!isOpen || !product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-300">
      <div 
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white dark:bg-surface-800 rounded-3xl shadow-2xl flex flex-col md:flex-row"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Botão Fechar */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-black/10 dark:bg-white/10 hover:bg-black/20 dark:hover:bg-white/20 text-surface-900 dark:text-white rounded-full transition-colors"
        >
          <X size={24} />
        </button>

        {/* Lado Esquerdo: Imagem */}
        <div className="md:w-1/2 bg-surface-50 dark:bg-black">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover min-h-[300px] md:min-h-full"
          />
        </div>

        {/* Lado Direito: Detalhes */}
        <div className="md:w-1/2 p-8 flex flex-col">
          <span className="text-brand-600 dark:text-brand-400 font-bold text-sm tracking-widest uppercase mb-2">
            {product.category}
          </span>
          <h2 className="text-3xl font-extrabold text-surface-900 dark:text-white mb-4">
            {product.name}
          </h2>
          
          <div className="space-y-4 mb-8">
            <p className="text-surface-600 dark:text-surface-300 leading-relaxed">
              {product.fullDescription}
            </p>
            
            {/* Especificações Técnicas */}
            <div className="grid grid-cols-2 gap-4 py-4 border-y border-surface-100 dark:border-surface-700">
              <div className="flex items-center gap-2 text-surface-500 dark:text-surface-400">
                <Scale size={18} />
                <span className="text-sm font-medium">{product.specs.weight}</span>
              </div>
              <div className="flex items-center gap-2 text-surface-500 dark:text-surface-400">
                <Move size={18} />
                <span className="text-sm font-medium">{product.specs.dimensions}</span>
              </div>
            </div>
          </div>

          <div className="mt-auto flex items-center justify-between gap-6">
            <div>
              <p className="text-surface-400 text-xs uppercase font-bold tracking-tighter">Preço à vista</p>
              <span className="text-3xl font-black text-surface-900 dark:text-white">
                {new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(product.price)}
              </span>
            </div>
            <button 
              onClick={() => {
                onAddToCart(product);
                onClose();
              }}
              className="flex-1 flex items-center justify-center gap-3 bg-brand-600 hover:bg-brand-700 text-white px-6 py-4 rounded-2xl font-bold transition-all active:scale-95 shadow-lg shadow-brand-500/20"
            >
              <ShoppingCart size={20} />
              Comprar Agora
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}