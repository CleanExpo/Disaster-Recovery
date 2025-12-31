-- Contractor Onboarding Tables (Standalone - no foreign keys)

CREATE TABLE IF NOT EXISTS contractor_onboarding (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  contractorId TEXT NOT NULL UNIQUE,
  specialization VARCHAR(50) NOT NULL,
  assessmentScore INT,
  recommendedModules JSONB,
  startDate TIMESTAMP,
  targetCompletionDate TIMESTAMP,
  actualCompletionDate TIMESTAMP,
  status VARCHAR(50) DEFAULT 'PENDING_START',
  createdAt TIMESTAMP DEFAULT NOW(),
  updatedAt TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS contractor_module_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  onboardingId UUID NOT NULL,
  moduleId VARCHAR(100) NOT NULL,
  courseName VARCHAR(255),
  startedAt TIMESTAMP,
  completedAt TIMESTAMP,
  completed BOOLEAN DEFAULT FALSE,
  status VARCHAR(50) DEFAULT 'NOT_STARTED',
  progress INT DEFAULT 0,
  createdAt TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS contractor_assessments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  onboardingId UUID NOT NULL,
  moduleId VARCHAR(100) NOT NULL,
  assessmentType VARCHAR(50),
  score INT,
  maxScore INT DEFAULT 100,
  completedAt TIMESTAMP,
  feedback TEXT,
  createdAt TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS contractor_certifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  contractorId TEXT NOT NULL,
  certificationName VARCHAR(255) NOT NULL,
  certificationLevel INT,
  issueDate TIMESTAMP,
  expiryDate TIMESTAMP,
  specializations TEXT[],
  verified BOOLEAN DEFAULT FALSE,
  createdAt TIMESTAMP DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_contractor_status ON contractor_onboarding(status);
CREATE INDEX IF NOT EXISTS idx_contractor_specialization ON contractor_onboarding(specialization);
CREATE INDEX IF NOT EXISTS idx_module_progress ON contractor_module_progress(onboardingId, status);
CREATE INDEX IF NOT EXISTS idx_contractor_id_onboarding ON contractor_onboarding(contractorId);
CREATE INDEX IF NOT EXISTS idx_contractor_id_cert ON contractor_certifications(contractorId);
