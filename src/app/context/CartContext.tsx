import { Data } from "@/types/dataTypes";
import { ReactNode, createContext, useContext, useState } from "react";

interface CartContextProps {
  cart: Data[];
  setCart: React.Dispatch<React.SetStateAction<Data[]>>;
  isShoppingOpen: boolean;
  setIsShoppingOpen: (isShoppingOpen: boolean) => void;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<Data[]>([]);
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

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
