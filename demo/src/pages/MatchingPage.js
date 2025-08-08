import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { 
  FiUsers, 
  FiHeart, 
  FiMessageSquare, 
  FiStar, 
  FiFilter, 
  FiMapPin, 
  FiBriefcase,
  FiMusic,
  FiBook,
  FiZap,
  FiArrowRight,
  FiArrowLeft
} from 'react-icons/fi';

const MatchingContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 32px;
`;

const HeroSection = styled(motion.div)`
  margin-bottom: 80px;
  text-align: center;
`;

const HeroTitle = styled.h1`
  font-size: clamp(48px, 8vw, 120px);
  font-weight: 900;
  color: ${({ theme }) => theme === 'dark' ? '#ffffff' : '#000000'};
  margin: 0 0 24px 0;
  line-height: 0.9;
  letter-spacing: -0.02em;
  text-transform: uppercase;
`;

const HeroSubtitle = styled.p`
  font-size: clamp(18px, 2.5vw, 24px);
  color: ${({ theme }) => theme === 'dark' ? '#888888' : '#666666'};
  margin: 0;
  font-weight: 400;
  line-height: 1.4;
  max-width: 600px;
  margin: 0 auto;
`;

const FiltersSection = styled.div`
  margin-bottom: 60px;
`;

const FilterHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 32px;
  border-bottom: 1px solid ${({ theme }) => theme === 'dark' ? '#333333' : '#e5e5e5'};
  padding-bottom: 24px;
`;

const FilterTitle = styled.h2`
  font-size: clamp(32px, 4vw, 48px);
  font-weight: 800;
  color: ${({ theme }) => theme === 'dark' ? '#ffffff' : '#000000'};
  margin: 0;
  text-transform: uppercase;
  letter-spacing: -0.02em;
`;

const FilterControls = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
`;

const FilterButton = styled(motion.button)`
  background: ${({ active, theme }) => active 
    ? (theme === 'dark' ? '#ffffff' : '#000000')
    : 'transparent'
  };
  color: ${({ active, theme }) => active 
    ? (theme === 'dark' ? '#000000' : '#ffffff')
    : (theme === 'dark' ? '#888888' : '#666666')
  };
  border: 2px solid ${({ active, theme }) => active 
    ? (theme === 'dark' ? '#ffffff' : '#000000')
    : (theme === 'dark' ? '#333333' : '#e5e5e5')
  };
  padding: 12px 24px;
  border-radius: 50px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 0.5px;

  &:hover {
    background: ${({ active, theme }) => active 
      ? (theme === 'dark' ? '#ffffff' : '#000000')
      : (theme === 'dark' ? '#333333' : '#f5f5f5')
    };
    color: ${({ active, theme }) => active 
      ? (theme === 'dark' ? '#000000' : '#ffffff')
      : (theme === 'dark' ? '#ffffff' : '#000000')
    };
    border-color: ${({ active, theme }) => active 
      ? (theme === 'dark' ? '#ffffff' : '#000000')
      : (theme === 'dark' ? '#ffffff' : '#000000')
    };
  }
`;

const MatchesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  gap: 40px;
  margin-bottom: 80px;
`;

const MatchCard = styled(motion.div)`
  background: ${({ theme }) => theme === 'dark' ? 'rgba(255, 255, 255, 0.02)' : 'rgba(255, 255, 255, 0.8)'};
  backdrop-filter: blur(20px);
  border: 1px solid ${({ theme }) => theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'};
  border-radius: 24px;
  overflow: hidden;
  transition: all 0.4s ease;
  cursor: pointer;
  position: relative;

  &:hover {
    transform: translateY(-12px) scale(1.02);
    box-shadow: 0 40px 80px rgba(0, 0, 0, 0.15);
    border-color: ${({ theme }) => theme === 'dark' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)'};
  }
`;

const CardHeader = styled.div`
  padding: 32px 32px 24px 32px;
  display: flex;
  align-items: center;
  gap: 20px;
`;

const UserAvatar = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid ${({ theme }) => theme === 'dark' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.1)'};
`;

const UserInfo = styled.div`
  flex: 1;
`;

const UserName = styled.h3`
  font-size: 24px;
  font-weight: 700;
  color: ${({ theme }) => theme === 'dark' ? '#ffffff' : '#000000'};
  margin: 0 0 8px 0;
  line-height: 1.2;
  letter-spacing: -0.01em;
`;

const UserDetails = styled.div`
  display: flex;
  gap: 16px;
  font-size: 14px;
  color: ${({ theme }) => theme === 'dark' ? '#888888' : '#666666'};
  margin-bottom: 12px;
