export const ONBOARDING_MODULE_COUNT = 22;

export function onboardingModuleName(moduleNumber: number): string {
  return `Module ${moduleNumber}`;
}

export function parseOnboardingModuleNumber(moduleName: string): number {
  const match = moduleName.match(/(?:Module|Day)\s+(\d+)/i);
  return match ? Number.parseInt(match[1], 10) : Number.MAX_SAFE_INTEGER;
}
