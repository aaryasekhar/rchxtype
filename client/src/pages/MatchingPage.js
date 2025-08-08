import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { FiHeart, FiX, FiUser, FiMessageCircle, FiStar, FiFilter } from 'react-icons/fi';

const MatchingContainer = styled.div`
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

const FiltersSection = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 2rem;
  margin-bottom: 2rem;
`;

const FiltersHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  color: white;
  font-size: 1.2rem;
  font-weight: 600;
`;

const FilterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
`;

const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const FilterLabel = styled.label`
  font-size: 0.9rem;
  color: #b0b0b0;
  font-weight: 500;
`;

const FilterSelect = styled.select`
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  padding: 0.75rem;
  color: white;
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: #667eea;
  }
  
  option {
    background: #1a1a2e;
    color: white;
  }
`;

const SuggestionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
`;

const SuggestionCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 2rem;
  position: relative;
  overflow: hidden;
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const Avatar = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  color: white;
  font-weight: bold;
`;

const UserInfo = styled.div`
  flex: 1;
`;

const UserName = styled.h3`
  font-size: 1.3rem;
  font-weight: 600;
  color: white;
  margin-bottom: 0.25rem;
`;

const UserLocation = styled.p`
  font-size: 0.9rem;
  color: #b0b0b0;
`;

const CompatibilityScore = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 600;
`;

const UserBio = styled.p`
  color: #b0b0b0;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  font-size: 0.9rem;
`;

const TraitsSection = styled.div`
  margin-bottom: 1.5rem;
`;

const TraitsTitle = styled.h4`
  font-size: 1rem;
  font-weight: 600;
  color: white;
  margin-bottom: 0.75rem;
`;

const TraitsList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const TraitTag = styled.span`
  background: rgba(102, 126, 234, 0.2);
  color: #667eea;
  padding: 0.25rem 0.75rem;
  border-radius: 15px;
  font-size: 0.8rem;
  font-weight: 500;
`;

const CommonInterests = styled.div`
  margin-bottom: 1.5rem;
`;

const InterestsTitle = styled.h4`
  font-size: 1rem;
  font-weight: 600;
  color: white;
  margin-bottom: 0.75rem;
`;

const InterestsList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const InterestTag = styled.span`
  background: rgba(34, 197, 94, 0.2);
  color: #22c55e;
  padding: 0.25rem 0.75rem;
  border-radius: 15px;
  font-size: 0.8rem;
  font-weight: 500;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 1rem;
