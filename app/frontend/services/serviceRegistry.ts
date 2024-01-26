/**
 * This file is used to register all services in the application.
 * This registry will be provided globally to the application via React Context at root level.
 * Any component can then use the useService hook to access the service via dependency injection.
 * Check @/hooks/useService.ts for all available services.
 */

/**
 * Import all services here and register them in the serviceRegistry.
 * No need to import the services anywhere else in the application.
 */
import { ExamService } from './examService';
import { AuthService } from './authService';
import { UserService } from './userService';

export class ServiceRegistry {
	examService: ExamService;
	authService: AuthService;
	userService: UserService;

	constructor() {
		this.examService = new ExamService(),
		this.authService = new AuthService(),
		this.userService = new UserService();
	}
}

export type ServiceRegistryKey = keyof ServiceRegistry;

