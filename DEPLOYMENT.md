# Deployment Guide for rchxtype

This guide provides instructions for deploying the rchxtype application to various platforms.

## Prerequisites

1. **Environment Variables**: Copy `.env.example` to `.env` and configure:
   - `MONGODB_URI`: Your MongoDB connection string
   - `JWT_SECRET`: A secure random string for JWT tokens
   - `OPENAI_API_KEY`: Your OpenAI API key
   - External service credentials (Spotify, YouTube, LinkedIn, Meta)

2. **Database**: Set up a MongoDB database (MongoDB Atlas recommended for production)

## Deployment Options

### 1. Vercel (Recommended for Full-Stack)

**Advantages**: 
- Free tier available
- Automatic deployments from GitHub
- Built-in CI/CD
- Serverless functions
- Global CDN

**Steps**:
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy

**Configuration**: Already configured with `vercel.json`

### 2. Railway

**Advantages**:
- Easy deployment
- Built-in database support
- Automatic HTTPS
- Good for full-stack apps

**Steps**:
1. Install Railway CLI: `npm i -g @railway/cli`
2. Login: `railway login`
3. Initialize: `railway init`
4. Set environment variables: `railway variables set`
5. Deploy: `railway up`

**Configuration**: Already configured with `railway.json`

### 3. Heroku

**Advantages**:
- Mature platform
- Good documentation
- Add-ons available

**Steps**:
1. Install Heroku CLI
2. Login: `heroku login`
3. Create app: `heroku create your-app-name`
4. Set environment variables: `heroku config:set`
5. Deploy: `git push heroku main`

**Configuration**: Already configured with `Procfile`

### 4. Netlify (Frontend Only)

**Advantages**:
- Excellent for static sites
- Free tier
- Automatic deployments

**Steps**:
1. Push code to GitHub
2. Connect repository to Netlify
3. Set build settings:
   - Build command: `cd client && npm run build`
   - Publish directory: `client/build`
4. Set environment variables

**Configuration**: Already configured with `netlify.toml`

## Environment Variables

Set these in your deployment platform:

```bash
# Required
NODE_ENV=production
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secure_jwt_secret
OPENAI_API_KEY=your_openai_api_key

# Optional
CORS_ORIGIN=https://your-frontend-domain.com
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# External Services (configure as needed)
SPOTIFY_CLIENT_ID=your_spotify_client_id
SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
YOUTUBE_API_KEY=your_youtube_api_key
LINKEDIN_CLIENT_ID=your_linkedin_client_id
LINKEDIN_CLIENT_SECRET=your_linkedin_client_secret
META_APP_ID=your_meta_app_id
META_APP_SECRET=your_meta_app_secret
```

## Database Setup

### MongoDB Atlas (Recommended)

1. Create account at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a new cluster
3. Set up database access (username/password)
4. Set up network access (IP whitelist or 0.0.0.0/0 for all)
5. Get connection string and add to environment variables

### Local MongoDB

For development only:
```bash
# Install MongoDB locally
# Start MongoDB service
# Connection string: mongodb://localhost:27017/rchxtype
```

## Build and Deploy Commands

### Local Development
```bash
# Install dependencies
npm run install-all

# Start development server
npm run dev
```

### Production Build
```bash
# Install dependencies
npm run install-all

# Build frontend
npm run build

# Start production server
npm start
```

## Post-Deployment Checklist

1. ✅ Environment variables configured
2. ✅ Database connected and accessible
3. ✅ API endpoints responding (test `/health`)
4. ✅ Frontend loading correctly
5. ✅ Authentication working
6. ✅ External integrations configured (if using)
7. ✅ SSL/HTTPS enabled
8. ✅ Domain configured (if using custom domain)

## Monitoring and Maintenance

### Health Checks
- Monitor `/health` endpoint
- Set up uptime monitoring
- Configure error tracking (Sentry, LogRocket, etc.)

### Performance
- Enable compression (already configured)
- Use CDN for static assets
- Monitor database performance
- Set up caching strategies

### Security
- Regular dependency updates
- Security headers (already configured with helmet)
- Rate limiting (already configured)
- Input validation (already configured)

## Troubleshooting

### Common Issues

1. **Build Failures**
   - Check Node.js version compatibility
   - Verify all dependencies are installed
   - Check for syntax errors

2. **Database Connection Issues**
   - Verify MongoDB URI format
   - Check network access settings
   - Ensure database is running

3. **Environment Variables**
   - Verify all required variables are set
   - Check for typos in variable names
   - Ensure proper formatting

4. **CORS Issues**
   - Verify CORS_ORIGIN is set correctly
   - Check frontend domain matches

### Support

For deployment issues:
1. Check platform-specific logs
2. Verify environment variables
3. Test locally first
4. Check platform documentation

## Custom Domain Setup

### Vercel
1. Add custom domain in Vercel dashboard
2. Configure DNS records as instructed
3. Wait for propagation (up to 48 hours)

### Netlify
1. Add custom domain in Netlify dashboard
2. Configure DNS records
3. Enable HTTPS

### Heroku
1. Add custom domain: `heroku domains:add yourdomain.com`
2. Configure DNS records
3. Enable SSL: `heroku certs:auto:enable` 