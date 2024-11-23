import Product from "@/db/models/product";
import { ProductType } from "@/types";
import { ObjectId } from "mongodb";

export async function PUT(request: Request) {
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
        // console.log("Parsed FormData:", formData);

        const id = formData.get("_id") as string;
        if (!ObjectId.isValid(id)) {
            return new Response(
                JSON.stringify({ error: "Invalid ObjectId format." }),
                { status: 400, headers: { "Content-Type": "application/json" } }
            );
        }

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

        if (!id || !body.name || !body.slug) {
            return new Response(
                JSON.stringify({ error: "Missing required fields: id, name or slug." }),
                { status: 400, headers: { "Content-Type": "application/json" } }
            );
        }

        await Product.initialize();
        const response = await Product.update(id, body);

        return new Response(JSON.stringify(response), {
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error("Error updating product:", error);
        return new Response(
            JSON.stringify({ error: "Failed to update product" }),
            {
                status: 500,
                headers: { "Content-Type": "application/json" },
            }
        );
    }
}
