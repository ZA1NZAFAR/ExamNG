import { mockModules } from '@/mockData/module';
import { Module } from '@/types';
import { NextRequest, NextResponse } from 'next/server';
import { ModuleParams } from './param';


export async function GET(_request: NextRequest, { params } : { params: ModuleParams }) {
	const moduleCode = params.moduleCode;
	const moduleSearch = mockModules.get(moduleCode);

	if (moduleSearch === undefined) {
		return NextResponse.json({ message: 'Module not found' }, { status: 404 });
	}

	const response: Module = {
		code: moduleSearch.code,
		description: moduleSearch.description,
		imageURL: moduleSearch.imageURL
	};

	return NextResponse.json(response);
}
