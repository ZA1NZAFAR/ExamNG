import { mockAverage } from '@/mockData/average';
import { mockGroups } from '@/mockData/groups';
import { mockModules } from '@/mockData/module';
import { Exam, PageResult } from '@/types';
import { NextRequest, NextResponse } from 'next/server';
import { ModuleParams } from '../param';

export async function GET(request: NextRequest, { params } : { params: ModuleParams }) {
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
		const groups = mockGroups.get(exam.id);

		const examResult = {
			id: exam.id,
			startTimestamp: exam.startTimestamp,
			endTimestamp: exam.endTimestamp,
			description: exam.description,
			isValidated: exam.isValidated,
			isSubmitted: exam.isSubmitted,
			summaryFields: {
				module: moduleData,
				groups: groups ?? [],
				average: average ?? undefined
			}
		};
		examResults.push(examResult);
	});

	const response: PageResult<Exam> = {
		totalElements: moduleSearch.exams.size,
		number: page,
		size: pageSize,
		results: examResults.slice((page - 1) * pageSize, page * pageSize)
	};

	return NextResponse.json(response);
}
