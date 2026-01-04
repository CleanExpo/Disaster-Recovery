#!/bin/bash
set -e

echo "🚀 Starting documentation migration..."

mkdir -p docs/{phases,sessions,summaries,guides,architecture,standards}

echo "📄 Migrating phase documents..."
for file in PHASE*.md PHASE_*.md ALL_PHASES_COMPLETE.md *_COMPLETE.md *_COMPLETION*.md; do
    [ -f "$file" ] && mv "$file" docs/phases/ 2>/dev/null || true
done

echo "📄 Migrating session documents..."
for file in *SESSION*.md AUTONOMOUS_*.md; do
    [ -f "$file" ] && mv "$file" docs/sessions/ 2>/dev/null || true
done

echo "📄 Migrating summary documents..."
for file in *SUMMARY*.md *REPORT*.md *STATUS*.md BUGFIXES_*.md LINT_*.md TEST_*.md; do
    [ -f "$file" ] && mv "$file" docs/summaries/ 2>/dev/null || true
done

echo "📄 Migrating guide documents..."
for file in *GUIDE*.md *QUICKSTART*.md *DOCUMENTATION*.md IMPLEMENTATION_*.md INFRASTRUCTURE_*.md SETUP_*.md DEPLOYMENT_*.md; do
    [ -f "$file" ] && mv "$file" docs/guides/ 2>/dev/null || true
done

echo "📄 Migrating architecture documents..."
for file in AI_*.md DESIGN_*.md ANALYTICS_*.md CALLING_*.md FILE_STORAGE_*.md DATABASE_*.md COMPETITOR_*.md; do
    [ -f "$file" ] && mv "$file" docs/architecture/ 2>/dev/null || true
done

[ -f "HONEST_ASSESSMENT.md" ] && mv "HONEST_ASSESSMENT.md" docs/architecture/
[ -f "EXECUTION_INDEX.md" ] && mv "EXECUTION_INDEX.md" docs/phases/

echo ""
echo "📊 Migration Summary:"
echo "  - Phase docs:       $(ls docs/phases/ 2>/dev/null | wc -l) files"
echo "  - Session docs:     $(ls docs/sessions/ 2>/dev/null | wc -l) files"
echo "  - Summary docs:     $(ls docs/summaries/ 2>/dev/null | wc -l) files"
echo "  - Guide docs:       $(ls docs/guides/ 2>/dev/null | wc -l) files"
echo "  - Architecture:     $(ls docs/architecture/ 2>/dev/null | wc -l) files"
echo ""
echo "✅ Migration complete!"
