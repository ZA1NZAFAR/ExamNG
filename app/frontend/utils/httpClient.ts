import { envConfig } from '@/config/envConfig';
import axios from 'axios';

const httpClient = axios.create({
	baseURL: envConfig.backendAPI,
});

export default httpClient;
