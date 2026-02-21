# 🚀 Quick Start Guide - Developer Edition

## Get Up and Running in 5 Minutes

---

## Prerequisites

- Node.js 18+ installed
- Basic knowledge of React and Tailwind CSS
- Text editor (VS Code recommended)

---

## Installation

```bash
# Install all dependencies
npm install

# Start development server
npm run dev
```

The app will open at `http://localhost:5173` (or similar).

---

## 🗺️ Navigation Map

### **Authentication Pages** (No Login Required)

| Route | Page | Description |
|-------|------|-------------|
| `/` | Welcome | Landing page with features |
| `/login` | Login | Sign in form (mock auth) |
| `/register` | Register | Sign up form |
| `/reset-password` | Reset Password | Password recovery |

### **Main Application** (Behind Auth)

| Route | Page | Description |
|-------|------|-------------|
| `/app` | Dashboard | Home screen with stats + insights |
| `/app/journal/new` | New Entry | Write journal entry |
| `/app/journal/:id` | Edit Entry | Edit existing entry |
| `/app/history` | History | View all entries timeline |
| `/app/insights` | Insights | Weekly/monthly analytics |
| `/app/prompts` | Prompts | Reflection questions |
| `/app/settings` | Settings | Profile + privacy settings |

---

## 🎨 Design Tokens (Quick Reference)

### Colors

```css
/* In your components */
className="bg-[#8AA2C8]"      // Primary blue (calm)
className="bg-[#B6CAEB]"      // Secondary blue (light)
className="bg-[#F5B8DA]"      // Pink (emotional)
className="bg-[#F7D768]"      // Yellow (energy)
className="bg-[#9AAB63]"      // Olive (growth)

/* For backgrounds (10% opacity) */
className="bg-[#8AA2C8]/10"
```

### Buttons

```tsx
// Primary action
<Button className="bg-[#8AA2C8] hover:bg-[#B6CAEB] text-black">
  Action
</Button>

// Secondary
<Button variant="outline">Secondary</Button>

// Ghost
<Button variant="ghost">Text Only</Button>
```

### Cards with Gradients

```tsx
// Blue gradient
<Card className="bg-gradient-to-br from-[#8AA2C8]/10 to-[#B6CAEB]/5 border-[#8AA2C8]/20">
  Content
</Card>

// Pink gradient
<Card className="bg-gradient-to-br from-[#F5B8DA]/10 to-[#E09CC3]/5 border-[#F5B8DA]/20">
  Content
</Card>
```

---

## 🧩 Common Patterns

### Page Layout

```tsx
import { motion } from "motion/react";

export function MyPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl font-semibold">Page Title</h1>
        <p className="text-muted-foreground">Description</p>
      </motion.div>

      {/* Content */}
      <Card>
        <CardContent>
          {/* Your content */}
        </CardContent>
      </Card>
    </div>
  );
}
```

### Staggered List Animation

```tsx
{items.map((item, index) => (
  <motion.div
    key={item.id}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: 0.05 * index }}
  >
    <ItemCard item={item} />
  </motion.div>
))}
```

### Toast Notifications

```tsx
import { toast } from "sonner";

// Loading
toast.loading("Processing...", { id: "myAction" });

// Success (updates loading toast)
toast.success("Done!", { id: "myAction" });

// Error
toast.error("Something went wrong");

// Info
toast("This is a message");
```

---

## 📁 Project Structure

```
src/app/
├── App.tsx                    # Root component (routing + theme)
├── routes.tsx                 # Route configuration
│
├── components/
│   ├── layout/               # Layouts (RootLayout, AppSidebar)
│   ├── cards/                # Card components (reusable)
│   ├── charts/               # Recharts visualizations
│   ├── states/               # Empty/loading states
│   └── ui/                   # shadcn/ui components (40+)
│
└── pages/
    ├── auth/                 # Authentication pages
    ├── DashboardPage.tsx     # Main dashboard
    ├── JournalEntryPage.tsx  # Write/edit entries
    └── ... (other pages)

src/styles/
├── theme.css                 # Design tokens (colors)
├── tailwind.css              # Tailwind v4 imports
└── fonts.css                 # Font declarations
```

---

## 🔧 Common Customizations

### 1. Change Primary Color

Edit `/src/styles/theme.css`:

