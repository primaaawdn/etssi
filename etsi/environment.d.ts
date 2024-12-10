declare global {
	namespace NodeJS {
		interface ProcessEnv {
			NODE_ENV: "development" | "production";
			NEXT_PUBLIC_BASE_URL: "https://etssi.vercel.app";
			JWT_SECRET: "your_secret_here";
			MONGODB_URI: process.env.MONGODB_URI;
		}
	}
}

export {};
