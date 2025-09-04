// Training Module Configuration
// Control which modules are available for viewing

export interface ModuleConfig {
  id: string;
  day: number;
  title: string;
  description: string;
  isAvailable: boolean;
  releaseDate?: string;
  requiresPrerequisites?: number[]; // Days that must be completed first
  isBeta?: boolean;
}

// Get the release configuration from environment variable
const getReleaseConfig = (): number[] => {
  // NEXT_PUBLIC_AVAILABLE_MODULES should be a comma-separated list of day numbers
  // Example: "1,2,3,4,5,6,7" for week 1 only
  // Example: "1,2,3,4,5,6,7,8,9" for week 1 + first 2 days of week 2
  // Example: "all" for all modules
  
  const config = process.env.NEXT_PUBLIC_AVAILABLE_MODULES || '1,2,3,4,5,6,7';
  
  if (config === 'all') {
    return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
  }
  
  if (config === 'none') {
    return [];
  }
  
  // Parse comma-separated numbers
  return config.split(',').map(num => parseInt(num.trim())).filter(num => !isNaN(num));
};

const availableDays = getReleaseConfig();

export const trainingModules: ModuleConfig[] = [
  {
    id: 'day-1',
    day: 1,
    title: 'Industry Introduction & Safety',
    description: 'Foundation knowledge and safety protocols',
    isAvailable: availableDays.includes(1),
    releaseDate: '2024-01-01'
  },
  {
    id: 'day-2',
    day: 2,
    title: 'Water Damage Fundamentals',
    description: 'Understanding water damage categories and classes',
    isAvailable: availableDays.includes(2),
    releaseDate: '2024-01-02',
    requiresPrerequisites: [1]
  },
  {
    id: 'day-3',
    day: 3,
    title: 'Water Damage Assessment',
    description: 'Professional assessment techniques',
    isAvailable: availableDays.includes(3),
    releaseDate: '2024-01-03',
    requiresPrerequisites: [1, 2]
  },
  {
    id: 'day-4',
    day: 4,
    title: 'Advanced Water Damage',
    description: 'Complex water damage scenarios',
    isAvailable: availableDays.includes(4),
    releaseDate: '2024-01-04',
    requiresPrerequisites: [1, 2, 3]
  },
  {
    id: 'day-5',
    day: 5,
    title: 'Structural Drying Science',
    description: 'Psychrometry and drying principles',
    isAvailable: availableDays.includes(5),
    releaseDate: '2024-01-05',
    requiresPrerequisites: [1, 2, 3, 4]
  },
  {
    id: 'day-6',
    day: 6,
    title: 'Equipment & Technology',
    description: 'Professional equipment operation',
    isAvailable: availableDays.includes(6),
    releaseDate: '2024-01-06',
    requiresPrerequisites: [1, 2, 3, 4, 5]
  },
  {
    id: 'day-7',
    day: 7,
    title: 'Documentation & Quality',
    description: 'Professional documentation standards',
    isAvailable: availableDays.includes(7),
    releaseDate: '2024-01-07',
    requiresPrerequisites: [1, 2, 3, 4, 5, 6]
  },
  // Week 2 - Can be gradually enabled
  {
    id: 'day-8',
    day: 8,
    title: 'Mould Remediation',
    description: 'Professional mould assessment and remediation',
    isAvailable: availableDays.includes(8),
    releaseDate: '2024-01-08',
    requiresPrerequisites: [1, 2, 3, 4, 5, 6, 7],
    isBeta: true
  },
  {
    id: 'day-9',
    day: 9,
    title: 'Fire & Smoke Damage',
    description: 'Fire and smoke restoration techniques',
    isAvailable: availableDays.includes(9),
    releaseDate: '2024-01-09',
    requiresPrerequisites: [1, 2, 3, 4, 5, 6, 7, 8]
  },
  {
    id: 'day-10',
    day: 10,
    title: 'Biohazard & Trauma',
    description: 'Biohazard cleaning protocols',
    isAvailable: availableDays.includes(10),
    releaseDate: '2024-01-10',
    requiresPrerequisites: [1, 2, 3, 4, 5, 6, 7, 8, 9]
  },
  {
    id: 'day-11',
    day: 11,
    title: 'Commercial & Large Loss',
    description: 'Large scale project management',
    isAvailable: availableDays.includes(11),
    releaseDate: '2024-01-11',
    requiresPrerequisites: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  },
  {
    id: 'day-12',
    day: 12,
    title: 'Business Operations',
    description: 'Business and administrative skills',
    isAvailable: availableDays.includes(12),
    releaseDate: '2024-01-12',
    requiresPrerequisites: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
  },
  {
    id: 'day-13',
    day: 13,
    title: 'Practical Application',
    description: 'Hands-on practical exercises',
    isAvailable: availableDays.includes(13),
    releaseDate: '2024-01-13',
    requiresPrerequisites: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
  },
  {
    id: 'day-14',
    day: 14,
    title: 'Final Certification',
    description: 'Assessment and certification',
    isAvailable: availableDays.includes(14),
    releaseDate: '2024-01-14',
    requiresPrerequisites: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]
  }
];

// Helper functions
export const getAvailableModules = () => {
  return trainingModules.filter(module => module.isAvailable);
};

export const getModuleByDay = (day: number) => {
  return trainingModules.find(module => module.day === day);
};

export const isModuleAccessible = (day: number, completedDays: number[] = []): boolean => {
  const module = getModuleByDay(day);
  if (!module) return false;
  if (!module.isAvailable) return false;
  
  // Check prerequisites
  if (module.requiresPrerequisites) {
    return module.requiresPrerequisites.every(prereq => completedDays.includes(prereq));
  }
  
  return true;
};

// Debug helper - shows current configuration
export const getCurrentReleaseInfo = () => {
  return {
    mode: process.env.NEXT_PUBLIC_AVAILABLE_MODULES || 'default (1-7)',
    availableModules: availableDays,
    totalAvailable: availableDays.length,
    week1Complete: availableDays.includes(1) && availableDays.includes(7),
    week2Started: availableDays.some(day => day > 7)
  };
};