`;

const ActionButton = styled.button`
  flex: 1;
  padding: 0.75rem;
  border: none;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  
  &.connect {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 10px 20px rgba(102, 126, 234, 0.3);
    }
  }
  
  &.pass {
    background: rgba(255, 255, 255, 0.1);
    color: white;
    border: 1px solid rgba(255, 255, 255, 0.2);
    
    &:hover {
      background: rgba(255, 255, 255, 0.15);
    }
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  color: #b0b0b0;
`;

const EmptyIcon = styled.div`
  font-size: 4rem;
  margin-bottom: 1rem;
  opacity: 0.5;
`;

const EmptyText = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: white;
`;

const EmptyDescription = styled.p`
  font-size: 1rem;
  max-width: 400px;
  margin: 0 auto;
`;

const MatchingPage = () => {
  const { user } = useAuth();
  const [filters, setFilters] = useState({
    ageRange: '25-35',
    location: 'anywhere',
    interests: 'all',
    compatibility: '70+'
  });

  // Mock suggestions data
  const suggestions = [
    {
      id: 'user1',
      firstName: 'Sarah',
      lastName: 'Johnson',
      location: 'New York, NY',
      bio: 'Passionate about technology and music. Love exploring new places and meeting interesting people.',
      compatibility: 92,
      traits: ['Creative', 'Analytical', 'Social', 'Adventurous'],
      interests: ['Technology', 'Music', 'Travel', 'Art'],
      age: 28
    },
    {
      id: 'user2',
      firstName: 'Michael',
      lastName: 'Chen',
      location: 'San Francisco, CA',
      bio: 'Software engineer by day, musician by night. Always curious about new technologies and creative projects.',
      compatibility: 87,
      traits: ['Analytical', 'Creative', 'Introverted', 'Detail-oriented'],
      interests: ['Technology', 'Music', 'Science', 'Photography'],
      age: 31
    },
    {
      id: 'user3',
      firstName: 'Emma',
      lastName: 'Williams',
      location: 'Austin, TX',
      bio: 'UX designer who loves psychology and human behavior. Enjoys hiking, reading, and deep conversations.',
      compatibility: 85,
      traits: ['Empathetic', 'Creative', 'Social', 'Intellectual'],
      interests: ['Design', 'Psychology', 'Nature', 'Books'],
      age: 26
    },
    {
      id: 'user4',
      firstName: 'David',
      lastName: 'Rodriguez',
      location: 'Miami, FL',
      bio: 'Entrepreneur and fitness enthusiast. Passionate about helping others achieve their goals.',
      compatibility: 78,
      traits: ['Ambitious', 'Energetic', 'Leadership', 'Motivated'],
      interests: ['Business', 'Fitness', 'Motivation', 'Travel'],
      age: 29
    }
  ];

  const handleFilterChange = (filter, value) => {
    setFilters(prev => ({
      ...prev,
      [filter]: value
    }));
  };

  const handleConnect = async (userId) => {
    // Simulate connection request
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log(`Sending connection request to ${userId}...`);
  };

  const handlePass = async (userId) => {
    // Simulate pass action
    await new Promise(resolve => setTimeout(resolve, 500));
    console.log(`Passed on ${userId}...`);
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <MatchingContainer>
      <Header>
        <Title>Discover Connections</Title>
        <Subtitle>
          Find people who share your interests and personality traits
        </Subtitle>
      </Header>

      <FiltersSection>
        <FiltersHeader>
          <FiFilter />
          Filter Preferences
        </FiltersHeader>
        <FilterGrid>
          <FilterGroup>
            <FilterLabel>Age Range</FilterLabel>
            <FilterSelect
              value={filters.ageRange}
              onChange={(e) => handleFilterChange('ageRange', e.target.value)}
            >
              <option value="18-25">18-25</option>
              <option value="25-35">25-35</option>
              <option value="35-45">35-45</option>
              <option value="45+">45+</option>
            </FilterSelect>
          </FilterGroup>
          
          <FilterGroup>
            <FilterLabel>Location</FilterLabel>
            <FilterSelect
              value={filters.location}
              onChange={(e) => handleFilterChange('location', e.target.value)}
            >
              <option value="anywhere">Anywhere</option>
              <option value="nearby">Nearby</option>
              <option value="same-city">Same City</option>
              <option value="same-country">Same Country</option>
            </FilterSelect>
          </FilterGroup>
          
          <FilterGroup>
            <FilterLabel>Interests</FilterLabel>
            <FilterSelect
              value={filters.interests}
              onChange={(e) => handleFilterChange('interests', e.target.value)}
            >
              <option value="all">All Interests</option>
              <option value="technology">Technology</option>
              <option value="music">Music</option>
              <option value="art">Art</option>
              <option value="sports">Sports</option>
            </FilterSelect>
          </FilterGroup>
          
          <FilterGroup>
            <FilterLabel>Min Compatibility</FilterLabel>
            <FilterSelect
              value={filters.compatibility}
              onChange={(e) => handleFilterChange('compatibility', e.target.value)}
            >
              <option value="50+">50%+</option>
              <option value="60+">60%+</option>
              <option value="70+">70%+</option>
              <option value="80+">80%+</option>
              <option value="90+">90%+</option>
            </FilterSelect>
          </FilterGroup>
        </FilterGrid>
      </FiltersSection>

      {suggestions.length > 0 ? (
        <SuggestionsGrid>
          {suggestions.map((suggestion, index) => (
            <SuggestionCard
              key={suggestion.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <CompatibilityScore>
                {suggestion.compatibility}% Match
              </CompatibilityScore>
              
              <CardHeader>
                <Avatar>
                  {suggestion.firstName[0]}{suggestion.lastName[0]}
                </Avatar>
                <UserInfo>
                  <UserName>{suggestion.firstName} {suggestion.lastName}</UserName>
                  <UserLocation>{suggestion.location}</UserLocation>
                </UserInfo>
              </CardHeader>
              
              <UserBio>{suggestion.bio}</UserBio>
              
              <TraitsSection>
                <TraitsTitle>Personality Traits</TraitsTitle>
                <TraitsList>
                  {suggestion.traits.map((trait, idx) => (
                    <TraitTag key={idx}>{trait}</TraitTag>
                  ))}
                </TraitsList>
              </TraitsSection>
              
              <CommonInterests>
                <InterestsTitle>Common Interests</InterestsTitle>
                <InterestsList>
                  {suggestion.interests.map((interest, idx) => (
                    <InterestTag key={idx}>{interest}</InterestTag>
                  ))}
                </InterestsList>
              </CommonInterests>
              
              <ActionButtons>
                <ActionButton
                  className="connect"
                  onClick={() => handleConnect(suggestion.id)}
                >
                  <FiHeart />
                  Connect
                </ActionButton>
                <ActionButton
                  className="pass"
                  onClick={() => handlePass(suggestion.id)}
                >
                  <FiX />
                  Pass
                </ActionButton>
              </ActionButtons>
            </SuggestionCard>
          ))}
        </SuggestionsGrid>
      ) : (
        <EmptyState>
          <EmptyIcon>
            <FiUser />
          </EmptyIcon>
          <EmptyText>No suggestions found</EmptyText>
          <EmptyDescription>
            Try adjusting your filters or check back later for new matches
          </EmptyDescription>
        </EmptyState>
      )}
    </MatchingContainer>
  );
};

export default MatchingPage; 