import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { checkAuth } from "./app/_apis/auth";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const result = await checkAuth();
  if (result.code === "FAIL") {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }
  return;
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/", "/setting"],
};
