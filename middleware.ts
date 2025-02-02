export { auth as middleware } from "@/auth";

export const config = {
  matcher: [
    "/playground",
    "/dashboard/:path*",
  ],
};
