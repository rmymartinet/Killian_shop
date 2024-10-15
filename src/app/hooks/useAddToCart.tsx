import { Data } from "@/types/dataTypes";
import { useCart } from "../context/CartContext";

export const useAddToCart = () => {
  const { cart, setCart } = useCart();

  const addToCart = (product: Data) => {
    const isExistingProduct = cart.findIndex((item) => item.id === product.id);

    if (isExistingProduct >= 0) {
      return;
    }

    // Sinon, on ajoute le produit au panier
    setCart((prevCart) => [...prevCart, product]);
  };

  return addToCart;
};
