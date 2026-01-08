import { useState } from "react";
import { Link, useParams } from "react-router";
import { css } from "styled-system/css";
import ErrorMessage from "~/components/error-message";
import { Button } from "~/components/ui/button";
import { Textarea } from "~/components/ui/textarea";
import { useAnswers } from "~/hooks/use-answer";
import { useQuestions } from "~/hooks/use-question";

export default function QuestionDetailPage() {
	const { id } = useParams<{ id: string }>();

	const {
		question,
		isLoading: questionLoading,
		error: questionError,
	} = useQuestions(id);

	const {
		answers,
		isLoading: answersLoading,
		error: answersError,
		isPending: submitting,
		submitAnswer,
	} = useAnswers(id);

	const [answerContent, setAnswerContent] = useState("");

	if (!id) {
		return <ErrorMessage message="Question ID is missing" />;
	}

	if (questionLoading) return <div>Loading question...</div>;
	if (questionError) return <ErrorMessage message={questionError.message} />;

	return (
		<div
			className={css({
				maxWidth: "800px",
				margin: "0 auto",
				padding: "24px",
			})}
		>
			<Link
				to="/timeline"
				className={css({
					display: "inline-block",
					marginBottom: "16px",
					color: "#6b6b6b",
					fontSize: "14px",
					textDecoration: "none",
					_hover: {
						color: "#1a1a1a",
					},
				})}
			>
				&larr; 一覧に戻る
			</Link>

			{question && (
				<div
					className={css({
						padding: "20px",
						borderRadius: "8px",
						border: "1px solid #e5e5e5",
						marginBottom: "24px",
						backgroundColor: "#fff",
					})}
				>
					<h1
						className={css({
							fontSize: "24px",
							fontWeight: "bold",
							marginBottom: "12px",
							color: "#1a1a1a",
						})}
					>
						{question.title}
					</h1>

					<p
						className={css({
							fontSize: "16px",
							lineHeight: "1.6",
							color: "#4a4a4a",
						})}
					>
						{question.content}
					</p>
				</div>
			)}

			<h2
				className={css({
					fontSize: "18px",
					fontWeight: "bold",
					marginBottom: "12px",
					color: "#1a1a1a",
				})}
			>
				回答一覧
			</h2>

			{answersError && <ErrorMessage message={answersError.message} />}

			<div
				className={css({
					display: "flex",
					flexDirection: "column",
					gap: "12px",
					marginBottom: "32px",
				})}
			>
				{answersLoading ? (
					<p className={css({ color: "#6b6b6b" })}>読み込み中...</p>
				) : answers.length === 0 ? (
					<p className={css({ color: "#6b6b6b" })}>まだ回答はありません</p>
				) : (
					answers.map((ans) => (
						<div
							key={ans.id}
							className={css({
								padding: "16px",
								border: "1px solid #e5e5e5",
								borderRadius: "6px",
								backgroundColor: "#fff",
							})}
						>
							<p className={css({ color: "#1a1a1a", lineHeight: "1.6" })}>
								{ans.content}
							</p>
							<p
								className={css({
									fontSize: "12px",
									color: "#a3a3a3",
									marginTop: "8px",
								})}
							>
								{new Date(ans.answeredAt).toLocaleString()}
							</p>
						</div>
					))
				)}
			</div>

			<form
				onSubmit={async (e) => {
					e.preventDefault();
					if (!answerContent.trim()) return;
					await submitAnswer(answerContent);
					if (!answersError) {
						setAnswerContent("");
					}
				}}
				className={css({
					display: "flex",
					flexDirection: "column",
					gap: "12px",
				})}
			>
				<Textarea
					label="あなたの回答"
					value={answerContent}
					onChange={(e) => setAnswerContent(e.target.value)}
					placeholder="回答を入力してください..."
				/>

				<Button type="submit" disabled={submitting}>
					{submitting ? "投稿中..." : "回答を投稿"}
				</Button>
			</form>
		</div>
	);
}
