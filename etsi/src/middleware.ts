import { NextRequest, NextResponse } from "next/server";
import * as jose from "jose";
import { errorHandler, HttpError } from "@/lib/errorHandler";
import { cookies } from "next/headers";

export async function middleware(request: NextRequest) {
	try {
		// console.log("masuk middleware");
		const authCookie = cookies().get("token");
		if (!authCookie) {
			throw new HttpError("Invalid token, please login first!", 401);
		}
		const token = authCookie.value;
		// console.log("Middleware Token:", token);
		if (!token) {
			throw new HttpError("Unauthorized", 401);
		}

		const secret = new TextEncoder().encode(process.env.JWT_SECRET);
		const result = await jose.jwtVerify<{id: string; email: string }>(
			token,
			secret
		);

		// console.log("Middleware Result:", result);

		const requestHeaders = new Headers(request.headers);
		requestHeaders.set("x-user-id", result.payload.id);
		requestHeaders.set("x-user-email", result.payload.email);

		return NextResponse.next({
			request: {
				headers: requestHeaders,
			},
		});
	} catch (error) {
		console.error("Middleware Error:", error);

		if (error instanceof jose.errors.JWTExpired) {
			return NextResponse.redirect(new URL("/login", request.url));
		}

		return errorHandler(error);
	}
}

export const config = {
	matcher: ["/api/wishlists"],
};
