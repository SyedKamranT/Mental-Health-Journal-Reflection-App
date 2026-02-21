# 🖼️ Visual Screen Reference Guide

## Complete UI Mockup Descriptions

This document describes what each screen looks like visually. Use this as a reference when developing or reviewing the UI.

---

## 🏠 AUTHENTICATION SCREENS

### 1. Welcome Page (`/`)

**Layout**: Centered card, max-width 448px, dark background

**Visual Hierarchy:**
```
┌─────────────────────────────────┐
│                                 │
│         [Gradient Logo]         │  ← 80px square, blue gradient
│           Reflection            │  ← 32px text, semibold
│   Your private space for...     │  ← 14px, muted
│                                 │
│  ┌───────────────────────────┐ │
│  │ 🛡️  Privacy First         │ │
│  │ Your thoughts stay yours   │ │  ← Feature card 1
│  └───────────────────────────┘ │
│                                 │
│  ┌───────────────────────────┐ │
│  │ ✨ AI-Powered Insights    │ │
│  │ Discover patterns...       │ │  ← Feature card 2
│  └───────────────────────────┘ │
│                                 │
│  [ Get Started ]                │  ← Blue button, full width
│  [ Sign In ]                    │  ← Outline button
│                                 │
│  Free to use. No credit card.   │  ← Small text
└─────────────────────────────────┘
```

