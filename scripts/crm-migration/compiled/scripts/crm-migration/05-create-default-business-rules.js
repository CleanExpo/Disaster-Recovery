"use strict";
/**
 * CRM Migration Script 5: Create Default Business Rules
 *
 * Initializes accountability mechanisms to prevent "helpfulness trap"
 *
 * @run npm run ts-node scripts/crm-migration/05-create-default-business-rules.ts
 */
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const business_rules_service_1 = require("../../src/lib/crm/business-rules.service");
const prisma = new client_1.PrismaClient();
const businessRulesService = new business_rules_service_1.BusinessRulesService(prisma);
async function createDefaultBusinessRules() {
    console.log('🔄 Creating default business rules...\n');
    // Find first admin user to own the rules
    const admin = await prisma.user.findFirst({
        where: {
            userType: { in: ['ADMIN', 'SUPER_ADMIN'] },
        },
    });
    if (!admin) {
        console.error('❌ No admin user found. Please create an admin user first.');
        process.exit(1);
    }
    console.log(`Using admin user: ${admin.email}\n`);
    try {
        const rules = await businessRulesService.initializeDefaultRules(admin.id);
        console.log('✅ Business rules created:\n');
        rules.forEach((rule, index) => {
            console.log(`   ${index + 1}. ${rule.name}`);
            console.log(`      Type: ${rule.ruleType}`);
            console.log(`      Threshold: ${rule.threshold} ${rule.metric}`);
            console.log(`      Actions: ${rule.actionOnViolation.join(', ')}\n`);
        });
        console.log(`📊 Summary:`);
        console.log(`   Total rules created: ${rules.length}`);
        console.log(`   Owner: ${admin.email}`);
        console.log(`   All rules: ACTIVE\n`);
    }
    catch (error) {
        console.error('❌ Error creating business rules:', error.message);
        throw error;
    }
    finally {
        await prisma.$disconnect();
    }
}
createDefaultBusinessRules()
    .then(() => {
    console.log('✅ Default business rules creation completed!');
    process.exit(0);
})
    .catch((error) => {
    console.error('❌ Migration failed:', error);
    process.exit(1);
});
