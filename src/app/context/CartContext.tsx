import { ReactNode, createContext, useContext, useState } from "react";

interface CartContextProps {
  cart: any[];
  setCart: (cart: any[]) => void;
  isShoppingOpen: boolean;
  setIsShoppingOpen: (isShoppingOpen: boolean) => void;
  children: ReactNode;
}

// Créer le contexte du panier
const CartContext = createContext<CartContextProps | undefined>(undefined);

// Fournisseur du contexte
export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<any[]>([]);
  const [isShoppingOpen, setIsShoppingOpen] = useState<boolean>(false);

  console.log(isShoppingOpen);

  return (
    <CartContext.Provider
      value={{ cart, setCart, isShoppingOpen, setIsShoppingOpen, children }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Hook pour utiliser le contexte du panier
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
