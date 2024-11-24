const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "*",
			},
			{
				protocol: "http",
				hostname: "*",
			},
		],
	},
	env: {
		NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
		JWT_SECRET: process.env.JWT_SECRET,
		MONGODB_URI: process.env.MONGODB_URI,
	},
};

export default nextConfig;
