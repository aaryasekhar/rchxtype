import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { FiChevronLeft, FiChevronRight, FiMusic, FiTrendingUp, FiShoppingBag, FiPlay, FiHeart, FiShare2, FiBookmark } from 'react-icons/fi';

const ForYouContainer = styled.div`
  padding: 32px;
  max-width: 1400px;
  margin: 0 auto;
`;

const Header = styled(motion.div)`
  margin-bottom: 48px;
`;

const Title = styled.h1`
  font-size: 48px;
  font-weight: 900;
  color: #f1f5f9;
  margin: 0 0 8px 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const Subtitle = styled.p`
  color: #94a3b8;
  font-size: 18px;
  margin: 0;
  font-weight: 400;
`;

const CategoryTabs = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 48px;
  padding: 8px;
  background: #1e293b;
  border-radius: 16px;
  width: fit-content;
`;

const CategoryTab = styled.button`
  background: ${({ active }) => active ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : 'transparent'};
  color: ${({ active }) => active ? 'white' : '#94a3b8'};
  border: none;
  padding: 12px 20px;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 14px;

  &:hover {
    color: ${({ active }) => active ? 'white' : '#f1f5f9'};
    background: ${({ active }) => active ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : 'rgba(148, 163, 184, 0.1)'};
  }
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 32px;
`;

const InterestCard = styled(motion.div)`
  background: linear-gradient(135deg, rgba(30, 41, 59, 0.8) 0%, rgba(51, 65, 85, 0.8) 100%);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(71, 85, 105, 0.3);
  border-radius: 20px;
  overflow: hidden;
  transition: all 0.4s ease;
  cursor: pointer;
  position: relative;

  &:hover {
    transform: translateY(-8px) scale(1.02);
    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.4);
    border-color: rgba(102, 126, 234, 0.5);
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: ${({ gradient }) => gradient};
  }
`;

const CardHeader = styled.div`
  padding: 24px 24px 16px 24px;
  display: flex;
  align-items: center;
  gap: 16px;
`;

const CardIcon = styled.div`
  width: 48px;
  height: 48px;
  background: ${({ gradient }) => gradient};
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  color: white;
`;

const CardTitle = styled.h3`
  font-size: 20px;
  font-weight: 700;
  color: #f1f5f9;
  margin: 0;
  flex: 1;
`;

const CardContent = styled.div`
  padding: 0 24px 24px 24px;
`;

const CardDescription = styled.p`
  color: #94a3b8;
  font-size: 15px;
  line-height: 1.6;
  margin: 0 0 20px 0;
`;

const CardMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const MetaInfo = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
`;

const MetaTag = styled.span`
  font-size: 12px;
  color: #64748b;
  background: rgba(51, 65, 85, 0.5);
  padding: 4px 8px;
  border-radius: 8px;
  font-weight: 500;
`;

const MetaValue = styled.span`
  font-size: 12px;
  color: #94a3b8;
  font-weight: 500;
`;

const CardActions = styled.div`
  display: flex;
  gap: 8px;
  justify-content: flex-end;
`;

const ActionButton = styled.button`
  background: rgba(51, 65, 85, 0.3);
  border: 1px solid rgba(71, 85, 105, 0.3);
  color: #94a3b8;
  cursor: pointer;
  padding: 8px;
  border-radius: 8px;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: #0ea5e9;
    background: rgba(14, 165, 233, 0.1);
    border-color: rgba(14, 165, 233, 0.3);
  }
