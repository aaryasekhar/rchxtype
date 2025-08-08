import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { FiTrendingUp, FiUsers, FiCpu, FiLink } from 'react-icons/fi';

const DashboardContainer = styled.div`
  padding: 24px;
`;

const WelcomeSection = styled(motion.div)`
  margin-bottom: 32px;
`;

const WelcomeTitle = styled.h1`
  font-size: 32px;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.text[100]};
  margin-bottom: 8px;
`;

const WelcomeSubtitle = styled.p`
  font-size: 18px;
  color: ${({ theme }) => theme.colors.text[400]};
  margin: 0;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 24px;
  margin-bottom: 32px;
`;

const StatCard = styled(motion.div)`
  background: ${({ theme }) => theme.colors.background[800]};
  border: 1px solid ${({ theme }) => theme.colors.border.dark};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  padding: 24px;
  text-align: center;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  }
`;

const StatIcon = styled.div`
  width: 60px;
  height: 60px;
  background: ${({ theme }) => theme.gradients.primary};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 16px;
  font-size: 24px;
  color: white;
`;

const StatValue = styled.div`
  font-size: 32px;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.text[100]};
  margin-bottom: 8px;
`;

const StatLabel = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text[400]};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const QuickActions = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  margin-bottom: 32px;
`;

const ActionCard = styled(motion.div)`
  background: ${({ theme }) => theme.colors.background[800]};
  border: 1px solid ${({ theme }) => theme.colors.border.dark};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: 20px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    border-color: ${({ theme }) => theme.colors.primary[500]};
  }
`;

const ActionTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text[100]};
  margin-bottom: 8px;
`;

const ActionDescription = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text[400]};
  margin: 0;
`;

const RecentActivity = styled.div`
  background: ${({ theme }) => theme.colors.background[800]};
  border: 1px solid ${({ theme }) => theme.colors.border.dark};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  padding: 24px;
`;

const SectionTitle = styled.h2`
  font-size: 24px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text[100]};
  margin-bottom: 16px;
`;

const ActivityItem = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.dark};

  &:last-child {
    border-bottom: none;
  }
`;

const ActivityIcon = styled.div`
  width: 40px;
  height: 40px;
  background: ${({ theme }) => theme.colors.primary[500] + '20'};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 16px;
  color: ${({ theme }) => theme.colors.primary[500]};
`;

const ActivityContent = styled.div`
  flex: 1;
`;

const ActivityTitle = styled.div`
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text[100]};
  margin-bottom: 4px;
`;

const ActivityTime = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.text[400]};
`;

const DashboardPage = () => {
  const { user } = useAuth();

  const stats = [
    {
      icon: FiCpu,
      value: user?.statistics?.profileCompletion || 87,
      label: 'Profile Completion',
      suffix: '%'
    },
    {
      icon: FiLink,
      value: user?.statistics?.connectionsCount || 24,
      label: 'Connections',
      suffix: ''
    },
    {
      icon: FiUsers,
      value: user?.statistics?.matchesFound || 156,
      label: 'Matches Found',
      suffix: ''
    },
    {
      icon: FiTrendingUp,
      value: user?.statistics?.personalityInsights || 12,
      label: 'Personality Insights',
      suffix: ''
    }
  ];

  const quickActions = [
    {
      title: 'Complete Profile',
      description: 'Add more information to improve your matches'
    },
    {
      title: 'Connect Accounts',
      description: 'Link Spotify, YouTube, and other services'
    },
    {
      title: 'Find Matches',
      description: 'Discover people with similar interests'
    },
    {
      title: 'View Insights',
      description: 'Explore your personality analysis'
    }
  ];

  const recentActivity = [
    {
      icon: FiCpu,
      title: 'Personality analysis updated',
      time: '2 hours ago'
    },
    {
      icon: FiLink,
      title: 'Spotify account connected',
      time: '1 day ago'
    },
    {
      icon: FiUsers,
      title: 'New match found: Sarah Chen',
      time: '2 days ago'
    },
    {
      icon: FiTrendingUp,
      title: 'Profile completion increased to 87%',
      time: '3 days ago'
    }
  ];

  return (
    <DashboardContainer>
      <WelcomeSection
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <WelcomeTitle>Welcome back, {user?.firstName}!</WelcomeTitle>
        <WelcomeSubtitle>
          Here's what's happening with your RCHXTYPE profile today.
        </WelcomeSubtitle>
      </WelcomeSection>

      <StatsGrid>
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <StatCard
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -4 }}
            >
              <StatIcon>
                <Icon />
              </StatIcon>
              <StatValue>{stat.value}{stat.suffix}</StatValue>
              <StatLabel>{stat.label}</StatLabel>
            </StatCard>
          );
        })}
      </StatsGrid>

      <QuickActions>
        {quickActions.map((action, index) => {
          return (
            <ActionCard
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
              whileHover={{ y: -2 }}
            >
              <ActionTitle>{action.title}</ActionTitle>
              <ActionDescription>{action.description}</ActionDescription>
            </ActionCard>
          );
        })}
      </QuickActions>

      <RecentActivity
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <SectionTitle>Recent Activity</SectionTitle>
        {recentActivity.map((activity, index) => {
          const Icon = activity.icon;
          return (
            <ActivityItem key={index}>
              <ActivityIcon>
                <Icon />
              </ActivityIcon>
              <ActivityContent>
                <ActivityTitle>{activity.title}</ActivityTitle>
                <ActivityTime>{activity.time}</ActivityTime>
              </ActivityContent>
            </ActivityItem>
          );
        })}
      </RecentActivity>
    </DashboardContainer>
  );
};

export default DashboardPage;
