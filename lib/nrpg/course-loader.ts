/**
 * NRPG Course & Module Loader
 * Loads training content from NRPG-Onboarding-Framework
 */

import fs from 'fs';
import path from 'path';

// ============================================================================
// TYPES
// ============================================================================

export interface CourseInfo {
  courseId: string;
  courseName: string;
  description: string;
  totalModules: number;
  totalHours: number;
  passingScore: number;
  prerequisites: string[];
  modules: ModuleInfo[];
}

export interface ModuleInfo {
  moduleId: string;
  moduleOrder: number;
  title: string;
  description: string;
  duration: string;
  estimatedMinutes: number;
  passingScore: number;
  prerequisites: string[];
  learningObjectives: string[];
  hasAssessment: boolean;
  hasExercises: boolean;
  hasResources: boolean;
}

export interface ModuleContent {
  trainingContent: string;
  assessment: string | null;
  exercises: string | null;
  resources: string | null;
  facilitatorGuide: string | null;
}

// ============================================================================
// CONSTANTS
// ============================================================================

const FRAMEWORK_PATH = path.join(process.cwd(), 'NRPG-Onboarding-Framework', 'contractor-onboarding');

export const COURSES = {
  CSE: {
    id: 'CSE',
    name: 'Customer Service Excellence',
    path: 'customer-service-excellence',
    totalHours: 10,
    modulePrefix: 'CSE',
  },
  WRT: {
    id: 'WRT',
    name: 'Water Damage Restoration',
    path: 'water-damage-restoration',
    totalHours: 24,
    modulePrefix: 'WRT',
  },
} as const;

// ============================================================================
// FILE LOADERS
// ============================================================================

/**
 * Read file contents safely
 */
function readFileSafe(filePath: string): string | null {
  try {
    if (fs.existsSync(filePath)) {
      return fs.readFileSync(filePath, 'utf-8');
    }
    return null;
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error);
    return null;
  }
}

/**
 * Parse JSON file safely
 */
function parseJsonFile<T>(filePath: string): T | null {
  const content = readFileSafe(filePath);
  if (!content) return null;
  try {
    return JSON.parse(content) as T;
  } catch (error) {
    console.error(`Error parsing JSON ${filePath}:`, error);
    return null;
  }
}

// ============================================================================
// COURSE LOADERS
// ============================================================================

/**
 * Get course info from course-info.json
 */
export function getCourseInfo(courseId: 'CSE' | 'WRT'): CourseInfo | null {
  const course = COURSES[courseId];
  const infoPath = path.join(FRAMEWORK_PATH, course.path, 'course-info.json');
  const info = parseJsonFile<any>(infoPath);

  if (!info) {
    // Return fallback info based on known structure
    return {
      courseId: course.id,
      courseName: course.name,
      description: `Professional ${course.name} training programme`,
      totalModules: courseId === 'CSE' ? 10 : 12,
      totalHours: course.totalHours,
      passingScore: 80,
      prerequisites: [],
      modules: getModulesList(courseId),
    };
  }

  return {
    courseId: info.courseId || course.id,
    courseName: info.courseName || course.name,
    description: info.description || '',
    totalModules: info.totalModules || (courseId === 'CSE' ? 10 : 12),
    totalHours: info.totalHours || course.totalHours,
    passingScore: info.passingScore || 80,
    prerequisites: info.prerequisites || [],
    modules: getModulesList(courseId),
  };
}

/**
 * Get list of all modules for a course
 */
export function getModulesList(courseId: 'CSE' | 'WRT'): ModuleInfo[] {
  const course = COURSES[courseId];
  const modulesPath = path.join(FRAMEWORK_PATH, course.path, 'modules');
  const modules: ModuleInfo[] = [];

  // Known module counts
  const moduleCount = courseId === 'CSE' ? 10 : 12;

  for (let i = 1; i <= moduleCount; i++) {
    const moduleNum = i.toString().padStart(2, '0');
    const moduleId = `${course.modulePrefix}-${moduleNum}`;

    // Try to load module info from JSON file
    const jsonFiles = fs.readdirSync(modulesPath).filter(f =>
      f.startsWith(`module-${moduleNum}-`) && f.endsWith('.json')
    );

    let moduleInfo: any = null;
    if (jsonFiles.length > 0) {
      const jsonPath = path.join(modulesPath, jsonFiles[0]);
      moduleInfo = parseJsonFile<any>(jsonPath);
    }

    // Check for content files
    const hasAssessment = fs.existsSync(path.join(modulesPath, `module-${moduleNum}-assessment.md`));
    const hasExercises = fs.existsSync(path.join(modulesPath, `module-${moduleNum}-exercises.md`));
    const hasResources = fs.existsSync(path.join(modulesPath, `module-${moduleNum}-resources.md`));

    modules.push({
      moduleId,
      moduleOrder: i,
      title: moduleInfo?.title || `Module ${i}`,
      description: moduleInfo?.description || '',
      duration: moduleInfo?.duration || (courseId === 'CSE' ? '60 min' : '120 min'),
      estimatedMinutes: parseInt(moduleInfo?.duration) || (courseId === 'CSE' ? 60 : 120),
      passingScore: moduleInfo?.passingScore || 80,
      prerequisites: moduleInfo?.prerequisites || (i > 1 ? [`${course.modulePrefix}-${(i - 1).toString().padStart(2, '0')}`] : []),
      learningObjectives: moduleInfo?.learningObjectives || [],
      hasAssessment,
      hasExercises,
      hasResources,
    });
  }

  return modules;
}

