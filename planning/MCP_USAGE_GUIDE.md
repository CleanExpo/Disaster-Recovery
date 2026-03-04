# MCP Tools Usage Guide for R6-Quality Design Implementation

## 🛠️ Available MCP Tools

### 1. **Playwright MCP** - Browser Automation & Visual Analysis
- **Purpose**: Analyze websites, capture screenshots, test interactions
- **Location**: `@playwright/mcp@latest`
- **Configured**: ✅ Ready in `mcp_servers.json`

### 2. **Context7 MCP** - Contextual Documentation
- **Purpose**: Get up-to-date documentation and code examples
- **Location**: `D:\Disaster Recovery\context7`
- **Configured**: ✅ Ready in `mcp_servers.json`

### 3. **Sequential Thinking MCP** - Deployment & Workflow
- **Purpose**: Handle deployments and complex workflows
- **Location**: `D:\Disaster Recovery\WSL-Deployment-Sequential-Thinking`
- **Configured**: ✅ Ready in `mcp_servers.json`

---

## 📋 How to Use MCPs for Design Implementation

### Step 1: Analyze R6 Digital with Playwright
```bash
# Run the analysis script
node analyze-r6-design.js

# Or use the batch file
run-mcp-analysis.bat
```

This will:
- Open R6 Digital website
- Extract all design patterns
- Capture colors, typography, spacing
- Take screenshots for reference
- Generate a detailed report

### Step 2: Use Context7 for Documentation
In your Cursor/VS Code terminal, add "use context7" to prompts:
```
use context7: Show me examples of premium button components
use context7: Get documentation for glass morphism effects
use context7: Find examples of modern hero sections
```

### Step 3: Use Sequential Thinking for Deployment
```bash
# Navigate to project directory
cd "D:\Disaster Recovery"

# Run Sequential Thinking for deployment
node "D:\Disaster Recovery\WSL-Deployment-Sequential-Thinking\dist\cli.js"
```

---

## 🎨 Design Elements to Extract from R6 Digital

### Must-Have Elements (from R6 Digital):

#### 1. **Navigation**
- Sticky header with blur background
- Transparent to solid transition on scroll
- Hover underline effects
- Mobile full-screen menu

#### 2. **Hero Section**
- Large typography (Poppins, 72px+)
- Gradient or image backgrounds
- Animated elements on scroll
- Clear CTA buttons

#### 3. **Color Scheme**
```css
:root {
  --r6-primary: #131cff;     /* Signature Blue */
  --r6-dark: #000000;        /* Pure Black */
  --r6-gray-dark: #6a6d72;   /* Dark Gray */
  --r6-gray-light: #999a9b;  /* Light Gray */
  --r6-bg-light: #f9f9fb;    /* Background */
  --r6-white: #ffffff;       /* Pure White */
}
```

#### 4. **Typography**
```css
/* Primary Fonts */
font-family: 'Poppins', sans-serif;  /* Headings */
font-family: 'Colfax', sans-serif;   /* Body */

/* Size Scale */
--text-xs: 0.625rem;   /* 10px */
--text-sm: 0.875rem;   /* 14px */
--text-base: 1rem;     /* 16px */
--text-lg: 1.25rem;    /* 20px */
--text-xl: 1.875rem;   /* 30px */
--text-2xl: 2.5rem;    /* 40px */
--text-3xl: 3.625rem;  /* 58px */
--text-4xl: 4.6875rem; /* 75px */
```

#### 5. **Spacing System (8px Grid)**
```css
--space-xs: 0.5rem;   /* 8px */
--space-sm: 1rem;     /* 16px */
--space-md: 1.5rem;   /* 24px */
--space-lg: 2rem;     /* 32px */
--space-xl: 3rem;     /* 48px */
--space-2xl: 4rem;    /* 64px */
--space-3xl: 6rem;    /* 96px */
```

#### 6. **Components to Implement**
- [ ] Sticky navigation with blur
- [ ] Hero with gradient background
- [ ] Service cards with hover effects
- [ ] Testimonial slider
- [ ] Contact form with validation
- [ ] Footer with newsletter signup
- [ ] Loading animations
- [ ] Scroll reveal animations
- [ ] Mobile responsive menu
- [ ] Image galleries with lightbox

#### 7. **Animations**
```css
/* Standard transition */
transition: all 0.3s ease;

/* Hover scale */
transform: scale(1.05);

/* Underline reveal */
@keyframes underline-reveal {
  from { width: 0; }
  to { width: 100%; }
}

/* Fade in on scroll */
@keyframes fade-in-up {
  from { 
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

---

## 🚀 Implementation Workflow

### Phase 1: Analysis (Using Playwright MCP)
1. Run `node analyze-r6-design.js`
2. Review screenshots and extracted data
3. Document all design patterns found

### Phase 2: Design System Creation
1. Create base CSS with extracted values
2. Build component library
3. Implement animations and interactions

### Phase 3: Component Development
1. Use Context7 for best practices
2. Build each component matching R6 quality
3. Test responsive behavior

### Phase 4: Integration
1. Apply components to all pages
2. Ensure consistency across site
3. Test interactions and animations

### Phase 5: Deployment (Using Sequential Thinking)
1. Prepare production build
2. Deploy to Vercel
3. Test live site

---

## 📝 Commands Reference

### Playwright MCP Commands
```bash
# Basic analysis
npx @playwright/mcp@latest --browser chrome

# With viewport
npx @playwright/mcp@latest --browser chrome --viewport-size 1440,900

# Headless mode
npx @playwright/mcp@latest --headless --browser chrome

# With screenshots
npx @playwright/mcp@latest --output-dir screenshots
```

### Context7 Usage
```bash
# In Cursor/VS Code, prefix prompts with:
use context7: [your question about implementation]
```

### Sequential Thinking
```bash
# Deploy to production
node "D:\Disaster Recovery\WSL-Deployment-Sequential-Thinking\dist\cli.js" deploy

# Run system check
node "D:\Disaster Recovery\WSL-Deployment-Sequential-Thinking\dist\cli.js" check
```

---

## ✅ Verification Checklist

Before proceeding with design implementation:
- [ ] Playwright MCP installed and accessible
- [ ] Context7 built and configured
- [ ] Sequential Thinking ready for deployment
- [ ] R6 Digital analysis completed
- [ ] Screenshots captured for reference
- [ ] Design patterns documented
- [ ] Color palette extracted
- [ ] Typography scale defined
- [ ] Spacing system established
- [ ] Animation patterns identified

---

## 🎯 Next Steps

1. **Run Analysis**: Execute `run-mcp-analysis.bat`
2. **Review Output**: Check screenshots and console data
3. **Implement Design**: Use extracted patterns to build components
4. **Test Everything**: Ensure all elements match R6 quality
5. **Deploy**: Use Sequential Thinking for production deployment

---

## 📞 Troubleshooting

### Playwright MCP Issues
```bash
# Reinstall if needed
npm install -g @playwright/mcp@latest

# Install browsers
npx playwright install
```

### Context7 Issues
```bash
cd "D:\Disaster Recovery\context7"
npm install
npm run build
```

### Sequential Thinking Issues
```bash
cd "D:\Disaster Recovery\WSL-Deployment-Sequential-Thinking"
npm install
npm run build
```