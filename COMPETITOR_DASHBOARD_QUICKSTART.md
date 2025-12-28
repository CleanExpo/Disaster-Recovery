# Competitor Analysis Dashboard - Quick Start Guide

## 🚀 Get Started in 5 Minutes

### Prerequisites
- Node.js 18+ installed
- PostgreSQL database running
- SEMRUSH API key (optional for testing)
- DataForSEO credentials (optional for testing)

### Step 1: Install Dependencies
```bash
cd "D:\Disaster Recovery - NRP"
npm install
```

### Step 2: Environment Setup
Create or update `.env.local`:
```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/nrpg"

# Optional: API Keys (not required for UI testing)
SEMRUSH_API_KEY="your-semrush-key"
DATAFORSEO_USERNAME="your-username"
DATAFORSEO_PASSWORD="your-password"
```

### Step 3: Database Setup
```bash
# Run migrations
npx prisma migrate dev

# Seed competitor data (if available)
npx prisma db seed
```

### Step 4: Start Development Server
```bash
npm run dev
```

### Step 5: Access Dashboard
Open browser and navigate to:
```
http://localhost:3000/dashboard/admin/competitors
```

## 📊 Dashboard Features

### Overview Tab
View all 40 competitors with:
- Real-time metrics (traffic, keywords, domain rating)
- Sortable columns
- Advanced filtering
- Search functionality
- Quick actions (Analyze, View Details, View SWOT)

### Keywords Tab
Explore keyword opportunities with:
- Interactive bubble chart
- Filter by difficulty tier (easy/medium/hard)
- Top 10 opportunities table
- Click bubbles for details

### SWOT Tab
Analyze competitors with:
- Four-quadrant SWOT visualization
- Executive summary
- Strategic recommendations
- Competitive advantages
- Impact distribution

### Rankings Tab
Track keyword rankings with:
- Top 20 keywords
- Position changes
- 30-day trend sparklines
- Category filtering

## 🎯 Quick Actions

### Analyze a Competitor
1. Find competitor in table
2. Click "Analyze" button (refresh icon)
3. Wait for background analysis to complete
4. Data refreshes automatically

### View SWOT Analysis
1. Find competitor in table
2. Click "View SWOT" button (bar chart icon)
3. Review four quadrants
4. Check recommendations

### Filter Competitors
1. Click "Filters" button
2. Select category, priority range
3. Toggle "Active Only"
4. Results update automatically

### Search Keywords
1. Go to "Keywords" tab
2. Use search box
3. Click difficulty tier cards to filter
4. View top opportunities

## 🔧 Troubleshooting

### Dashboard Not Loading?
**Check:**
- Development server is running (`npm run dev`)
- Database is accessible
- No console errors (F12 → Console)

**Solution:**
```bash
# Restart dev server
npm run dev
```

### No Data Showing?
**Check:**
- Database has competitor data
- API routes are working
- Network tab shows successful requests (F12 → Network)

**Solution:**
```bash
# Seed test data
npx prisma db seed
```

### Charts Not Rendering?
**Check:**
- Recharts is installed
- Browser console for errors

**Solution:**
```bash
# Reinstall dependencies
npm install recharts
```

### SWR Errors?
**Check:**
- Fetcher function is defined
- API routes return valid JSON

**Solution:**
- Clear browser cache
- Hard refresh (Ctrl+Shift+R)

## 📱 Mobile Testing

### Test Responsiveness
1. Open dashboard
2. Press F12 → Toggle device toolbar
3. Test different screen sizes:
   - Mobile: 375px
   - Tablet: 768px
   - Desktop: 1440px

### Expected Behavior
- **Mobile**: Single column layout, horizontal scroll for tables
- **Tablet**: Two column layout, responsive charts
- **Desktop**: Full four column layout, large charts

## 🧪 Testing Checklist

### Basic Functionality
- [ ] Dashboard loads without errors
- [ ] Overview cards show data
- [ ] Competitor table displays
- [ ] Table sorting works
- [ ] Filters work correctly
- [ ] Search finds competitors
- [ ] Tab navigation works

### Charts & Visualizations
- [ ] Keyword matrix bubble chart renders
- [ ] SWOT quadrants display
- [ ] Sparklines show in rankings
- [ ] Charts are interactive
- [ ] Tooltips appear on hover

