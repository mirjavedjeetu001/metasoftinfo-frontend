# Metasoft Info - Frontend CMS

A modern, responsive React frontend for the Metasoft Info CMS system. Built with React 19, Vite 7, TypeScript, and Tailwind CSS.

## 🚀 Features

- **Modern React 19**: Latest React with Vite for lightning-fast development
- **Admin CMS Panel**: Complete content management interface
- **User Management**: Role-based access with Super Admin, Admin, and Editor roles
- **Dynamic Content**: Services, Projects, Testimonials, Pages
- **Hero Carousel**: Auto-rotating image slides with navigation
- **Theme Customization**: Live theme editor with color picker
- **Responsive Design**: Mobile-first, works on all devices
- **Premium Preloader**: Animated loading screen with customization
- **Rich Text Editor**: HTML content editor for pages
- **Image Management**: URL-based image uploads
- **Real-time Updates**: TanStack Query for data synchronization

## 📋 Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Backend API running (see meta-backend README)

## 🛠️ Installation

1. **Navigate to frontend directory**
   ```bash
   cd metasoftinfo/meta-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment**
   
   Create `.env` file in the root:
   ```env
   VITE_API_URL=http://localhost:3000
   ```
   
   For production:
   ```env
   VITE_API_URL=https://api.yourdomain.com
   ```

## 🏃 Running the Application

### Development mode
```bash
npm run dev
```
The application will be available at `http://localhost:5173`

### Build for production
```bash
npm run build
```
Output will be in the `dist/` directory

### Preview production build
```bash
npm run preview
```

## 📱 Pages & Routes

### Public Pages
- `/` - Home page with hero, services, projects, testimonials
- `/services` - Services listing page
- `/services/:id` - Individual service detail page
- `/projects` - Projects portfolio page
- `/projects/:id` - Individual project detail page
- `/testimonials` - All testimonials page
- `/page/:slug` - Custom pages (About, Contact, etc.)

### Admin Panel
- `/admin` - CMS Dashboard (requires login)
  - **Dashboard** - Overview statistics
  - **Hero** - Manage hero section and slides
  - **Process Steps** - Workflow/process management
  - **Why Choose Us** - Reasons to choose company
  - **Services** - Service offerings CRUD
  - **Projects** - Portfolio projects CRUD
  - **Testimonials** - Client testimonials CRUD
  - **Partners** - Company logos management
  - **Pages** - Custom pages with HTML editor
  - **Navbar Menu** - Navigation menu management
  - **Users** - User management (Super Admin only)
  - **Site Settings** - General settings & preloader
  - **Theme** - Color and font customization

## 🔐 Authentication

### Default Login Credentials
- **Email**: `admin@metasoftinfo.com`
- **Password**: `ChangeMe123!`

### User Roles
- **Super Admin**: Full access including user management
- **Admin**: Manage content, cannot manage users
- **Editor**: View-only access

## 🎨 Theme Customization

The CMS allows customization of:
- Primary, Secondary, Accent colors
- Background and Text colors
- Font family (Google Fonts support)
- Font sizes and line heights

Changes are saved to the database and applied site-wide.

## 🔄 Preloader Settings

Customize the premium animated preloader:
- **Enable/Disable**: Toggle preloader on/off
- **Text**: Change displayed text (e.g., "Metasoft Info")
- **Duration**: Set duration (1000-5000ms)

Preloader features:
- Gradient text animation
- Progress bar (0-100%)
- Floating particles
- Spinning ring overlay

## 📦 Project Structure

```
meta-frontend/
├── src/
│   ├── components/
│   │   ├── Navbar.tsx              # Navigation component
│   │   ├── Footer.tsx              # Footer component
│   │   └── Preloader.tsx           # Premium preloader
│   ├── pages/
│   │   ├── HomePage.tsx            # Landing page
│   │   ├── AdminPage.tsx           # CMS dashboard
│   │   ├── ServicesPage.tsx        # Services listing
│   │   ├── ProjectsPage.tsx        # Projects listing
│   │   ├── TestimonialsPage.tsx    # Testimonials listing
│   │   ├── ServiceDetailPage.tsx   # Service details
│   │   ├── ProjectDetailPage.tsx   # Project details
│   │   └── CustomPage.tsx          # Dynamic custom pages
│   ├── api/
│   │   ├── auth.ts                 # Authentication API
│   │   ├── cms.ts                  # CMS API calls
│   │   └── content.ts              # Content API calls
│   ├── auth/
│   │   └── AuthProvider.tsx        # Auth context
│   ├── App.tsx                     # Main app component
│   ├── main.tsx                    # Entry point
│   └── index.css                   # Global styles
├── .env                            # Environment variables
├── vite.config.ts                  # Vite configuration
├── tailwind.config.js              # Tailwind CSS config
└── README.md                       # This file
```