`;

const DetailItem = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

const CompatibilityScore = styled.div`
  background: ${({ theme }) => theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'};
  border: 1px solid ${({ theme }) => theme === 'dark' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.1)'};
  border-radius: 16px;
  padding: 12px 16px;
  text-align: center;
`;

const ScoreValue = styled.div`
  font-size: 24px;
  font-weight: 800;
  color: ${({ theme }) => theme === 'dark' ? '#ffffff' : '#000000'};
  margin-bottom: 4px;
`;

const ScoreLabel = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme === 'dark' ? '#888888' : '#666666'};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-weight: 600;
`;

const CardContent = styled.div`
  padding: 0 32px 32px 32px;
`;

const UserBio = styled.p`
  color: ${({ theme }) => theme === 'dark' ? '#888888' : '#666666'};
  font-size: 16px;
  line-height: 1.6;
  margin: 0 0 24px 0;
`;

const InterestsSection = styled.div`
  margin-bottom: 24px;
`;

const InterestsTitle = styled.h4`
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }) => theme === 'dark' ? '#ffffff' : '#000000'};
  margin: 0 0 12px 0;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const InterestsGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const InterestTag = styled.span`
  background: ${({ theme }) => theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'};
  color: ${({ theme }) => theme === 'dark' ? '#ffffff' : '#000000'};
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;
  border: 1px solid ${({ theme }) => theme === 'dark' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.1)'};
`;

const CardActions = styled.div`
  display: flex;
  gap: 12px;
`;

const ActionButton = styled.button`
  flex: 1;
  background: ${({ variant, theme }) => variant === 'primary' 
    ? (theme === 'dark' ? '#ffffff' : '#000000')
    : 'transparent'
  };
  color: ${({ variant, theme }) => variant === 'primary'
    ? (theme === 'dark' ? '#000000' : '#ffffff')
    : (theme === 'dark' ? '#ffffff' : '#000000')
  };
  border: 2px solid ${({ variant, theme }) => variant === 'primary'
    ? (theme === 'dark' ? '#ffffff' : '#000000')
    : (theme === 'dark' ? '#ffffff' : '#000000')
  };
  padding: 16px 24px;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 14px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  }
`;

const NavigationSection = styled.div`
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-top: 60px;
`;

const NavButton = styled.button`
  background: ${({ theme }) => theme === 'dark' ? '#333333' : '#f5f5f5'};
  border: none;
  color: ${({ theme }) => theme === 'dark' ? '#ffffff' : '#000000'};
  width: 56px;
  height: 56px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 20px;

  &:hover {
    background: ${({ theme }) => theme === 'dark' ? '#ffffff' : '#000000'};
    color: ${({ theme }) => theme === 'dark' ? '#000000' : '#ffffff'};
    transform: scale(1.05);
  }

  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
`;

const MatchingPage = () => {
  const { user } = useAuth();
  const { theme } = useTheme();
  const [activeFilter, setActiveFilter] = useState('all');

  const filters = [
    { id: 'all', label: 'All Matches' },
    { id: 'high', label: 'High Compatibility' },
    { id: 'recent', label: 'Recent' },
    { id: 'nearby', label: 'Nearby' }
  ];

  const mockMatches = [
    {
      id: 1,
      name: 'Sarah Chen',
      age: 26,
      location: 'San Francisco, CA',
      occupation: 'UX Designer',
      bio: 'Passionate about creating meaningful digital experiences. Love exploring new coffee shops and hiking on weekends.',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop&crop=face',
      compatibility: 94,
      interests: ['Design', 'Coffee', 'Hiking', 'Photography', 'Travel'],
      lastActive: '2 hours ago'
    },
    {
      id: 2,
      name: 'Alex Rodriguez',
      age: 28,
      location: 'New York, NY',
      occupation: 'Software Engineer',
      bio: 'Building the future one line of code at a time. Avid reader and amateur chef who loves experimenting with new recipes.',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face',
      compatibility: 87,
      interests: ['Technology', 'Cooking', 'Reading', 'Gaming', 'Fitness'],
      lastActive: '1 day ago'
    },
    {
      id: 3,
      name: 'Emily Watson',
      age: 25,
      location: 'Los Angeles, CA',
      occupation: 'Marketing Manager',
      bio: 'Creative professional with a love for storytelling and brand building. Enjoys yoga, art galleries, and trying new restaurants.',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face',
      compatibility: 91,
      interests: ['Marketing', 'Yoga', 'Art', 'Food', 'Travel'],
      lastActive: '3 hours ago'
    },
    {
      id: 4,
      name: 'Michael Kim',
      age: 29,
      location: 'Seattle, WA',
      occupation: 'Product Manager',
      bio: 'Strategic thinker who loves solving complex problems. Passionate about innovation, music, and outdoor adventures.',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face',
      compatibility: 89,
      interests: ['Product Management', 'Music', 'Hiking', 'Technology', 'Cooking'],
      lastActive: '5 hours ago'
    },
    {
      id: 5,
      name: 'Jessica Park',
      age: 27,
      location: 'Austin, TX',
      occupation: 'Data Scientist',
      bio: 'Analytical mind with a creative heart. Love exploring data patterns, practicing yoga, and discovering new music.',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop&crop=face',
      compatibility: 93,
      interests: ['Data Science', 'Yoga', 'Music', 'Reading', 'Fitness'],
      lastActive: '1 hour ago'
    },
    {
      id: 6,
      name: 'David Thompson',
      age: 30,
      location: 'Chicago, IL',
      occupation: 'Financial Analyst',
      bio: 'Numbers guy with a passion for fitness and travel. Always looking for the next adventure and learning opportunity.',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face',
      compatibility: 85,
      interests: ['Finance', 'Fitness', 'Travel', 'Reading', 'Photography'],
      lastActive: '4 hours ago'
    }
  ];

  const handleConnect = (userId) => {
    console.log('Connecting with user:', userId);
  };

  const handleMessage = (userId) => {
    console.log('Messaging user:', userId);
  };

  return (
    <MatchingContainer>
      <HeroSection
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <HeroTitle theme={theme}>Discover Matches</HeroTitle>
        <HeroSubtitle theme={theme}>
          Find people who share your interests, values, and personality traits
        </HeroSubtitle>
      </HeroSection>

      <FiltersSection>
        <FilterHeader theme={theme}>
          <FilterTitle theme={theme}>Filter Matches</FilterTitle>
          <FilterControls>
            {filters.map((filter) => (
              <FilterButton
                key={filter.id}
                active={activeFilter === filter.id}
                onClick={() => setActiveFilter(filter.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                theme={theme}
              >
                {filter.label}
              </FilterButton>
            ))}
          </FilterControls>
        </FilterHeader>

        <MatchesGrid>
          {mockMatches.map((match, index) => (
            <MatchCard
              key={match.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              theme={theme}
            >
              <CardHeader>
                <UserAvatar src={match.avatar} alt={match.name} theme={theme} />
                <UserInfo>
                  <UserName theme={theme}>{match.name}</UserName>
                  <UserDetails theme={theme}>
                    <DetailItem>
                      <FiMapPin />
                      {match.location}
                    </DetailItem>
                    <DetailItem>
                      <FiBriefcase />
                      {match.occupation}
                    </DetailItem>
                    <DetailItem>
                      {match.age} years old
                    </DetailItem>
                  </UserDetails>
                </UserInfo>
                <CompatibilityScore theme={theme}>
                  <ScoreValue theme={theme}>{match.compatibility}%</ScoreValue>
                  <ScoreLabel theme={theme}>Match</ScoreLabel>
                </CompatibilityScore>
              </CardHeader>

              <CardContent>
                <UserBio theme={theme}>{match.bio}</UserBio>

                <InterestsSection>
                  <InterestsTitle theme={theme}>Interests</InterestsTitle>
                  <InterestsGrid>
                    {match.interests.map((interest, idx) => (
                      <InterestTag key={idx} theme={theme}>
                        {interest}
                      </InterestTag>
                    ))}
                  </InterestsGrid>
                </InterestsSection>

                <CardActions>
                  <ActionButton
                    variant="primary"
                    onClick={() => handleConnect(match.id)}
                    theme={theme}
                  >
                    <FiHeart />
                    Connect
                  </ActionButton>
                  <ActionButton
                    onClick={() => handleMessage(match.id)}
                    theme={theme}
                  >
                    <FiMessageSquare />
                    Message
                  </ActionButton>
                </CardActions>
              </CardContent>
            </MatchCard>
          ))}
        </MatchesGrid>
      </FiltersSection>

      <NavigationSection>
        <NavButton theme={theme}>
          <FiArrowLeft />
        </NavButton>
        <NavButton theme={theme}>
          <FiArrowRight />
        </NavButton>
      </NavigationSection>
    </MatchingContainer>
  );
};

export default MatchingPage;
