import { useCart } from "../context/CartContext";

export const useAddToCart = () => {
  const { setCart } = useCart();

  const addToCart = (product: any) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  return addToCart;
};
