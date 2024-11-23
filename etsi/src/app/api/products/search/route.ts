import Product from "@/db/models/product";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
	try {
		// const headersObj = headers();
		// const query = headersObj.get("x-query");

		// if (!query) {
		// 	return NextResponse.json(
		// 		{ error: "Search query is required" },
		// 		{ status: 400 }
		// 	);
		// }
		const query = new URL(request.url).searchParams.get("q");

		if (!query) {
			return NextResponse.json(
				{ error: "Search query is required" },
				{ status: 400 }
			);
		}

		const products = await Product.find({
			$or: [
				{ name: { $regex: `^${query}$`, $options: "i" } },
				{ slug: { $regex: `^${query}$`, $options: "i" } },
			],
		});

		if (products.length === 0) {
			return NextResponse.json(
				{ message: "No products found" },
				{ status: 404 }
			);
		}

		return NextResponse.json(products, { status: 200 });
	} catch (error) {
		console.error("Error searching products:", error);
		return NextResponse.json(
			{ error: "Failed to search products" },
			{ status: 500 }
		);
	}
}
export const dynamic = 'force-dynamic'