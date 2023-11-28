import { mockExams } from '@/mockData/question';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest, { params } : { params: { moduleCode: string, examId: string } }) {
	const moduleCode = params.moduleCode;

	if (!mockExams[moduleCode]) {
		return Response.json({ error: 'Module not found' }, { status: 404 });
	}

	const module = mockExams[moduleCode];
	const exam = module.find(exam => exam.id === params.examId);

	if (!exam) {
		return Response.json({ error: 'Exam not found' }, { status: 404 });
	}
  
	return Response.json(exam);
}