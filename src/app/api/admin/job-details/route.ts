import { NextResponse } from "next/server";
import { prisma } from "@/lib";

export async function GET(request: Request) {
	try {
		const jobs = await prisma.jobs.findMany({ orderBy: { createdAt: "desc" } });
		const runningJobs = await prisma.jobs.findMany({ where: { isComplete: false } });
		return NextResponse.json({ jobs, runningJobs: runningJobs?.length ?? 0 }, { status: 200 });
	} catch (error) {
		return NextResponse.json({ message: "An unexpected error occure" }, { status: 500 });
	}
}
