import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: [
    "/",
    "/api//webhook/ckerk",
    "/api/webhook/stripe",
    "/api/uploadthing",
    "/api/post"
  ],
  ignoredRoutes: [
    "/api//webhook/ckerk",
    "/api/webhook/stripe",
    "/api/uploadthing",
    "/api/post"
  ]
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
