declare global {
	namespace NodeJS {
		interface ProcessEnv {
			NODE_ENV: "development" | "production";
			NEXT_PUBLIC_API_URL: "http://localhost:3000";
			JWT_SECRET: "your_secret_here";
			MONGODB_URI :"mongodb+srv://primaaawdn:G34O3Qy4ksM5vu1l@cluster0.bvelp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
		}
	}
}

export {};
