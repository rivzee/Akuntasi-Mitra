# Loading Animation Components

Komponen loading animation yang menarik dan modern untuk RISA BUR Dashboard.

## Komponen yang Tersedia

### 1. LoadingAnimation
Komponen loading dengan 5 variasi animasi yang berbeda.

**Props:**
- `variant`: 'spinner' | 'dots' | 'pulse' | 'bars' | 'logo' (default: 'spinner')
- `size`: 'sm' | 'md' | 'lg' (default: 'md')
- `text`: string (default: 'Loading...')

**Contoh Penggunaan:**
```tsx
import LoadingAnimation from '@/components/LoadingAnimation';

// Spinner animation
<LoadingAnimation variant="spinner" size="md" text="Memuat data..." />

// Dots animation
<LoadingAnimation variant="dots" size="lg" text="Mohon tunggu..." />

// Pulse animation
<LoadingAnimation variant="pulse" size="sm" />

// Bars animation
<LoadingAnimation variant="bars" size="md" text="Memproses..." />

// Logo animation (RISA BUR)
<LoadingAnimation variant="logo" size="lg" text="Memuat..." />
```

### 2. PageLoader
Full-page loading screen dengan background animasi.

**Props:**
- `isLoading`: boolean (required)
- `variant`: 'spinner' | 'dots' | 'pulse' | 'bars' | 'logo' (default: 'logo')
- `text`: string (default: 'Memuat...')
- `overlay`: boolean (default: true) - Menggunakan backdrop blur atau solid background

**Contoh Penggunaan:**
```tsx
import { useState } from 'react';
import PageLoader from '@/components/PageLoader';

function MyComponent() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      <PageLoader 
        isLoading={isLoading} 
        variant="logo" 
        text="Memuat dashboard..." 
      />
      {/* Your content */}
    </>
  );
}
```

### 3. LoadingSpinner
Komponen loading spinner yang sudah ditingkatkan dengan animasi RISA BUR logo.

**Contoh Penggunaan:**
```tsx
import LoadingSpinner from '@/components/LoadingSpinner';

// Di layout atau halaman loading
export default function Loading() {
  return <LoadingSpinner />;
}
```

## Implementasi di Dashboard

### Untuk Halaman Loading
Buat file `loading.tsx` di folder halaman:

```tsx
// src/app/dashboard/loading.tsx
import LoadingSpinner from '@/components/LoadingSpinner';

export default function Loading() {
  return <LoadingSpinner />;
}
```

### Untuk Loading State dalam Komponen
```tsx
'use client';

import { useState, useEffect } from 'react';
import PageLoader from '@/components/PageLoader';

export default function MyPage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulasi loading data
    const fetchData = async () => {
      try {
        // Fetch your data
        await new Promise(resolve => setTimeout(resolve, 2000));
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <PageLoader isLoading={isLoading} variant="logo" text="Memuat data..." />
      
      {!isLoading && (
        <div>
          {/* Your content */}
        </div>
      )}
    </>
  );
}
```

### Untuk Button Loading State
```tsx
import LoadingAnimation from '@/components/LoadingAnimation';

<button 
  disabled={isLoading}
  className="px-4 py-2 bg-blue-600 text-white rounded-lg"
>
  {isLoading ? (
    <LoadingAnimation variant="spinner" size="sm" text="" />
  ) : (
    'Submit'
  )}
</button>
```

## Variasi Animasi

1. **Spinner** - Rotating circle (klasik dan simple)
2. **Dots** - Bouncing dots (playful dan modern)
3. **Pulse** - Pulsing circle dengan ripple effect
4. **Bars** - Equalizer-style bars (dynamic)
5. **Logo** - RISA BUR logo dengan rotating rings (branded dan premium)

## Tips Penggunaan

- Gunakan variant **'logo'** untuk initial page load (branding)
- Gunakan variant **'spinner'** atau **'dots'** untuk loading state dalam komponen
- Gunakan variant **'bars'** untuk loading data yang sedang diproses
- Gunakan variant **'pulse'** untuk loading yang singkat

## Customization

Anda dapat mengcustomize warna gradient dengan mengedit class Tailwind:
- `from-blue-600 to-purple-600` - Gradient utama
- `bg-blue-500/10` - Background blur color
