// src/app/utils/cloudinary.ts
export async function uploadToCloudinary(file: File) {
    const url = "https://api.cloudinary.com/v1_1/dnkhbxpji/image/upload";
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "unsigned_preset");
  
    const res = await fetch(url, {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    return data.secure_url;
  }