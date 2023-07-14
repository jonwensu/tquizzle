/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa');

const nextConfig = withPWA({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development'
})({
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'is1-ssl.mzstatic.com',
        port: ''
      }
    ]
  }
});

module.exports = nextConfig;
