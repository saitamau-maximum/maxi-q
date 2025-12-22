import { useCallback, useEffect, useState } from "react";
import type { CreateQuestionParams } from "~/types/question";
import { postRequest, serverFetch } from "~/utils/fetch";
import type { Question } from "../types/question";

export function postQuestion() {
	const post = async (params: CreateQuestionParams): Promise<Question> => {
		return await postRequest<Question>("/questions", params);
	};

	return { post };
}

export function useQuestions(questionId?: string) {
	const [question, setQuestion] = useState<Question | null>(null);
	const [questions, setQuestions] = useState<Question[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<Error | null>(null);

	const fetchAllQuestions = useCallback(async () => {
		setIsLoading(true);
		setError(null);

		try {
			const res = await serverFetch(`/questions`);
			if (!res.ok) throw new Error("Failed to fetch question");

			setQuestions(await res.json());
		} catch (err) {
			console.error(err);
			setError(err instanceof Error ? err : new Error("Unknown error"));
		} finally {
			setIsLoading(false);
		}
	}, []);

	const fetchQuestion = useCallback(async () => {
		if (!questionId) return;

		setIsLoading(true);
		setError(null);

		try {
			const res = await serverFetch(`/questions/${questionId}`);
			if (!res.ok) throw new Error("Failed to fetch question");

			setQuestion(await res.json());
		} catch (err) {
			console.error(err);
			setError(err instanceof Error ? err : new Error("Unknown error"));
		} finally {
			setIsLoading(false);
		}
	}, [questionId]);

	useEffect(() => {
		fetchQuestion();
		fetchAllQuestions();
	}, [fetchQuestion, fetchAllQuestions]);

	return { questions, question, isLoading, error, refetch: fetchQuestion };
}
