# Playa Surf House Landing Page

A modern, production-ready Next.js landing page for Playa Surf House, featuring a beautiful coastal design and smooth animations.

## 🚀 Features

- **Modern Design**: Pixel-perfect recreation of the original design
- **Responsive**: Mobile-first approach with smooth responsive behavior
- **Performance Optimized**: Next.js Image optimization, lazy loading
- **Accessibility**: ARIA labels, keyboard navigation, semantic HTML
- **SEO Ready**: Meta tags, structured data, Open Graph
- **TypeScript**: Strict typing throughout the application
- **Tailwind CSS**: Utility-first styling with custom theme

## 🛠️ Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS 3.4+
- **Icons**: Lucide React
- **Fonts**: Inter (Google Fonts)

## 📦 Installation

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run the development server**:
   ```bash
   npm run dev
   ```

3. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎨 Design Features

### Typography
- **Font**: Poppins (Google Fonts) with multiple weights (400, 500, 600, 700, 800)
- **Hierarchy**: Clear text hierarchy with proper sizing and spacing
- **Responsive**: Text scales appropriately across all device sizes

### Header
- **Logo**: Large, prominent logo (200x80px) with responsive sizing
- **Navigation**: Clean navigation with generous spacing (gap-8 to gap-10)
- **Social Icons**: Instagram, TikTok, Facebook with hover effects
- **CTA Button**: Primary green button with hover animations
- **Sticky**: Fixed header with backdrop blur and shadow effects
- **Mobile**: Hamburger menu for mobile devices

### Hero Section
- **Background**: Full-viewport coastal sunset image with gradient overlay
- **Typography**: 
  - Subheading: Small, uppercase, tracking-wider
  - Main heading: Very large (4.5rem desktop), font-weight-800
  - Description: Readable paragraph with max-width constraints
- **Buttons**: 
  - Primary: Filled green button
  - Secondary: Outlined white button
  - Responsive: Stack on mobile, side-by-side on desktop
- **Animations**: Staggered slide-up animations with delays
- **Scroll Indicator**: Animated scroll indicator at bottom

### Responsive Design
- **Mobile (< 640px)**: 
  - Hamburger menu for navigation
  - Smaller logo but still prominent
  - Stacked buttons with full width
  - Reduced padding and text sizes
- **Tablet (640px - 1024px)**: 
  - Medium logo size
  - Simplified navigation
  - Medium text sizes
  - Adjusted spacing
- **Desktop (> 1024px)**: 
  - Full navigation layout
  - Large logo (200x80px)
  - Large text sizes
  - Side-by-side buttons
  - Maximum spacing
- **Large Desktop (> 1536px)**: 
  - Content max-width containers
  - Maintained proportions

## 🖼️ Assets

The project uses optimized assets from the `/public` directory:

- **Logo**: `logo_color.webp` - Color version of the Playa Surf House logo
- **Logo Alternative**: `logo_black.webp` - Black version for different contexts
- **Hero Background**: `background.webp` - High-quality coastal sunset image

All images are optimized using Next.js Image component with:
- WebP format for better compression
- Priority loading for above-the-fold content
- Responsive sizing and proper aspect ratios
- Accessibility alt text

## 🎯 Color Scheme

- **Primary Green**: `oklch(70.5% 0.213 47.604)` (Modern OKLCH color)
- **Secondary/Accent**: `oklch(82.8% 0.189 84.429)` (Accent color)
- **White**: `#FFF`
- **Text Colors**: Optimized for accessibility and contrast
- **Hover States**: Darker/lighter variations for interactive elements

## 📱 Responsive Breakpoints

- **Mobile**: 320px - 768px
- **Tablet**: 768px - 1024px
- **Desktop**: 1024px+

## 🚀 Production Build

```bash
npm run build
npm start
```

## 📁 Project Structure

```
├── app/
│   ├── globals.css          # Global styles and Tailwind imports
│   ├── layout.tsx           # Root layout with metadata
│   └── page.tsx             # Main homepage
├── components/
│   ├── Header.tsx           # Navigation header component
│   └── Hero.tsx             # Hero section component
├── data/
│   ├── navigation.json      # Navigation menu and logo data
│   ├── hero.json           # Hero section content
│   ├── site-config.json    # Global site configuration
│   └── pages.json          # Page metadata and configuration
├── lib/
│   ├── data-loader.ts      # Server-side data loading utilities
│   └── static-data.ts      # Client-side data access utilities
├── types/
│   ├── index.ts            # Main type exports
│   ├── navigation.types.ts  # Navigation-related types
│   ├── hero.types.ts       # Hero section types
│   ├── site-config.types.ts # Site configuration types
│   └── pages.types.ts     # Page configuration types
├── tailwind.config.ts      # Tailwind configuration
├── tsconfig.json           # TypeScript configuration
├── next.config.js          # Next.js configuration
└── package.json            # Dependencies and scripts
```

## 🎨 Customization

### JSON Data Structure
The project uses JSON files for all content data, making it easy to manage and update:

**Navigation Data (`data/navigation.json`)**:
```json
{
  "logo": {
          "text": "PLAYA",
          "subtext": "SURF HOUSE",
    "href": "/"
  },
  "menuItems": [
    {
      "id": "home",
      "label": "HOME",
      "href": "#home"
    }
  ],
  "socialLinks": [
    {
      "platform": "instagram",
      "url": "https://instagram.com/playasurfhouse",
      "icon": "Instagram",
      "ariaLabel": "Visit our Instagram page"
    }
  ],
  "ctaButton": {
    "text": "BOOK YOUR STAY",
    "href": "#book",
    "variant": "primary"
  }
}
```

**Hero Data (`data/hero.json`)**:
```json
{
  "subheading": "PLAYA SURF HOUSE",
  "heading": "SURF & SKATE IN MOROCCO",
  "description": "Centrally located in Tamraght...",
  "backgroundImage": {
    "url": "https://images.unsplash.com/...",
    "alt": "Coastal sunset view of Tamraght, Morocco"
  },
  "ctaButtons": [
    {
      "text": "BOOK NOW",
      "href": "#book",
      "variant": "primary",
      "priority": true
    }
  ]
}
```

### Colors
Edit `tailwind.config.ts` to modify the color scheme:

```typescript
colors: {
  primary: 'oklch(70.5% 0.213 47.604)',      // Main brand color
  secondary: 'oklch(82.8% 0.189 84.429)',     // Accent color
  white: '#FFF',
  'primary-dark': 'oklch(60% 0.213 47.604)',  // Hover states
  'primary-light': 'oklch(80% 0.213 47.604)', // Light variations
  // ... other color variations
}
```

### Content
Update JSON files in the `/data` directory to modify:
- `navigation.json` - Navigation items, logo, social links
- `hero.json` - Hero section content and CTAs
- `site-config.json` - Site metadata, colors, contact info
- `pages.json` - Page-specific metadata

### Styling
Modify `app/globals.css` for:
- Custom component classes
- Global styles
- Animation keyframes

## 🔧 Development

- **Linting**: `npm run lint`
- **Type Checking**: Built into Next.js
- **Hot Reload**: Automatic with Next.js dev server

## 📄 License

This project is created for Playa Surf House.
