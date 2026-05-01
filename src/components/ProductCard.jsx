import { useContext } from "react";
import { ShoppingCart } from "lucide-react";
import { CartContext } from "../context/CartContext";

export function ProductCard({ product }) {
  const { addToCart } = useContext(CartContext);

  // Utilizando a API nativa do navegador para formatar a moeda corretamente
  const formattedPrice = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(product.price);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-surface-100 overflow-hidden hover:shadow-md transition-shadow duration-300 flex flex-col">
      {/* Imagem e Categoria */}
      <div className="relative h-48 overflow-hidden group">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <span className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-brand-600 text-xs font-semibold px-2 py-1 rounded-md uppercase tracking-wider">
          {product.category}
        </span>
      </div>

      {/* Informações do Produto */}
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold text-surface-900 mb-1 leading-tight">
          {product.name}
        </h3>
        <p className="text-sm text-gray-500 mb-4 line-clamp-2 flex-grow">
          {product.description}
        </p>

        {/* Preço e Ação */}
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-surface-50">
          <span className="text-xl font-bold text-surface-900">
            {formattedPrice}
          </span>
          <button
            onClick={() => addToCart(product)}
            className="flex items-center justify-center gap-2 bg-brand-600 hover:bg-brand-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2"
            aria-label={`Adicionar ${product.name} ao carrinho`}
          >
            <ShoppingCart size={18} />
            <span className="hidden sm:inline">Adicionar</span>
          </button>
        </div>
      </div>
    </div>
  );
}