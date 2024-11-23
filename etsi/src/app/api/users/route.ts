import User from "@/db/models/user";

export async function GET() {
    try {
        await User.initialize(); 
        const users = await User.findAll(); 

        return new Response(JSON.stringify(users), {
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error("Error fetching users:", error);
        return new Response(
            JSON.stringify({ error: "Failed to fetch users" }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
}
export const dynamic = 'force-dynamic'