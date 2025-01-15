import Swal from "sweetalert2";
import { useCart } from "../context/CartContext";
import { DELEVERYCOST } from "@/utils/constant";

export function usePayment(
  setLoading: (arg0: boolean) => void,
  outOfStockProduct: any
) {
  const { cart } = useCart();

  const checkout = async () => {
    setLoading(true);

    try {
      if (outOfStockProduct) {
        Swal.fire({
          title: "Erreur!",
          text: `Stock insuffisant pour : ${outOfStockProduct.title} Veillez à retirer cet article de votre panier`,
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
        const url = data.url;
        setLoading(false);
        window.location.href = url;
      }
    } catch (e) {
      console.error(
        "Erreur lors de la création de la session de paiement :",
        e
      );
      setLoading(false);
    }
  };
  return { checkout };
}
