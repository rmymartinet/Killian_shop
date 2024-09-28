import { useCart } from "../context/CartContext";

interface CartItem {
  id: string;
  category: string;
  title: string;
  price: string;
  length: string;
  weight: string;
  material: string;
  imageUrls: string[];
  imageDetails: string[];
  quantity: number;
}
export const useAddToCart = () => {
  const { setCart } = useCart();

  const addToCart = (product: CartItem) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  return addToCart;
};
