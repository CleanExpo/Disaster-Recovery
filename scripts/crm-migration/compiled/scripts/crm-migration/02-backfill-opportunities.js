"use strict";
/**
 * CRM Migration Script 2: Backfill Opportunities
 *
 * Converts existing ServiceRequests to Opportunity records
 * Links to CustomerLifecycle and determines stage based on status
 *
 * @run npm run ts-node scripts/crm-migration/02-backfill-opportunities.ts
 */
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function mapStatusToStage(status) {
    const mapping = {
        PENDING: 'DISCOVERY',
        MATCHED: 'ASSESSMENT',
        ACCEPTED: 'PROPOSAL',
        REJECTED: 'CLOSED_LOST',
        EXPIRED: 'CLOSED_LOST',
    };
    return mapping[status] || 'DISCOVERY';
}
function extractState(location) {
    const states = ['NSW', 'VIC', 'QLD', 'WA', 'SA', 'TAS', 'ACT', 'NT'];
    for (const state of states) {
        if (location.toUpperCase().includes(state)) {
            return state;
        }
    }
    return 'NSW'; // Default
}
function extractPostcode(location) {
    const postcodeMatch = location.match(/\b\d{4}\b/);
    return postcodeMatch ? postcodeMatch[0] : '2000';
}
async function backfillOpportunities() {
    console.log('🔄 Starting Opportunities backfill...\n');
    const serviceRequests = await prisma.serviceRequest.findMany({
        include: {
            user: {
                include: {
                    lifecycle: true,
                },
            },
        },
    });
    console.log(`Found ${serviceRequests.length} service requests to convert\n`);
    let created = 0;
    let skipped = 0;
    let errors = 0;
    for (const sr of serviceRequests) {
        try {
            // Check if opportunity already exists
            const existing = await prisma.opportunity.findUnique({
                where: { serviceRequestId: sr.id },
            });
            if (existing) {
                console.log(`⏭️  Skipped service request ${sr.id} (opportunity exists)`);
                skipped++;
                continue;
            }
            if (!sr.user.lifecycle) {
                console.log(`⚠️  Skipped ${sr.id} (no lifecycle for user ${sr.userId})`);
                skipped++;
                continue;
            }
            const stage = mapStatusToStage(sr.status);
            const state = extractState(sr.location);
            const postcode = extractPostcode(sr.location);
            // Estimate value from budget or use default
            const budgetValue = sr.budget?.replace(/[^0-9.]/g, '');
            const estimatedValue = budgetValue ? parseFloat(budgetValue) : 5000;
            await prisma.opportunity.create({
                data: {
                    customerLifecycleId: sr.user.lifecycle.id,
                    serviceRequestId: sr.id,
                    name: `${sr.serviceCategory} - ${sr.location}`,
                    stage,
                    estimatedValueAUD: estimatedValue,
                    probabilityPercent: stage === 'CLOSED_LOST' ? 0 : 50,
                    australianServiceType: 'GENERAL_RESTORATION',
                    urgencyLevel: sr.urgentResponse ? 'URGENT' : 'STANDARD',
                    serviceState: state,
                    servicePostcode: postcode,
                    expectedCloseDate: new Date(sr.createdAt.getTime() + 14 * 24 * 60 * 60 * 1000),
                    actualCloseDate: stage.startsWith('CLOSED') ? sr.updatedAt : null,
                },
            });
            console.log(`✅ Created opportunity for service request ${sr.id} (${stage})`);
            created++;
        }
        catch (error) {
            console.error(`❌ Error processing service request ${sr.id}:`, error.message);
            errors++;
        }
    }
    console.log(`\n📊 Summary:`);
    console.log(`   Created: ${created}`);
    console.log(`   Skipped: ${skipped}`);
    console.log(`   Errors: ${errors}`);
    console.log(`   Total: ${serviceRequests.length}\n`);
    await prisma.$disconnect();
}
backfillOpportunities()
    .then(() => {
    console.log('✅ Opportunities backfill completed!');
    process.exit(0);
})
    .catch((error) => {
    console.error('❌ Migration failed:', error);
    process.exit(1);
});
