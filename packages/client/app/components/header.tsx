import { Link, useNavigate } from "react-router";
import { css } from "styled-system/css";

export default function Header() {
	const navigate = useNavigate();

	const handleLogout = () => {
		localStorage.removeItem("token");
		navigate("/login");
	};

	return (
		<header
			className={css({
				display: "flex",
				justifyContent: "space-between",
				alignItems: "center",
				padding: "12px 24px",
				backgroundColor: "#fff",
				borderBottom: "1px solid #e5e5e5",
			})}
		>
			<Link
				to="/timeline"
				className={css({
					fontSize: "20px",
					fontWeight: "bold",
					color: "#1a1a1a",
					textDecoration: "none",
					_hover: {
						color: "#4a4a4a",
					},
				})}
			>
				maxi-Q
			</Link>

			<nav
				className={css({
					display: "flex",
					alignItems: "center",
					gap: "24px",
				})}
			>
				<Link
					to="/timeline"
					className={css({
						color: "#4a4a4a",
						textDecoration: "none",
						fontSize: "14px",
						_hover: {
							color: "#1a1a1a",
						},
					})}
				>
					タイムライン
				</Link>

				<Link
					to="/post/question"
					className={css({
						color: "#4a4a4a",
						textDecoration: "none",
						fontSize: "14px",
						_hover: {
							color: "#1a1a1a",
						},
					})}
				>
					質問投稿
				</Link>

				<Link
					to="/users/profile"
					className={css({
						color: "#4a4a4a",
						textDecoration: "none",
						fontSize: "14px",
						_hover: {
							color: "#1a1a1a",
						},
					})}
				>
					マイページ
				</Link>

				<button
					type="button"
					onClick={handleLogout}
					className={css({
						padding: "6px 12px",
						fontSize: "14px",
						color: "#4a4a4a",
						backgroundColor: "transparent",
						border: "1px solid #d4d4d4",
						borderRadius: "4px",
						cursor: "pointer",
						transition: "all 0.2s",
						_hover: {
							backgroundColor: "#f5f5f5",
							borderColor: "#a3a3a3",
						},
					})}
				>
					ログアウト
				</button>
			</nav>
		</header>
	);
}
