import { useState } from "react";
import { Toaster } from "sonner";
import { CartProvider } from "./context/CartContext";
import { useTheme } from "./hooks/useTheme";
import { Header } from "./components/Header";
import { CartDrawer } from "./components/CartDrawer";
import { Home } from "./pages/Home";

export default function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <CartProvider>
      <div className="min-h-screen flex flex-col relative bg-surface-50 dark:bg-black transition-colors duration-300">
        
        <Toaster 
          position="top-right" 
          richColors 
          expand={false} 
          theme={isDarkMode ? "dark" : "light"} 
        />
        
        <Header 
          onOpenCart={() => setIsCartOpen(true)} 
          toggleTheme={toggleTheme}
          isDarkMode={isDarkMode}
        />
        
        <Home />
        
        <CartDrawer 
          isOpen={isCartOpen} 
          onClose={() => setIsCartOpen(false)} 
        />
        
      </div>
    </CartProvider>
  );
}