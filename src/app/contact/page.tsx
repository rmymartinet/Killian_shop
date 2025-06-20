"use client";

import { useRef } from "react";
import { FaInstagram } from "react-icons/fa";
import { revealBlockAnimation } from "@/utils/Animation";

export default function ContactPage() {

  const contactPageRef = useRef<HTMLDivElement>(null);
  revealBlockAnimation({ref: contactPageRef, delay: 0.5 });

  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-10 p-8 bg-gradient-to-br from-gray-50 to-gray-100 mt-[20vh] md:mt-0" ref={contactPageRef}>
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-xl p-8 text-center">
        <h1 className="text-4xl font-bold mb-6 text-gray-800">Contactez-nous</h1>
        
        <p className="text-lg text-gray-600 mb-8">
          Vous avez une question, une suggestion ou besoin d'aide ? 
          Contactez-nous directement sur Instagram !
        </p>

        <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl p-8 text-white">
          <div className="flex items-center justify-center gap-3 mb-4">
            <FaInstagram size={32} />
            <h2 className="text-2xl font-semibold">Instagram</h2>
          </div>
          <p className="mb-6 text-lg">C'est notre unique moyen de communication !</p>
          <a 
            href="https://www.instagram.com/sfdts.fr/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-block bg-white text-purple-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors shadow-lg"
          >
            Nous contacter sur Instagram
          </a>
        </div>

        <div className="mt-8 p-4 bg-blue-50 rounded-lg">
          <p className="text-blue-800 text-sm">
            💡 <strong>Réponse rapide garantie !</strong> Nous répondons généralement dans l'heure sur Instagram.
          </p>
        </div>
      </div>
    </main>
  );
}   