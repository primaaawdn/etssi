import User from "@/db/models/user";

export async function POST(request: Request) {
    try {
        const contentType = request.headers.get("Content-Type") || "";

        let body = {};
        if (contentType.includes("multipart/form-data")) {
            const formData = await request.formData();
            body = {
                name: formData.get("name"),
                username: formData.get("username"),
                email: formData.get("email"),
                password: formData.get("password"), 
            };
        } else if (contentType.includes("application/json")) {
            const json = await request.json();
            body = {
                name: json.name,
                username: json.username,
                email: json.email,
                password: json.password, 
            };
        } else if (contentType.includes("application/x-www-form-urlencoded")) {
            const text = await request.text();
            const params = new URLSearchParams(text);
            body = {
                name: params.get("name"),
                username: params.get("username"),
                email: params.get("email"),
                password: params.get("password"), 
            };
        } else {
            throw new Error("Unsupported Content-Type");
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
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
}
