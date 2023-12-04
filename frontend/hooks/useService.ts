import { AuthService } from "@/services/authService";
import { ExamService } from "@/services/examService";
import { ServiceRegistryContext } from "@/services/serviceContext"
import { useContext } from "react"

export function useAuthService(): AuthService {
  const registry = useContext(ServiceRegistryContext);
  if (!registry) {
    throw new Error("Service registry not found");
  }
  const service = registry.resolve<AuthService>("authService");
  return service;
}

export function useExamService(): ExamService {
  const registry = useContext(ServiceRegistryContext);
  if (!registry) {
    throw new Error("Service registry not found");
  }
  const service = registry.resolve<ExamService>("examService");
  return service;
}