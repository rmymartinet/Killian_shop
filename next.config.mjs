/** @type {import('next').NextConfig} */
export default {
  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: "https://sfdts.fr/",
          },
        ],
      },
    ];
  },
  images: {
    domains: ["res.cloudinary.com"],
  },
};
