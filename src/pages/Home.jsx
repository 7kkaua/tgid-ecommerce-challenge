import { useState } from "react";
import { Search, Frown } from "lucide-react";
import { products } from "../services/products.js";
import { ProductCard } from "../components/ProductCard";

export function Home() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-grow w-full transition-colors duration-300">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-surface-900 dark:text-white tracking-tight">
            Nossos Produtos
          </h1>
          <p className="text-surface-500 dark:text-surface-300 mt-1">
            Encontre os melhores equipamentos para o seu setup.
          </p>
        </div>
        
        <div className="relative w-full md:w-80">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-surface-400" />
          </div>
          <input
            type="text"
            placeholder="Buscar produtos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-surface-200 dark:border-surface-700 rounded-xl bg-white dark:bg-surface-800 text-surface-900 dark:text-white placeholder-surface-400 focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all shadow-sm"
          />
        </div>
      </div>

      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="bg-surface-100 dark:bg-surface-800 p-4 rounded-full mb-4">
            <Frown size={40} className="text-surface-400" />
          </div>
          <h3 className="text-xl font-semibold text-surface-900 dark:text-white mb-2">
            Nenhum produto encontrado
          </h3>
          <p className="text-surface-500 dark:text-surface-300 mb-6 max-w-md">
            Não encontramos resultados para "{searchTerm}".
          </p>
        </div>
      )}
    </main>
  );
}