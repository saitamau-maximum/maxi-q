import {
	index,
	prefix,
	type RouteConfig,
	route,
} from "@react-router/dev/routes";

export default [
	route("login", "routes/login.tsx"),
	route("post/question", "routes/post-question.tsx"),
	route("register", "routes/register.tsx"),
	...prefix("users", [
		route("me/posts", "routes/users/me/posts.tsx"),
		route(":id/answers", "routes/users/:id/answers.tsx"),
	]),
	route("posts/:id", "routes/posts/index.tsx"),
	route("post", "routes/post.tsx"),
	route("timeline", "routes/timeline.tsx"),
	index("routes/home.tsx"),
] satisfies RouteConfig;
