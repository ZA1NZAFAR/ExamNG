import { mockModules } from '@/mockData/module';
import { Module, PageResult } from '@/types';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
	const searchParams = request.nextUrl.searchParams;
	const page = parseInt(searchParams.get('page') || '') ?? 1;
	const pageSize = parseInt(searchParams.get('pageSize') || '') ?? 10;
	const response = mockModules;
	const modules: Module[] = [];
	for (const moduleDoc of response.values()) {
		const { code, description, imageURL } = moduleDoc;
		modules.push({
			code,
			description,
			imageURL
		});
	}
	const results: PageResult<Module> = {
		count: mockModules.size,
		pageSize,
		currentPage: page,
		results: modules.slice((page - 1) * pageSize, page * pageSize)
	};

	return NextResponse.json(results);
}
