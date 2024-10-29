/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from "next/og";

// Métadonnées de l'image
export const size = {
  width: 32,
  height: 32,
};
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover", // Assure que l'image couvre le conteneur
          }}
          src="https://res.cloudinary.com/dnkhbxpji/image/upload/v1727261092/2_xecw7d.png" // Utilisez le chemin complet si nécessaire
          alt="Icône personnalisée"
        />
      </div>
    ),
    {
      ...size,
    }
  );
}
