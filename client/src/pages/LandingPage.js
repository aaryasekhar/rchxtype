import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';

const LandingContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%);
  color: white;
  overflow-x: hidden;
`;

const Hero = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  text-align: center;
  padding: 0 2rem;
  position: relative;
`;

const HeroBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle at 50% 50%, rgba(100, 100, 255, 0.1) 0%, transparent 70%);
  pointer-events: none;
`;

const Title = styled(motion.h1)`
  font-size: clamp(3rem, 8vw, 6rem);
  font-weight: 900;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: -0.02em;
`;

const Subtitle = styled(motion.p)`
  font-size: clamp(1.2rem, 3vw, 1.8rem);
  margin-bottom: 3rem;
  max-width: 600px;
  line-height: 1.6;
  color: #b0b0b0;
  font-weight: 300;
`;

const CTAButton = styled(motion(Link))`
  display: inline-block;
  padding: 1rem 3rem;
  font-size: 1.2rem;
  font-weight: 600;
  text-decoration: none;
  color: white;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 50px;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 15px 40px rgba(102, 126, 234, 0.4);
  }
`;

const Features = styled.section`
  padding: 5rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 3rem;
  margin-top: 4rem;
`;

const FeatureCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 2.5rem;
  text-align: center;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    background: rgba(255, 255, 255, 0.08);
  }
`;

const FeatureIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1.5rem;
  color: #667eea;
`;

const FeatureTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: white;
`;

const FeatureDescription = styled.p`
  color: #b0b0b0;
  line-height: 1.6;
`;

const NavBar = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(10, 10, 10, 0.8);
  backdrop-filter: blur(10px);
`;

const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: #667eea;
`;

const NavButtons = styled.div`
  display: flex;
  gap: 1rem;
`;

const NavButton = styled(Link)`
  padding: 0.5rem 1.5rem;
  text-decoration: none;
  color: white;
  border-radius: 25px;
  transition: all 0.3s ease;
  
  &.primary {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  }
  
  &.secondary {
    border: 1px solid rgba(255, 255, 255, 0.2);
    
    &:hover {
      background: rgba(255, 255, 255, 0.1);
    }
  }
`;

const LandingPage = () => {
  const { user } = useAuth();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  const features = [
    {
      icon: '🧠',
      title: 'AI Personality Profiling',
      description: 'Advanced AI analyzes your inputs and external data to create detailed personality profiles.'
    },
    {
      icon: '🔗',
      title: 'External Integrations',
      description: 'Connect Spotify, YouTube, LinkedIn, and Meta services to enrich your profile data.'
    },
    {
      icon: '🤝',
      title: 'Smart Matching',
      description: 'Find and connect with users who share similar interests and personality traits.'
    },
    {
      icon: '🔄',
      title: 'Dynamic Updates',
      description: 'Your profile continuously evolves as you interact and provide more data.'
    },
    {
      icon: '🔒',
      title: 'Privacy First',
      description: 'Secure data collection and storage following industry best practices.'
    },
    {
      icon: '📱',
      title: 'Responsive Design',
      description: 'Beautiful, intuitive interface that works seamlessly across all devices.'
    }
  ];

  return (
    <LandingContainer>
      <NavBar>
        <Logo>rchxtype</Logo>
        <NavButtons>
          {user ? (
            <NavButton to="/dashboard" className="primary">
              Dashboard
            </NavButton>
          ) : (
            <>
              <NavButton to="/login" className="secondary">
                Login
              </NavButton>
              <NavButton to="/register" className="primary">
                Get Started
              </NavButton>
            </>
          )}
        </NavButtons>
      </NavBar>

      <Hero>
        <HeroBackground />
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <Title variants={itemVariants}>
            Discover Your Digital DNA
          </Title>
          <Subtitle variants={itemVariants}>
            rchxtype uses advanced AI to analyze your personality through your digital footprint, 
            creating unique profiles that help you connect with like-minded individuals.
          </Subtitle>
          <motion.div variants={itemVariants}>
            {user ? (
              <CTAButton to="/dashboard">
                Go to Dashboard
              </CTAButton>
            ) : (
              <CTAButton to="/register">
                Start Your Journey
              </CTAButton>
            )}
          </motion.div>
        </motion.div>
      </Hero>

      <Features>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', fontSize: '2.5rem', marginBottom: '1rem' }}
        >
          Why Choose rchxtype?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{ textAlign: 'center', fontSize: '1.2rem', color: '#b0b0b0', marginBottom: '3rem' }}
        >
          Experience the future of personality-based social connections
        </motion.p>
        
        <FeaturesGrid>
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <FeatureIcon>{feature.icon}</FeatureIcon>
              <FeatureTitle>{feature.title}</FeatureTitle>
              <FeatureDescription>{feature.description}</FeatureDescription>
            </FeatureCard>
          ))}
        </FeaturesGrid>
      </Features>
    </LandingContainer>
  );
};

export default LandingPage; 