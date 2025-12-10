export type CreateQuestionParams = {
	title: string;
	content: string;
};
export type Question = {
	id: string;
	title: string;
	content: string;
	solved: boolean;
	number_of_answer: string;
	createdAt: Date;
	updatedAt: Date;
}