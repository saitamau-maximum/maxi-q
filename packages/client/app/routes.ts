import {
	index,
	prefix,
	type RouteConfig,
	route,
} from "@react-router/dev/routes";

export default [
	route("login", "routes/login"),
	route("register", "routes/register"),
	...prefix("users", [
		route("me/posts", "routes/users/me/posts"),
		route(":id/answers", "routes/users/:id/answers"),
	]),
	...prefix("posts", [
		route(":id", "routes/posts/:id"),
		route(":id/answer", "routes/posts/:id/answer"),
	]),
	route("post", "routes/post"),
	route("timeline", "routes/timeline"),
	index("routes/home"),
] satisfies RouteConfig;
