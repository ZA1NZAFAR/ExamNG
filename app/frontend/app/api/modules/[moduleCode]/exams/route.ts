import { mockAverage } from '@/mockData/average';
import { mockModules } from '@/mockData/module';
import { Exam, PageResult } from '@/types';
import { NextRequest, NextResponse } from 'next/server';

type ExamsParams = {
  moduleCode: string;
};

export async function GET(request: NextRequest, { params } : { params: ExamsParams }) {
	const searchParams = request.nextUrl.searchParams;
	const page = parseInt(searchParams.get('page') || '') ?? 1;
	const pageSize = parseInt(searchParams.get('pageSize') || '') ?? 10;

	const moduleCode = params.moduleCode;
	const moduleSearch = mockModules.get(moduleCode);
	if (moduleSearch === undefined) {
		return NextResponse.json({ message: 'Module not found' }, { status: 404 });
	}

	const moduleData = {
		code: moduleSearch.code,
		description: moduleSearch.description,
		imageURL: moduleSearch.imageURL
	} as const;

	const examResults: Exam[] = [];
	moduleSearch.exams.forEach((exam) => {
		const average = mockAverage.get(exam.id);
		const examResult = {
			id: exam.id,
			startTimestamp: exam.startTimestamp,
			endTimestamp: exam.endTimestamp,
			description: exam.description,
			isValidated: exam.isValidated,
			isSubmitted: exam.isSubmitted,
			summaryFields: {
				module: moduleData,
				groups: [],
				average: average ?? undefined
			}
		};
		examResults.push(examResult);
	});

	const response: PageResult<Exam> = {
		count: moduleSearch.exams.size,
		currentPage: page,
		pageSize,
		results: examResults.slice((page - 1) * pageSize, page * pageSize)
	};

	return NextResponse.json(response);
}
