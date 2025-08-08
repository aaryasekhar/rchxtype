import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';

// Pages
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import ProfilePage from './pages/ProfilePage';
import PersonalityPage from './pages/PersonalityPage';
import IntegrationsPage from './pages/IntegrationsPage';
import MatchingPage from './pages/MatchingPage';
import ConnectionsPage from './pages/ConnectionsPage';

function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        background: '#0a0a0a',
        color: '#ffffff'
      }}>
        <div>Loading RCHXTYPE...</div>
      </div>
    );
  }

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      
      {/* Protected Routes */}
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <Layout>
            <DashboardPage />
          </Layout>
        </ProtectedRoute>
      } />
      
      <Route path="/profile" element={
        <ProtectedRoute>
          <Layout>
            <ProfilePage />
          </Layout>
        </ProtectedRoute>
      } />
      
      <Route path="/personality" element={
        <ProtectedRoute>
          <Layout>
            <PersonalityPage />
          </Layout>
        </ProtectedRoute>
      } />
      
      <Route path="/integrations" element={
        <ProtectedRoute>
          <Layout>
            <IntegrationsPage />
          </Layout>
        </ProtectedRoute>
      } />
      
      <Route path="/matching" element={
        <ProtectedRoute>
          <Layout>
            <MatchingPage />
          </Layout>
        </ProtectedRoute>
      } />
      
      <Route path="/connections" element={
        <ProtectedRoute>
          <Layout>
            <ConnectionsPage />
          </Layout>
        </ProtectedRoute>
      } />
      
      {/* Redirect authenticated users from login/register to dashboard */}
      <Route path="/login" element={
        user ? <Navigate to="/dashboard" replace /> : <LoginPage />
      } />
      <Route path="/register" element={
        user ? <Navigate to="/dashboard" replace /> : <RegisterPage />
      } />
      
      {/* Catch all route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
