import { useContext, useState } from "react";
import { ShoppingCart, Eye } from "lucide-react";
import { CartContext } from "../context/CartContext";
import { ProductModal } from "./ProductModal";
import { formatCurrency } from "../utils/format";

export function ProductCard({ product }) {
  const { addToCart } = useContext(CartContext);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div 
        onClick={() => setIsModalOpen(true)}
        className="bg-white dark:bg-surface-800 rounded-2xl border border-surface-100 dark:border-surface-700 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col group cursor-pointer"
      >
        <div className="relative overflow-hidden aspect-video bg-surface-50 dark:bg-black">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
          />
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center border-b border-surface-50 dark:border-surface-700">
            <div className="bg-white/20 backdrop-blur-md p-3 rounded-full text-white">
              <Eye size={24} />
            </div>
          </div>
          <span className="absolute top-3 right-3 bg-white/90 dark:bg-black/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-brand-600 dark:text-brand-400 tracking-wider uppercase">
            {product.category}
          </span>
        </div>
        
        <div className="p-5 flex flex-col flex-grow">
          <h3 className="text-lg font-bold text-surface-900 dark:text-white mb-1 line-clamp-1">
            {product.name}
          </h3>
          <p className="text-surface-500 dark:text-surface-300 text-sm mb-4 line-clamp-2 flex-grow">
            {product.description}
          </p>
          
          <div className="flex items-center justify-between mt-auto">
            <span className="text-xl font-extrabold text-surface-900 dark:text-white">
              {formatCurrency(product.price)}
            </span>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                addToCart(product);
              }} 
              className="z-10 bg-brand-600 hover:bg-brand-700 text-white p-2.5 rounded-xl transition-all active:scale-90 shadow-lg shadow-brand-500/20"
            >
              <ShoppingCart size={20} />
            </button>
          </div>
        </div>
      </div>

      <ProductModal 
        product={product} 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        onAddToCart={addToCart}
      />
    </>
  );
}