### Actions
- [ ] Analyze button triggers API call
- [ ] View Details switches tabs
- [ ] View SWOT loads SWOT data
- [ ] Refresh button updates data

### Responsive Design
- [ ] Mobile layout works
- [ ] Tablet layout works
- [ ] Desktop layout works
- [ ] No horizontal overflow
- [ ] Touch-friendly on mobile

## 📚 Files Reference

### Main Files
- Dashboard Page: `app/dashboard/admin/competitors/page.tsx`
- Components: `src/components/competitor-analysis/`
- Types: `src/lib/competitor-analysis/types/dashboard-types.ts`
- API Routes: `app/api/competitor-analysis/`

### Documentation
- Complete Guide: `docs/COMPETITOR_DASHBOARD.md`
- Summary: `COMPETITOR_DASHBOARD_SUMMARY.md`
- File Tree: `DASHBOARD_FILE_TREE.txt`

## 🎨 Customization

### Change Colors
Edit in component files:
```typescript
// Competitor categories
const CATEGORY_COLORS = {
  RESTORATION_COMPANY: 'bg-blue-100 text-blue-800',
  INSURANCE_NETWORK: 'bg-green-100 text-green-800',
  // ... customize colors
};
```

### Adjust Filters
Edit in `competitor-table.tsx`:
```typescript
const [filters, setFilters] = useState<FilterConfig>({
  activeOnly: true,  // Change default
  searchTerm: '',
  // Add more filters
});
```

### Modify Chart Size
Edit in `keyword-matrix.tsx`:
```typescript
<ResponsiveContainer width="100%" height={500}> // Change height
```

## 🚢 Deployment

### Build for Production
```bash
npm run build
npm run start
```

### Environment Variables
Set in production:
```env
NEXT_PUBLIC_APP_URL="https://nrpg.com.au"
DATABASE_URL="postgresql://..."
SEMRUSH_API_KEY="..."
DATAFORSEO_USERNAME="..."
DATAFORSEO_PASSWORD="..."
```

### Verify Production
1. Check build completes without errors
2. Test all features work
3. Verify mobile responsiveness
4. Check API response times
5. Monitor error logs

## 💡 Tips & Tricks

### Performance
- SWR caches data for 60 seconds
- Use browser DevTools to profile
- Enable React DevTools Profiler
- Monitor API response times

### Development
- Use TypeScript for type safety
- Check console for warnings
- Test on multiple browsers
- Use React DevTools extension

### Debugging
- Check Network tab for API calls
- Use console.log sparingly
- Enable source maps for debugging
- Use breakpoints in DevTools

## 🆘 Support

### Getting Help
1. Check documentation: `docs/COMPETITOR_DASHBOARD.md`
2. Review this quick start guide
3. Check troubleshooting section above
4. Contact development team

### Common Issues
| Issue | Solution |
|-------|----------|
| White screen | Check console for errors |
| No data | Run database seed |
| Charts broken | Reinstall recharts |
| Slow performance | Clear SWR cache |
| API errors | Check database connection |

## 🎯 Next Steps

After getting the dashboard running:
1. ✅ Verify all features work
2. ✅ Test mobile responsiveness
3. ✅ Review documentation
4. ✅ Customize as needed
5. ✅ Deploy to staging
6. ✅ User acceptance testing
7. ✅ Deploy to production

## 📊 Sample Data

If you need test data, create a seed file:
```typescript
// prisma/seed.ts
const competitors = [
  {
    name: "ServiceMaster",
    domain: "servicemaster.com.au",
    category: "RESTORATION_COMPANY",
    priority: 10,
    isActive: true,
  },
  // Add more...
];

// Run: npx prisma db seed
```

## ✅ Success Criteria

Dashboard is working correctly when:
- [ ] All tabs load without errors
- [ ] Charts render correctly
- [ ] Data updates on refresh
- [ ] Filters work as expected
- [ ] Mobile layout is responsive
- [ ] No console errors
- [ ] API calls succeed
- [ ] Loading states appear
- [ ] Error handling works

---

**You're all set!** 🎉

Access your dashboard at: `http://localhost:3000/dashboard/admin/competitors`

For detailed information, see `docs/COMPETITOR_DASHBOARD.md`

**Created**: 2025-12-28
**Version**: 1.0.0
**Status**: Production Ready
