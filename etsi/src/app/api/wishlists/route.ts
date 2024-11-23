import Product from "@/db/models/product";
import Wishlist from "@/db/models/wishlist";
import { WishlistType } from "@/types";

export async function GET(request: Request) {
	try {
		const userId = request.headers.get("x-user-id");

		if (!userId) {
			return new Response(JSON.stringify({ error: "Unauthorized" }), {
				status: 401,
				headers: { "Content-Type": "application/json" },
			});
		}

		const wishlists = await Wishlist.findByUserId(userId);
		// console.log(wishlists);
		
		const productsData = await Promise.all(
			wishlists.map(async (product : WishlistType) => {
				const productData = await Product.findById(product.productId);
				return productData;
			})
		)
		// console.log(productsData);

		return new Response(JSON.stringify(productsData), {
			headers: { "Content-Type": "application/json" },
		});
	} catch (error) {
		console.error("Error fetching wishlists:", error);
		return new Response(
			JSON.stringify({ error: "Failed to fetch wishlists" }),
			{ status: 500, headers: { "Content-Type": "application/json" } }
		);
	}
}

export async function POST(request: Request) {
	try {
		const userId = request.headers.get("x-user-id");
		// console.log(userId, "dari route wishlist");

		if (!userId) {
			return new Response(JSON.stringify({ error: "Unauthorized" }), {
				status: 401,
				headers: { "Content-Type": "application/json" },
			});
		}

		const rawBody = await request.text();
		const body: Omit<WishlistType, "userId"> = JSON.parse(rawBody);
		// console.log(body.productId);

		if (!body.productId) {
			return new Response(JSON.stringify({ error: "productId is required" }), {
				status: 400,
				headers: { "Content-Type": "application/json" },
			});
		}

		const existingWishlist = await Wishlist.findByUserId(userId);
		const isProductInWishlist = existingWishlist.some(
			(item: WishlistType) => item.productId === body.productId
		);

		if (isProductInWishlist) {
			return new Response(
				JSON.stringify({ error: "Product already in wishlist" }),
				{
					status: 400,
					headers: { "Content-Type": "application/json" },
				}
			);
		}

		const result = await Wishlist.addWishlist({ ...body, userId });

		return new Response(JSON.stringify({ success: true, data: result }), {
			status: 201,
			headers: { "Content-Type": "application/json" },
		});
	} catch (error) {
		console.error("Error adding wishlist:", error);
		return new Response(JSON.stringify({ error: "Failed to add wishlist" }), {
			status: 500,
			headers: { "Content-Type": "application/json" },
		});
	}
}

export async function DELETE(request: Request) {
	try {
		const userId = request.headers.get("x-user-id");
		if (!userId) {
			return new Response(JSON.stringify({ error: "Unauthorized" }), {
				status: 401,
				headers: { "Content-Type": "application/json" },
			});
		}

		const rawBody = await request.text();
		const body: Omit<WishlistType, "userId"> = JSON.parse(rawBody);

		if (!body.productId) {
			return new Response(JSON.stringify({ error: "productId is required" }), {
				status: 400,
				headers: { "Content-Type": "application/json" },
			});
		}

		const result = await Wishlist.deleteWishlist({ ...body, userId });

		return new Response(JSON.stringify({ success: true, data: result }), {
			status: 200,
			headers: { "Content-Type": "application/json" },
		});
	} catch (error) {
		console.error("Error deleting wishlist:", error);
		return new Response(
			JSON.stringify({ error: "Failed to delete wishlist" }),
			{
				status: 500,
				headers: { "Content-Type": "application/json" },
			}
		);
	}
}
