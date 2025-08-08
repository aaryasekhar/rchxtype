# rchxtype

An AI-driven platform that assigns unique personality profiles to users by analyzing data gathered from their inputs and linked external accounts (Spotify, YouTube, LinkedIn, Meta services, News apps, and others). The system builds detailed user profiles and enables connecting users with similar interests or opinions based on this data.

## 🌟 Features

### Phase One Core Features
- **User Authentication**: Secure registration and login system
- **Personality Profiling**: AI-powered analysis of user inputs and external data
- **External Account Integration**: Connect Spotify, YouTube, LinkedIn, Meta services, News apps
- **Smart Matching**: Algorithm to identify and connect users with similar profiles
- **Dynamic Profile Updates**: Continuous refinement of user profiles based on new data
- **Privacy-First Design**: Secure data collection and storage following best practices

### UI/UX Design
- **Minimalist Dark Theme**: Deep dark grays and blues with mysterious elements
- **Liquid Animations**: Smooth, immersive transitions and interactions
- **Responsive Design**: Mobile-friendly interface
- **Bold Typography**: Large, highly readable fonts
- **Intuitive Navigation**: Clean user flow

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- MongoDB
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd rchxtype
   ```

2. **Install dependencies**
   ```bash
   npm run install-all
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Start development servers**
   ```bash
   npm run dev
   ```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## 🏗️ Project Structure

```
rchxtype/
├── client/                 # React frontend
│   ├── public/
│   └── src/
│       ├── components/     # Reusable UI components
│       ├── pages/         # Page components
│       ├── hooks/         # Custom React hooks
│       ├── services/      # API services
│       ├── utils/         # Utility functions
│       └── styles/        # Global styles and themes
├── server/                # Node.js/Express backend
│   ├── config/           # Configuration files
│   ├── controllers/      # Route controllers
│   ├── middleware/       # Custom middleware
│   ├── models/          # MongoDB schemas
│   ├── routes/          # API routes
│   ├── services/        # Business logic
│   └── utils/           # Utility functions
├── docs/                # Documentation
└── scripts/             # Build and deployment scripts
```

## 🎭 Demo

### Quick Demo

Run the demo script to see the UI in action:
```bash
./demo.sh
```

This will start a local development server with mock data, allowing you to explore all the UI components without requiring any backend setup or API keys.

### Demo Features
- **Beautiful Dark Theme**: Immersive UI with smooth animations
- **Mock Data**: Realistic user profiles and interactions
- **Personality Profiling**: Interactive personality analysis interface
- **External Integrations**: Spotify, YouTube, LinkedIn, Meta showcase
- **User Matching**: Discover and connect with other users
- **Responsive Design**: Works perfectly on all devices

### Demo Access
- **Local Demo**: http://localhost:3000
- **Demo Login**: Use any email/password combination

### Online Demo Deployment

To deploy your demo online for easy sharing:

```bash
# Option 1: Vercel (Recommended)
./deploy-demo.sh

# Option 2: Manual deployment
npm run build
# Then upload client/build/ to any static hosting service
```

For detailed deployment instructions, see [DEMO-DEPLOYMENT.md](./DEMO-DEPLOYMENT.md).

## 🌐 Deployment

### Quick Deploy

Run the deployment script to get started:
```bash
./deploy.sh
```

### Deployment Options

- **Vercel** (Recommended): Full-stack deployment with automatic CI/CD
- **Railway**: Easy deployment with built-in database support
- **Heroku**: Mature platform with extensive add-ons
- **Netlify**: Frontend-only deployment with excellent static site support

For detailed deployment instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md).

### Live Demo

🚀 **Deploy your own instance:**
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/rchxtype)

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/rchxtype

# JWT Secret
JWT_SECRET=your-super-secret-jwt-key

# OpenAI Configuration
OPENAI_API_KEY=your-openai-api-key

# External API Keys
SPOTIFY_CLIENT_ID=your-spotify-client-id
SPOTIFY_CLIENT_SECRET=your-spotify-client-secret
YOUTUBE_API_KEY=your-youtube-api-key
LINKEDIN_CLIENT_ID=your-linkedin-client-id
LINKEDIN_CLIENT_SECRET=your-linkedin-client-secret

# Security
CORS_ORIGIN=http://localhost:3000
```

## 🎯 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/profile` - Get user profile

### Personality Profiling
- `POST /api/personality/analyze` - Analyze user inputs
- `GET /api/personality/profile` - Get user personality profile
- `PUT /api/personality/update` - Update personality profile

### External Integrations
- `POST /api/integrations/spotify` - Connect Spotify account
- `POST /api/integrations/youtube` - Connect YouTube account
- `POST /api/integrations/linkedin` - Connect LinkedIn account
- `GET /api/integrations/data` - Get integrated data

### Matching
- `GET /api/matching/suggestions` - Get user matching suggestions
- `POST /api/matching/connect` - Connect with another user

## 🔮 Future Roadmap

### Phase Two Features
- Personified shopping recommendations
- Personalized feed generation
- Job finding services
- Unique search engine
- Brand-building features
- Monetization services
- Community expansion

### Technical Enhancements
- Real-time messaging
- Advanced AI models
- Machine learning optimization
- Mobile applications
- API marketplace

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support, email support@rchxtype.com or create an issue in the repository.

---

**Built with ❤️ by the rchxtype team** 