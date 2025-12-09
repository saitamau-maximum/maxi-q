import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import { useMe } from "~/hooks/use-auth";

// TODO ログインしていなくてリダイレクトされたときにUIエラーを出す。

export default function ProtectedLayout() {
	const { user, loading } = useMe();
	const navigate = useNavigate();

	useEffect(() => {
		if (!loading && !user) {
			navigate("/login");
		}
	}, [loading, user, navigate]);

	if (loading) return <div>Loading...</div>;

	return <Outlet />;
}
