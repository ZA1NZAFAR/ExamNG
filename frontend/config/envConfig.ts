
export const envConfig = {
	// examples
	clientEnv: process.env.NEXT_PUBLIC_CLIENT_ENV || '',
	serverEnv: process.env.SERVER_ENV || '',
	backendAPI: process.env.NEXT_PUBLIC_BACKEND_API || '',
	defaultTotalScore: parseInt(process.env.NEXT_PUBLIC_DEFAULT_TOTAL_SCORE || '') || 20,
};