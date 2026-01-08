import { Link, useNavigate } from "react-router";
import { css } from "styled-system/css";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { useLogin } from "~/hooks/use-login";
import type { CreateUserParams } from "~/types/user";
import { serverFetch } from "~/utils/fetch";

export default function RegisterPage() {
	const { login, error: loginError } = useLogin();
	const navigate = useNavigate();

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		const userParams: CreateUserParams = {
			displayId: formData.get("displayId") as string,
			name: formData.get("name") as string,
			email: formData.get("email") as string,
			password: formData.get("password") as string,
		};

		try {
			const response = await serverFetch("/api/register", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(userParams),
			});
			if (!response.ok) {
				throw new Error("Failed to create user");
			}
			await login(userParams.email, userParams.password);
			if (loginError) {
				throw new Error(loginError);
			}
			navigate("/timeline");
		} catch (error) {
			console.error("Error creating user:", error);
		}
	};

	return (
		<div
			className={css({
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				minHeight: "100vh",
				backgroundColor: "#fafafa",
			})}
		>
			<div
				className={css({
					padding: "32px",
					backgroundColor: "#fff",
					borderRadius: "8px",
					boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
					width: "100%",
					maxWidth: "400px",
				})}
			>
				<h1
					className={css({
						textAlign: "center",
						marginBottom: "24px",
						fontSize: "24px",
						fontWeight: "bold",
						color: "#1a1a1a",
					})}
				>
					新規登録
				</h1>

				<form
					onSubmit={handleSubmit}
					className={css({
						display: "flex",
						flexDirection: "column",
						gap: "16px",
					})}
				>
					<Input
						label="ユーザーID"
						type="text"
						name="displayId"
						required
						placeholder="your_id"
					/>

					<Input
						label="氏名"
						type="text"
						name="name"
						required
						placeholder="山田 太郎"
					/>

					<Input
						label="メールアドレス"
						type="email"
						name="email"
						required
						placeholder="example@example.com"
					/>

					<Input
						label="パスワード"
						type="password"
						name="password"
						required
						placeholder="8文字以上"
					/>

					<Button
						type="submit"
						className={css({ width: "100%", marginTop: "8px" })}
					>
						登録
					</Button>
				</form>

				<div
					className={css({
						marginTop: "24px",
						textAlign: "center",
						fontSize: "14px",
						color: "#6b6b6b",
					})}
				>
					<p>
						既にアカウントをお持ちの方は
						<Link
							to="/login"
							className={css({
								color: "#1a1a1a",
								fontWeight: "medium",
								marginLeft: "4px",
								_hover: {
									textDecoration: "underline",
								},
							})}
						>
							ログイン
						</Link>
					</p>
					<Link
						to="/"
						className={css({
							display: "inline-block",
							marginTop: "12px",
							color: "#a3a3a3",
							_hover: {
								color: "#4a4a4a",
							},
						})}
					>
						ホームに戻る
					</Link>
				</div>
			</div>
		</div>
	);
}
