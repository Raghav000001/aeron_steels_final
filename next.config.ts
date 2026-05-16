import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ['nodemailer', 'mongoose'],
};

export default nextConfig;
