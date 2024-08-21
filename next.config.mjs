/** @type {import('next').NextConfig} */
import './polyfills.mjs';
const nextConfig = {
    webpack: (config) => {
        config.resolve.alias.canvas = false;

        return config;
    },
};

export default nextConfig;
