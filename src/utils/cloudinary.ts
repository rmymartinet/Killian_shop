// src/app/utils/cloudinary.ts
export async function uploadToCloudinary(file: File) {
    try {
        const url = "https://api.cloudinary.com/v1_1/dnkhbxpji/image/upload";
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "unsigned_preset");
              
        const res = await fetch(url, {
          method: "POST",
          body: formData,
        });
        
        if (!res.ok) {
          const errorText = await res.text();
          console.error("Erreur Cloudinary:", res.status, errorText);
          throw new Error(`Erreur Cloudinary: ${res.status} - ${errorText}`);
        }
        
        const data = await res.json();
        
        if (!data.secure_url) {
          console.error("Pas d'URL sécurisée dans la réponse:", data);
          throw new Error("URL sécurisée manquante dans la réponse Cloudinary");
        }
        
        return data.secure_url;
    } catch (error) {
        console.error("Erreur dans uploadToCloudinary:", error);
        throw error;
    }
}