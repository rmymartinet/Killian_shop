import { Data } from "@/types/dataTypes";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

// Fonction pour obtenir l'ID de session unique ou l'utilisateur connecté
const getUserId = () => {
  if (typeof window !== "undefined") {
    const userId = localStorage.getItem("userId");

    // Si aucun utilisateur n'est connecté, on utilise le sessionStorage
    if (!userId) {
      let sessionUserId = sessionStorage.getItem("sessionUserId");

      // Si aucun ID de session n'existe, en créer un
      if (!sessionUserId) {
        sessionUserId = generateUUID(); // Appel de la fonction pour générer un UUID
        sessionStorage.setItem("sessionUserId", sessionUserId);
      }
      return sessionUserId;
    }
    return userId; // Retourner l'ID utilisateur si connecté
  }
  return null;
};

const generateUUID = () => {
  return "guest_" + Math.random().toString(36).substr(2, 9);
};

interface CartContextProps {
  cart: Data[];
  setCart: React.Dispatch<React.SetStateAction<Data[]>>;
  isShoppingOpen: boolean;
  setIsShoppingOpen: (isShoppingOpen: boolean) => void;
}

// Créer le contexte du panier
const CartContext = createContext<CartContextProps | undefined>(undefined);

// Fournisseur du contexte
export const CartProvider = ({ children }: { children: ReactNode }) => {
  const userId = getUserId(); // Utiliser l'ID de session ou utilisateur

  // Charger le panier spécifique à l'utilisateur ou session
  const getInitialCart = () => {
    if (typeof window !== "undefined" && userId) {
      // Utiliser sessionStorage si l'utilisateur n'est pas connecté
      const storage =
        localStorage.getItem(`cart_${userId}`) ||
        sessionStorage.getItem(`cart_${userId}`);
      return storage ? JSON.parse(storage) : [];
    }
    return [];
  };

  const [cart, setCart] = useState<Data[]>(getInitialCart);
  const [isShoppingOpen, setIsShoppingOpen] = useState<boolean>(false);

  // Sauvegarder le panier dans le bon storage selon l'utilisateur
  useEffect(() => {
    if (typeof window !== "undefined" && userId) {
      if (cart.length > 0) {
        // Sauvegarder dans sessionStorage si non connecté, sinon localStorage
        const storageType = localStorage.getItem("userId")
          ? localStorage
          : sessionStorage;
        storageType.setItem(`cart_${userId}`, JSON.stringify(cart));
      }
    }
  }, [cart, userId]);

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