`;

const ForYouPage = () => {
  const { user } = useAuth();
  const [activeCategory, setActiveCategory] = useState('music');

  const categories = [
    { id: 'music', name: 'Music', icon: FiMusic },
    { id: 'news', name: 'News', icon: FiTrendingUp },
    { id: 'shopping', name: 'Shopping', icon: FiShoppingBag },
    { id: 'entertainment', name: 'Entertainment', icon: FiPlay }
  ];

  const mockData = {
    music: [
      {
        id: 1,
        title: 'Indie Rock Mix',
        description: 'Based on your love for alternative music and recent Spotify activity',
        gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        icon: FiMusic,
        type: 'Playlist',
        duration: '2h 34m',
        tracks: 45
      },
      {
        id: 2,
        title: 'Jazz Vibes',
        description: 'Relaxing jazz collection perfect for your work sessions',
        gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        icon: FiMusic,
        type: 'Album',
        duration: '1h 12m',
        tracks: 12
      },
      {
        id: 3,
        title: 'Electronic Beats',
        description: 'High-energy electronic tracks for your workout routine',
        gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
        icon: FiMusic,
        type: 'Playlist',
        duration: '1h 45m',
        tracks: 28
      },
      {
        id: 4,
        title: 'Classical Masterpieces',
        description: 'Timeless classical compositions for deep focus',
        gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
        icon: FiMusic,
        type: 'Album',
        duration: '3h 20m',
        tracks: 18
      }
    ],
    news: [
      {
        id: 1,
        title: 'Tech Industry Trends',
        description: 'Latest developments in AI, startups, and innovation',
        gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        icon: FiTrendingUp,
        type: 'Article',
        readTime: '5 min',
        source: 'TechCrunch'
      },
      {
        id: 2,
        title: 'Climate Change Report',
        description: 'New findings on global warming and sustainable solutions',
        gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        icon: FiTrendingUp,
        type: 'Report',
        readTime: '8 min',
        source: 'Nature'
      },
      {
        id: 3,
        title: 'Space Exploration',
        description: 'Latest missions to Mars and beyond',
        gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
        icon: FiTrendingUp,
        type: 'Article',
        readTime: '6 min',
        source: 'NASA'
      },
      {
        id: 4,
        title: 'Health & Wellness',
        description: 'Mental health awareness and wellness tips',
        gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
        icon: FiTrendingUp,
        type: 'Guide',
        readTime: '4 min',
        source: 'HealthLine'
      }
    ],
    shopping: [
      {
        id: 1,
        title: 'Smart Home Devices',
        description: 'IoT gadgets and smart home automation',
        gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        icon: FiShoppingBag,
        type: 'Category',
        items: 24,
        discount: '20% off'
      },
      {
        id: 2,
        title: 'Fitness Equipment',
        description: 'Home workout gear and fitness accessories',
        gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        icon: FiShoppingBag,
        type: 'Category',
        items: 18,
        discount: '15% off'
      },
      {
        id: 3,
        title: 'Tech Gadgets',
        description: 'Latest smartphones, laptops, and accessories',
        gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
        icon: FiShoppingBag,
        type: 'Category',
        items: 32,
        discount: '25% off'
      },
      {
        id: 4,
        title: 'Books & Learning',
        description: 'Educational materials and personal development',
        gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
        icon: FiShoppingBag,
        type: 'Category',
        items: 45,
        discount: '30% off'
      }
    ],
    entertainment: [
      {
        id: 1,
        title: 'Sci-Fi Movies',
        description: 'Blockbuster sci-fi films and hidden gems',
        gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        icon: FiPlay,
        type: 'Collection',
        duration: '2h 15m',
        rating: '4.8/5'
      },
      {
        id: 2,
        title: 'Comedy Specials',
        description: 'Stand-up comedy and humorous content',
        gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        icon: FiPlay,
        type: 'Series',
        episodes: 12,
        rating: '4.6/5'
      },
      {
        id: 3,
        title: 'Documentary Series',
        description: 'Educational and thought-provoking documentaries',
        gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
        icon: FiPlay,
        type: 'Series',
        episodes: 8,
        rating: '4.9/5'
      },
      {
        id: 4,
        title: 'Action Thrillers',
        description: 'High-octane action movies and TV shows',
        gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
        icon: FiPlay,
        type: 'Collection',
        duration: '1h 45m',
        rating: '4.7/5'
      }
    ]
  };

  const currentData = mockData[activeCategory] || [];

  return (
    <ForYouContainer>
      <Header
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Title>For You</Title>
        <Subtitle>Personalized recommendations based on your interests and personality</Subtitle>
      </Header>

      <CategoryTabs>
        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <CategoryTab
              key={category.id}
              active={activeCategory === category.id}
              onClick={() => setActiveCategory(category.id)}
            >
              <Icon style={{ marginRight: '8px' }} />
              {category.name}
            </CategoryTab>
          );
        })}
      </CategoryTabs>

      <ContentGrid>
        {currentData.map((item, index) => (
          <InterestCard
            key={item.id}
            gradient={item.gradient}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
          >
            <CardHeader>
              <CardIcon gradient={item.gradient}>
                <item.icon />
              </CardIcon>
              <CardTitle>{item.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>{item.description}</CardDescription>
              <CardMeta>
                <MetaInfo>
                  <MetaTag>{item.type}</MetaTag>
                  {item.duration && <MetaValue>{item.duration}</MetaValue>}
                  {item.readTime && <MetaValue>{item.readTime}</MetaValue>}
                  {item.items && <MetaValue>{item.items} items</MetaValue>}
                  {item.episodes && <MetaValue>{item.episodes} episodes</MetaValue>}
                  {item.rating && <MetaValue style={{ color: '#fbbf24' }}>{item.rating}</MetaValue>}
                  {item.discount && <MetaValue style={{ color: '#10b981' }}>{item.discount}</MetaValue>}
                </MetaInfo>
              </CardMeta>
              <CardActions>
                <ActionButton>
                  <FiHeart />
                </ActionButton>
                <ActionButton>
                  <FiBookmark />
                </ActionButton>
                <ActionButton>
                  <FiShare2 />
                </ActionButton>
              </CardActions>
            </CardContent>
          </InterestCard>
        ))}
      </ContentGrid>
    </ForYouContainer>
  );
};

export default ForYouPage;
