import { MongoClient, Db, ServerApiVersion } from "mongodb";

const uri = "mongodb+srv://primaaawdn:G34O3Qy4ksM5vu1l@cluster0.bvelp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

if (!uri) {
	throw new Error("MONGODB_URI is not defined in environment variables.");
}

const client = new MongoClient(uri, {
	serverApi: {
		version: ServerApiVersion.v1,
		strict: true,
		deprecationErrors: true,
	},
});

let db: Db | null = null;

const dbName = "Etzi";

export async function connectToDB(): Promise<Db> {
    if (!db) {
        try {
            await client.connect();
            db = client.db(dbName);
            const collections = await db.listCollections().toArray();
            console.log(`Connected to MongoDB! Collections in ${dbName}:`, collections.map(c => c.name));
        } catch (error) {
            console.error("MongoDB connection error:", error);
            throw error;
        }
    }
    return db;
}

export async function closeConnection(): Promise<void> {
	try {
		if (client) {
			await client.close();
			console.log("MongoDB connection closed");
		}
	} catch (error) {
		console.error("Error closing MongoDB connection:", error);
	}
}

export { client };
