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

export const trainingModules: ModuleConfig[] = [
  {
    id: 'day-1',
    day: 1,
    title: 'Industry Introduction & Safety',
    description: 'Foundation knowledge and safety protocols',
    isAvailable: true,
    releaseDate: '2024-01-01'
  },
  {
    id: 'day-2',
    day: 2,
    title: 'Water Damage Fundamentals',
    description: 'Understanding water damage categories and classes',
    isAvailable: true,
    releaseDate: '2024-01-02',
    requiresPrerequisites: [1]
  },
  {
    id: 'day-3',
    day: 3,
    title: 'Water Damage Assessment',
    description: 'Professional assessment techniques',
    isAvailable: true,
    releaseDate: '2024-01-03',
    requiresPrerequisites: [1, 2]
  },
  {
    id: 'day-4',
    day: 4,
    title: 'Advanced Water Damage',
    description: 'Complex water damage scenarios',
    isAvailable: true,
    releaseDate: '2024-01-04',
    requiresPrerequisites: [1, 2, 3]
  },
  {
    id: 'day-5',
    day: 5,
    title: 'Structural Drying Science',
    description: 'Psychrometry and drying principles',
    isAvailable: true,
    releaseDate: '2024-01-05',
    requiresPrerequisites: [1, 2, 3, 4]
  },
  {
    id: 'day-6',
    day: 6,
    title: 'Equipment & Technology',
    description: 'Professional equipment operation',
    isAvailable: true,
    releaseDate: '2024-01-06',
    requiresPrerequisites: [1, 2, 3, 4, 5]
  },
  {
    id: 'day-7',
    day: 7,
    title: 'Documentation & Quality',
    description: 'Professional documentation standards',
    isAvailable: true,
    releaseDate: '2024-01-07',
    requiresPrerequisites: [1, 2, 3, 4, 5, 6]
  },
  // Week 2 - Can be gradually enabled
  {
    id: 'day-8',
    day: 8,
    title: 'Mould Remediation',
    description: 'Professional mould assessment and remediation',
    isAvailable: false, // Set to true when ready
    releaseDate: '2024-01-08',
    requiresPrerequisites: [1, 2, 3, 4, 5, 6, 7],
    isBeta: true
  },
  {
    id: 'day-9',
    day: 9,
    title: 'Fire & Smoke Damage',
    description: 'Fire and smoke restoration techniques',
    isAvailable: false,
    releaseDate: '2024-01-09',
    requiresPrerequisites: [1, 2, 3, 4, 5, 6, 7, 8]
  },
  {
    id: 'day-10',
    day: 10,
    title: 'Biohazard & Trauma',
    description: 'Biohazard cleaning protocols',
    isAvailable: false,
    releaseDate: '2024-01-10',
    requiresPrerequisites: [1, 2, 3, 4, 5, 6, 7, 8, 9]
  },
  {
    id: 'day-11',
    day: 11,
    title: 'Commercial & Large Loss',
    description: 'Large scale project management',
    isAvailable: false,
    releaseDate: '2024-01-11',
    requiresPrerequisites: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  },
  {
    id: 'day-12',
    day: 12,
    title: 'Business Operations',
    description: 'Business and administrative skills',
    isAvailable: false,
    releaseDate: '2024-01-12',
    requiresPrerequisites: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
  },
  {
    id: 'day-13',
    day: 13,
    title: 'Practical Application',
    description: 'Hands-on practical exercises',
    isAvailable: false,
    releaseDate: '2024-01-13',
    requiresPrerequisites: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
  },
  {
    id: 'day-14',
    day: 14,
    title: 'Final Certification',
    description: 'Assessment and certification',
    isAvailable: false,
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

// Environment-based configuration
export const getModuleAvailability = () => {
  const env = process.env.NODE_ENV;
  const releaseMode = process.env.NEXT_PUBLIC_TRAINING_RELEASE_MODE || 'gradual';
  
  switch (releaseMode) {
    case 'all':
      // All modules available (for testing/development)
      return trainingModules.map(m => ({ ...m, isAvailable: true }));
    
    case 'week1':
      // Only Week 1 available
      return trainingModules.map(m => ({ 
        ...m, 
        isAvailable: m.day <= 7 
      }));
    
    case 'gradual':
      // Use the configured availability
      return trainingModules;
    
    case 'beta':
      // Week 1 + beta modules
      return trainingModules.map(m => ({ 
        ...m, 
        isAvailable: m.day <= 7 || m.isBeta === true 
      }));
    
    default:
      return trainingModules;
  }
};