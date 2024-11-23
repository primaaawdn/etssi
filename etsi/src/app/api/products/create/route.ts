import Product from "@/db/models/product";
import { ProductType } from "@/types";

export async function POST(request: Request) {
    try {
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
        // console.log("FormData Entries:", Array.from(formData.entries()));

        const body: ProductType = {
            name: formData.get("name")?.toString() || "",
            slug: formData.get("slug")?.toString() || "",
            description: formData.get("description")?.toString() || "",
            excerpt: formData.get("excerpt")?.toString() || "",
            price: parseFloat(formData.get("price")?.toString() || ""),
            tags: formData.get("tags")?.toString().split(", ") || [],
            thumbnail: formData.get("thumbnail")?.toString() || "",
            images: formData.getAll("images")?.toString().split(", ") || [],
        };

        // console.log("Parsed Body:", body);

        if (!body.name || !body.slug) {
            return new Response(
                JSON.stringify({ error: "Missing required fields: name or slug." }),
                { status: 400, headers: { "Content-Type": "application/json" } }
            );
        }

        const response = await Product.create(body);

        return new Response(JSON.stringify(response), {
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error("Error creating product:", error);
        return new Response(
            JSON.stringify({ error: "Failed to create product" }),
            {
                status: 500,
                headers: { "Content-Type": "application/json" },
            }
        );
    }
}
export const dynamic = 'force-dynamic'