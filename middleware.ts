import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Create a route matcher for public routes
// .* matches any character zero or more times so sign-in(.*) will match any url starts with sign-in ex. /sign-in, /sign-in/1, /sign-in/2, etc.
const isPublicRoute = createRouteMatcher(["/sign-in(.*)", "/sign-up(.*)", "/"]);

export default clerkMiddleware((auth, req) => {
  // Restrict dashboard routes to signed in users
  if (!isPublicRoute(req)) auth().protect();
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
