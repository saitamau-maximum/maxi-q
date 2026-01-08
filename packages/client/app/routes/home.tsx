import { css } from "styled-system/css";
import { Button } from "~/components/ui/button";

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
				<Button as="link" to="/login" size="lg">
					ログイン
				</Button>

				<Button as="link" to="/register" variant="secondary" size="lg">
					新規登録
				</Button>
			</div>
		</div>
	);
}
