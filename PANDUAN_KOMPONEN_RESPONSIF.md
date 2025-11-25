# 📱 Panduan Penggunaan Komponen Responsif

## 🎯 Overview
File `ResponsiveComponents.tsx` berisi komponen-komponen yang sudah dioptimasi untuk responsiveness dan dapat digunakan di seluruh aplikasi.

## 📦 Komponen yang Tersedia

### 1. ResponsiveCard
Card container dengan glassmorphism effect dan animasi.

```tsx
import { ResponsiveCard } from '@/components/ResponsiveComponents';

// Basic usage
<ResponsiveCard>
  <h2>Card Content</h2>
  <p>Some text here</p>
</ResponsiveCard>

// With gradient background
<ResponsiveCard gradient>
  Content here
</ResponsiveCard>

// Clickable card
<ResponsiveCard onClick={() => console.log('Clicked!')}>
  Click me!
</ResponsiveCard>

// Without hover effect
<ResponsiveCard hover={false}>
  Static card
</ResponsiveCard>
```

**Props:**
- `children`: React.ReactNode - Konten card
- `className?`: string - Custom classes
- `hover?`: boolean - Enable hover effect (default: true)
- `gradient?`: boolean - Enable gradient background (default: false)
- `onClick?`: () => void - Click handler

---

### 2. ResponsiveGrid
Grid layout yang otomatis responsive.

```tsx
import { ResponsiveGrid } from '@/components/ResponsiveComponents';

// Default: 1 col mobile, 2 col sm, 3 col lg, 4 col xl
<ResponsiveGrid>
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</ResponsiveGrid>

// Custom columns
<ResponsiveGrid cols={{ default: 1, sm: 2, md: 3, lg: 4, xl: 5 }}>
  <div>Item 1</div>
  <div>Item 2</div>
</ResponsiveGrid>

// Custom gap
<ResponsiveGrid gap={8}>
  <div>Item 1</div>
  <div>Item 2</div>
</ResponsiveGrid>
```

**Props:**
- `children`: React.ReactNode - Grid items
- `cols?`: object - Column configuration per breakpoint
  - `default?`: number (default: 1)
  - `sm?`: number (default: 2)
  - `md?`: number
  - `lg?`: number (default: 3)
  - `xl?`: number (default: 4)
- `gap?`: number - Gap size (default: 6)
- `className?`: string - Custom classes

---

### 3. StatCard
Card untuk menampilkan statistik dengan icon dan trend.

```tsx
import { StatCard } from '@/components/ResponsiveComponents';
import { Users, TrendingUp } from 'lucide-react';

<StatCard
  icon={Users}
  label="Total Users"
  value={1234}
  trend="+12%"
  trendUp={true}
  gradient="from-blue-500 to-purple-500"
  delay={0.1}
/>

// Without trend
<StatCard
  icon={Package}
  label="Total Products"
  value="456"
  gradient="from-green-500 to-teal-500"
/>

// Negative trend
<StatCard
  icon={DollarSign}
  label="Revenue"
  value="Rp 10.000.000"
  trend="-5%"
  trendUp={false}
  gradient="from-red-500 to-orange-500"
/>
```

**Props:**
- `icon`: LucideIcon - Icon component
- `label`: string - Label text
- `value`: string | number - Stat value
- `trend?`: string - Trend percentage
- `trendUp?`: boolean - Trend direction (default: true)
- `gradient?`: string - Tailwind gradient classes (default: 'from-blue-500 to-purple-500')
- `delay?`: number - Animation delay (default: 0)

---

### 4. ResponsiveButton
Button dengan berbagai variant dan ukuran.

```tsx
import { ResponsiveButton } from '@/components/ResponsiveComponents';
import { Plus, Save } from 'lucide-react';

// Primary button
<ResponsiveButton variant="primary">
  Click Me
</ResponsiveButton>

// With icon (left)
<ResponsiveButton variant="primary" icon={Plus}>
  Add New
</ResponsiveButton>

// With icon (right)
<ResponsiveButton variant="secondary" icon={Save} iconPosition="right">
  Save Changes
</ResponsiveButton>

// Different sizes
<ResponsiveButton size="sm">Small</ResponsiveButton>
<ResponsiveButton size="md">Medium</ResponsiveButton>
<ResponsiveButton size="lg">Large</ResponsiveButton>

// Full width
<ResponsiveButton fullWidth>Full Width Button</ResponsiveButton>

// Loading state
<ResponsiveButton loading>Loading...</ResponsiveButton>

// Disabled
<ResponsiveButton disabled>Disabled</ResponsiveButton>

// Danger variant
<ResponsiveButton variant="danger">Delete</ResponsiveButton>
```

