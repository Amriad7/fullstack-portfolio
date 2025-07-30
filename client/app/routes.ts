import {
  type RouteConfig,
  index,
  prefix,
  route,
} from "@react-router/dev/routes";

export default [
  /* PUBLIC ROUTES */
  route("/", "routes/public/layout.tsx", [
    index("routes/public/home.tsx"),
    route("about", "routes/public/about.tsx"),
    route("services", "routes/public/services.tsx"),
    route("projects", "routes/public/projects.tsx"),
    route("blog", "routes/public/blog.tsx"),
    route("contacts", "routes/public/contacts.tsx"),
  ]),

  /* ADMIN ROUTES */
  route("/admin", "routes/admin/layout.tsx", [
    index("routes/admin/dashboard.tsx"),
    route("posts", "routes/admin/posts.tsx"),
    route("media", "routes/admin/media.tsx"),
    route("messages", "routes/admin/messages.tsx"),
    route("settings", "routes/admin/settings.tsx"),
  ]),

  /* AUTH ROUTES */
  ...prefix("/auth", [
    route("signup", "routes/auth/signup.tsx"),
    route("signin", "routes/auth/signin.tsx"),
    route("signout", "routes/auth/signout.tsx"),
  ]),
] satisfies RouteConfig;
