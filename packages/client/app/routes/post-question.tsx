import { useRef, useState } from "react";
import { useNavigate } from "react-router";
import { css } from "styled-system/css";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { postQuestion } from "../hooks/use-question";

export default function QuestionsPage() {
	const formRef = useRef<HTMLFormElement>(null);
	const { post } = postQuestion();
	const navigate = useNavigate();

	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (isSubmitting) return;

		const formData = new FormData(e.currentTarget);
		const title = formData.get("title");
		const content = formData.get("content");

		if (typeof title !== "string" || typeof content !== "string") return;

		setIsSubmitting(true);

		try {
			const newQuestion = await post({ title, content });

			console.log("Question created!", newQuestion);

			formRef.current?.reset();
			navigate("/timeline");
		} catch (err) {
			console.error("質問投稿に失敗しました", err);
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<div
			className={css({
				maxWidth: "600px",
				margin: "0 auto",
				padding: "24px",
			})}
		>
			<h1
				className={css({
					fontSize: "24px",
					fontWeight: "bold",
					marginBottom: "24px",
					color: "#1a1a1a",
				})}
			>
				質問投稿
			</h1>

			<form
				ref={formRef}
				onSubmit={handleSubmit}
				className={css({
					display: "flex",
					flexDirection: "column",
					gap: "20px",
				})}
			>
				<Input
					label="タイトル"
					type="text"
					name="title"
					required
					maxLength={100}
					placeholder="質問のタイトルを入力"
				/>

				<Textarea
					label="内容"
					name="content"
					required
					maxLength={5000}
					placeholder="質問の内容を詳しく記入してください"
				/>

				<div
					className={css({
						display: "flex",
						gap: "12px",
					})}
				>
					<Button type="submit" disabled={isSubmitting}>
						{isSubmitting ? "投稿中..." : "質問を投稿"}
					</Button>

					<Button as="link" to="/timeline" variant="secondary">
						キャンセル
					</Button>
				</div>
			</form>
		</div>
	);
}
