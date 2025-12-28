/**
 * CRM Migration Script 4: Calculate Health Scores
 *
 * Calculates initial health scores and churn risk for all customer lifecycles
 *
 * @run npm run ts-node scripts/crm-migration/04-calculate-health-scores.ts
 */

import { PrismaClient } from '@prisma/client';
import { CustomerLifecycleService } from '../../src/lib/crm/customer-lifecycle.service';

const prisma = new PrismaClient();
const customerLifecycleService = new CustomerLifecycleService(prisma);

async function calculateHealthScores() {
  console.log('🔄 Starting health score calculation...\n');

  const lifecycles = await prisma.customerLifecycle.findMany();

  console.log(`Found ${lifecycles.length} customer lifecycles to process\n`);

  let healthScoresCalculated = 0;
  let churnRisksCalculated = 0;
  let errors = 0;

  for (const lifecycle of lifecycles) {
    try {
      // Calculate health score
      const healthScore = await customerLifecycleService.calculateHealthScore(
        lifecycle.id
      );
      console.log(`✅ Health score for ${lifecycle.userId}: ${healthScore}`);
      healthScoresCalculated++;

      // Calculate churn risk
      const churnRisk = await customerLifecycleService.calculateChurnRisk(
        lifecycle.id
      );
      console.log(`   Churn risk: ${churnRisk} ${churnRisk >= 50 ? '⚠️  AT RISK' : '✓'}`);
      churnRisksCalculated++;
    } catch (error: any) {
      console.error(
        `❌ Error processing lifecycle ${lifecycle.id}:`,
        error.message
      );
      errors++;
    }
  }

  console.log(`\n📊 Summary:`);
  console.log(`   Health scores calculated: ${healthScoresCalculated}`);
  console.log(`   Churn risks calculated: ${churnRisksCalculated}`);
  console.log(`   Errors: ${errors}`);
  console.log(`   Total: ${lifecycles.length}\n`);

  await prisma.$disconnect();
}

calculateHealthScores()
  .then(() => {
    console.log('✅ Health score calculation completed!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  });
