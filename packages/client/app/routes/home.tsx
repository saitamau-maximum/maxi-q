import { Link } from "react-router";
import { css } from "styled-system/css";

export default function Home() {
	return (
		<div
			className={css({
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				justifyContent: "center",
				minHeight: "100vh",
				backgroundColor: "#fafafa",
			})}
		>
			<h1
				className={css({
					fontSize: "48px",
					fontWeight: "bold",
					color: "#1a1a1a",
					marginBottom: "16px",
				})}
			>
				maxi-Q
			</h1>

			<p
				className={css({
					fontSize: "18px",
					color: "#6b6b6b",
					marginBottom: "48px",
				})}
			>
				匿名で質問・回答ができるQ&Aプラットフォーム
			</p>

			<div
				className={css({
					display: "flex",
					gap: "16px",
				})}
			>
				<Link
					to="/login"
					className={css({
						padding: "12px 32px",
						fontSize: "16px",
						fontWeight: "bold",
						color: "#fff",
						backgroundColor: "#1a1a1a",
						borderRadius: "6px",
						textDecoration: "none",
						transition: "background-color 0.2s",
						_hover: {
							backgroundColor: "#333",
						},
					})}
				>
					ログイン
				</Link>

				<Link
					to="/register"
					className={css({
						padding: "12px 32px",
						fontSize: "16px",
						fontWeight: "bold",
						color: "#1a1a1a",
						backgroundColor: "#fff",
						border: "1px solid #d4d4d4",
						borderRadius: "6px",
						textDecoration: "none",
						transition: "all 0.2s",
						_hover: {
							backgroundColor: "#f5f5f5",
							borderColor: "#a3a3a3",
						},
					})}
				>
					新規登録
				</Link>
			</div>
		</div>
	);
}
