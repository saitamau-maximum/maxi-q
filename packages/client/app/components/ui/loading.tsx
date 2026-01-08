import { css } from "styled-system/css";

type LoadingProps = {
	message?: string;
};

export function Loading({ message = "読み込み中..." }: LoadingProps) {
	return (
		<div
			className={css({
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				padding: "24px",
				color: "#6b6b6b",
				fontSize: "14px",
			})}
		>
			{message}
		</div>
	);
}
