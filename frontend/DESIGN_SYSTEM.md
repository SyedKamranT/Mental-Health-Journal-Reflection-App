# LLM-Powered Mental Health Journal & Reflection Web App

## 🎨 Design System Documentation

### Design Philosophy: "Calm Intelligence"

This application embodies a unique design philosophy that balances AI-driven insights with emotional safety and privacy. The system is built on four core principles:

1. **Reflective Minimalism** - Generous whitespace, soft edges, no visual clutter
2. **Progressive Disclosure** - Insights emerge gently, never overwhelmingly
3. **Non-Clinical Language** - Human, warm, never diagnostic
4. **Dark-First Serenity** - Reduces visual fatigue during introspection

---

## 🎨 Color System

### Primary Palette

**Dark / Base Colors**
- `#121212` - Main background (surface-dark)
- `#000000` - Sidebar & deep backgrounds (deep-dark)
- `#1a1a1a` - Elevated surfaces (surface-elevated)

**Calm Blues (Primary)**
- `#B6CAEB` - Primary accent (calm-blue)
- `#8AA2C8` - Primary dark (calm-blue-dark)

**Emotional Accents**
Used sparingly for charts, highlights, and themed components:

- **Pink**: `#F5B8DA` (soft-pink), `#E09CC3` (soft-pink-dark)
- **Yellow**: `#F7D768` (gentle-yellow), `#E8C84D` (gentle-yellow-dark)
- **Olive**: `#9AAB63` (peaceful-olive), `#808E53` (peaceful-olive-dark)

### Color Usage Rules

1. **Never use saturated/loud colors** - All accents are pastel with low saturation
2. **Dark UI by default** - Light mode exists as fallback only
3. **Maintain accessibility** - All text meets WCAG AA contrast standards
4. **Context-based accents**:
   - Blue: Calm, reflection, insights
   - Pink: Emotional patterns, gratitude
   - Yellow: Energy, growth, clarity
   - Olive: Balance, peace, consistency

---

## 📐 Layout Structure

### Grid System
- **Max content width**: 1280px (max-w-7xl)
- **Responsive breakpoints**: md (768px), lg (1024px)
- **Spacing scale**: 4, 6, 8, 10 (Tailwind spacing)

### Component Hierarchy

```
Root Layout
├── Sidebar (fixed left, 256px)
│   ├── Logo/Brand
│   ├── Navigation Menu
│   └── Settings Link
├── Main Content Area
│   ├── Header (sticky top, 64px)
│   └── Page Content (p-6 md:p-8 lg:p-10)
```

---

## 📄 Pages & Screens

### 1️⃣ Authentication Flow

**Welcome Page** (`/`)
- Hero section with gradient logo
- Privacy-first messaging
- Feature highlights (Privacy, AI Insights)
- CTA: "Get Started" / "Sign In"

**Login Page** (`/login`)
- Clean form (email, password)
- "Forgot password?" link
- Minimal, calming aesthetic

**Register Page** (`/register`)
- Name, email, password fields
- Privacy transparency message
- "Sign in" link for existing users

**Reset Password** (`/reset-password`)
- Email input
- Success state with confirmation

### 2️⃣ Main Dashboard (`/app`)

**Core Components:**
- Time-based greeting ("Good morning", etc.)
- Quick action: "Start Writing" card
- Stats cards:
  - Writing Streak (with Flame icon)
  - Monthly entries count
  - Growth percentage
- Emotional Journey Chart (area chart, 7 days)
- Insight Cards:
  - Reflection Prompt
  - Recent Pattern Detection

**Empty State:**
- First-time user welcome
- Feature education cards
- Clear CTA to write first entry

### 3️⃣ Journal Entry Page (`/app/journal/new` or `/app/journal/:id`)

**Writing Interface:**
- Large distraction-free textarea
- Minimal toolbar (word count, date)
- Autosave indicator
- "Save & Reflect" button

**Post-Submission State:**
- AI-generated summary card
- Emotional themes (as tags)
- Reflective questions
- Next actions (View All / Write Another)

**Processing State:**
- Loading spinner with "Processing..." text
- Gentle animation

### 4️⃣ Journal History (`/app/history`)

**Layout:**
- Search bar (natural language)
- Filter controls (date, themes)
- Entry cards with:
  - Date & word count
  - Preview text (2 lines)
  - Theme tags
  - Arrow to view full entry

**Empty State:**
- "No entries yet" message
- CTA to create first entry

### 5️⃣ Insights & Patterns (`/app/insights`)

**Tabs:** Weekly / Monthly / All Time

