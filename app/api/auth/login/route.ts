import { auth } from "@/auth/lucia";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { LuciaError } from "lucia-auth";

export const POST = async (request: Request) => {
	const { email, password } = (await request.json()) as Partial<{
		email: string;
		password: string;
	}>;
	if (!email || !password) {
		return NextResponse.json({ error: "Invalid input"}, { status: 400 });
	}
	try {
		const authRequest = auth.handleRequest({ request, cookies });
		const key = await auth.useKey("email", email, password);
		const session = await auth.createSession(key.userId);
		authRequest.setSession(session);
		return NextResponse.json({ message: 'Berhasil login' }, { status: 200 })
	} catch (error) {
		if (
			(error instanceof LuciaError &&
				error.message === "AUTH_INVALID_KEY_ID") ||
			(error instanceof LuciaError && error.message === "AUTH_INVALID_PASSWORD")
		) {
			return NextResponse.json({ error: "Incorrect email or password" }, { status: 400 });
		}
		// database connection error
		console.log(error);
		return NextResponse.json({ error: "Unknown error occurred" }, { status: 500 });
	}
};
