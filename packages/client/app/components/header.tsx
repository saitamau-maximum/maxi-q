import { Link, useNavigate } from "react-router";
import { css } from "styled-system/css";
import { Button } from "~/components/ui/button";

const navLinkStyles = css({
	color: "#4a4a4a",
	textDecoration: "none",
	fontSize: "14px",
	_hover: {
		color: "#1a1a1a",
	},
});

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
				<Link to="/timeline" className={navLinkStyles}>
					タイムライン
				</Link>

				<Link to="/post/question" className={navLinkStyles}>
					質問投稿
				</Link>

				<Link to="/users/profile" className={navLinkStyles}>
					マイページ
				</Link>

				<Button variant="secondary" size="sm" onClick={handleLogout}>
					ログアウト
				</Button>
			</nav>
		</header>
	);
}
