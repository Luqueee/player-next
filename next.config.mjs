/** @type {import('next').NextConfig} **/
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'i.scdn.co',
            },
        ],
        unoptimized: true,
    },
};

export default nextConfig;
