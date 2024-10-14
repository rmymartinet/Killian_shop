import { useCart } from "../context/CartContext";

export const useRemoveFromCart = () => {
  const { cart, setCart } = useCart();

  const removeFromCart = (productId: string) => {
    const productIndex = cart.findIndex((item) => item.id === productId);

    if (productIndex >= 0) {
      const newCart = [...cart];
      newCart.splice(productIndex, 1);
      setCart(newCart);
    }
  };

  return removeFromCart;
};
