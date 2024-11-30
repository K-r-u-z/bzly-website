# BZLY Website

A modern, responsive website built for musicians/bands using Next.js 14, featuring a rich content management system, news articles, music releases, and more. Heavily created by Cursor AI to show its capabilities.

## 🌟 Features

### Dynamic News System
- Rich text editor for creating and editing news articles
- Support for formatted text, images, and media
- Category-based organization (Release, Tour, Update, Announcement, Launch)
- Featured image support
- Excerpt and preview functionality

### Music Management
- Album catalog management
- Track listing support
- Streaming links integration
- Cover art management
- Release date tracking

### Contact System
- Fully functional contact form with email integration
- Subject categorization (Booking, Press, General inquiries)
- Automated email notifications via Resend
- Custom domain email support
- Social media integration
- Success/error state handling

### Admin Dashboard
- Secure JWT authentication
- Content management interface
- Real-time preview
- Image upload support
- Intuitive editing tools

### Modern UI/UX
- Responsive design for all devices
- Interactive particle effects
- Smooth animations
- Dark theme optimized
- Gradient accents

## 💻 Tech Stack

### Frontend
- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- React Quill
- Framer Motion

### Backend
- MongoDB
- Node.js
- JWT Authentication
- Next.js API Routes

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- MongoDB database (local or Atlas)
- Git

### Installation Steps

1. Clone the repository:
- git clone https://github.com/yourusername/bzly-website.git
- cd bzly-website

2. Install dependencies:
- npm install

3. Set up environment variables:
- Create a `.env.local` file with:
    - JWT_SECRET=your-secure-secret-key
    - ADMIN_USERNAME=your-admin-username
    - ADMIN_PASSWORD=your-admin-password
    - MONGODB_URI=your-mongodb-connection-string
    - NEXT_PUBLIC_BASE_URL=http://localhost:3000
    - RESEND_API_KEY=your-resend-api-key
    - CONTACT_EMAIL=your-email@example.com

4. Start the development server:
- npm run dev

Visit `http://localhost:3000` to see your site.


## 📝 Usage

### Admin Access
1. Navigate to `/admin`
2. Log in with credentials from `.env.local`
3. Access dashboard at `/admin/dashboard`

### Content Management
1. News Articles
   - Create/Edit/Delete articles
   - Add rich text content
   - Upload images
   - Set categories

2. Music Content
   - Manage albums
   - Add/Edit tracks
   - Update streaming links
   - Upload cover art

## 🎨 Customization

### Styling
- Modify `tailwind.config.js` for theme
- Update component styles
- Customize animations

### Content Structure
- Edit MongoDB models
- Modify API routes
- Update TypeScript types

## 📱 Responsive Design
- Mobile-first approach
- Tablet optimization
- Desktop enhancement
- Dynamic layouts

## 🔒 Security Features
- JWT authentication
- Secure API routes
- Environment variable protection
- MongoDB security

## 🚀 Deployment

### Vercel Deployment
1. Connect to GitHub
2. Configure environment variables
3. Deploy

### Manual Deployment
1. Build:
- npm run build

2. Start:
- npm run start


## 🤝 Contributing
1. Fork repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Open pull request

## 📄 License
MIT License - feel free to use for your own projects.

## 🆘 Support
For support:
- Open GitHub issue

## 🙏 Acknowledgments
- Cursor AI (MAJORITY OF THE CODE)
- Next.js team
- Vercel platform
- MongoDB Atlas
- React Quill
- Open source community
- Resend

---

Made by Kruz