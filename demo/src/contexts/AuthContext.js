import React, { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);

  // Mock user data for demo
  const mockUser = {
    _id: 'demo-user-123',
    firstName: 'Alex',
    lastName: 'Chen',
    username: 'alexchen',
    email: 'alex@rchxtype.com',
    profile: {
      bio: 'Passionate about technology and human psychology. Love exploring new ideas and connecting with like-minded individuals.',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      location: 'San Francisco, CA',
      age: 28,
      occupation: 'Software Engineer',
      interests: ['Technology', 'Psychology', 'Music', 'Travel', 'Fitness']
    },
    personalityProfile: {
      bigFive: {
        openness: 85,
        conscientiousness: 72,
        extraversion: 68,
        agreeableness: 78,
        neuroticism: 35
      },
      customDimensions: {
        creativity: 88,
        analytical: 75,
        empathy: 82,
        leadership: 70,
        adaptability: 80
      },
      interests: ['Technology', 'Psychology', 'Music', 'Travel', 'Fitness', 'Reading', 'Cooking'],
      insights: [
        'You have a strong analytical mind combined with creative thinking',
        'Your empathy makes you excellent at understanding others',
        'You thrive in collaborative environments',
        'You have a natural curiosity for learning new things'
      ],
      communicationStyle: 'Analytical yet empathetic',
      decisionMakingStyle: 'Data-driven with intuition',
      workStyle: 'Collaborative and detail-oriented',
      socialStyle: 'Selective but deep connections'
    },
    externalIntegrations: {
      spotify: {
        connected: true,
        lastSync: '2024-01-15T10:30:00Z',
        dataPoints: 1250,
        topGenres: ['Indie Rock', 'Electronic', 'Jazz'],
        topArtists: ['Tame Impala', 'Daft Punk', 'Radiohead']
      },
      youtube: {
        connected: true,
        lastSync: '2024-01-14T15:45:00Z',
        dataPoints: 890,
        topCategories: ['Technology', 'Science', 'Music'],
        watchTime: '45 hours/month'
      },
      linkedin: {
        connected: true,
        lastSync: '2024-01-13T09:20:00Z',
        dataPoints: 340,
        industry: 'Technology',
        skills: ['JavaScript', 'React', 'Node.js', 'AI/ML']
      },
      meta: {
        connected: false,
        lastSync: null,
        dataPoints: 0
      }
    },
    statistics: {
      profileCompletion: 87,
      connectionsCount: 24,
      matchesFound: 156,
      personalityInsights: 12,
      lastActive: '2024-01-15T14:30:00Z'
    }
  };

  useEffect(() => {
    // Simulate checking for existing session
    const savedUser = localStorage.getItem('rchxtype_user');
    const savedToken = localStorage.getItem('rchxtype_token');
    
    if (savedUser && savedToken) {
      setUser(JSON.parse(savedUser));
      setToken(savedToken);
    }
    
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock validation
      if (email === 'demo@rchxtype.com' && password === 'demo123') {
        const userData = { ...mockUser, email };
        const mockToken = 'demo-jwt-token-123';
        
        setUser(userData);
        setToken(mockToken);
        localStorage.setItem('rchxtype_user', JSON.stringify(userData));
        localStorage.setItem('rchxtype_token', mockToken);
        
        toast.success('Welcome back to RCHXTYPE!');
        return { success: true };
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      toast.error(error.message || 'Login failed');
      throw error;
    }
  };

  const register = async (userData) => {
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const newUser = {
        ...mockUser,
        ...userData,
        _id: `user-${Date.now()}`,
        username: userData.username || userData.firstName.toLowerCase(),
        statistics: {
          ...mockUser.statistics,
          profileCompletion: 45
        }
      };
      
      const mockToken = 'demo-jwt-token-new-user';
      
      setUser(newUser);
      setToken(mockToken);
      localStorage.setItem('rchxtype_user', JSON.stringify(newUser));
      localStorage.setItem('rchxtype_token', mockToken);
      
      toast.success('Welcome to RCHXTYPE! Your account has been created.');
      return { success: true };
    } catch (error) {
      toast.error(error.message || 'Registration failed');
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('rchxtype_user');
    localStorage.removeItem('rchxtype_token');
    toast.success('You have been logged out');
  };

  const updateProfile = async (updates) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
      localStorage.setItem('rchxtype_user', JSON.stringify(updatedUser));
      
      toast.success('Profile updated successfully');
      return { success: true };
    } catch (error) {
      toast.error('Failed to update profile');
      throw error;
    }
  };

  const changePassword = async (currentPassword, newPassword) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (currentPassword !== 'demo123') {
        throw new Error('Current password is incorrect');
      }
      
      toast.success('Password changed successfully');
      return { success: true };
    } catch (error) {
      toast.error(error.message || 'Failed to change password');
      throw error;
    }
  };

  const deleteAccount = async () => {
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      logout();
      toast.success('Account deleted successfully');
      return { success: true };
    } catch (error) {
      toast.error('Failed to delete account');
      throw error;
    }
  };

  const getProfileCompletion = () => {
    return user?.statistics?.profileCompletion || 0;
  };

  const getConnectedIntegrations = () => {
    if (!user?.externalIntegrations) return [];
    
    return Object.entries(user.externalIntegrations)
      .filter(([_, integration]) => integration.connected)
      .map(([service, _]) => service);
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
