import Swal from "sweetalert2";
import { useCart } from "../context/CartContext";
import { DELEVERYCOST } from "@/utils/constant";
import { Data } from "@/types/dataTypes";

export function usePayment(
  setLoading: (value: boolean) => void,
  outOfStockProduct: Data | undefined
) {
  const { cart } = useCart();

  const checkout = async () => {
    setLoading(true);

    try {
      if (outOfStockProduct === undefined) {
        Swal.fire({
          title: "Erreur!",
          text: "Stock insuffisant pour un produit. Veillez à retirer cet article de votre panier",
          icon: "error",
          confirmButtonText: "OK",
        });
        setLoading(false);
        throw new Error("Stock insuffisant");
      }

      const products = cart.flat();

      if (
        products.some(
          (product) => product.price === undefined || product.price === 0
        )
      ) {
        console.error("Un ou plusieurs produits n'ont pas de prix défini.");
        setLoading(false);
        return;
      }

      const response = await fetch(`api/checkout_sessions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          products,
          DELEVERYCOST,
        }),
      });
      const data = await response.json();
      if (data?.url) {
        setLoading(false);
        window.location.href = data.url;
      } else {
        setLoading(false);
        Swal.fire({
          title: "Erreur paiement",
          text: data?.error || "Impossible de créer la session de paiement Stripe.",
          icon: "error",
          confirmButtonText: "OK",
        });
        console.error("Erreur Stripe checkout:", data);
      }
    } catch (error) {
      console.error(
        "Erreur lors de la création de la session de paiement :",
        error
      );
      setLoading(false);
    }
  };
  return { checkout };
}
