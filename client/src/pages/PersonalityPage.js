import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { FiBrain, FiTrendingUp, FiRefreshCw, FiCheck, FiClock, FiZap } from 'react-icons/fi';

const PersonalityContainer = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: white;
  margin-bottom: 1rem;
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: #b0b0b0;
  max-width: 600px;
  margin: 0 auto;
`;

const ProgressSection = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 2rem;
  margin-bottom: 2rem;
`;

const ProgressHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
`;

const ProgressTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: white;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 12px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 6px;
  overflow: hidden;
  margin-bottom: 1rem;
`;

const ProgressFill = styled.div`
  height: 100%;
  width: ${props => props.value}%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 6px;
  transition: width 0.5s ease;
`;

const ProgressText = styled.p`
  color: #b0b0b0;
  font-size: 0.9rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 2rem;
`;

const CardTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 600;
  color: white;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const TraitGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
`;

const TraitCard = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 15px;
  padding: 1rem;
  text-align: center;
`;

const TraitName = styled.div`
  font-size: 0.9rem;
  color: #b0b0b0;
  margin-bottom: 0.5rem;
`;

const TraitValue = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
  color: white;
`;

const TraitBar = styled.div`
  width: 100%;
  height: 6px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 3px;
  margin-top: 0.5rem;
  overflow: hidden;
`;

const TraitBarFill = styled.div`
  height: 100%;
  width: ${props => props.value}%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 3px;
  transition: width 0.3s ease;
`;

const InsightList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const InsightItem = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
  padding: 1rem;
  border-left: 3px solid #667eea;
`;

const InsightText = styled.p`
  color: #b0b0b0;
  line-height: 1.6;
  font-size: 0.9rem;
`;

const ActionButton = styled.button`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 25px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(102, 126, 234, 0.3);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

const QuestionSection = styled.div`
  margin-top: 2rem;
`;

const QuestionCard = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  padding: 1.5rem;
  margin-bottom: 1rem;
`;

const QuestionText = styled.h4`
  color: white;
  font-size: 1.1rem;
  margin-bottom: 1rem;
`;

const AnswerText = styled.p`
  color: #b0b0b0;
  font-style: italic;
  font-size: 0.9rem;
`;

const StatusBadge = styled.span`
  background: ${props => props.status === 'completed' ? 'rgba(34, 197, 94, 0.2)' : 'rgba(251, 191, 36, 0.2)'};
  color: ${props => props.status === 'completed' ? '#22c55e' : '#fbbf24'};
  padding: 0.25rem 0.75rem;
  border-radius: 15px;
  font-size: 0.8rem;
  font-weight: 500;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-top: 1.5rem;
`;

const StatCard = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 15px;
  padding: 1rem;
  text-align: center;
`;

const StatValue = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: #667eea;
  margin-bottom: 0.25rem;
`;

const StatLabel = styled.div`
  font-size: 0.8rem;
  color: #b0b0b0;
`;

const PersonalityPage = () => {
  const { user } = useAuth();
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleRefreshAnalysis = async () => {
    setIsAnalyzing(true);
    // Simulate analysis process
    await new Promise(resolve => setTimeout(resolve, 3000));
    setIsAnalyzing(false);
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  const profile = user.personalityProfile;
  const completionPercentage = user.statistics?.profileCompletion || 0;

  return (
    <PersonalityContainer>
      <Header>
        <Title>Your Personality Profile</Title>
        <Subtitle>
          Discover your unique personality traits and insights based on AI analysis of your data
        </Subtitle>
      </Header>

      <ProgressSection>
        <ProgressHeader>
          <ProgressTitle>
            <FiBrain />
            Profile Completion
          </ProgressTitle>
          <StatusBadge status={completionPercentage >= 80 ? 'completed' : 'in-progress'}>
            {completionPercentage >= 80 ? 'Complete' : 'In Progress'}
          </StatusBadge>
        </ProgressHeader>
        <ProgressBar>
          <ProgressFill value={completionPercentage} />
        </ProgressBar>
        <ProgressText>
          {completionPercentage}% complete - {completionPercentage < 80 ? 'Continue answering questions to improve your profile' : 'Your profile is fully analyzed!'}
        </ProgressText>
      </ProgressSection>

      <Grid>
        <Card
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <CardTitle>
            <FiTrendingUp />
            Big Five Traits
          </CardTitle>
          <TraitGrid>
            {Object.entries(profile?.bigFive || {}).map(([trait, value]) => (
              <TraitCard key={trait}>
                <TraitName>{trait.charAt(0).toUpperCase() + trait.slice(1)}</TraitName>
                <TraitValue>{value}%</TraitValue>
                <TraitBar>
                  <TraitBarFill value={value} />
                </TraitBar>
              </TraitCard>
            ))}
          </TraitGrid>
        </Card>

        <Card
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <CardTitle>
            <FiZap />
            Custom Dimensions
          </CardTitle>
          <TraitGrid>
            {Object.entries(profile?.customDimensions || {}).map(([trait, value]) => (
              <TraitCard key={trait}>
                <TraitName>{trait.charAt(0).toUpperCase() + trait.slice(1)}</TraitName>
                <TraitValue>{value}%</TraitValue>
                <TraitBar>
                  <TraitBarFill value={value} />
                </TraitBar>
              </TraitCard>
            ))}
          </TraitGrid>
        </Card>

        <Card
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <CardTitle>
            <FiCheck />
            Personality Insights
          </CardTitle>
          <InsightList>
            {profile?.insights?.map((insight, index) => (
              <InsightItem key={index}>
                <InsightText>{insight}</InsightText>
              </InsightItem>
            ))}
          </InsightList>
        </Card>

        <Card
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <CardTitle>
            <FiClock />
            Analysis Stats
          </CardTitle>
          <StatsGrid>
            <StatCard>
              <StatValue>{profile?.insights?.length || 0}</StatValue>
              <StatLabel>Insights Generated</StatLabel>
            </StatCard>
            <StatCard>
              <StatValue>{user.responses?.length || 0}</StatValue>
              <StatLabel>Questions Answered</StatLabel>
            </StatCard>
            <StatCard>
              <StatValue>{user.integrations ? Object.values(user.integrations).filter(i => i.connected).length : 0}</StatValue>
              <StatLabel>Connected Services</StatLabel>
            </StatCard>
          </StatsGrid>
          
          <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
            <ActionButton 
              onClick={handleRefreshAnalysis}
              disabled={isAnalyzing}
            >
              {isAnalyzing ? (
                <>
                  <FiRefreshCw style={{ animation: 'spin 1s linear infinite' }} />
                  Analyzing...
                </>
              ) : (
                <>
                  <FiRefreshCw />
                  Refresh Analysis
                </>
              )}
            </ActionButton>
          </div>
        </Card>
      </Grid>

      <QuestionSection>
        <Card
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <CardTitle>Your Responses</CardTitle>
          {user.responses?.map((response, index) => (
            <QuestionCard key={index}>
              <QuestionText>{response.question}</QuestionText>
              <AnswerText>"{response.answer}"</AnswerText>
            </QuestionCard>
          ))}
        </Card>
      </QuestionSection>
    </PersonalityContainer>
  );
};

export default PersonalityPage; 