/**
 * SEO/GEO Proof of Concept Demo
 * Disaster Recovery - NRPG Platform
 *
 * Demonstrates the on-demand page generation system for investor pitches.
 * Shows the complete flow from contractor signup to page generation.
 *
 * Usage:
 * import { runDemo, DemoScenario } from '@/lib/geo/demo';
 * const result = await runDemo(DemoScenario.BRISBANE_WATER_DAMAGE);
 */

export {
  // Demo Runner
  runDemo,
  runAllDemos,
  formatDemoOutput,

  // Demo Scenarios
  DemoScenario,
  DEMO_SCENARIOS,

  // Demo Types
  type DemoResult,
  type DemoContractor,
  type DemoOutput,
} from './demo-runner';

export {
  // Mock Data
  MOCK_SUBURBS,
  MOCK_REGIONS,
  generateMockContractor,
  generateMockSuburbs,
} from './mock-data';
