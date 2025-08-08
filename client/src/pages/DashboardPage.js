import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiUsers, FiBrain, FiLink, FiTrendingUp, FiZap } from 'react-icons/fi';
import { useAuth } from '../contexts/AuthContext';

const DashboardPage = () => {
  const { user, getProfileCompletion, getConnectedIntegrations } = useAuth();
  
  const profileCompletion = getProfileCompletion();
  const connectedIntegrations = getConnectedIntegrations();

  const stats = [
    {
      title: 'Profile Completion',
      value: `${profileCompletion}%`,
      icon: FiBrain,
      color: '#3B82F6',
      description: 'Your personality profile completion'
    },
    {
      title: 'Connected Services',
      value: connectedIntegrations.length,
      icon: FiLink,
      color: '#10B981',
      description: 'External accounts connected'
    },
    {
      title: 'Potential Matches',
      value: '12',
      icon: FiUsers,
      color: '#8B5CF6',
      description: 'People with similar interests'
    },
    {
      title: 'Personality Score',
      value: '85/100',
      icon: FiTrendingUp,
      color: '#F59E0B',
      description: 'Your overall personality rating'
    }
  ];

  const recentInsights = [
    {
      title: 'Analytical Thinker',
      description: 'You prefer to analyze situations before making decisions',
      type: 'strength',
      confidence: 92
    },
    {
      title: 'Creative Problem Solver',
      description: 'You excel at finding innovative solutions to complex problems',
      type: 'strength',
      confidence: 88
    },
    {
      title: 'Introverted Leader',
      description: 'You lead best through thoughtful guidance rather than direct command',
      type: 'preference',
      confidence: 85
    }
  ];

  return (
    <Container>
      <Header>
        <WelcomeSection>
          <WelcomeTitle>
            Welcome back, {user?.firstName}!
          </WelcomeTitle>
          <WelcomeSubtitle>
            Here's what's happening with your personality profile today.
          </WelcomeSubtitle>
        </WelcomeSection>
      </Header>

      <StatsGrid>
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <StatCard>
              <StatIcon color={stat.color}>
                <stat.icon />
              </StatIcon>
              <StatContent>
                <StatValue>{stat.value}</StatValue>
                <StatTitle>{stat.title}</StatTitle>
                <StatDescription>{stat.description}</StatDescription>
              </StatContent>
            </StatCard>
          </motion.div>
        ))}
      </StatsGrid>

      <ContentGrid>
        <MainSection>
          <SectionTitle>Recent Personality Insights</SectionTitle>
          <InsightsList>
            {recentInsights.map((insight, index) => (
              <motion.div
                key={insight.title}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <InsightCard>
                  <InsightHeader>
                    <InsightTitle>{insight.title}</InsightTitle>
                    <InsightBadge type={insight.type}>
                      {insight.type}
                    </InsightBadge>
                  </InsightHeader>
                  <InsightDescription>{insight.description}</InsightDescription>
                  <InsightConfidence>
                    <FiZap />
                    {insight.confidence}% confidence
                  </InsightConfidence>
                </InsightCard>
              </motion.div>
            ))}
          </InsightsList>
        </MainSection>

        <SideSection>
          <SectionTitle>Quick Actions</SectionTitle>
          <ActionList>
            <ActionCard>
              <ActionIcon>
                <FiBrain />
              </ActionIcon>
              <ActionContent>
                <ActionTitle>Complete Profile</ActionTitle>
                <ActionDescription>
                  Answer more questions to improve your personality analysis
                </ActionDescription>
              </ActionContent>
            </ActionCard>

            <ActionCard>
              <ActionIcon>
                <FiLink />
              </ActionIcon>
              <ActionContent>
                <ActionTitle>Connect Services</ActionTitle>
                <ActionDescription>
                  Link your social media accounts for better insights
                </ActionDescription>
              </ActionContent>
            </ActionCard>

            <ActionCard>
              <ActionIcon>
                <FiUsers />
              </ActionIcon>
              <ActionContent>
                <ActionTitle>Find Matches</ActionTitle>
                <ActionDescription>
                  Discover people with similar personality traits
                </ActionDescription>
              </ActionContent>
            </ActionCard>
          </ActionList>
        </SideSection>
      </ContentGrid>
    </Container>
  );
};

// Styled Components
const Container = styled.div`
  padding: ${({ theme }) => theme.spacing[6]};
`;

const Header = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing[8]};
`;

const WelcomeSection = styled.div``;

const WelcomeTitle = styled.h1`
  font-size: ${({ theme }) => theme.typography.fontSize['4xl']};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.textPrimary};
  margin-bottom: ${({ theme }) => theme.spacing[2]};
`;

const WelcomeSubtitle = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${({ theme }) => theme.spacing[6]};
  margin-bottom: ${({ theme }) => theme.spacing[8]};
`;

const StatCard = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  padding: ${({ theme }) => theme.spacing[6]};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[4]};
  transition: all 0.2s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.lg};
    border-color: ${({ theme }) => theme.colors.borderHover};
  }
`;

const StatIcon = styled.div`
  width: 48px;
  height: 48px;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  background: ${({ color }) => color}20;
  color: ${({ color }) => color};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
`;

const StatContent = styled.div`
  flex: 1;
`;

const StatValue = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize['2xl']};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.textPrimary};
  margin-bottom: ${({ theme }) => theme.spacing[1]};
`;

const StatTitle = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: ${({ theme }) => theme.colors.textPrimary};
  margin-bottom: ${({ theme }) => theme.spacing[1]};
`;

const StatDescription = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: ${({ theme }) => theme.spacing[8]};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: 1fr;
  }
`;

const MainSection = styled.div``;

const SideSection = styled.div``;

const SectionTitle = styled.h2`
  font-size: ${({ theme }) => theme.typography.fontSize['2xl']};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.textPrimary};
  margin-bottom: ${({ theme }) => theme.spacing[6]};
`;

const InsightsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[4]};
`;

const InsightCard = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing[6]};
  transition: all 0.2s ease;
  
  &:hover {
    border-color: ${({ theme }) => theme.colors.borderHover};
    box-shadow: ${({ theme }) => theme.shadows.md};
  }
`;

const InsightHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacing[3]};
`;

const InsightTitle = styled.h3`
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.textPrimary};
`;

const InsightBadge = styled.span`
  padding: ${({ theme }) => theme.spacing[1]} ${({ theme }) => theme.spacing[2]};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  text-transform: capitalize;
  background: ${({ theme, type }) => 
    type === 'strength' ? theme.colors.success + '20' : 
    type === 'preference' ? theme.colors.primary + '20' : 
    theme.colors.warning + '20'};
  color: ${({ theme, type }) => 
    type === 'strength' ? theme.colors.success : 
    type === 'preference' ? theme.colors.primary : 
    theme.colors.warning};
`;

const InsightDescription = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  line-height: 1.6;
  margin-bottom: ${({ theme }) => theme.spacing[3]};
`;

const InsightConfidence = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[2]};
  color: ${({ theme }) => theme.colors.textTertiary};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
`;

const ActionList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[4]};
`;

const ActionCard = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing[4]};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[4]};
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    background: ${({ theme }) => theme.colors.surfaceHover};
    transform: translateY(-1px);
  }
`;

const ActionIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  background: ${({ theme }) => theme.colors.primary}20;
  color: ${({ theme }) => theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
`;

const ActionContent = styled.div`
  flex: 1;
`;

const ActionTitle = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: ${({ theme }) => theme.colors.textPrimary};
  margin-bottom: ${({ theme }) => theme.spacing[1]};
`;

const ActionDescription = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.4;
`;

export default DashboardPage; 