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
            objectFit: "cover",
          }}
          src="https://res.cloudinary.com/dnkhbxpji/image/upload/v1736885315/Capture_d_e%CC%81cran_le_2025-01-14_a%CC%80_21.08.30_nmtszc.png"
          alt="Icône personnalisée"
        />
      </div>
    ),
    {
      ...size,
    }
  );
}
