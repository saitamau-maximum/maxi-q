import type { Question } from "~/types/question";
import { css } from "styled-system/css";

const questions: Question[] = [{
	id: "1",
	title: "question1",
	content: "This is the first question",
	solved: true,
	number_of_answer: "2",
	createdAt: new Date(),
	updatedAt: new Date(),
},
{
	id: "2",
	title: "question2",
	content: "This is the second question",
	solved: false,
	number_of_answer: "0",
	createdAt: new Date(),
	updatedAt: new Date(),
}
]
export default function TimelinePage() {
	return <div>
		<div
		className={css({
			fontWeight: "bold",
			margin: "10px",
			fontSize: "20px",
			color: "green",
		})}>
			<p>maxi-Q 質問一覧</p>
			<p>question list</p>
		</div>
		
		{questions.map((q)=>(
			<div
				className={css({
					backgroundColor: "#deffd0ff",
					color: "brack",
					boxShadow: "2px 2px 4px -2px gray",
					display: "flex",
					flexDirection: "column",
					gap: "8px",
					textAlign: "Left",
					width: "500px",
					margin: "10px",
					padding: "10px",
					border: "1px solid black",
					borderRadius: "8px",
					cursor: "pointer",
    				transition: "background-color 0.3s ease",
					"&:hover": {
      					backgroundColor: "#c0f0b0",
					}
				})} 
			>
				<p>
					<span>{q.title}
						{q.solved && (
							<span
								className={css({
									fontSize: "12px",
									marginLeft: "10px",
									color: "blue",
								})}>
								解決済み
							</span>
						)}
					</span>
					<div
						className={css({
							fontSize: "12px",
						})}>
							<span
							className={css({
								marginLeft: "10px",
							})}
							>投稿日時</span>
							<span
								className={css({
									marginLeft: "10px",
									color: "gray",
								})}
							>{q.createdAt.toLocaleString()}</span>
							<span
							className={css({
								marginLeft: "10px",
							})}
							>更新日時</span>
							<span
								className={css({
									marginLeft: "10px",
									color: "gray",
								})}
							>{q.updatedAt.toLocaleString()}</span>
							<span
							className={css({
								marginLeft: "10px",
							})}
							>回答件数</span>
							<span
							className={css({
								marginLeft: "10px",
								color: "gray",
							})}
							>{q.number_of_answer}件</span>
					</div>
				</p>
			</div>
		))}
	</div>;
}
