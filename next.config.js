/** @type {import('next').NextConfig} */
const path = require('path');
const withPWA = require("next-pwa");
const withPlugins = require('next-compose-plugins');

const nextConfig = {
  experimental: {
    appDir: true,
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
    reactStrictMode: true,
  },
}

module.exports = withPlugins([
  [withPWA, {pwa:{dest:'public'}}]
], nextConfig);

