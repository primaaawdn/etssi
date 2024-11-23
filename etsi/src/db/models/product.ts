import { ProductType } from "./../../types";
import { connectToDB } from "../config";
import { Collection, ObjectId } from "mongodb";

export default class Product {
	static col: Collection<ProductType>;

	static async initialize() {
		const db = await connectToDB();
		this.col = db.collection<ProductType>("Products");
	}

	static async findAll(page = 1, limit = 10, query = {}): Promise<Product[]> {
		const db = await connectToDB();
		const collection = db.collection<ProductType>("Products");

		const skip = (page - 1) * limit;
		const products = await collection
			.find(query)
			.skip(skip)
			.limit(limit)
			.toArray();

		return products.map((product: ProductType) => ({
			_id: product._id ? product._id.toString() : undefined,
			name: product.name,
			slug: product.slug,
			description: product.description,
			excerpt: product.excerpt,
			price: product.price,
			tags: product.tags || [],
			thumbnail: product.thumbnail,
			images: product.images || [],
			createdAt: product.createdAt,
			updatedAt: product.updatedAt,
		}));
	}

	static async findById(_id: string) {
		await this.initialize();
		if (!this.col) throw new Error("Collection is not initialized");

		const objectId = new ObjectId(_id); 
		const product = await this.col.findOne({ _id: objectId });

		if (!product) return null;

		return {
			_id: product._id.toString(),
			name: product.name,
			slug: product.slug,
			description: product.description,
			excerpt: product.excerpt,
			price: product.price,
			tags: product.tags || [],
			thumbnail: product.thumbnail,
			images: product.images || [],
			createdAt: product.createdAt,
			updatedAt: product.updatedAt,
		};
	}

	static async create(data: ProductType) {
		await this.initialize();

		if (!this.col) {
			console.error("Collection not initialized");
			throw new Error("Collection is not initialized");
		}

		const currentDate = new Date();
		const productData = {
			...data,
			createdAt: currentDate,
			updatedAt: currentDate,
		};

		const result = await this.col.insertOne(productData);

		return result;
	}

	static async update(_id: string, data: ProductType) {
		await this.initialize();

		if (!this.col) {
			console.error("Collection not initialized");
			throw new Error("Collection is not initialized");
		}

		const currentDate = new Date();
		const updatedData = {
			...data,
			updatedAt: currentDate,
		};

		const result = await this.col.updateOne(
			{ _id: new ObjectId(_id) },
			{ $set: updatedData }
		);

		return result;
	}

	static async findBySlug(slug: string) {
		const db = await connectToDB();
		const collection = db.collection<ProductType>("Products");
		if (!collection) throw new Error("Collection is not initialized");

		const product = await collection.findOne({
			slug: { $regex: new RegExp(`^${slug}$`, "i") },
		});

		return product;
	}

	static async findPaginated(page: number, limit: number) {
		const db = await connectToDB();
		const collection = db.collection<ProductType>("Products");

		const products = await collection
			.find()
			.skip((page - 1) * limit)
			.limit(limit)
			.toArray();

		return products.map((product: ProductType) => ({
			_id: product._id,
			name: product.name,
			slug: product.slug,
			description: product.description,
			excerpt: product.excerpt,
			price: product.price,
			tags: product.tags || [],
			thumbnail: product.thumbnail,
			images: product.images || [],
			createdAt: product.createdAt,
			updatedAt: product.updatedAt,
		}));
	}

	static async find(query: object) {
		await this.initialize();

		if (!this.col) throw new Error("Collection is not initialized");

		return await this.col.find(query).toArray();
	}
}
