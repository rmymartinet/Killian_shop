"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BiErrorCircle } from "react-icons/bi";

const PaymentFailed = () => {
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [paymentFailed, setPaymentFailed] = useState<boolean | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const sessionId = params.get("session_id");
    setSessionId(sessionId);
  }, []);

  useEffect(() => {
    const verifyPayment = async () => {
      if (!sessionId) return;

      try {
        const response = await fetch(`/api/verify-payment/${sessionId}`);
        const data = await response.json();

        console.log("Payment verification data:", data);

        if (!data.success || data.paymentStatus !== "unpaid") {
          setPaymentFailed(false);
          setError(data.error || "Payment failed.");
        } else {
          setPaymentFailed(true);
        }
      } catch (error) {
        console.error("Error during payment verification:", error);
        setPaymentFailed(true);
        setError("An error occurred during payment verification.");
      }
    };

    verifyPayment();
  }, [sessionId]);

  useEffect(() => {
    if (paymentFailed) {
      const timeoutId = setTimeout(() => {
        router.push("/");
      }, 5000);

      return () => clearTimeout(timeoutId);
    }
  }, [paymentFailed, router]);

  useEffect(() => {
    console.log("Payment failed:", paymentFailed);
  }, [paymentFailed]);

  return (
    <main className="-mt-20 grid h-screen place-content-center">
      <div className="flex flex-col items-center gap-8 text-center">
        {paymentFailed === null && (
          <div>
            <h1>Payment Verification in Progress...</h1>
            <p>We are checking the status of your payment. Please wait.</p>
          </div>
        )}
        {paymentFailed === true && (
          <>
            <div>
              <BiErrorCircle size={40} className="text-red-600" />
            </div>
            <div className="flex flex-col gap-4">
              <h1 className="text-2xl font-bold text-red-600">
                Payment Failed
              </h1>
              <span className="text-xl opacity-70">
                Unfortunately, your payment could not be processed. You will be
                redirected shortly.
              </span>
            </div>
            <div className="w-max rounded-lg bg-gradient-to-tr from-red-500 to-orange-400 px-12 py-2">
              <p className="text-white">
                You will be redirected to the homepage in a few seconds.
              </p>
            </div>
          </>
        )}
        {paymentFailed === false && (
          <div>
            <h1>Payment Verified</h1>
            <p>Your payment was successfully verified.</p>
          </div>
        )}
        {error && <p className="text-red-600">{error}</p>}
      </div>
    </main>
  );
};

export default PaymentFailed;
