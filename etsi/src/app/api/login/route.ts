import User from "@/db/models/user";
import { generateToken } from "@/lib/jwt";
import { compare } from "bcryptjs";

export async function POST(request: Request) {
	try {
		const formData = await request.formData();
		const email = formData.get("email");
		const password = formData.get("password")?.toString();

		if (!email || !password) {
            return new Response(JSON.stringify({ error: "Email and password are required" }), {
                status: 400,
                headers: { "Content-Type": "application/json" },
            });
        }
		
		await User.initialize();

		const user = await User.findOne({ email });
		if (!user) {
			return new Response(JSON.stringify({ error: "User not found" }), {
				status: 404,
				headers: { "Content-Type": "application/json" },
			});
		}

		const isPasswordValid = await compare(password, user.password);
		if (!isPasswordValid) {
			return new Response(JSON.stringify({ error: "Invalid password" }), {
				status: 401,
				headers: { "Content-Type": "application/json" },
			});
		}

		const token = generateToken({ id: user._id, email: user.email });

		return new Response(
			JSON.stringify({ message: "Login successful", token }),
			{
				status: 200,
				headers: {
					"Content-Type": "application/json",
				},
			}
		);
	} catch (error) {
		console.error("Error during login:", error);
		return new Response(JSON.stringify({ error: "Failed to login" }), {
			status: 500,
			headers: { "Content-Type": "application/json" },
		});
	}
}

export const dynamic = 'force-dynamic'