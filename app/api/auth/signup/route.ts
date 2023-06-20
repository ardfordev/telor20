import { auth } from "@/auth/lucia";
import { LuciaError } from "lucia-auth";
import { Prisma } from "@prisma/client";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: Request) => {
	const { email, name, password, unit, wilayah } = (await request.json()) as Partial<{
		email: string;
		name: string;
		password: string;
		unit: string;
		wilayah: string;
	}>;
	if (!email || !name || !password || !unit || !wilayah) {
		return NextResponse.json({ error: "Invalid input" }, { status: 400 });
	}
	try {
		const user = await auth.createUser({
			primaryKey: {
				providerId: "email",
				providerUserId: email,
				password
			},
			attributes: {
				email,
				name,
				unit,
				wilayah
			}
		});
		
		const session = await auth.createSession(user.userId);
		const authRequest = auth.handleRequest({ request, cookies });
		authRequest.setSession(session);
		return NextResponse.json({ message: 'Berhasil daftar' }, { status: 200 })
	} catch (error) {
		if (
			error instanceof Prisma.PrismaClientKnownRequestError &&
			error.code === "P2002" &&
			error.message?.includes("email")
		) {
			return NextResponse.json({ error: "Email already in use" }, { status: 400 });
		}
		if (
			error instanceof LuciaError &&
			error.message === "AUTH_DUPLICATE_KEY_ID"
		) {
			return NextResponse.json({ error: "Email already in use" }, { status: 400 });
		}
		// database connection error
		console.log(error);
		return NextResponse.json(
			{ error: "Unknown error occurred" }, { status: 500 });
	}
};