**Colors:**
- Background: #121212
- Cards: #1a1a1a with subtle border
- Logo gradient: #B6CAEB → #8AA2C8
- Buttons: Primary (#8AA2C8), Outline (border only)

---

### 2. Login Page (`/login`)

**Layout**: Centered card, clean form

**Visual Hierarchy:**
```
┌─────────────────────────────────┐
│                                 │
│      [Gradient Logo 64px]       │
│       Welcome back              │  ← 24px semibold
│  Sign in to continue...         │  ← 14px muted
│                                 │
│  Email                          │
│  ┌───────────────────────────┐ │
│  │ you@example.com           │ │  ← Input field
│  └───────────────────────────┘ │
│                                 │
│  Password        Forgot?        │  ← Label + link
│  ┌───────────────────────────┐ │
│  │ ••••••••                  │ │  ← Password input
│  └───────────────────────────┘ │
│                                 │
│  [ Sign In ]                    │  ← Blue button
│                                 │
│  Don't have an account? Sign up │  ← Link
└─────────────────────────────────┘
```

**Interactions:**
- Focus: Blue ring around inputs
- Hover: Button lightens to #B6CAEB
- Submit: Navigate to `/app`

---

### 3. Register Page (`/register`)

**Similar to Login, with:**
- Name field (additional)
- Password requirements text
- Privacy message below form
- "Already have account?" link

---

### 4. Reset Password (`/reset-password`)

**Before Submit:**
```
┌─────────────────────────────────┐
│      [Logo]                     │
│  Reset your password            │
│  Enter your email...            │
│                                 │
│  Email                          │
│  ┌───────────────────────────┐ │
│  │                           │ │
│  └───────────────────────────┘ │
│                                 │
│  [ Send Reset Link ]            │
│  ← Back to Sign In              │
└─────────────────────────────────┘
```

**After Submit:**
```
┌─────────────────────────────────┐
│      [Logo]                     │
│  Check your email               │
│  We've sent a link to:          │
│  your@email.com                 │
│                                 │
│  [ Back to Sign In ]            │
└─────────────────────────────────┘
```

---

## 📱 MAIN APPLICATION LAYOUT

### Sidebar (Fixed Left, 256px width)

```
┌───────────────────┐
│ [🔷] Reflection   │  ← Logo + brand
│ Your mental space │
├───────────────────┤
│ Navigation        │  ← Section label
│                   │
│ 🏠 Dashboard      │  ← Active (blue bg)
│ ✏️  New Entry     │
│ 🕐 History        │
│ ✨ Insights       │
│ 💬 Prompts        │
│                   │
├───────────────────┤
│ ⚙️  Settings      │  ← Footer
└───────────────────┘
```

**Colors:**
- Background: #000000 (pure black)
- Active item: #1a1a1a background + #8AA2C8 icon
- Text: #ffffff
- Border: rgba(255,255,255,0.1)

---

### Header (Sticky Top, 64px height)

```
┌──────────────────────────────────────────────┐
│ [≡] Good morning               [🔔]         │
└──────────────────────────────────────────────┘
```

**Elements:**
- Left: Hamburger menu (mobile toggle)
- Center: Time-based greeting
- Right: Notification bell
- Background: Backdrop blur effect

---

## 📊 MAIN PAGES

### Dashboard Page (`/app`)

**Full Layout:**

```
┌─────────────────────────────────────────────────┐
│ Good morning                                     │  ← h1, 32px
│ How are you feeling this morning?                │  ← p, muted
│                                                  │
│ ┌─────────────────────────────────────────────┐ │
│ │ Ready to write?                              │ │
│ │ Capture your thoughts...  [Start Writing]   │ │  ← Blue gradient card
│ └─────────────────────────────────────────────┘ │
│                                                  │
│ ┌─────────┐ ┌─────────┐ ┌─────────┐           │
│ │🔥       │ │📅       │ │📈       │           │
│ │7 days   │ │18 entry │ │+12%     │           │  ← 3-column stats
│ │Streak   │ │This mo. │ │Growth   │           │
│ └─────────┘ └─────────┘ └─────────┘           │
│                                                  │
│ ┌─────────────────────────────────────────────┐ │
│ │ Your Emotional Journey                       │ │
│ │ ┌───────────────────────────────────────┐  │ │
│ │ │      [AREA CHART - 3 colored lines]   │  │ │  ← Chart card
│ │ │                                         │  │ │
│ │ └───────────────────────────────────────┘  │ │
│ │ • Calm  • Energy  • Clarity                 │ │
│ └─────────────────────────────────────────────┘ │
│                                                  │
│ ┌──────────────────┐ ┌──────────────────┐      │
│ │ Reflection Prompt│ │ Recent Pattern   │      │
│ │ "What brought..."│ │ "Your entries..."│      │  ← 2-column insights
│ │ [View Prompts]   │ │ [Explore]        │      │
│ └──────────────────┘ └──────────────────┘      │
└─────────────────────────────────────────────────┘
```

**First-Time User Variant:**

Shows `FirstTimeUserState` instead:
- Large welcome card with sparkles
- 3 feature cards (Write, Patterns, Grow)
- "Write Your First Entry" CTA

---

### Journal Entry Page (`/app/journal/new`)

**Writing View:**

```
┌─────────────────────────────────────────────────┐
│ New Journal Entry        142 words [Save & Reflect]
│ Saturday, February 21, 2026                      │
│                                                  │
│ ┌─────────────────────────────────────────────┐ │
│ │                                              │ │
│ │ [Large textarea - 500px min height]          │ │
│ │                                              │ │  ← Main editor
│ │ How are you feeling today?                   │ │
│ │                                              │ │
│ │                                              │ │
│ └─────────────────────────────────────────────┘ │
│                                                  │
│ ┌─────────────────────────────────────────────┐ │
│ │ ✨ After saving, our AI will generate...     │ │  ← Info card
│ └─────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────┘
```

**Post-Submit View:**

```
┌─────────────────────────────────────────────────┐
│ ┌─────────────────────────────────────────────┐ │
│ │ ✨ Entry Reflected                           │ │  ← Success card
│ │ Your entry has been saved and analyzed...    │ │
│ └─────────────────────────────────────────────┘ │
│                                                  │
│ ┌─────────────────────────────────────────────┐ │
│ │ Summary                                      │ │
│ │ Your entry reflects a moment of...           │ │  ← AI summary
│ └─────────────────────────────────────────────┘ │
│                                                  │
│ ┌─────────────────────────────────────────────┐ │
│ │ Emotional Themes                             │ │
│ │ [Reflective] [Hopeful] [Focused]            │ │  ← Theme tags
│ └─────────────────────────────────────────────┘ │
│                                                  │
│ ┌─────────────────────────────────────────────┐ │
│ │ Reflective Questions                         │ │
│ │ • What specific actions...                   │ │  ← AI questions
│ │ • How can you honor...                       │ │
│ └─────────────────────────────────────────────┘ │
│                                                  │
│ [View All Entries]  [Write Another Entry]       │
└─────────────────────────────────────────────────┘
```

---

### History Page (`/app/history`)

```
┌─────────────────────────────────────────────────┐
│ Journal History                                  │
│ Your personal archive of reflection...           │
│                                                  │
│ [🔍 Search your entries...]  [Filter] [Date]    │
│                                                  │
│ ┌─────────────────────────────────────────────┐ │
│ │ 🕐 Fri, Feb 21, 2026  •  342 words     →    │ │
│ │ Today was full of clarity. I spent...        │ │  ← Entry card
│ │ [Reflective] [Hopeful] [Focused]            │ │
│ └─────────────────────────────────────────────┘ │
│                                                  │
│ ┌─────────────────────────────────────────────┐ │
│ │ 🕐 Thu, Feb 20, 2026  •  218 words     →    │ │
│ │ Feeling grateful for the small moments...    │ │
│ │ [Grateful] [Connected]                       │ │
│ └─────────────────────────────────────────────┘ │
│                                                  │
│ ... (more entries)                               │
│                                                  │
│              [Load More]                         │
└─────────────────────────────────────────────────┘
```

**Hover Effect:** Cards get blue border

---

### Insights Page (`/app/insights`)

```
┌─────────────────────────────────────────────────┐
│ Insights & Patterns           [Export Report]   │
│ AI-generated understanding...                    │
│                                                  │
│ [Weekly] [Monthly] [All Time]                    │  ← Tabs
│                                                  │
│ ┌─────────────────────────────────────────────┐ │
│ │ 📈 Emotional Trends                          │ │
│ │ Your emotional landscape over 7 days         │ │
│ │ ┌───────────────────────────────────────┐  │ │
│ │ │   [AREA CHART - Multi-line]            │  │ │
│ │ └───────────────────────────────────────┘  │ │
│ └─────────────────────────────────────────────┘ │
│                                                  │
│ ┌─────────────────────────────────────────────┐ │
│ │ # Theme Distribution                         │ │
│ │ Common themes detected...                    │ │
│ │ ┌───────────────────────────────────────┐  │ │
│ │ │   [BAR CHART - Color-coded]            │  │ │
│ │ └───────────────────────────────────────┘  │ │
│ └─────────────────────────────────────────────┘ │
│                                                  │
│ ┌─────────────────────────────────────────────┐ │
│ │ ✨ Weekly Summary                            │ │
│ │ Key Observations:                            │ │
│ │ • Your entries show increasing clarity...    │ │  ← AI summary
│ │ • Themes of gratitude appeared 4 times...    │ │
│ │                                              │ │
│ │ Reflection Suggestion:                       │ │
│ │ Consider what specific practices...          │ │
│ └─────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────┘
```

---

### Prompts Page (`/app/prompts`)

```
┌─────────────────────────────────────────────────┐
│ Reflection Prompts            [Generate New]    │
│ Personalized questions to deepen...              │
│                                                  │
│ [📈 Growth] [💗 Gratitude] [✨ Clarity] [☁️ Release]  ← Tabs
│                                                  │
│ ┌─────────────────────────────────────────────┐ │
│ │ Growth                                       │ │  ← Category label
│ │ What's one small step you could take        │ │
│ │ today toward a goal that matters?            │ │  ← Question
│ │ [Start Writing →]                            │ │
│ └─────────────────────────────────────────────┘ │
│                                                  │
│ ┌─────────────────────────────────────────────┐ │
│ │ Growth                                       │ │
│ │ Reflect on a challenge you overcame...       │ │
│ │ [Start Writing →]                            │ │
│ └─────────────────────────────────────────────┘ │
│                                                  │
│ ... (more prompts)                               │
└─────────────────────────────────────────────────┘
```

**Color Coding:**
- Growth tab: Olive gradient (#9AAB63)
- Gratitude tab: Pink gradient (#F5B8DA)
- Clarity tab: Blue gradient (#8AA2C8)
- Release tab: Yellow gradient (#F7D768)

---

### Settings Page (`/app/settings`)

```
┌─────────────────────────────────────────────────┐
│ Settings                                         │
│ Manage your account and privacy...               │
│                                                  │
│ ┌─────────────────────────────────────────────┐ │
│ │ 👤 Profile                                   │ │
│ │ Name:  [Alex Chen          ]                 │ │
│ │ Email: [alex@example.com   ]                 │ │
│ │ [Save Changes]                               │ │
│ └─────────────────────────────────────────────┘ │
│                                                  │
│ ┌─────────────────────────────────────────────┐ │
│ │ 🛡️  Privacy & Security                       │ │
│ │ End-to-End Encryption     [✓] (locked)       │ │
│ │ AI Processing             [✓]                │ │
│ │ Usage Analytics           [ ]                │ │
│ │                                              │ │
│ │ Data Transparency:                           │ │
│ │ We use AI to generate insights...            │ │
│ └─────────────────────────────────────────────┘ │
│                                                  │
│ ┌─────────────────────────────────────────────┐ │
│ │ 🌙 Appearance                                │ │
│ │ Dark Mode                 [✓]                │ │
│ └─────────────────────────────────────────────┘ │
│                                                  │
│ ┌─────────────────────────────────────────────┐ │
│ │ 📥 Data Management                           │ │
│ │ [📥 Export All Journal Entries]              │ │
│ │ [🗑️  Delete All Data]                        │ │
│ └─────────────────────────────────────────────┘ │
│                                                  │
│ ┌─────────────────────────────────────────────┐ │
│ │ [🚪 Sign Out]                                │ │
│ └─────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────┘
```

---

### 404 Not Found (`/*`)

```
┌─────────────────────────────────────────────────┐
│                                                  │
│              [🔷 Large Icon]                     │
│          Page Not Found                          │
│  The page you're looking for doesn't exist...    │
│                                                  │
│  [Go to Dashboard]  [Start Writing]              │
│                                                  │
└─────────────────────────────────────────────────┘
```

---

## 🎨 Visual Design Patterns

### Card Shadows
- Subtle: `shadow-sm` on white backgrounds
- None: Dark cards don't need shadows (use borders)

### Rounded Corners
- Cards: `rounded-xl` (16px)
- Buttons: `rounded-md` (8px)
- Tags: `rounded-full`
- Logo container: `rounded-2xl` (24px)

### Spacing
- Section gaps: `space-y-6` or `space-y-8`
- Card padding: `p-6` or `p-8`
- Button padding: `px-4 py-2` (default)

### Icons
- Small: `size-4` (16px) in buttons, tags
- Medium: `size-5` (20px) in headers
- Large: `size-8` (32px) in feature cards
- Extra large: `size-10` (40px) in hero sections

### Text Sizes
- Headings: `text-3xl` (30px), `text-2xl` (24px)
- Body: `text-base` (16px)
- Small: `text-sm` (14px)
- Tiny: `text-xs` (12px)

---

## 📱 Responsive Behavior

### Mobile (< 768px)
- Sidebar becomes drawer (hamburger menu)
- Stats cards stack vertically (1 column)
- Buttons stack vertically
- Reduced padding (p-4)

### Tablet (768px - 1024px)
- Sidebar visible
- Stats grid: 2 columns
- Insight cards: 1-2 columns

### Desktop (> 1024px)
- Full sidebar (256px)
- Stats grid: 3 columns
- Insight cards: 2 columns
- Generous padding (p-10)

---

## 🎨 Color Application Examples

### Blue Gradient Card (Primary)
```
Background: gradient from #8AA2C8/10 to #B6CAEB/5
Border: #8AA2C8/20
Icon color: #8AA2C8
```

### Pink Gradient Card (Emotional)
```
Background: gradient from #F5B8DA/10 to #E09CC3/5
Border: #F5B8DA/20
Icon color: #E09CC3
```

### Yellow Gradient Card (Energy)
```
Background: gradient from #F7D768/10 to #E8C84D/5
Border: #F7D768/20
Icon color: #E8C84D
```

### Olive Gradient Card (Growth)
```
Background: gradient from #9AAB63/10 to #808E53/5
Border: #9AAB63/20
Icon color: #808E53
```

---

**Use this guide as a visual reference when implementing or reviewing screens.**