**Weekly View:**
- Emotional Trends Chart (area, multi-line)
- Theme Distribution Chart (bar)
- AI-Generated Summary Card:
  - Key observations (bulleted)
  - Reflection suggestions

**Empty State:**
- "Keep journaling to see insights"

### 6️⃣ Reflection Prompts (`/app/prompts`)

**Tabs:** Growth / Gratitude / Clarity / Release

**Prompt Cards:**
- Category label
- Question text (large, readable)
- "Start Writing →" button
- Gradient background matching category

**Actions:**
- "Generate New" prompts button

### 7️⃣ Settings (`/app/settings`)

**Sections:**

**Profile**
- Name, email fields
- "Save Changes" button

**Privacy & Security**
- Encryption (always on, disabled toggle)
- AI Processing toggle
- Analytics toggle
- Data transparency explanation

**Appearance**
- Dark mode toggle (default on)

**Data Management**
- Export all entries
- Delete all data (destructive action)

**Account**
- Sign out button

### 8️⃣ 404 Not Found (`/*`)

- Centered layout
- Gradient icon
- "Page Not Found" message
- Two CTAs: Dashboard / Start Writing

---

## 🧩 Component Inventory

### Layout Components

**AppSidebar** (`/src/app/components/layout/AppSidebar.tsx`)
- Fixed navigation
- Logo with gradient background
- Active state styling
- Icons from lucide-react

**AppHeader** (`/src/app/components/layout/AppHeader.tsx`)
- Sticky header
- Sidebar trigger
- Time-based greeting
- Notification bell

**RootLayout** (`/src/app/components/layout/RootLayout.tsx`)
- SidebarProvider wrapper
- Main content area with max-width

**AuthLayout** (`/src/app/components/layout/AuthLayout.tsx`)
- Centered card layout
- Max-width 448px (max-w-md)

### Card Components

**InsightCard** (`/src/app/components/cards/InsightCard.tsx`)
- Flexible container for AI insights
- Icon, title, children slots
- Gradient background variants

**JournalEntryCard** (`/src/app/components/cards/JournalEntryCard.tsx`)
- Date, word count metadata
- Preview text (line-clamp-2)
- Theme tags
- View entry link

**StreakCard** (`/src/app/components/cards/StreakCard.tsx`)
- Displays writing streak
- Flame icon
- Encouragement message

### Chart Components

**EmotionalTrendChart** (`/src/app/components/charts/EmotionalTrendChart.tsx`)
- Recharts AreaChart
- Three data series: calm, energy, clarity
- Gradient fills matching color palette
- Legend with colored dots

**ThemeDistributionChart** (`/src/app/components/charts/ThemeDistributionChart.tsx`)
- Recharts BarChart
- Color-coded bars (one per theme)
- Rounded top corners

### State Components

**EmptyState** (`/src/app/components/states/EmptyState.tsx`)
- Generic empty state container
- Icon, title, description props
- Optional CTA button

**FirstTimeUserState** (`/src/app/components/states/EmptyState.tsx`)
- Welcome message for new users
- Feature education cards
- Large CTA

**LoadingStates** (`/src/app/components/states/LoadingStates.tsx`)
- DashboardSkeleton
- JournalEntrySkeleton
- InsightCardSkeleton

### UI Components (shadcn/ui)

Pre-built, customized from `/src/app/components/ui/`:
- Button, Card, Input, Textarea
- Tabs, Dialog, Sheet
- Skeleton, Separator
- Sidebar (with provider)
- And 30+ more utility components

---

## 🎭 Typography

**Font Stack:**
- System fonts (Inter/SF Pro-like)
- Base size: 16px

**Scale:**
- `text-3xl` - Page titles (Dashboard greeting)
- `text-2xl` - Section headers
- `text-xl` - Card titles
- `text-base` - Body, inputs, buttons
- `text-sm` - Metadata, descriptions
- `text-xs` - Labels, hints

**Weights:**
- `font-semibold` (600) - Headings, emphasis
- `font-medium` (500) - Buttons, labels
- `font-normal` (400) - Body text

**Line Heights:**
- `leading-relaxed` - Journal text, long-form content
- Default (1.5) - UI elements

---

## ✨ Micro-Interactions

### Hover States
- Cards: `hover:border-[#8AA2C8]/30`
- Buttons: `hover:bg-[#B6CAEB]`
- Links: `hover:text-[#B6CAEB]`

### Focus States
- Inputs: `focus-visible:ring-2 ring-[#B6CAEB]`
- Buttons: Outline with ring color

### Active States
- Sidebar links: Highlighted background + icon color change
- Tabs: Underline with primary color