**Props:**
- `children`: React.ReactNode - Button text
- `variant?`: 'primary' | 'secondary' | 'ghost' | 'danger' (default: 'primary')
- `size?`: 'sm' | 'md' | 'lg' (default: 'md')
- `fullWidth?`: boolean (default: false)
- `icon?`: LucideIcon - Icon component
- `iconPosition?`: 'left' | 'right' (default: 'left')
- `loading?`: boolean (default: false)
- `disabled?`: boolean (default: false)
- `onClick?`: () => void - Click handler
- `className?`: string - Custom classes

---

### 5. ResponsiveInput
Input field dengan icon dan error handling.

```tsx
import { ResponsiveInput } from '@/components/ResponsiveComponents';
import { Mail, Lock, User } from 'lucide-react';

// Basic input
<ResponsiveInput
  value={email}
  onChange={setEmail}
  placeholder="Enter email"
/>

// With icon and label
<ResponsiveInput
  type="email"
  value={email}
  onChange={setEmail}
  icon={Mail}
  label="Email Address"
  placeholder="your@email.com"
  required
/>

// With error
<ResponsiveInput
  value={password}
  onChange={setPassword}
  icon={Lock}
  label="Password"
  type="password"
  error="Password must be at least 6 characters"
  required
/>

// Disabled
<ResponsiveInput
  value={username}
  onChange={setUsername}
  icon={User}
  label="Username"
  disabled
/>
```

**Props:**
- `type?`: string (default: 'text')
- `placeholder?`: string
- `value`: string - Input value
- `onChange`: (value: string) => void - Change handler
- `icon?`: LucideIcon - Icon component
- `label?`: string - Label text
- `error?`: string - Error message
- `required?`: boolean (default: false)
- `disabled?`: boolean (default: false)
- `className?`: string - Custom classes

---

### 6. ResponsiveBadge
Badge untuk status, tags, dll.

```tsx
import { ResponsiveBadge } from '@/components/ResponsiveComponents';

// Different variants
<ResponsiveBadge variant="primary">Primary</ResponsiveBadge>
<ResponsiveBadge variant="success">Success</ResponsiveBadge>
<ResponsiveBadge variant="warning">Warning</ResponsiveBadge>
<ResponsiveBadge variant="danger">Danger</ResponsiveBadge>
<ResponsiveBadge variant="info">Info</ResponsiveBadge>

// Different sizes
<ResponsiveBadge size="sm">Small</ResponsiveBadge>
<ResponsiveBadge size="md">Medium</ResponsiveBadge>
<ResponsiveBadge size="lg">Large</ResponsiveBadge>

// With custom class
<ResponsiveBadge variant="success" className="ml-2">
  Active
</ResponsiveBadge>
```

**Props:**
- `children`: React.ReactNode - Badge content
- `variant?`: 'primary' | 'success' | 'warning' | 'danger' | 'info' (default: 'primary')
- `size?`: 'sm' | 'md' | 'lg' (default: 'md')
- `className?`: string - Custom classes

---

## 🎨 Contoh Penggunaan Lengkap

### Dashboard Page
```tsx
'use client';

import { useState } from 'react';
import { 
  ResponsiveCard, 
  ResponsiveGrid, 
  StatCard, 
  ResponsiveButton,
  ResponsiveBadge 
} from '@/components/ResponsiveComponents';
import { Users, Package, DollarSign, Plus } from 'lucide-react';

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <ResponsiveButton variant="primary" icon={Plus}>
          Add New
        </ResponsiveButton>
      </div>

      {/* Stats */}
      <ResponsiveGrid cols={{ default: 1, sm: 2, lg: 4 }}>
        <StatCard
          icon={Users}
          label="Total Users"
          value={1234}
          trend="+12%"
          gradient="from-blue-500 to-purple-500"
        />
        <StatCard
          icon={Package}
          label="Products"
          value={456}
          trend="+5%"
          gradient="from-green-500 to-teal-500"
        />
        <StatCard
          icon={DollarSign}
          label="Revenue"
          value="Rp 10M"
          trend="+18%"
          gradient="from-orange-500 to-red-500"
        />
        <StatCard
          icon={Users}
          label="Active"
          value={789}
          trend="+8%"
          gradient="from-purple-500 to-pink-500"
        />
      </ResponsiveGrid>

      {/* Content */}
      <ResponsiveGrid cols={{ default: 1, lg: 2 }}>
        <ResponsiveCard>
          <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
          {/* Activity list */}
        </ResponsiveCard>
        
        <ResponsiveCard gradient>
          <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
          {/* Quick actions */}
        </ResponsiveCard>
      </ResponsiveGrid>
    </div>
  );
}
```

