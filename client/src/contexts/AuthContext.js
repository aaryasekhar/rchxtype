import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Mock user data for demo
const mockUser = {
  _id: 'demo-user-id',
  firstName: 'Alex',
  lastName: 'Chen',
  username: 'alexchen',
  email: 'alex@example.com',
  profilePicture: null,
  dateOfBirth: '1995-03-15',
  location: 'San Francisco, CA',
  bio: 'Passionate about AI and personality profiling. Love exploring new technologies and connecting with like-minded individuals.',
  personalityProfile: {
    bigFive: {
      openness: 85,
      conscientiousness: 72,
      extraversion: 45,
      agreeableness: 68,
      neuroticism: 32
    },
    customDimensions: {
      creativity: 88,
      analytical: 75,
      social: 42,
      adventurous: 65
    },
    insights: [
      'Highly creative and open to new experiences',
      'Prefers deep, meaningful conversations over small talk',
      'Thrives in structured environments with room for innovation',
      'Values authenticity and genuine connections'
    ],
    communicationStyle: 'Thoughtful and reflective',
    decisionMaking: 'Analytical with intuitive elements',
    workStyle: 'Independent with collaborative bursts',
    socialPreferences: 'Small groups and one-on-one interactions'
  },
  integrations: {
    spotify: {
      connected: true,
      lastSync: '2024-01-15T10:30:00Z',
      data: {
        topArtists: ['Radiohead', 'Tame Impala', 'The Weeknd'],
        topGenres: ['Alternative Rock', 'Indie Pop', 'R&B'],
        listeningTime: '2.5 hours/day'
      }
    },
    youtube: {
      connected: true,
      lastSync: '2024-01-14T15:45:00Z',
      data: {
        watchHistory: ['Tech tutorials', 'Music videos', 'Documentaries'],
        subscriptions: ['Verge', 'Kurzgesagt', 'Music channels']
      }
    },
    linkedin: {
      connected: false,
      lastSync: null,
      data: null
    },
    meta: {
      connected: false,
      lastSync: null,
      data: null
    }
  },
  responses: [
    {
      questionId: 'q1',
      question: 'How do you prefer to spend your free time?',
      answer: 'Reading, exploring new music, and working on creative projects',
      category: 'lifestyle'
    },
    {
      questionId: 'q2',
      question: 'What motivates you most in life?',
      answer: 'Learning new things and making meaningful connections',
      category: 'values'
    }
  ],
  matchingPreferences: {
    ageRange: { min: 25, max: 35 },
    location: 'Anywhere',
    interests: ['Technology', 'Music', 'Art', 'Science'],
    personalityTraits: ['Open-minded', 'Creative', 'Intellectual']
  },
  connections: [
    {
      userId: 'user2',
      status: 'connected',
      compatibility: 87,
      commonInterests: ['Technology', 'Music']
    },
    {
      userId: 'user3',
      status: 'pending',
      compatibility: 92,
      commonInterests: ['Art', 'Science']
    }
  ],
  privacySettings: {
    profileVisibility: 'public',
    dataSharing: 'selective',
    matchingVisibility: 'enabled'
  },
  statistics: {
    profileViews: 156,
    connectionRequests: 23,
    successfulMatches: 8,
    profileCompletion: 85
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);

  // Simulate loading on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const login = async (email, password) => {
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Demo login - accept any email/password
      setUser(mockUser);
      setToken('demo-jwt-token');
      localStorage.setItem('token', 'demo-jwt-token');
      localStorage.setItem('user', JSON.stringify(mockUser));
      
      toast.success('Welcome back, Alex!');
      return { success: true };
    } catch (error) {
      toast.error('Login failed. Please try again.');
      return { success: false, error: error.message };
    }
  };

  const register = async (userData) => {
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Create demo user with provided data
      const newUser = {
        ...mockUser,
        firstName: userData.firstName,
        lastName: userData.lastName,
        username: userData.username,
        email: userData.email
      };
      
      setUser(newUser);
      setToken('demo-jwt-token');
      localStorage.setItem('token', 'demo-jwt-token');
      localStorage.setItem('user', JSON.stringify(newUser));
      
      toast.success('Account created successfully!');
      return { success: true };
    } catch (error) {
      toast.error('Registration failed. Please try again.');
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    toast.success('Logged out successfully');
  };

  const updateProfile = async (updates) => {
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      toast.success('Profile updated successfully!');
      return { success: true };
    } catch (error) {
      toast.error('Failed to update profile');
      return { success: false, error: error.message };
    }
  };

  const changePassword = async (currentPassword, newPassword) => {
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success('Password changed successfully!');
      return { success: true };
    } catch (error) {
      toast.error('Failed to change password');
      return { success: false, error: error.message };
    }
  };

  const deleteAccount = async () => {
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1200));
      
      logout();
      toast.success('Account deleted successfully');
      return { success: true };
    } catch (error) {
      toast.error('Failed to delete account');
      return { success: false, error: error.message };
    }
  };

  // Helper functions for demo
  const getProfileCompletion = () => {
    return user?.statistics?.profileCompletion || 0;
  };

  const getConnectedIntegrations = () => {
    if (!user?.integrations) return 0;
    return Object.values(user.integrations).filter(integration => integration.connected).length;
  };

  const value = {
    user,
    loading,
    token,
    login,
    register,
    logout,
    updateProfile,
    changePassword,
    deleteAccount,
    getProfileCompletion,
    getConnectedIntegrations
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 