## 🛠️ Tech Stack

- **React** 19.x - UI library
- **Vite** 7.x - Build tool & dev server
- **TypeScript** 5.x - Type safety
- **React Router** 7.x - Routing
- **TanStack Query** 5.x - Data fetching & caching
- **Axios** 1.x - HTTP client
- **Tailwind CSS** 3.x - Utility-first CSS
- **Lucide React** - Icon library

## 🎯 Key Features Explained

### Admin CMS Panel
- Tab-based interface for easy navigation
- Inline editing for quick updates
- Real-time validation
- Optimistic UI updates
- Automatic cache invalidation

### Hero Section Management
- Multiple slides support
- Auto-rotation with configurable interval
- Individual slide enable/disable
- Order management
- Caption and CTA button per slide

### Dynamic Pages
- Create custom pages with HTML content
- URL slug-based routing
- Rich text editing
- Add pages to navbar automatically

### Services & Projects
- Grid layout with responsive design
- Featured images
- Tags/categories
- Live URLs for projects
- Detail pages with full content

### User Management (Super Admin)
- Create users with roles
- Update user information
- Optional password update
- Cannot delete yourself
- Shows creation and last login dates

## 🔧 Development Tips

### Adding New API Endpoints
1. Add function to `src/api/cms.ts` or `src/api/content.ts`
2. Use axios with JWT token from localStorage
3. Add TypeScript types for request/response

### Creating New Pages
1. Create component in `src/pages/`
2. Add route in `src/App.tsx`
3. Import and configure route

### Styling Components
- Use Tailwind CSS utility classes
- Responsive breakpoints: `sm:`, `md:`, `lg:`, `xl:`, `2xl:`
- Dark mode support: `dark:` prefix
- Custom colors in `tailwind.config.js`

## 🐛 Common Issues

### API Connection Refused
- Ensure backend is running on port 3000
- Check `VITE_API_URL` in `.env`
- Verify CORS settings in backend

### Login Not Working
- Clear browser localStorage
- Check network tab for 401 errors
- Verify JWT_SECRET matches backend

### Images Not Loading
- Use absolute URLs for images
- Check image URLs are accessible
- Verify CORS headers for external images

## 📊 Performance

- **Code Splitting**: Automatic route-based splitting
- **Lazy Loading**: Components loaded on demand
- **Caching**: TanStack Query caches API responses
- **Optimistic Updates**: UI updates before API confirmation
- **Image Optimization**: Lazy loading images

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Vercel
```bash
vercel --prod
```

### Deploy to Netlify
```bash
netlify deploy --prod --dir=dist
```

### Deploy to Nginx
1. Build the application: `npm run build`
2. Copy `dist/` contents to `/var/www/html/`
3. Configure Nginx (see DEPLOYMENT_GUIDE.md)

## 🔒 Security

- JWT tokens stored in localStorage
- Automatic token refresh
- Protected routes require authentication
- Role-based access control
- HTTPS recommended for production

## 📝 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| VITE_API_URL | Backend API URL | http://localhost:3000 |

## 🤝 Contributing

1. Create a feature branch
2. Follow TypeScript best practices
3. Use Tailwind CSS for styling
4. Test on multiple screen sizes
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details

## 🎨 Design System

### Colors
- Primary: Blue (#3B82F6)
- Secondary: Purple (#8B5CF6)
- Accent: Pink (#EC4899)
- Success: Green (#10B981)
- Warning: Yellow (#F59E0B)
- Danger: Red (#EF4444)

### Typography
- Headings: Bold, larger sizes
- Body: Regular weight, comfortable line height
- Code: Monospace font

### Spacing
- Consistent spacing scale (4px base)
- Generous padding and margins
- Responsive spacing

## 📞 Support

For issues or questions, please create an issue in the repository.

## 🔄 Updates

### Recent Changes
- ✅ Added premium preloader with customization
- ✅ Implemented user management system
- ✅ Added partner/logo management
- ✅ Created dynamic pages system
- ✅ Built theme customization
- ✅ Added inline editing for all content

### Upcoming Features
- 📝 Blog system
- 🖼️ Image upload to server
- 📧 Contact form with email
- 🔍 Search functionality
- 📱 Mobile app version

---

**Built with ❤️ by Metasoft Info Team**
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
