# Pokédex - Pokémon Frontend Assignment

A comprehensive Pokémon listing and detail viewer web application built with Next.js 16, Tailwind CSS v4, and TypeScript. This project showcases the first 150 Pokémon with search functionality, pagination, and detailed stat views.

## Features

✨ **Core Features:**
- 📱 Fully responsive design (mobile, tablet, desktop)
- 🔍 Real-time search by Pokémon name
- 📄 Pagination for optimal performance
- 🎨 Clean, modern UI with Tailwind CSS
- ⚡ Dynamic routing for Pokémon detail pages
- 📊 Visual stat bars with type-based colors
- 🎯 Type badges with official Pokémon colors

## Technology Stack

- **Framework:** Next.js 16 (App Router)
- **Styling:** Tailwind CSS v4
- **Language:** TypeScript
- **API:** PokéAPI (https://pokeapi.co/)
- **Deployment:** Vercel

## Setup Instructions

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. **Download the project**
   - Download and extract the ZIP file
   - Or clone from repository if provided

2. **Navigate to project directory**
   ```bash
   cd pokemon-app
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   - Navigate to `http://localhost:3000`
   - The app should be running!

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
pokemon-app/
├── app/
│   ├── page.tsx              # Home page with Pokémon grid
│   ├── pokemon/
│   │   └── [id]/
│   │       └── page.tsx      # Dynamic Pokémon detail page
│   ├── layout.tsx            # Root layout
│   └── globals.css           # Global styles with design tokens
├── components/
│   ├── pokemon-card.tsx      # Reusable Pokémon card component
│   ├── search-bar.tsx        # Search input component
│   ├── stat-bar.tsx          # Stat visualization component
│   └── ui/                   # shadcn/ui components
├── lib/
│   ├── pokemon-api.ts        # API utility functions
│   └── utils.ts              # Helper utilities
└── README.md
```

## API Integration

This project uses the free PokéAPI (https://pokeapi.co/) to fetch Pokémon data:

- **List Endpoint:** `https://pokeapi.co/api/v2/pokemon?limit=150`
- **Detail Endpoint:** `https://pokeapi.co/api/v2/pokemon/{id}`

All API logic is separated in `lib/pokemon-api.ts` for maintainability.

## Key Features Explained

### 1. Pokémon List Page
- Displays first 150 Pokémon in a responsive grid
- Shows official artwork, name, ID, and types
- Real-time search filtering by name
- Pagination (20 Pokémon per page)

### 2. Pokémon Detail Page
- Dynamic routing via Next.js App Router
- Displays comprehensive stats (HP, Attack, Defense, etc.)
- Shows height and weight with proper units
- Type badges with official Pokémon colors
- Visual stat bars colored by primary type

### 3. UI/UX Design
- Modern, clean interface inspired by contemporary web design
- Smooth hover effects and transitions
- Fully responsive across all device sizes
- Accessible design with semantic HTML
- Professional color scheme with blue accents

### 4. Code Quality
- TypeScript for type safety
- Reusable React components
- Separated API logic from UI components
- Clean folder structure following Next.js conventions
- Proper error handling


## Performance Optimizations

- Image optimization with Next.js Image component
- Lazy loading for Pokémon images
- Efficient pagination to limit DOM nodes
- Proper use of React hooks to prevent unnecessary re-renders
- API response caching via Next.js fetch

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Credits

- **PokéAPI:** Free Pokémon data API (https://pokeapi.co/)
- **Next.js:** React framework by Vercel
- **Tailwind CSS:** Utility-first CSS framework
- **shadcn/ui:** Re-usable component collection

## Contact

For questions or feedback, please contact Himanshu Singh at himanshusingh1577@gmail.com

---

