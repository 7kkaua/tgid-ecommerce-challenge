import { useState } from "react";
import { Toaster } from "sonner";
import { CartProvider } from "./context/CartContext";
import { Header } from "./components/Header";
import { CartDrawer } from "./components/CartDrawer";
import { Home } from "./pages/Home";

export default function App() {
  // Estado que controla se o menu lateral (carrinho) está aberto ou fechado
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <CartProvider>
      {/* O container principal que garante que o rodapé/conteúdo ocupe toda a tela */}
      <div className="min-h-screen flex flex-col relative bg-surface-50">
        
        {/* Componente de notificações (Toast) configurado com cores ricas */}
        <Toaster position="top-right" richColors expand={false} />
        
        {/* Cabeçalho passando a função para abrir o carrinho */}
        <Header onOpenCart={() => setIsCartOpen(true)} />
        
        {/* Página principal contendo os produtos */}
        <Home />
        
        {/* Menu lateral do carrinho */}
        <CartDrawer 
          isOpen={isCartOpen} 
          onClose={() => setIsCartOpen(false)} 
        />
        
      </div>
    </CartProvider>
  );
}