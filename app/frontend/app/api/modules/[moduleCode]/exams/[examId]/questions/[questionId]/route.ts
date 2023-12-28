import { mockModules } from '@/mockData/module';
import { mockQuestions } from '@/mockData/question';
import { CodeQuestion, MCQuestion, Question } from '@/types';
import { NextRequest, NextResponse } from 'next/server';

type QuestionParams = {
  moduleCode: string;
  examId: string;
  questionId: string;
};

export async function PUT(request: NextRequest, { params } : { params: QuestionParams }) {
	const { moduleCode, examId, questionId } = params;
	const moduleSearch = mockModules.get(moduleCode);

	if (moduleSearch === undefined) {
		return NextResponse.json({ message: `Module with code ${moduleCode} not found` }, { status: 404 }); 
	}

	const examSearch = moduleSearch.exams.get(examId);

	if (examSearch === undefined) {
		return NextResponse.json({ message: `Exam with id ${examId} not found` }, { status: 404 });
	}

	const questionSearch = mockQuestions.get(questionId);

	if (questionSearch === undefined) {
		return NextResponse.json({ message: `Question with id ${questionId} not found` }, { status: 404 });
	}

	if (!(examSearch.questions.includes(questionId))) {
		return NextResponse.json({ message: `Question with id ${questionId} not found in exam with id ${examId}` }, { status: 400 });
	}

	const body = await request.json();

	if (questionId !== body.id) {
		return NextResponse.json({ message: `Question id in path ${questionId} does not match id in body ${body.id}` }, { status: 400 });
	}

	const question: Question = {
		id: questionId,
		statement: body.statement,
		type: body.type,
		attachments: body.attachments,
		coefficient: body.coefficient
	};
	if (question.type === 'mcq') {
		(question as MCQuestion).options = body.options;
	}
	if (question.type === 'code') {
		(question as CodeQuestion).defaultLanguage = body.defaultLanguage;
		(question as CodeQuestion).initialCode = body.initialCode;
	}
  
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	mockQuestions.set(questionId, question as any);
	console.log(body);

	return NextResponse.json(question);
}
