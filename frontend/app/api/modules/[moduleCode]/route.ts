import { mockExams } from '@/mockData/question';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest, { params } : { params: { moduleCode: string } }) {
	const moduleCode = params.moduleCode;

	if (!mockExams[moduleCode]) {
		return Response.json({ error: 'Module not found' }, { status: 404 });
	}

	const response = mockExams[moduleCode];
	return Response.json(response);
}