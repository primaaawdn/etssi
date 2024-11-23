import { JWSInvalid, JWTExpired } from "jose/errors";
import { ZodError } from "zod";

export class HttpError extends Error {
	status: number = 500;
	message: string = "Internal Server Error";
	constructor(message: string, status: number) {
		super(message);
		this.status = status;
	}
}

export function errorHandler(error: unknown) {
	if (error instanceof HttpError) {
		return Response.json({ message: error.message }, { status: error.status });
	}

	if (error instanceof ZodError) {
		const message = error.issues[0]?.message || "Validation error";
		return Response.json({ message }, { status: 400 });
	}

	if (error instanceof JWTExpired) {
		return Response.json(
			{ message: "Token has expired. Please log in again." },
			{ status: 401 }
		);
	}

	if (error instanceof JWSInvalid) {
		return Response.json(
			{ message: "Invalid token. Please log in again." },
			{ status: 401 }
		);
	}

	return Response.json({ message: "Internal Server Error" }, { status: 500 });
}
