import Product from "@/db/models/product";
import { ProductType } from "@/types";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
	const url = new URL(request.url);
	const page = parseInt(url.searchParams.get("page") || "1", 10);
	const limit = 10;
	const searchQuery = url.searchParams.get("q") || "";

	try {
		await Product.initialize();

		const query = searchQuery
			? {
					$or: [
						{ name: { $regex: searchQuery, $options: "i" } },
						{ slug: { $regex: searchQuery, $options: "i" } },
					],
			}
			: {};

		const products = await Product.findAll(page, limit, query);
		// console.log("Products di route:", products);

		return NextResponse.json(products);
	} catch (error) {
		console.error("Error fetching products:", error);
		return new Response(JSON.stringify({ error: "Failed to fetch products" }), {
			status: 500,
			headers: { "Content-Type": "application/json" },
		});
	}
}

export async function POST(request: Request) {
	try {
		// console.log("Headers:", Object.fromEntries(request.headers.entries()));

		const contentType = request.headers.get("Content-Type");
		if (!contentType || !contentType.includes("multipart/form-data")) {
			console.error("Invalid Content-Type:", contentType);
			return new Response(
				JSON.stringify({
					error: "Invalid Content-Type. Expected multipart/form-data.",
				}),
				{ status: 400, headers: { "Content-Type": "application/json" } }
			);
		}

		const formData = await request.formData();
		// console.log("Parsed FormData:", formData);

		const body: ProductType = {
			name: formData.get("name")?.toString() || "",
			slug: formData.get("slug")?.toString() || "",
			description: formData.get("description")?.toString() || "",
			excerpt: formData.get("excerpt")?.toString() || "",
			price: parseFloat(formData.get("price")?.toString() || ""),
			tags: formData.get("tags")?.toString().split(",") || [],
			thumbnail: formData.get("thumbnail")?.toString() || "",
			images: formData.getAll("images").map((image) => image.toString()) || [],
		};

		// console.log("Parsed Body:", body);

		if (!body.name || !body.slug) {
			return new Response(
				JSON.stringify({ error: "Missing required fields: name or slug." }),
				{ status: 400, headers: { "Content-Type": "application/json" } }
			);
		}

		await Product.initialize();
		const response = await Product.create(body);

		return new Response(JSON.stringify(response), {
			headers: { "Content-Type": "application/json" },
		});
	} catch (error) {
		console.error("Error creating product:", error);
		return new Response(JSON.stringify({ error: "Failed to create product" }), {
			status: 500,
			headers: { "Content-Type": "application/json" },
		});
	}
}
export const dynamic = 'force-dynamic'