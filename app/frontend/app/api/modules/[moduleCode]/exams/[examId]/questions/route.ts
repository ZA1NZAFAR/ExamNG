import { mockModules } from '@/mockData/module';
import { mockQuestions } from '@/mockData/question';
import { Attachment, PageResult, Question, QuestionType } from '@/types';
import { NextRequest, NextResponse } from 'next/server';

type ExamParams = {
  moduleCode: string;
  examId: string;
};

export async function GET(request: NextRequest, { params } : { params: ExamParams }) {
	const searchParams = request.nextUrl.searchParams;
	const page = parseInt(searchParams.get('page') || '') ?? 1;
	const pageSize = parseInt(searchParams.get('pageSize') || '') ?? 10;

	const { moduleCode, examId } = params;

	const moduleSearch = mockModules.get(moduleCode);

	if (moduleSearch === undefined) {
		return NextResponse.json({ message: `Module with code ${moduleCode} not found` }, { status: 404 }); 
	}

	const examSearch = moduleSearch.exams.get(examId);

	if (examSearch === undefined) {
		return NextResponse.json({ message: `Exam with id ${examId} not found` }, { status: 404 });
	}

	const questionSearch: Question[] = [];
	examSearch.questions.forEach((questionId) => {
		const questionData = mockQuestions.get(questionId);
		if (questionData !== undefined) {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const question: any = {
				id: questionData.id,
				statement: questionData.statement,
				type: questionData.type as QuestionType,
				attachments: questionData.attachments as Attachment[],
				coefficient: questionData.coefficient
			};
			if (question.type === 'mcq' && 'options' in questionData) {
				question.options = questionData.options ;
			}
			if (question.type === 'code' && 'defaultLanguage' in questionData) {
				question.defaultLanguage = questionData.defaultLanguage;
				if ('initialCode' in questionData) question.initialCode = questionData.initialCode;
			}
			questionSearch.push(question);
		}
	});
	console.log(questionSearch);
	const response: PageResult<Question> = {
		count: questionSearch.length,
		currentPage: page,
		pageSize,
		results: questionSearch.slice((page - 1) * pageSize, page * pageSize)
	};
	return NextResponse.json(response);
}
