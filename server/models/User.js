const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  // Basic user information
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
    maxlength: 30
  },
  password: {
    type: String,
    required: true,
    minlength: 8
  },
  firstName: {
    type: String,
    required: true,
    trim: true,
    maxlength: 50
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    maxlength: 50
  },
  
  // Profile information
  avatar: {
    type: String,
    default: null
  },
  bio: {
    type: String,
    maxlength: 500,
    default: ''
  },
  location: {
    type: String,
    maxlength: 100,
    default: ''
  },
  dateOfBirth: {
    type: Date,
    default: null
  },
  
  // Account status and verification
  isVerified: {
    type: Boolean,
    default: false
  },
  isActive: {
    type: Boolean,
    default: true
  },
  lastLogin: {
    type: Date,
    default: Date.now
  },
  
  // Personality profile data
  personalityProfile: {
    // Big Five personality traits
    openness: {
      score: { type: Number, min: 0, max: 100, default: 50 },
      confidence: { type: Number, min: 0, max: 100, default: 0 },
      lastUpdated: { type: Date, default: Date.now }
    },
    conscientiousness: {
      score: { type: Number, min: 0, max: 100, default: 50 },
      confidence: { type: Number, min: 0, max: 100, default: 0 },
      lastUpdated: { type: Date, default: Date.now }
    },
    extraversion: {
      score: { type: Number, min: 0, max: 100, default: 50 },
      confidence: { type: Number, min: 0, max: 100, default: 0 },
      lastUpdated: { type: Date, default: Date.now }
    },
    agreeableness: {
      score: { type: Number, min: 0, max: 100, default: 50 },
      confidence: { type: Number, min: 0, max: 100, default: 0 },
      lastUpdated: { type: Date, default: Date.now }
    },
    neuroticism: {
      score: { type: Number, min: 0, max: 100, default: 50 },
      confidence: { type: Number, min: 0, max: 100, default: 0 },
      lastUpdated: { type: Date, default: Date.now }
    },
    
    // Custom personality dimensions
    interests: [{
      category: { type: String, required: true },
      tags: [String],
      confidence: { type: Number, min: 0, max: 100, default: 0 },
      lastUpdated: { type: Date, default: Date.now }
    }],
    
    // Personality insights
    insights: [{
      type: { type: String, required: true }, // 'strength', 'preference', 'tendency'
      title: { type: String, required: true },
      description: { type: String, required: true },
      confidence: { type: Number, min: 0, max: 100, default: 0 },
      createdAt: { type: Date, default: Date.now }
    }],
    
    // Communication style
    communicationStyle: {
      primary: { type: String, enum: ['analytical', 'expressive', 'amiable', 'driver'], default: 'analytical' },
      secondary: { type: String, enum: ['analytical', 'expressive', 'amiable', 'driver'], default: 'analytical' },
      confidence: { type: Number, min: 0, max: 100, default: 0 }
    },
    
    // Decision making style
    decisionMaking: {
      style: { type: String, enum: ['rational', 'intuitive', 'dependent', 'avoidant'], default: 'rational' },
      confidence: { type: Number, min: 0, max: 100, default: 0 }
    },
    
    // Work style preferences
    workStyle: {
      collaboration: { type: Number, min: 0, max: 100, default: 50 },
      autonomy: { type: Number, min: 0, max: 100, default: 50 },
      structure: { type: Number, min: 0, max: 100, default: 50 },
      innovation: { type: Number, min: 0, max: 100, default: 50 }
    },
    
    // Social preferences
    socialPreferences: {
      groupSize: { type: String, enum: ['small', 'medium', 'large', 'mixed'], default: 'medium' },
      interactionStyle: { type: String, enum: ['introverted', 'ambiverted', 'extroverted'], default: 'ambiverted' },
      leadershipTendency: { type: String, enum: ['follower', 'collaborator', 'leader'], default: 'collaborator' }
    },
    
    // Last comprehensive update
    lastComprehensiveUpdate: {
      type: Date,
      default: Date.now
    },
    
    // Profile completion percentage
    completionPercentage: {
      type: Number,
      min: 0,
      max: 100,
      default: 0
    }
  },
  
  // External integrations
  integrations: {
    spotify: {
      connected: { type: Boolean, default: false },
      accessToken: { type: String, default: null },
      refreshToken: { type: String, default: null },
      expiresAt: { type: Date, default: null },
      profileData: {
        id: String,
        displayName: String,
        email: String,
        country: String,
        product: String,
        images: [String]
      },
      listeningData: {
        topTracks: [{
          id: String,
          name: String,
          artist: String,
          album: String,
          popularity: Number,
          addedAt: { type: Date, default: Date.now }
        }],
        topArtists: [{
          id: String,
          name: String,
          genres: [String],
          popularity: Number,
          addedAt: { type: Date, default: Date.now }
        }],
        playlists: [{
          id: String,
          name: String,
          description: String,
          trackCount: Number,
          addedAt: { type: Date, default: Date.now }
        }],
        lastSync: { type: Date, default: null }
      }
    },
    
    youtube: {
      connected: { type: Boolean, default: false },
      accessToken: { type: String, default: null },
      refreshToken: { type: String, default: null },
      expiresAt: { type: Date, default: null },
      profileData: {
        id: String,
        displayName: String,
        email: String,
        channelId: String
      },
      viewingData: {
        watchHistory: [{
          videoId: String,
          title: String,
          channelTitle: String,
          category: String,
          watchedAt: { type: Date, default: Date.now }
        }],
        subscriptions: [{
          channelId: String,
          channelTitle: String,
          addedAt: { type: Date, default: Date.now }
        }],
        playlists: [{
          id: String,
          title: String,
          description: String,
          videoCount: Number,
          addedAt: { type: Date, default: Date.now }
        }],
        lastSync: { type: Date, default: null }
      }
    },
    
    linkedin: {
      connected: { type: Boolean, default: false },
      accessToken: { type: String, default: null },
      refreshToken: { type: String, default: null },
      expiresAt: { type: Date, default: null },
      profileData: {
        id: String,
        firstName: String,
        lastName: String,
        email: String,
        headline: String,
        industry: String,
        location: String
      },
      professionalData: {
        experience: [{
          title: String,
          company: String,
          duration: String,
          description: String
        }],
        education: [{
          school: String,
          degree: String,
          field: String,
          year: Number
        }],
        skills: [String],
        certifications: [{
          name: String,
          issuer: String,
          year: Number
        }],
        lastSync: { type: Date, default: null }
      }
    },
    
    meta: {
      connected: { type: Boolean, default: false },
      accessToken: { type: String, default: null },
      refreshToken: { type: String, default: null },
      expiresAt: { type: Date, default: null },
      profileData: {
        id: String,
        name: String,
        email: String
      },
      socialData: {
        posts: [{
          id: String,
          content: String,
          type: String,
          engagement: Number,
          createdAt: { type: Date, default: Date.now }
        }],
        interests: [String],
        groups: [{
          id: String,
          name: String,
          description: String
        }],
        lastSync: { type: Date, default: null }
      }
    }
  },
  
  // User responses and inputs
  responses: [{
    questionId: { type: String, required: true },
    question: { type: String, required: true },
    answer: { type: String, required: true },
    category: { type: String, required: true },
    confidence: { type: Number, min: 0, max: 100, default: 100 },
    answeredAt: { type: Date, default: Date.now }
  }],
  
  // Matching preferences
  matchingPreferences: {
    ageRange: {
      min: { type: Number, min: 18, max: 100, default: 18 },
      max: { type: Number, min: 18, max: 100, default: 100 }
    },
    location: {
      type: { type: String, enum: ['anywhere', 'nearby', 'specific'], default: 'anywhere' },
      radius: { type: Number, min: 0, max: 500, default: 50 },
      coordinates: {
        lat: Number,
        lng: Number
      }
    },
    interests: {
      required: [String],
      preferred: [String],
      excluded: [String]
    },
    personalityTraits: {
      openness: { min: Number, max: Number },
      conscientiousness: { min: Number, max: Number },
      extraversion: { min: Number, max: Number },
      agreeableness: { min: Number, max: Number },
      neuroticism: { min: Number, max: Number }
    }
  },
  
  // Connections and matches
  connections: [{
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    status: { type: String, enum: ['pending', 'accepted', 'rejected', 'blocked'], default: 'pending' },
    matchScore: { type: Number, min: 0, max: 100, default: 0 },
    matchedAt: { type: Date, default: Date.now },
    lastInteraction: { type: Date, default: Date.now }
  }],
  
  // Privacy settings
  privacySettings: {
    profileVisibility: { type: String, enum: ['public', 'connections', 'private'], default: 'public' },
    showPersonalityTraits: { type: Boolean, default: true },
    showInterests: { type: Boolean, default: true },
    showIntegrations: { type: Boolean, default: false },
    allowMatching: { type: Boolean, default: true },
    dataSharing: { type: String, enum: ['none', 'anonymized', 'full'], default: 'anonymized' }
  },
  
  // Account statistics
  statistics: {
    profileViews: { type: Number, default: 0 },
    connectionRequests: { type: Number, default: 0 },
    acceptedConnections: { type: Number, default: 0 },
    personalityUpdates: { type: Number, default: 0 },
    lastActivity: { type: Date, default: Date.now }
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for full name
userSchema.virtual('fullName').get(function() {
  return `${this.firstName} ${this.lastName}`;
});

// Virtual for age
userSchema.virtual('age').get(function() {
  if (!this.dateOfBirth) return null;
  const today = new Date();
  const birthDate = new Date(this.dateOfBirth);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
});

// Pre-save middleware to hash password
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare password
userSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Method to get public profile (without sensitive data)
userSchema.methods.getPublicProfile = function() {
  const userObject = this.toObject();
  
  // Remove sensitive fields
  delete userObject.password;
  delete userObject.integrations;
  delete userObject.responses;
  delete userObject.matchingPreferences;
  delete userObject.privacySettings;
  delete userObject.statistics;
  
  // Filter personality profile based on privacy settings
  if (!this.privacySettings.showPersonalityTraits) {
    delete userObject.personalityProfile.openness;
    delete userObject.personalityProfile.conscientiousness;
    delete userObject.personalityProfile.extraversion;
    delete userObject.personalityProfile.agreeableness;
    delete userObject.personalityProfile.neuroticism;
  }
  
  if (!this.privacySettings.showInterests) {
    delete userObject.personalityProfile.interests;
  }
  
  return userObject;
};

// Index for efficient queries
userSchema.index({ email: 1 });
userSchema.index({ username: 1 });
userSchema.index({ 'personalityProfile.completionPercentage': -1 });
userSchema.index({ 'statistics.lastActivity': -1 });

module.exports = mongoose.model('User', userSchema); 