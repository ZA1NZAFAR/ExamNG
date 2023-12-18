import { mockModules } from '@/mockData/module';
import { Exam } from '@/types';
import { NextRequest, NextResponse } from 'next/server';

type ExamParams = {
  moduleCode: string;
  examId: string;
};

export async function GET(request: NextRequest, { params } : { params: ExamParams }) {
	const { moduleCode, examId } = params;

	const moduleSearch = mockModules.get(moduleCode);

	if (moduleSearch === undefined) {
		return NextResponse.json({ message: `Module with code ${moduleCode} not found` }, { status: 404 }); 
	}
	const moduleData = {
		code: moduleSearch.code,
		description: moduleSearch.description,
		imageURL: moduleSearch.imageURL
	} as const;

	const examSearch = moduleSearch.exams.get(examId);

	if (examSearch === undefined) {
		return NextResponse.json({ message: `Exam with id ${examId} not found` }, { status: 404 });
	}

	const response: Exam = {
		id: examSearch.id,
		startTimestamp: examSearch.startTimestamp,
		endTimestamp: examSearch.endTimestamp,
		description: examSearch.description,
		isValidated: examSearch.isValidated,
		isSubmitted: examSearch.isSubmitted,
		summaryFields: {
			module: moduleData,
			groups: []
		}
	};

	return NextResponse.json(response);
}