### Animations (Motion)
- Page transitions: `opacity 0→1`, `y: 20→0`
- Stagger delay: `0.05s` increments for lists
- Duration: `0.5s` for most transitions
- Easing: Default (ease-out)

### Loading States
- Skeleton screens (subtle pulse)
- Spinner with "Processing..." text
- No aggressive loaders

---

## ♿ Accessibility

### WCAG Compliance
- AA level contrast for all text
- AAA level for body text where possible

### Keyboard Navigation
- Full tab-index support
- Enter/Space for buttons
- Arrow keys for tabs

### Screen Readers
- Semantic HTML (`<header>`, `<main>`, `<nav>`)
- `aria-label` for icon-only buttons
- `sr-only` class for hidden labels

### Focus Management
- Visible focus rings (ring-[#B6CAEB])
- Skip links (if needed)
- Proper heading hierarchy

---

## 📱 Responsive Design

### Mobile (< 768px)
- Single column layouts
- Sidebar as drawer/sheet
- Stacked buttons
- Reduced padding (p-4)

### Tablet (768px - 1024px)
- 2-column grids for cards
- Sidebar visible
- Medium padding (p-6)

### Desktop (> 1024px)
- 3-column grids
- Full sidebar
- Generous padding (p-10)
- Max content width enforced

---

## 🔮 Future UI Evolution

### Phase 2 Enhancements
1. **Voice Journaling**
   - Floating mic button
   - Real-time transcription
   - Voice note attachments

2. **Mood Check-ins**
   - Optional quick mood selector (non-intrusive)
   - Trend visualization

3. **Collaborative Prompts**
   - Community-sourced prompts (opt-in)
   - Sharing anonymized insights

4. **Advanced Visualizations**
   - Word clouds (emotional themes)
   - Timeline view (calendar heatmap)
   - Network graphs (concept connections)

5. **Dark Mode Variants**
   - True black (OLED-friendly)
   - Sepia tone (reading mode)

### Design Tokens for Expansion
Already prepared in `theme.css`:
- Custom color variables for all accents
- Radius tokens (sm, md, lg, xl)
- Font weight variables
- Chart color system (chart-1 through chart-5)

---

## 🚀 Getting Started

### Development
```bash
npm install
npm run dev
```

### Project Structure
```
/src
├── /app
│   ├── /components
│   │   ├── /cards          # Reusable card components
│   │   ├── /charts         # Recharts visualizations
│   │   ├── /layout         # Layout wrappers
│   │   ├── /states         # Empty/loading states
│   │   └── /ui             # shadcn components
│   ├── /pages              # Route pages
│   ├── App.tsx             # Root component
│   └── routes.tsx          # React Router config
└── /styles
    ├── theme.css           # Design tokens
    ├── tailwind.css        # Tailwind imports
    └── fonts.css           # Font imports
```

---

## 🎯 Design Principles Summary

1. **Calm over Busy** - Every UI choice reduces cognitive load
2. **Privacy over Features** - Never compromise user trust
3. **Insight over Data** - Present meaning, not raw numbers
4. **Human over Clinical** - Warm language, gentle guidance
5. **Accessible over Perfect** - Everyone deserves mental wellness tools

---

## 📚 Technologies Used

- **React 18** - Component library
- **React Router 7** - Data-mode routing
- **Tailwind CSS v4** - Utility-first styling
- **Motion (Framer Motion)** - Animations
- **Recharts** - Data visualization
- **Lucide React** - Icon system
- **Radix UI** - Accessible primitives (via shadcn/ui)
- **next-themes** - Theme management

---

## 🎨 Component Style Guide

### Card Usage
```tsx
<Card className="bg-gradient-to-br from-[#8AA2C8]/10 to-[#B6CAEB]/5 border-[#8AA2C8]/20">
  <CardHeader>
    <CardTitle>Title</CardTitle>
  </CardHeader>
  <CardContent>
    Content
  </CardContent>
</Card>
```

### Button Variants
```tsx
// Primary action (calm blue)
<Button className="bg-[#8AA2C8] hover:bg-[#B6CAEB] text-black">
  Primary Action
</Button>

// Secondary/outline
<Button variant="outline">Secondary</Button>

// Ghost (text-only)
<Button variant="ghost">Ghost</Button>
```

### Theme Tags
```tsx
<span className="px-3 py-1 rounded-full text-xs bg-[#8AA2C8]/10 text-[#B6CAEB] border border-[#8AA2C8]/20">
  Theme Name
</span>
```

---

**This design system is production-ready and optimized for mental health contexts.**
