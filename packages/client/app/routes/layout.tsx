import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import Header from "~/components/header";
import { Loading } from "~/components/ui/loading";
import { useAuth } from "~/hooks/use-auth";

// TODO ログインしていなくてリダイレクトされたときにUIエラーを出す。

export default function ProtectedLayout() {
	const { user, isLoading, error } = useAuth();
	const navigate = useNavigate();

	useEffect(() => {
		if (!isLoading && !user) {
			navigate("/login");
		}
	}, [isLoading, user, navigate]);

	if (isLoading) {
		return (
			<>
				<Header />
				<Loading />
			</>
		);
	}

	if (error) {
		return (
			<>
				<Header />
				<Loading message={`エラー: ${error.message}`} />
			</>
		);
	}

	if (user) {
		return (
			<>
				<Header />
				<Outlet />
			</>
		);
	}

	return null;
}
