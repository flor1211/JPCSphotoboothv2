import { NextResponse } from "next/server";

export function middleware(req) {
  const maintenance = process.env.MAINTENANCE_MODE;

  if (maintenance && !req.nextUrl.pathname.startsWith("/maintenance.html")) {
    return NextResponse.redirect(new URL("/maintenance.html", req.url));
  }

  return NextResponse.next();
}
