import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { 
  FiTrendingUp, 
  FiUsers, 
  FiHeart,
  FiArrowRight,
  FiStar,
  FiActivity
} from 'react-icons/fi';

const DashboardContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const WelcomeSection = styled(motion.div)`
  margin-bottom: 48px;
`;

const WelcomeTitle = styled.h1`
  font-size: 48px;
  font-weight: 900;
  color: #000000;
  margin: 0 0 16px 0;
  line-height: 1.1;
`;

const WelcomeSubtitle = styled.p`
  font-size: 20px;
  color: #666666;
  margin: 0;
  font-weight: 400;
  line-height: 1.5;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
  margin-bottom: 48px;
`;

const StatCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 16px;
  padding: 32px;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
    border-color: rgba(0, 0, 0, 0.2);
  }
`;

const StatHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
`;

const StatIcon = styled.div`
  width: 48px;
  height: 48px;
  background: #000000;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 20px;
`;

const StatValue = styled.div`
  font-size: 36px;
  font-weight: 900;
  color: #000000;
  margin-bottom: 8px;
`;

const StatLabel = styled.div`
  font-size: 14px;
  color: #666666;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-weight: 500;
`;

const StatTrend = styled.div`
  font-size: 12px;
  color: #10b981;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 4px;
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 32px;
  margin-bottom: 48px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Section = styled(motion.div)`
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 16px;
  padding: 32px;
  transition: all 0.3s ease;

  &:hover {
    border-color: rgba(0, 0, 0, 0.2);
  }
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
`;

const SectionTitle = styled.h2`
  font-size: 24px;
  font-weight: 700;
  color: #000000;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 12px;
`;

const ViewAllButton = styled.button`
  background: none;
  border: none;
  color: #666666;
  cursor: pointer;
  padding: 8px 16px;
  border-radius: 8px;
  font-weight: 600;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;

  &:hover {
    background: rgba(0, 0, 0, 0.05);
    color: #000000;
  }
`;

const ActivityList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const ActivityItem = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
  background: rgba(255, 255, 255, 0.5);
  border: 1px solid rgba(0, 0, 0, 0.05);
  border-radius: 12px;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.8);
    border-color: rgba(0, 0, 0, 0.1);
  }
`;

const ActivityIcon = styled.div`
  width: 40px;
  height: 40px;
  background: #000000;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 16px;
`;

const ActivityContent = styled.div`
  flex: 1;
`;

const ActivityTitle = styled.div`
  font-weight: 600;
  color: #000000;
  margin-bottom: 4px;
  font-size: 14px;
`;

const ActivityTime = styled.div`
  font-size: 12px;
  color: #666666;
`;

const QuickActions = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
`;

const ActionCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  padding: 24px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
    border-color: rgba(0, 0, 0, 0.2);
  }
`;

const ActionIcon = styled.div`
  width: 40px;
  height: 40px;
  background: #000000;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 18px;
  margin-bottom: 16px;
`;

const ActionTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: #000000;
  margin: 0 0 8px 0;
`;

const ActionDescription = styled.p`
  font-size: 14px;
  color: #666666;
  margin: 0;
  line-height: 1.5;
`;

const DashboardPage = () => {
  const { user } = useAuth();

  const stats = [
    {
      icon: FiActivity,
      value: user?.statistics?.profileCompletion || 87,
      label: 'Profile Complete',
      suffix: '%',
      trend: '+12% this week'
    },
    {
      icon: FiUsers,
      value: user?.statistics?.connectionsCount || 24,
      label: 'Connections',
      suffix: '',
      trend: '+3 new this week'
    },
    {
      icon: FiHeart,
      value: user?.statistics?.matchesFound || 156,
      label: 'Matches Found',
      suffix: '',
      trend: '+8 new matches'
    },
    {
      icon: FiTrendingUp,
      value: user?.statistics?.personalityInsights || 12,
      label: 'Personality Insights',
      suffix: '',
      trend: '+2 new insights'
    }
  ];

  const recentActivity = [
    {
      icon: FiStar,
      title: 'New personality insight discovered',
      time: '2 hours ago'
    },
    {
      icon: FiUsers,
      title: 'Connected with Sarah Chen',
      time: '1 day ago'
    },
    {
      icon: FiHeart,
      title: 'Found 3 new matches',
      time: '2 days ago'
    },
    {
      icon: FiActivity,
      title: 'Profile completion increased',
      time: '3 days ago'
    }
  ];

  const quickActions = [
    {
      icon: FiUsers,
      title: 'Find Matches',
      description: 'Discover people with similar interests'
    },
    {
      icon: FiHeart,
      title: 'For You',
      description: 'Personalized recommendations'
    },
    {
      icon: FiActivity,
      title: 'View Insights',
      description: 'Explore your personality analysis'
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
              <StatHeader>
                <StatIcon>
                  <Icon />
                </StatIcon>
                <StatTrend>
                  <FiTrendingUp />
                  {stat.trend}
                </StatTrend>
              </StatHeader>
              <StatValue>{stat.value}{stat.suffix}</StatValue>
              <StatLabel>{stat.label}</StatLabel>
            </StatCard>
          );
        })}
      </StatsGrid>

      <ContentGrid>
        <Section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <SectionHeader>
            <SectionTitle>
              <FiActivity />
              Recent Activity
            </SectionTitle>
            <ViewAllButton>
              View All
              <FiArrowRight />
            </ViewAllButton>
          </SectionHeader>

          <ActivityList>
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
          </ActivityList>
        </Section>

        <Section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <SectionHeader>
            <SectionTitle>
              <FiStar />
              Quick Actions
            </SectionTitle>
          </SectionHeader>

          <QuickActions>
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <ActionCard
                  key={index}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <ActionIcon>
                    <Icon />
                  </ActionIcon>
                  <ActionTitle>{action.title}</ActionTitle>
                  <ActionDescription>{action.description}</ActionDescription>
                </ActionCard>
              );
            })}
          </QuickActions>
        </Section>
      </ContentGrid>
    </DashboardContainer>
  );
};

export default DashboardPage;
