# Metasoft Info - Complete CMS System

A full-stack Content Management System for company websites with a powerful admin panel. Built with NestJS backend and React frontend.

## 📁 Project Structure

```
metasoftinfo/
├── meta-backend/          # NestJS API backend
├── meta-frontend/         # React frontend
├── database.sql           # MySQL database export
├── DEPLOYMENT_GUIDE.md    # Production deployment guide
└── README.md             # This file
```

## 🚀 Quick Start

### 1. Database Setup

```bash
# Create MySQL database
mysql -u root -p
CREATE DATABASE metasoftinfo;
CREATE USER 'metasoft_admin'@'localhost' IDENTIFIED BY 'metasoft_dev123!';
GRANT ALL PRIVILEGES ON metasoftinfo.* TO 'metasoft_admin'@'localhost';
FLUSH PRIVILEGES;
EXIT;

# Import database
mysql -u metasoft_admin -p metasoftinfo < database.sql
# Password: metasoft_dev123!
```

### 2. Backend Setup

```bash
cd meta-backend
npm install
npm run start:dev
```

Backend will run on `http://localhost:3000`

### 3. Frontend Setup

```bash
cd meta-frontend
npm install
npm run dev
```

Frontend will run on `http://localhost:5173`

## 🔐 Default Login

- **URL**: http://localhost:5173/admin
- **Email**: admin@metasoftinfo.com
- **Password**: ChangeMe123!

**⚠️ Change these credentials immediately after first login!**

## 📚 Documentation

- [Backend README](./meta-backend/README.md) - API documentation, database schema
- [Frontend README](./meta-frontend/README.md) - UI components, routing
- [Deployment Guide](./DEPLOYMENT_GUIDE.md) - Production deployment steps

## 🎯 Features

### Content Management
- ✅ Services management
- ✅ Projects portfolio
- ✅ Client testimonials
- ✅ Custom pages with HTML editor
- ✅ Hero carousel with auto-rotation
- ✅ Process steps workflow
- ✅ Why choose us reasons
- ✅ Partner/client logos

### Admin Features
- ✅ User management with roles (Super Admin, Admin, Editor)
- ✅ Theme customization (colors, fonts)
- ✅ Site settings configuration
- ✅ Dynamic navbar menu
- ✅ Premium animated preloader
- ✅ Inline content editing
- ✅ Dashboard with statistics

### Technical Features
- ✅ JWT authentication
- ✅ Role-based access control
- ✅ RESTful API
- ✅ TypeORM with MySQL
- ✅ React 19 with Vite
- ✅ TypeScript throughout
- ✅ Responsive design
- ✅ Real-time updates

## 🛠️ Tech Stack

### Backend
- NestJS 11
- TypeORM 0.3
- MySQL 8
- Passport JWT
- bcrypt

### Frontend
- React 19
- Vite 7
- TypeScript 5
- React Router 7
- TanStack Query 5
- Tailwind CSS 3
- Axios

## 📦 Database Schema

13 main tables:
1. **users** - User accounts with roles
2. **service_offering** - Service listings
3. **project** - Portfolio projects
4. **testimonial** - Client testimonials
5. **theme_settings** - Theme customization
6. **hero_section** - Hero section settings
7. **hero_slide** - Hero carousel slides
8. **process_step** - Process/workflow steps
9. **why_choose_us** - Reasons to choose
10. **site_settings** - General settings
11. **navbar_menu** - Navigation menu
12. **page** - Custom pages
13. **partner** - Partner/client logos

## 🔧 Configuration

### Backend (.env)
```env
PORT=3000
DATABASE_HOST=127.0.0.1
DATABASE_PORT=3306
DATABASE_USER=metasoft_admin
DATABASE_PASSWORD=metasoft_dev123!
DATABASE_NAME=metasoftinfo
DATABASE_SYNCHRONIZE=true
JWT_SECRET=your-secret-key
ADMIN_DEFAULT_EMAIL=admin@metasoftinfo.com
ADMIN_DEFAULT_PASSWORD=ChangeMe123!
FRONTEND_URL=http://localhost:5173
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:3000
```