/**
 * Get module content (markdown files)
 */
export function getModuleContent(courseId: 'CSE' | 'WRT', moduleNum: number): ModuleContent | null {
  const course = COURSES[courseId];
  const modulesPath = path.join(FRAMEWORK_PATH, course.path, 'modules');
  const moduleNumStr = moduleNum.toString().padStart(2, '0');

  const trainingContent = readFileSafe(path.join(modulesPath, `module-${moduleNumStr}-training-content.md`));

  if (!trainingContent) {
    return null;
  }

  return {
    trainingContent,
    assessment: readFileSafe(path.join(modulesPath, `module-${moduleNumStr}-assessment.md`)),
    exercises: readFileSafe(path.join(modulesPath, `module-${moduleNumStr}-exercises.md`)),
    resources: readFileSafe(path.join(modulesPath, `module-${moduleNumStr}-resources.md`)),
    facilitatorGuide: readFileSafe(path.join(modulesPath, `module-${moduleNumStr}-facilitator-guide.md`)),
  };
}

/**
 * Get all courses with their modules
 */
export function getAllCourses(): CourseInfo[] {
  return [getCourseInfo('CSE'), getCourseInfo('WRT')].filter(Boolean) as CourseInfo[];
}

/**
 * Parse module ID to extract course and number
 */
export function parseModuleId(moduleId: string): { courseId: 'CSE' | 'WRT'; moduleNum: number } | null {
  const match = moduleId.match(/^(CSE|WRT)-(\d{2})$/);
  if (!match) return null;
  return {
    courseId: match[1] as 'CSE' | 'WRT',
    moduleNum: parseInt(match[2], 10),
  };
}

/**
 * Get module by ID
 */
export function getModuleById(moduleId: string): { info: ModuleInfo; content: ModuleContent } | null {
  const parsed = parseModuleId(moduleId);
  if (!parsed) return null;

  const courseInfo = getCourseInfo(parsed.courseId);
  if (!courseInfo) return null;

  const moduleInfo = courseInfo.modules.find(m => m.moduleId === moduleId);
  if (!moduleInfo) return null;

  const content = getModuleContent(parsed.courseId, parsed.moduleNum);
  if (!content) return null;

  return { info: moduleInfo, content };
}

// ============================================================================
// PROGRESS UTILITIES
// ============================================================================

export interface CourseProgress {
  courseId: string;
  completedModules: number;
  totalModules: number;
  percentComplete: number;
  averageScore: number;
  totalTimeMinutes: number;
  currentModuleId: string | null;
  status: 'not_started' | 'in_progress' | 'completed';
}

/**
 * Calculate overall progress for a course
 */
export function calculateCourseProgress(
  courseId: 'CSE' | 'WRT',
  moduleProgress: Array<{
    moduleId: string;
    status: 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED' | 'FAILED';
    bestQuizScore: number | null;
    actualMinutes: number;
  }>
): CourseProgress {
  const courseInfo = getCourseInfo(courseId);
  if (!courseInfo) {
    return {
      courseId,
      completedModules: 0,
      totalModules: 0,
      percentComplete: 0,
      averageScore: 0,
      totalTimeMinutes: 0,
      currentModuleId: null,
      status: 'not_started',
    };
  }

  const relevantProgress = moduleProgress.filter(p => p.moduleId.startsWith(courseId));

  const completedModules = relevantProgress.filter(p => p.status === 'COMPLETED').length;
  const totalModules = courseInfo.totalModules;
  const percentComplete = Math.round((completedModules / totalModules) * 100);

  const scoresWithValues = relevantProgress
    .filter(p => p.bestQuizScore !== null)
    .map(p => p.bestQuizScore as number);
  const averageScore = scoresWithValues.length > 0
    ? Math.round(scoresWithValues.reduce((a, b) => a + b, 0) / scoresWithValues.length)
    : 0;

  const totalTimeMinutes = relevantProgress.reduce((sum, p) => sum + p.actualMinutes, 0);

  // Find current module (first non-completed)
  let currentModuleId: string | null = null;
  for (const module of courseInfo.modules) {
    const progress = relevantProgress.find(p => p.moduleId === module.moduleId);
    if (!progress || progress.status !== 'COMPLETED') {
      currentModuleId = module.moduleId;
      break;
    }
  }

  let status: 'not_started' | 'in_progress' | 'completed' = 'not_started';
  if (completedModules === totalModules) {
    status = 'completed';
  } else if (completedModules > 0 || relevantProgress.some(p => p.status === 'IN_PROGRESS')) {
    status = 'in_progress';
  }

  return {
    courseId,
    completedModules,
    totalModules,
    percentComplete,
    averageScore,
    totalTimeMinutes,
    currentModuleId,
    status,
  };
}
