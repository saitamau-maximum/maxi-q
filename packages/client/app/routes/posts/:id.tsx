import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { css } from "styled-system/css";
import { serverFetch } from "~/utils/fetch";

export default function PostDetail() {
	const { id } = useParams();
	const [question, setQuestion] = useState<any>(null);
	const [answers, setAnswers] = useState<any[]>([]);
	const [answerContent, setAnswerContent] = useState("");
	const [submitting, setSubmitting] = useState(false); // 送信中フラグ

	const fetchQuestion = useCallback(async () => {
		if (!id) return;

		try {
			const res = await serverFetch(`/questions/${id}`);
			if (!res.ok) throw new Error("Failed to fetch question");
			setQuestion(await res.json());
		} catch (e) {
			console.error(e);
		}
	}, [id]);

	const fetchAnswers = useCallback(async () => {
		if (!id) return;

		try {
			const res = await serverFetch(`/questions/${id}/answers`);
			if (!res.ok) throw new Error("Failed to fetch answers");
			setAnswers(await res.json());
		} catch (e) {
			console.error(e);
		}
	}, [id]);

	useEffect(() => {
		fetchQuestion();
		fetchAnswers();
	}, [fetchQuestion, fetchAnswers]);

	const submitAnswer = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!answerContent.trim()) return;

		setSubmitting(true);

		try {
			const res = await serverFetch(`/questions/${id}/answers`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ content: answerContent }),
			});

			if (!res.ok) throw new Error("Failed to post answer");

			const newAnswer = await res.json();

			console.log("Answer posted:", newAnswer);

			setAnswerContent("");
			await fetchAnswers();
		} catch (e) {
			console.error(e);
		} finally {
			setSubmitting(false);
		}
	};

	return (
		<div
			className={css({
				maxWidth: "800px",
				margin: "0 auto",
				padding: "16px",
			})}
		>
			{question ? (
				<div
					className={css({
						padding: "16px",
						borderRadius: "8px",
						border: "1px solid #ddd",
						marginBottom: "20px",
					})}
				>
					<h1
						className={css({
							fontSize: "24px",
							fontWeight: "bold",
							marginBottom: "8px",
						})}
					>
						{question.title}
					</h1>
					<p
						className={css({
							fontSize: "16px",
							lineHeight: "1.6",
						})}
					>
						{question.content}
					</p>
				</div>
			) : (
				<p>Loading question...</p>
			)}
			<h2
				className={css({
					fontSize: "20px",
					marginBottom: "8px",
				})}
			>
				Answers
			</h2>

			<div
				className={css({
					display: "flex",
					flexDirection: "column",
					gap: "12px",
					marginBottom: "24px",
				})}
			>
				{answers.length === 0 ? (
					<p>No answers yet.</p>
				) : (
					answers.map((ans) => (
						<div
							key={ans.id}
							className={css({
								padding: "12px",
								border: "1px solid #ddd",
								borderRadius: "6px",
							})}
						>
							<p>{ans.content}</p>
							<p
								className={css({
									fontSize: "12px",
									color: "gray",
									marginTop: "4px",
								})}
							>
								{new Date(ans.answeredAt).toLocaleString()}
							</p>
						</div>
					))
				)}
			</div>
			<form
				onSubmit={submitAnswer}
				className={css({
					display: "flex",
					flexDirection: "column",
					gap: "12px",
				})}
			>
				<textarea
					className={css({
						padding: "12px",
						border: "1px solid #ccc",
						borderRadius: "6px",
						height: "120px",
						resize: "vertical",
					})}
					value={answerContent}
					onChange={(e) => setAnswerContent(e.target.value)}
					placeholder="Write your answer..."
				/>

				<button
					type="submit"
					disabled={submitting}
					className={css({
						padding: "12px",
						backgroundColor: submitting ? "gray.400" : "blue.500",
						color: "white",
						borderRadius: "6px",
						cursor: submitting ? "not-allowed" : "pointer",
						fontSize: "16px",
						fontWeight: "bold",
						transition: "0.2s",
					})}
				>
					{submitting ? "Posting..." : "Post Answer"}
				</button>
			</form>
		</div>
	);
}
