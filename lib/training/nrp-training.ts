import path from 'path';
import { createHash } from 'crypto';
import { promises as fs } from 'fs';

export interface NrpgTrainingSource {
  path: string;
  sha256: string;
  bytes: number;
}

export interface NrpgTrainingModuleIndexEntry {
  moduleId: string;
  moduleNumber: number;
  title: string;
  sourcePath: string;
  sourceSha256: string;
}

export interface NrpgTrainingQuizModuleIndexEntry {
  moduleId: string;
  moduleNumber: number;
  name: string;
  description: string;
  questionCount: number;
}

export interface NrpgTrainingIndex {
  generatedAt: string;
  sources: NrpgTrainingSource[];
  modules: NrpgTrainingModuleIndexEntry[];
  quiz: {
    sourcePath: string;
    sourceSha256: string;
    modules: NrpgTrainingQuizModuleIndexEntry[];
  };
}

export interface NrpgQuizQuestion {
  id: string;
  type: string;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
  reference?: string;
}

export interface NrpgQuizModule {
  name: string;
  description: string;
  questions: NrpgQuizQuestion[];
}

export interface NrpgQuizBank {
  generatedAt: string;
  sourcePath: string;
  sourceSha256: string;
  quizData: Record<string, NrpgQuizModule>;
}

function generatedDir(): string {
  return path.join(process.cwd(), 'src', 'lib', 'training', 'generated');
}

function trainingSourcesDir(): string {
  return path.join(process.cwd(), 'training-sources');
}

function sha256Hex(content: Buffer): string {
  return createHash('sha256').update(content).digest('hex');
}

export async function loadNrpgTrainingIndex(): Promise<NrpgTrainingIndex> {
  const raw = await fs.readFile(path.join(generatedDir(), 'nrp-training-index.json'), 'utf8');
  return JSON.parse(raw) as NrpgTrainingIndex;
}

export async function loadNrpgQuizBank(): Promise<NrpgQuizBank> {
  const raw = await fs.readFile(path.join(generatedDir(), 'nrp-quiz-bank.json'), 'utf8');
  return JSON.parse(raw) as NrpgQuizBank;
}

export async function getNrpgQuizModule(moduleNumber: number): Promise<NrpgQuizModule | null> {
  const bank = await loadNrpgQuizBank();
  const module = bank.quizData[String(moduleNumber)];
  return module ?? null;
}

export function parseNrpgModuleNumber(moduleId: string): number | null {
  const match = moduleId.match(/^NRP-(\d{3})$/i);
  if (!match) return null;
  return parseInt(match[1], 10);
}

export async function getTrainingModuleHtmlById(
  moduleId: string
): Promise<{ html: string; sourcePath: string; sha256: string }> {
  const index = await loadNrpgTrainingIndex();
  const entry = index.modules.find((m) => m.moduleId.toUpperCase() === moduleId.toUpperCase());
  if (!entry) {
    throw new Error(`Training module not found: ${moduleId}`);
  }

  const absolutePath = path.join(process.cwd(), entry.sourcePath);
  const buffer = await fs.readFile(absolutePath);
  const sha = sha256Hex(buffer);

  if (sha !== entry.sourceSha256) {
    throw new Error(`Training module source hash mismatch for ${moduleId}`);
  }

  return {
    html: buffer.toString('utf8'),
    sourcePath: entry.sourcePath,
    sha256: sha,
  };
}

export async function verifyTrainingSourcesPresent(): Promise<void> {
  const root = trainingSourcesDir();
  const stat = await fs.stat(root).catch(() => null);
  if (!stat || !stat.isDirectory()) {
    throw new Error('Missing training-sources directory');
  }
}

