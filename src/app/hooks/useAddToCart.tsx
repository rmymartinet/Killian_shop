import { Data } from "@/types/dataTypes";
import { useCart } from "../context/CartContext";

export const useAddToCart = () => {
  const { cart, setCart, setIsShoppingOpen } = useCart();

  const addToCart = (product: Data) => {
    const isExistingProduct = cart.findIndex((item) => item.id === product.id);
    setIsShoppingOpen(true);
    if (isExistingProduct >= 0) {
      return;
    }

    setCart((prevCart) => [...prevCart, product]);
  };

  return addToCart;
};
