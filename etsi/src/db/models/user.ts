import { UserType } from "./../../types";
import { connectToDB } from "../config";
import { Collection, Filter, ObjectId } from "mongodb";
import { hashPassword } from "@/lib/bcrypt";

export default class User {
	static col: Collection<UserType>;

	static async initialize() {
		const db = await connectToDB();
		this.col = db.collection<UserType>("Users");
	}

	static async findAll() {
		await this.initialize();
		if (!this.col) throw new Error("Collection is not initialized");
		return await this.col.find().toArray();
	}

	static async findById(_id: string) {
		await this.initialize();
		if (!this.col) throw new Error("Collection is not initialized");
		return await this.col.findOne({ _id: new ObjectId(_id) });
	}

	static async create(data: UserType) {
		await this.initialize();
        if (!this.col) throw new Error("Collection is not initialized");

        if (!data.password || typeof data.password !== "string") {
            throw new Error("Password is required and must be a string");
        }

        data.password = await hashPassword(data.password);
        await this.col.insertOne(data);
    }

	static async findOne(filter: Filter<UserType>) {
		await this.initialize();
		if (!this.col) throw new Error("Collection is not initialized");
		return await this.col.findOne(filter);
	}
}
