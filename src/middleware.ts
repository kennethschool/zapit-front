import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { PrismaClient } from "@prisma/client";

export async function middleware(request: NextRequest) {
  // initialise Prisma client
  const prisma = new PrismaClient();

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return NextResponse.redirect(new URL("/auth/signup", request.url));
  } else {
    //console.log(session);
    // checking if the user has a statistics record
    const statistics = await prisma.statistics.findUnique({
      where: { userId: parseInt(session?.user?.id) },
    });

    if (!statistics) {
      // If no statistics, create one
      await prisma.statistics.create({
        data: {
          userId: parseInt(session?.user?.id),
        },
      });
    }
  }

  return NextResponse.next();
}

export const config = {
  runtime: "nodejs",
  matcher: ["/dashboard/:path*"], // specific routes
};
