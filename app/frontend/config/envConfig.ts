
export const envConfig = {
	// examples
	clientEnv: process.env.NEXT_PUBLIC_CLIENT_ENV || '',
	serverEnv: process.env.SERVER_ENV || '',
	// actual config
	backendAPI: process.env.NEXT_PUBLIC_BACKEND_API || '',
	defaultQueryPageSize: parseInt(process.env.NEXT_PUBLIC_DEFAULT_PAGE_SIZE || '') || 10,
	defaultTotalScore: parseInt(process.env.NEXT_PUBLIC_DEFAULT_TOTAL_SCORE || '') || 20,
};
