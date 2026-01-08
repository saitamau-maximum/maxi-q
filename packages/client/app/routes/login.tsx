import { useState } from "react";
import { Link } from "react-router";
import { css } from "styled-system/css";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { useLogin } from "~/hooks/use-login";

export default function LoginPage() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const { login, error, isLoading } = useLogin();

	const handleLogin = (e: React.FormEvent) => {
		e.preventDefault();
		login(email, password);
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
					ログイン
				</h1>

				<form
					onSubmit={handleLogin}
					className={css({
						display: "flex",
						flexDirection: "column",
						gap: "20px",
					})}
				>
					<Input
						label="メールアドレス"
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
						placeholder="user@example.com"
					/>

					<Input
						label="パスワード"
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
						placeholder="8文字以上"
					/>

					{error && (
						<p
							className={css({
								color: "#dc2626",
								fontSize: "14px",
								textAlign: "center",
							})}
						>
							{error}
						</p>
					)}

					<Button
						type="submit"
						disabled={isLoading}
						className={css({ width: "100%", marginTop: "8px" })}
					>
						{isLoading ? "ログイン中..." : "ログイン"}
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
						アカウントをお持ちでない方は
						<Link
							to="/register"
							className={css({
								color: "#1a1a1a",
								fontWeight: "medium",
								marginLeft: "4px",
								_hover: {
									textDecoration: "underline",
								},
							})}
						>
							新規登録
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
