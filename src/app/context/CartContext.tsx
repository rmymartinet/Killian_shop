import { ReactNode, createContext, useContext, useState } from "react";

interface CartItem {
  id: string;
  title: string;
  price: string;
  quantity: number;
  imageUrls: string[];
}

interface CartContextProps {
  cart: CartItem[];
  setCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
  isShoppingOpen: boolean;
  setIsShoppingOpen: (isShoppingOpen: boolean) => void;
}

// Créer le contexte du panier
const CartContext = createContext<CartContextProps | undefined>(undefined);

// Fournisseur du contexte
export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isShoppingOpen, setIsShoppingOpen] = useState<boolean>(false);

  console.log(isShoppingOpen);

  return (
    <CartContext.Provider
      value={{ cart, setCart, isShoppingOpen, setIsShoppingOpen }}
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
