import { mockModules } from '@/mockData/question';

export async function GET() {
	const response = mockModules;
	return Response.json(response);
}