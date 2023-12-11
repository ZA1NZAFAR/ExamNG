import { ServiceRegistryContext } from '@/services/serviceContext';
import { useContext } from 'react';


export function useService() {
	const registry = useContext(ServiceRegistryContext);
	if (!registry) {
		throw new Error('Service registry not found');
	}
	return registry;
}
