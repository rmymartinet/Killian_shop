import nodemailer from "nodemailer";

export async function sendEmail(to: string, subject: string, html: string) {
  try {
    // Création du transporteur avec les détails SMTP
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: parseInt(process.env.MAIL_PORT as string),
      secure: process.env.MAIL_SECURE === "true", // Utiliser TLS si true
      auth: {
        user: process.env.MAIL_USER, // Utilisateur SMTP
        pass: process.env.MAIL_PASS, // Mot de passe SMTP
      },
    });

    // Envoi de l'email
    await transporter.sendMail({
      from: '"Mon Site" <no-reply@monsite.com>', // L'expéditeur
      to, // Destinataire
      subject, // Sujet de l'email
      html, // Contenu HTML de l'email
    });

    console.log(`Email envoyé avec succès à ${to}`);
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'email:", error);
  }
}
