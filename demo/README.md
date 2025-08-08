# RCHXTYPE Demo

A standalone demo of the RCHXTYPE AI Personality Profiling Platform.

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Local Development
```bash
# Install dependencies
npm install

# Start development server
npm start

# Or run in demo mode
npm run demo
```

The app will open at `http://localhost:3000`

## 🔐 Demo Credentials

**Login:**
- Email: `demo@rchxtype.com`
- Password: `demo123`

**Register:** Use any email/password combination

## 🎯 Demo Features

- ✅ **Landing Page** - Impressive dark-themed landing with animations
- ✅ **Authentication** - Login/Register with mock backend
- ✅ **Dashboard** - Overview with statistics and quick actions
- ✅ **Profile Management** - Edit personal information and bio
- ✅ **Personality Analysis** - View Big Five traits and insights
- ✅ **External Integrations** - Connect Spotify, YouTube, LinkedIn, Meta
- ✅ **User Matching** - Discover and connect with other users
- ✅ **Connections** - Manage your network and requests
- ✅ **Responsive Design** - Works on all devices
- ✅ **Dark Theme** - Consistent dark color palette

## 🛠️ Tech Stack

- **React 18** - Modern React with hooks
- **React Router** - Client-side routing
- **Styled Components** - Component-based styling
- **Framer Motion** - Smooth animations
- **React Hook Form** - Form management
- **React Query** - Data fetching
- **React Hot Toast** - Notifications

## 📁 Project Structure

```
demo/
├── public/
│   ├── index.html
│   └── _redirects
├── src/
│   ├── components/
│   ├── contexts/
│   ├── pages/
│   ├── styles/
│   ├── App.js
│   └── index.js
├── package.json
├── netlify.toml
└── README.md
```

## 🌐 Deployment

### Netlify (Recommended)

1. **Connect to GitHub:**
   - Go to [Netlify](https://netlify.com)
   - Click "New site from Git"
   - Choose GitHub and select your repository

2. **Configure Build Settings:**
   - **Base directory:** `demo`
   - **Build command:** `npm run build`
   - **Publish directory:** `build`

3. **Environment Variables:**
   - `REACT_APP_DEMO_MODE=true`
   - `REACT_APP_API_URL=https://mock-api.rchxtype.com`

4. **Deploy:**
   - Click "Deploy site"
   - Your demo will be live in minutes!

### Manual Deployment

```bash
# Build the project
npm run build

# Deploy to Netlify CLI
npm install -g netlify-cli
netlify deploy --dir=build --prod
```

## 🎨 Design System

- **Colors:** Dark theme with deep grays and blues
- **Typography:** Inter font family
- **Animations:** Smooth, liquid transitions
- **Layout:** Responsive grid system
- **Components:** Reusable, accessible components

## 🔧 Customization

### Adding New Pages
1. Create component in `src/pages/`
2. Add route in `src/App.js`
3. Add navigation link in `src/components/Layout.js`

### Modifying Mock Data
- Edit `src/contexts/AuthContext.js` for user data
- Update mock responses in API service files

### Styling Changes
- Modify `src/styles/theme.js` for design tokens
- Update `src/styles/global.css` for global styles

## 📱 Mobile Support

- Responsive design for all screen sizes
- Touch-friendly interactions
- Optimized performance
- Progressive Web App ready

## 🚀 Performance

- Code splitting with React Router
- Optimized bundle size
- Lazy loading for components
- Efficient re-renders with React.memo

## 🔒 Security

- Content Security Policy headers
- XSS protection
- Secure redirects
- Input validation

## 📞 Support

For questions or issues:
- Check the main project README
- Review the demo code structure
- Test with different browsers/devices

---

**Demo Version:** 1.0.0  
**Last Updated:** January 2024
