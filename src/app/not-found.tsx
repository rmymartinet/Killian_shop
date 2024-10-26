"use client";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Custom404() {
  return (
    <motion.div
      className="fixed top-0 z-50 w-screen min-h-screen flex flex-col items-center justify-center bg-gray-100"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-6xl font-bold text-red-500">404</h1>
      <p className="text-2xl mt-4">
        Oups! La page que vous recherchez existe pas.
      </p>
      <Link
        className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
        href="/"
      >
        <button>Retour à accueil</button>
      </Link>
      <motion.img
        src="/images/404.svg"
        alt="Page non trouvée"
        className="mt-8 w-1/2 max-w-md"
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      />
    </motion.div>
  );
}
