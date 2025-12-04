import { usePost } from "~/utils/post";
import type { CreateAnswerParams } from "~/types/answer";

export function usePostAnswer() {
    const { post } = usePost();

    const postAnswer = async (questionId: string, params: CreateAnswerParams) => {
        return await post(`/questions/${questionId}/answers`, params);
    };

    return { postAnswer };
}
