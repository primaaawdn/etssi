import { ObjectId } from "mongodb";
import { z } from "zod";

export const UserSchema = z.object({
	name: z.string().min(1, { message: "Name is required" }),
	username: z.string().min(8, { message: "Username is required" }),
	email: z.string().email({ message: "Email format is invalid" }),
	password: z
		.string()
		.min(6, { message: "Password must be minimum at 6 characters" }),
});

export type UserType = z.infer<typeof UserSchema>

export type ProductType = {
	_id?: string | ObjectId;
	name: string;
	slug: string;
	description: string;
	excerpt: string;
	price: number;
	tags: string[];
	thumbnail: string;
	images: string[];
	createdAt?: Date;
	updatedAt?: Date;
}

export type WishlistType = {
	_id?: string | ObjectId;
	userId: string;
	productId: string;
	createdAt: Date;
	updatedAt: Date;
}
