/**
 * This file is used to register all services in the application.
 * This registry will be provided globally to the application via React Context at root level.
 * Any component can then use the useService hook to access the service via dependency injection.
 * Check @/hooks/useService.ts for all available services.
 */

/**
 * Import all services here and register them in the baseRegistry.
 * No need to import the services anywhere else in the application.
 * No need to modify serviceRegistry itself.
 */
import { ExamService } from "./examService";
import { AuthService } from "./authService";

const baseRegistry = {
  examService: new ExamService(),
  authService: new AuthService(),
};

export type ServiceRegistryKey = keyof typeof baseRegistry;

export const serviceRegistry = {
  _registry: baseRegistry,
  resolve<T>(key: string): T {
    const service = this._registry[key as ServiceRegistryKey];
    if (!service) {
      throw new Error(`Service ${key} not found`);
    }
    return service as T;
  },
}