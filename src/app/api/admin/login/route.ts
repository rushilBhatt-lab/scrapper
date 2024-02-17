import { NextResponse } from "next/server";
import { prisma } from "@/lib";
import { SignJWT } from "jose";
import { cookies } from "next/headers";
import { SHA256 as sha256 } from "crypto-js";
const alg = "HS256";
const secret = new TextEncoder().encode(process.env.JWT_key);
const createToken = async (email: string, userId: number) => {
	return await new SignJWT({
		email,
		userId,
		isAdming: true,
	})
		.setProtectedHeader({ alg })
		.setExpirationTime("48h")
		.sign(secret);
};

export async function POST(request: Request) {
	try {
		const { email, password } = await request.json();
		if (!email || !password) {
			return NextResponse.json({ message: "Email and Password is required" }, { status: 400 });
		}
		const user = await prisma.admin.findUnique({
			where: { email, password: sha256(password).toString() },
		});
		console.log({ password: sha256(password).toString() });
		if (!user) {
			return NextResponse.json({ message: "Invalid Email or Password" }, { status: 404 });
		} else {
			const token = await createToken(user.email, user.id);
			cookies().set("access_token", token);
			return NextResponse.json(
				{
					userInfo: {
						id: user.id,
						email: user.email,
					},
				},
				{ status: 200 }
			);
		}
	} catch (error) {
		return NextResponse.json({ message: "An unexpected error occure" }, { status: 500 });
	}
}
