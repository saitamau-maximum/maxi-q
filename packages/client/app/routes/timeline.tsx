import { Link } from "react-router-dom";
import { css } from "styled-system/css";
import { useQuestions } from "../hooks/use-question";

export default function TimelinePage() {
	const { questions, isLoading, error } = useQuestions();

	if (isLoading) return <p>Loading...</p>;
	if (error) return <p>Error: {error.message}</p>;
	if (!questions) return <p>No questions found</p>;

	return (
		<div>
			<div
				className={css({
					fontWeight: "bold",
					margin: "10px",
					fontSize: "20px",
					color: "green",
				})}
			>
				<p>maxi-Q 質問一覧</p>
				<p>question list</p>
		  	</div>

			{questions.map((q) => (
				<Link
					key={q.id}
					to={`/question/${q.id}`} // ← 詳細ページへのリンク
					className={css({
						backgroundColor: "#deffd0ff",
						color: "black",
						boxShadow: "2px 2px 4px -2px gray",
						display: "flex",
						flexDirection: "column",
						gap: "8px",
						textAlign: "left",
						width: "500px",
						margin: "10px",
						padding: "10px",
						border: "1px solid black",
						borderRadius: "8px",
						cursor: "pointer",
						transition: "background-color 0.3s ease",
						"&:hover": {
							backgroundColor: "#c0f0b0",
						},
						textDecoration: "none",
					})}
				>
					<span>
						{q.title}
						{q.solved === 1 && (
							<span
								className={css({
									fontSize: "12px",
									marginLeft: "10px",
									color: "blue",
								})}
							>
								解決済み
							</span>
						)}
					</span>
					<div
						className={css({
							fontSize: "12px",
						})}
					>
						<span className={css({ marginLeft: "10px" })}>投稿日時</span>
						<span className={css({ marginLeft: "10px", color: "gray" })}>
							{new Date(q.createdAt).toLocaleString()}
						</span>
						<span className={css({ marginLeft: "10px" })}>更新日時</span>
						<span className={css({ marginLeft: "10px", color: "gray" })}>
							{new Date(q.updatedAt).toLocaleString()}
						</span>
						<span className={css({ marginLeft: "10px" })}>回答件数</span>
						<span className={css({ marginLeft: "10px", color: "gray" })}>
							{q.number_of_answer}件
						</span>
					</div>
				</Link>
			))}
		</div>
	);
}
