import { auth } from "@/auth";

export default auth((req) => {
  const { pathname } = req.nextUrl;
  // console.log("pt", pathname);
  // rewrite every incoming request on /dashboard to /dashboard/profile
  if (pathname.toLowerCase().startsWith("/dashboard")) {
    return Response.redirect(new URL("/dashboard/profile", req.url));
  }
});

export const config = {
  matcher: ["/reminders", "/dashboard"],
};
