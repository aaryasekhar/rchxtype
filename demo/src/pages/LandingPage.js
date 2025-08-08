import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { FiArrowRight, FiUsers, FiCpu, FiLink, FiTrendingUp } from 'react-icons/fi';

const LandingContainer = styled.div`
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.background[950]};
  color: ${({ theme }) => theme.colors.text[100]};
  overflow-x: hidden;
`;

const HeroSection = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 0 24px;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, #2d3748 0%, #1a202c 100%);
    opacity: 0.8;
    z-index: 1;
  }
`;

const HeroContent = styled.div`
  max-width: 1200px;
  width: 100%;
  text-align: center;
  position: relative;
  z-index: 2;
`;

const HeroTitle = styled(motion.h1)`
  font-size: clamp(3rem, 8vw, 6rem);
  font-weight: 900;
  margin-bottom: 24px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1.1;
`;

const HeroSubtitle = styled(motion.p)`
  font-size: clamp(1.125rem, 3vw, 1.5rem);
  color: ${({ theme }) => theme.colors.text[300]};
  margin-bottom: 48px;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;
`;

const CTAButton = styled(motion.button)`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 16px 32px;
  font-size: 18px;
  font-weight: 600;
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 12px;
  transition: all 0.3s ease;
  box-shadow: 0 8px 32px rgba(102, 126, 234, 0.3);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 40px rgba(102, 126, 234, 0.4);
  }
`;

const FeaturesSection = styled.section`
  padding: 120px 24px;
  background: ${({ theme }) => theme.colors.background[900]};
`;

const FeaturesContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const SectionTitle = styled(motion.h2)`
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 800;
  text-align: center;
  margin-bottom: 80px;
  color: ${({ theme }) => theme.colors.text[100]};
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 48px;
  margin-top: 64px;
`;

const FeatureCard = styled(motion.div)`
  background: ${({ theme }) => theme.colors.background[800]};
  border: 1px solid ${({ theme }) => theme.colors.border.dark};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  padding: 32px;
  text-align: center;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
    border-color: ${({ theme }) => theme.colors.primary[500]};
  }
`;

const FeatureIcon = styled.div`
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 24px;
  font-size: 32px;
  color: white;
`;

const FeatureTitle = styled.h3`
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 16px;
  color: ${({ theme }) => theme.colors.text[100]};
`;

const FeatureDescription = styled.p`
  color: ${({ theme }) => theme.colors.text[400]};
  line-height: 1.6;
  font-size: 16px;
`;

const Navbar = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  padding: 16px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(15, 23, 42, 0.8);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.dark};
`;

const Logo = styled.div`
  font-size: 24px;
  font-weight: 800;
  color: #0ea5e9;
`;

const NavButtons = styled.div`
  display: flex;
  gap: 16px;
`;

const NavButton = styled(Link)`
  padding: 8px 16px;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  text-decoration: none;
  font-weight: 500;
  transition: all 0.2s ease;
  
  ${({ variant }) => variant === 'primary' ? `
    background: ${({ theme }) => theme.colors.primary[500]};
    color: white;
    
    &:hover {
      background: ${({ theme }) => theme.colors.primary[600]};
    }
  ` : `
    color: ${({ theme }) => theme.colors.text[300]};
    
    &:hover {
      color: ${({ theme }) => theme.colors.text[100]};
      background: ${({ theme }) => theme.colors.background[800]};
    }
  `}
`;

const features = [
  {
    icon: FiCpu,
    title: 'AI Personality Analysis',
    description: 'Advanced AI algorithms analyze your behavior patterns and create detailed personality profiles.'
  },
  {
    icon: FiLink,
    title: 'External Integrations',
    description: 'Connect your Spotify, YouTube, LinkedIn, and other accounts to enrich your profile data.'
  },
  {
    icon: FiUsers,
    title: 'Smart Matching',
    description: 'Find and connect with people who share your interests, values, and personality traits.'
  },
  {
    icon: FiTrendingUp,
    title: 'Continuous Learning',
    description: 'Your profile evolves and improves as you interact more with the platform.'
  }
];

const LandingPage = () => {
  const { user } = useAuth();

  return (
    <LandingContainer>
      <Navbar>
        <Logo>RCHXTYPE</Logo>
        <NavButtons>
          {user ? (
            <>
              <NavButton to="/dashboard">Dashboard</NavButton>
              <NavButton to="/profile">Profile</NavButton>
            </>
          ) : (
            <>
              <NavButton to="/login">Login</NavButton>
              <NavButton to="/register" variant="primary">Get Started</NavButton>
            </>
          )}
        </NavButtons>
      </Navbar>

      <HeroSection>
        <HeroContent>
          <HeroTitle
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Discover Your True Self
          </HeroTitle>
          <HeroSubtitle
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            RCHXTYPE uses advanced AI to analyze your personality and connect you with like-minded individuals. 
            Build meaningful relationships based on deep understanding.
          </HeroSubtitle>
          <CTAButton
            as={Link}
            to={user ? "/dashboard" : "/register"}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {user ? "Go to Dashboard" : "Start Your Journey"}
            <FiArrowRight />
          </CTAButton>
        </HeroContent>
      </HeroSection>

      <FeaturesSection>
        <FeaturesContainer>
          <SectionTitle
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Why Choose RCHXTYPE?
          </SectionTitle>
          
          <FeaturesGrid>
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <FeatureCard
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -8 }}
                >
                  <FeatureIcon>
                    <Icon />
                  </FeatureIcon>
                  <FeatureTitle>{feature.title}</FeatureTitle>
                  <FeatureDescription>{feature.description}</FeatureDescription>
                </FeatureCard>
              );
            })}
          </FeaturesGrid>
        </FeaturesContainer>
      </FeaturesSection>
    </LandingContainer>
  );
};

export default LandingPage;
