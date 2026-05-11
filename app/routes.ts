import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/_index.tsx"),
  route("about", "routes/about.tsx"),
  route("photography", "routes/photography.tsx"),
  route(":slug", "routes/$slug.tsx"),
] satisfies RouteConfig;
