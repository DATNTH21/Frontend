/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack']
    });
    config.infrastructureLogging = { debug: /PackFileCache/ };
    return config;
  }
};

export default nextConfig;
