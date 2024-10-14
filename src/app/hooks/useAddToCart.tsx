import { Data } from "@/types/dataTypes";
import { useCart } from "../context/CartContext";

export const useAddToCart = () => {
  const { setCart } = useCart();

  const addToCart = (product: Data) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  return addToCart;
};