```css
:root {
  --primary: #YOUR_COLOR;         /* Light mode */
}

.dark {
  --primary: #YOUR_COLOR;         /* Dark mode */
}
```

### 2. Add a New Page

1. Create file: `/src/app/pages/MyNewPage.tsx`
2. Add route in `/src/app/routes.tsx`:

```tsx
{
  path: "/app",
  element: <RootLayout />,
  children: [
    // ... existing routes
    { path: "my-page", element: <MyNewPage /> },
  ],
}
```

3. Add link in sidebar: `/src/app/components/layout/AppSidebar.tsx`

### 3. Modify Sidebar Navigation

Edit `/src/app/components/layout/AppSidebar.tsx`:

```tsx
const mainNavigation = [
  {
    title: "My Page",
    href: "/app/my-page",
    icon: MyIcon,  // From lucide-react
  },
  // ... existing items
];
```

### 4. Change Dashboard Content

Edit `/src/app/pages/DashboardPage.tsx` - It's well-commented!

---

## 🎭 Animation Helpers

### Basic Fade In
```tsx
initial={{ opacity: 0 }}
animate={{ opacity: 1 }}
transition={{ duration: 0.5 }}
```

### Fade In + Slide Up
```tsx
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.5 }}
```

### With Delay (for staggered effects)
```tsx
transition={{ duration: 0.5, delay: 0.1 }}
```

---

## 📊 Adding Charts

We use **Recharts**. Example:

```tsx
import { AreaChart, Area, XAxis, YAxis } from "recharts";

const data = [
  { day: "Mon", value: 65 },
  { day: "Tue", value: 70 },
  // ...
];

<AreaChart data={data} width={500} height={300}>
  <XAxis dataKey="day" />
  <YAxis />
  <Area dataKey="value" stroke="#8AA2C8" fill="#8AA2C8" />
</AreaChart>
```

See `/src/app/components/charts/` for full examples.

---

## 🔐 Mock Authentication

Currently uses **client-side mock** authentication:

```tsx
// In LoginPage.tsx
const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  // No API call - just navigate
  navigate("/app");
};
```

### To Add Real Auth:

1. Replace `navigate("/app")` with API call
2. Store JWT token (httpOnly cookie or localStorage)
3. Add protected route wrapper
4. Implement logout flow

---

## 🧪 Testing Your Changes

### Visual Check
1. Start dev server: `npm run dev`
2. Navigate to your page
3. Check mobile view (resize browser)
4. Test dark mode (it's default)

### Component Check
- Does it animate smoothly?
- Are colors from the palette?
- Is text readable (contrast)?
- Does it look good on mobile?

---

## 🐛 Troubleshooting

### Issue: Colors not showing
**Fix**: Make sure you're using the exact hex values from `theme.css`

### Issue: Animation not working
**Fix**: Check that Motion is imported: `import { motion } from "motion/react"`

### Issue: Chart not rendering
**Fix**: Ensure Recharts is installed: `npm install recharts`

### Issue: Route not found
**Fix**: Check `routes.tsx` - is your path defined?

---

## 📚 Key Documentation Files

1. **DESIGN_SYSTEM.md** - Full design system documentation
2. **UI_IMPLEMENTATION.md** - Page-by-page UI breakdown
3. **COMPONENT_ARCHITECTURE.md** - Technical architecture
4. **PROJECT_SUMMARY.md** - Complete project overview
5. **QUICK_START.md** (this file) - Developer quick reference

---

## 🎯 Quick Tips

1. **Use existing components** - Don't rebuild Button, Card, etc.
2. **Follow the color palette** - No arbitrary colors
3. **Animate page transitions** - Consistency is key
4. **Test responsiveness** - Mobile-first approach
5. **Add toast notifications** - For user feedback
6. **Check accessibility** - Use semantic HTML

---

## 🚀 Next Steps

1. **Explore the code** - Start with `/src/app/pages/DashboardPage.tsx`
2. **Customize colors** - Edit `/src/styles/theme.css`
3. **Add backend** - Replace mock data with API calls
4. **Deploy** - Build with `npm run build`

---

## 💬 Need Help?

- Check **DESIGN_SYSTEM.md** for design questions
- Check **COMPONENT_ARCHITECTURE.md** for code structure
- Check existing pages for examples
- All components are well-commented

---

**Happy coding! 🎨💻**
