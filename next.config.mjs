/** @type {import('next').NextConfig} */
const nextConfig = {
    async headers() {
        return [
            {
                source: "/api/:path*",
                headers: [
                    {
                        key: "Access-Control-Allow-Origin",
                        value: "rgca.engr.udel.edu",
                    },
                    {
                        key: "Access-Control-Allow-Methods",
                        value: "GET,OPTIONS",
                    },
                ],
            },
        ];
    },
};

export default nextConfig;