### Form Page
```tsx
'use client';

import { useState } from 'react';
import { ResponsiveCard, ResponsiveInput, ResponsiveButton } from '@/components/ResponsiveComponents';
import { Mail, Lock, User, Phone } from 'lucide-react';

export default function ProfileForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <ResponsiveCard className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Edit Profile</h1>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <ResponsiveInput
          value={name}
          onChange={setName}
          icon={User}
          label="Full Name"
          placeholder="John Doe"
          required
        />
        
        <ResponsiveInput
          type="email"
          value={email}
          onChange={setEmail}
          icon={Mail}
          label="Email"
          placeholder="john@example.com"
          required
        />
        
        <ResponsiveInput
          type="tel"
          value={phone}
          onChange={setPhone}
          icon={Phone}
          label="Phone"
          placeholder="+62 812 3456 7890"
        />
        
        <ResponsiveInput
          type="password"
          value={password}
          onChange={setPassword}
          icon={Lock}
          label="Password"
          placeholder="••••••••"
          error={error}
        />
        
        <div className="flex gap-3 pt-4">
          <ResponsiveButton variant="primary" fullWidth>
            Save Changes
          </ResponsiveButton>
          <ResponsiveButton variant="secondary">
            Cancel
          </ResponsiveButton>
        </div>
      </form>
    </ResponsiveCard>
  );
}
```

## 📱 Responsive Breakpoints
Semua komponen mengikuti breakpoint Tailwind CSS:
- **Mobile**: < 640px (default)
- **sm**: ≥ 640px (Small tablets)
- **md**: ≥ 768px (Tablets)
- **lg**: ≥ 1024px (Laptops)
- **xl**: ≥ 1280px (Desktops)
- **2xl**: ≥ 1536px (Large desktops)

## 🎨 Customization
Semua komponen menerima `className` prop untuk customization tambahan:

```tsx
<ResponsiveCard className="bg-gradient-to-r from-blue-500 to-purple-500">
  Custom styled card
</ResponsiveCard>

<ResponsiveButton className="shadow-2xl">
  Custom button
</ResponsiveButton>
```

## ⚡ Tips & Best Practices

1. **Gunakan ResponsiveGrid untuk layout:**
   ```tsx
   <ResponsiveGrid cols={{ default: 1, sm: 2, lg: 3 }}>
     {/* Items */}
   </ResponsiveGrid>
   ```

2. **Kombinasikan dengan utility classes:**
   ```tsx
   <ResponsiveCard className="hover:shadow-2xl transition-shadow">
     {/* Content */}
   </ResponsiveCard>
   ```

3. **Gunakan StatCard untuk metrics:**
   ```tsx
   <StatCard
     icon={Users}
     label="Users"
     value={count}
     trend={`+${percentage}%`}
   />
   ```

4. **Loading states:**
   ```tsx
   <ResponsiveButton loading={isLoading}>
     {isLoading ? 'Saving...' : 'Save'}
   </ResponsiveButton>
   ```

5. **Error handling:**
   ```tsx
   <ResponsiveInput
     value={value}
     onChange={setValue}
     error={validationError}
   />
   ```

## 🔄 Migration dari Komponen Lama

### Before:
```tsx
<div className="bg-white rounded-lg p-6 shadow-lg">
  <h2>Title</h2>
  <p>Content</p>
</div>
```

### After:
```tsx
<ResponsiveCard>
  <h2>Title</h2>
  <p>Content</p>
</ResponsiveCard>
```

### Before:
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
  {/* Items */}
</div>
```

### After:
```tsx
<ResponsiveGrid cols={{ default: 1, md: 2, lg: 4 }}>
  {/* Items */}
</ResponsiveGrid>
```

## 📚 Resources
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Framer Motion Documentation](https://www.framer.com/motion/)
- [Lucide Icons](https://lucide.dev/)
