import { UserType } from "./../../types";
import { connectToDB } from "../config";
import { Collection, Db, Filter, ObjectId } from "mongodb";
import { hashPassword } from "@/lib/bcrypt";

export default class User {
	static col: Collection<UserType>;

	static async initialize() {
		const db: Db = await connectToDB();
		this.col = db.collection<UserType>("Users");
	}

	static async findAll() {
		if (!this.col) throw new Error("Collection is not initialized");
		return await this.col.find().toArray();
	}

	static async findById(_id: string) {
		if (!this.col) throw new Error("Collection is not initialized");
		return await this.col.findOne({ _id: new ObjectId(_id) });
	}

	static async create(data: UserType) {
        if (!this.col) throw new Error("Collection is not initialized");

        if (!data.password || typeof data.password !== "string") {
            throw new Error("Password is required and must be a string");
        }

        data.password = await hashPassword(data.password);
        await this.col.insertOne(data);
    }

	static async findOne(filter: Filter<UserType>) {
		if (!this.col) throw new Error("Collection is not initialized");
		return await this.col.findOne(filter);
	}
}
