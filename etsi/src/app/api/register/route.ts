import { UserType } from "@/types";
import User from "@/db/models/user"; 
import { HttpError } from "@/lib/errorHandler";

export async function POST(request: Request) {
    try {
        const contentType = request.headers.get("Content-Type") || "";
        let body: UserType | null = null;

        if (contentType.includes("multipart/form-data")) {
            const formData = await request.formData();
            body = {
                name: formData.get("name")?.toString() || "",
                username: formData.get("username")?.toString() || "",
                email: formData.get("email")?.toString() || "",
                password: formData.get("password")?.toString() || "",
            };
        } else if (contentType.includes("application/json")) {
            body = await request.json();
        }

        if (!body || !body.name || !body.username || !body.email || !body.password) {
            throw new HttpError("All fields are required", 400);
        }

        await User.initialize();
        await User.create(body);

        return new Response(
            JSON.stringify({ success: true, message: `User created successfully` }),
            { headers: { "Content-Type": "application/json" } }
        );
    } catch (error) {
        console.error("Error creating user:", error);
        return new Response(
            JSON.stringify({ error: "Failed to create user" }),
            {
                status: 500,
                headers: { "Content-Type": "application/json" },
            }
        );
    }
}