## 🚀 Production Deployment

See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for complete production deployment instructions including:
- Backend deployment with PM2
- Frontend deployment (Vercel/Netlify/Nginx)
- Nginx configuration
- SSL/HTTPS setup
- Security checklist
- Database backup strategies

## 👥 User Roles

| Role | Permissions |
|------|------------|
| **Super Admin** | Full access including user management |
| **Admin** | Manage all content, cannot manage users |
| **Editor** | Read-only access, view content only |

## 🔄 Development Workflow

1. **Start MySQL** - Ensure database is running
2. **Start Backend** - `cd meta-backend && npm run start:dev`
3. **Start Frontend** - `cd meta-frontend && npm run dev`
4. **Access Admin** - http://localhost:5173/admin
5. **Make Changes** - Edit code, auto-reload enabled
6. **Test** - Test functionality in browser
7. **Commit** - Commit changes to git

## 📝 Common Tasks

### Add New Content Type
1. Create entity in backend (src/entity-name/)
2. Create service, controller, module
3. Add API functions in frontend (src/api/)
4. Create UI components in AdminPage
5. Add to routing if needed

### Update Theme
1. Login as Admin
2. Go to Theme tab
3. Change colors using color picker
4. Click Save
5. Changes apply immediately

### Create New User
1. Login as Super Admin
2. Go to Users tab
3. Enter email, name, password
4. Select role
5. Click Add User

### Add Custom Page
1. Go to Pages tab
2. Enter title and slug
3. Add HTML content
4. Click Add Page
5. Optionally add to navbar menu

## 🐛 Troubleshooting

### Backend won't start
```bash
# Check if port 3000 is in use
lsof -i :3000
# Kill the process
kill -9 <PID>
```

### Database connection failed
- Check MySQL is running
- Verify credentials in .env
- Ensure database exists

### Login not working
- Clear browser localStorage
- Check backend is running
- Verify JWT_SECRET is set

### CORS errors
- Update FRONTEND_URL in backend .env
- Check CORS config in main.ts

## 📊 API Endpoints

See [Backend README](./meta-backend/README.md) for complete API documentation.

Main endpoints:
- `/auth/login` - Authentication
- `/api/users` - User management
- `/services` - Services CRUD
- `/projects` - Projects CRUD
- `/testimonials` - Testimonials CRUD
- `/api/hero` - Hero section
- `/api/pages` - Custom pages
- `/api/partners` - Partners/logos
- `/api/navbar-menu` - Navigation
- `/theme` - Theme settings

## 🔒 Security

- ✅ JWT token authentication
- ✅ Password hashing with bcrypt
- ✅ Role-based access control
- ✅ CORS protection
- ✅ SQL injection prevention (TypeORM)
- ✅ XSS protection
- ⚠️ Change default credentials
- ⚠️ Use strong JWT_SECRET
- ⚠️ Enable HTTPS in production

## 📈 Performance

- React code splitting
- API response caching (TanStack Query)
- Lazy loading images
- Database indexing
- Optimistic UI updates

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📄 License

MIT License - see LICENSE file for details

## 👨‍💻 Development Team

Built with ❤️ by Metasoft Info Team

## 📞 Support

For issues or questions:
- Create an issue in the repository
- Contact development team
- Check documentation in README files

## 🔄 Version History

### v1.0.0 (Current)
- ✅ Complete CMS system
- ✅ User management
- ✅ Theme customization
- ✅ Premium preloader
- ✅ Dynamic pages
- ✅ Partner management
- ✅ Production ready

### Upcoming Features
- 📝 Blog system
- 🖼️ Image upload to server
- 📧 Contact form
- 🔍 Search functionality
- 📊 Analytics dashboard

---

**Ready for Production! 🚀**

Follow the deployment guide for production setup.
