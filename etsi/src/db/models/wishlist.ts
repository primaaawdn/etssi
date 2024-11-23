import { WishlistType } from "@/types";
import { Collection } from "mongodb";
import { connectToDB } from "../config";

export default class Wishlist {
    static col: Collection<WishlistType>;

    static async initialize() {
        const db = await connectToDB();
        this.col = db.collection<WishlistType>("Wishlists");
    }

    static async findAll(query = {}) {
        await this.initialize();
        if (!this.col) throw new Error("Collection is not initialized");
        return await this.col.find(query).toArray();
    }

    static async findByUserId(userId: string) {
        await this.initialize();
        if (!this.col) throw new Error("Collection is not initialized");
        return await this.col.find({ userId }).toArray();
    }

    static async findById(id: string) {
        await this.initialize();
        if (!this.col) throw new Error("Collection is not initialized");
        return await this.col.findOne({ _id: id });
    }

    static async addWishlist(data: WishlistType) {
        await this.initialize();

        if (!this.col) {
            console.error("Collection not initialized");
            throw new Error("Collection is not initialized");
        }

        const currentDate = new Date();
        const wishlistData = {
            ...data,
            createdAt: currentDate,
            updatedAt: currentDate,
        };

        const result = await this.col.insertOne(wishlistData);

        return result;
    }

    static async deleteWishlist(productId: string) {
    await this.initialize();

    if (!this.col) {
        console.error("Collection not initialized");
        throw new Error("Collection is not initialized");
    }

    const result = await this.col.deleteOne({ productId });

    return result;
}

}