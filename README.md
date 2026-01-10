# Education Marketplace Platform

A premium education marketplace platform connecting students with coaching institutes across India. Features advanced search, filtering, course management, and multi-role dashboards.


EducationMarketplace is an independent online platform designed to bridge the gap between students and coaching institutes.
The platform allows students to search coaching institutes, filter by category (IT, JEE, NEET, Foundation), compare courses, view ratings, reviews, success rates, and directly contact institutes.
Coaching institutes can register, create public profiles, showcase courses, add fees, duration, batch timings, and receive student inquiries, making it a complete education discovery marketplace.

## Features

### For Students
- **Browse & Search**: Discover coaching institutes across categories (IT, JEE, NEET, Foundation)
- **Advanced Filtering**: Filter by category, location, rating, and verification status
- **Detailed Profiles**: View institute information, courses, reviews, and gallery
- **Student Dashboard**: Track enrolled courses, manage wishlist, and monitor progress
- **Reviews & Ratings**: Read authentic reviews from other students

### For Institutes
- **Institute Dashboard**: Manage your profile and course offerings
- **Course Management**: Add, edit, and organize courses with pricing
- **Student Analytics**: Track enrollments and revenue
- **Review Management**: Respond to student feedback

### For Admins
- **Platform Overview**: Monitor total users, institutes, and courses
- **Approval System**: Review and approve new institute registrations
- **User Management**: Manage students, institutes, and content
- **Analytics**: Track platform performance and engagement

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm, yarn, or pnpm

### Installation

1. **Clone or download the project**
   ```bash
   # If using GitHub
   git clone <repository-url>
   cd education-marketplace
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
education-marketplace/
├── app/                          # Next.js App Router pages
│   ├── page.tsx                 # Homepage
│   ├── loading.tsx              # Loading state
│   ├── layout.tsx               # Root layout
│   ├── globals.css              # Global styles & theme
│   ├── institutes/              # Institute pages
│   │   ├── page.tsx            # Listing page
│   │   ├── loading.tsx         # Loading state
│   │   └── [id]/               # Dynamic institute profile
│   │       ├── page.tsx        # Profile page
│   │       └── loading.tsx     # Loading state
│   ├── student/                 # Student section
│   │   └── dashboard/          # Student dashboard
│   │       ├── page.tsx
│   │       └── loading.tsx
│   ├── institute/               # Institute section
│   │   └── dashboard/          # Institute dashboard
│   │       ├── page.tsx
│   │       └── loading.tsx
│   └── admin/                   # Admin section
│       └── dashboard/           # Admin dashboard
│           ├── page.tsx
│           └── loading.tsx
├── components/                   # React components
│   ├── ui/                      # shadcn/ui components
│   └── institute-card.tsx       # Custom components
├── lib/                          # Utilities & helpers
│   ├── types.ts                 # TypeScript interfaces
│   ├── mock-data.ts             # Sample data
│   └── utils/
│       └── filters.ts           # Filter utilities
├── public/                       # Static assets
│   └── *.jpg, *.png            # Images
└── README.md                     # This file
```

## Available Routes

### Public Pages
- `/` - Homepage with hero, categories, and featured institutes
- `/institutes` - Browse all institutes with search and filters
- `/institutes/[id]` - View detailed institute profile

### Student Pages
- `/student/dashboard` - Student dashboard (enrolled courses, wishlist)

### Institute Pages
- `/institute/dashboard` - Institute management dashboard

### Admin Pages
- `/admin/dashboard` - Platform administration panel

## Mock Data

The application uses mock data located in `lib/mock-data.ts`. This includes:

- **10 Sample Institutes** covering IT, JEE, NEET, and Foundation categories
- **30+ Courses** with various durations and pricing
- **User Data** for students, institutes, and admins
- **Reviews & Ratings** across all institutes
- **Enrollments** showing active student participation

### Sample Institute IDs

You can navigate to these institute profiles directly:
- `/institutes/1` - Tech Academy Pro
- `/institutes/2` - Allen Career Institute
- `/institutes/3` - FIITJEE Delhi
- `/institutes/4` - Aakash Institute
- `/institutes/5` - Resonance Kota

## Customization

### Theme & Colors

Edit `app/globals.css` to customize the color scheme:

```css
@theme inline {
  /* Primary royal blue theme */
  --color-primary: oklch(0.55 0.18 255);
  --color-primary-foreground: oklch(0.98 0 0);
  
  /* Add your custom colors here */
}
```

### Adding Real Data

To connect a real database:

1. Replace mock data imports in pages with API calls
2. Set up API routes in `app/api/`
3. Configure database integration (Supabase, Neon, etc.)
4. Update types in `lib/types.ts` as needed

### Environment Variables

Create a `.env.local` file for environment variables:

```env
# Database (when using real data)
DATABASE_URL=your_database_url

# Add other environment variables as needed
```

## Features in Detail

### Search & Filter System
- Real-time search across institute names and descriptions
- Multi-criteria filtering (category, location, rating, verification)
- Active filter badges with one-click removal
- Sort by rating, students, or recent additions

### Institute Profiles
- Comprehensive overview with amenities and facilities
- Course listings with enrollment options
- Student reviews with rating distribution
- Photo gallery and contact information

### Dashboard Features
- Role-specific views (Student, Institute, Admin)
- Analytics and statistics
- Course progress tracking
- Enrollment management

## Building for Production

```bash
npm run build
npm start
```

This creates an optimized production build in the `.next` directory.

## Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Import the repository in Vercel
3. Vercel will automatically detect Next.js and configure build settings
4. Deploy with one click

### Other Platforms

The application can be deployed to any platform supporting Next.js:
- Netlify
- Railway
- AWS Amplify
- Digital Ocean

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

This project was scaffolded from a starter; feel free to customize and extend it for your needs.

## License

This project is provided as-is for educational and commercial use.

## Support

For issues or questions about the codebase, please review the code structure and mock data files.

---

Built with Autonomous Group 
if you Want the Fully Project then Conntact Me on rohananilkhachane@gmail.com /❤️
