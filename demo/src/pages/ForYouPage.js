import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { FiMusic, FiTrendingUp, FiShoppingBag, FiPlay, FiHeart, FiShare2, FiBookmark, FiArrowRight, FiArrowLeft } from 'react-icons/fi';

const ForYouContainer = styled.div`
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

const CategoryNavigation = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-bottom: 80px;
  flex-wrap: wrap;
`;

const CategoryButton = styled(motion.button)`
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
  padding: 16px 32px;
  border-radius: 50px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 16px;
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

const ContentSection = styled.div`
  margin-bottom: 120px;
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 60px;
  border-bottom: 1px solid ${({ theme }) => theme === 'dark' ? '#333333' : '#e5e5e5'};
  padding-bottom: 24px;
`;

const SectionTitle = styled.h2`
  font-size: clamp(32px, 4vw, 64px);
  font-weight: 800;
  color: ${({ theme }) => theme === 'dark' ? '#ffffff' : '#000000'};
  margin: 0;
  text-transform: uppercase;
  letter-spacing: -0.02em;
`;

const NavigationControls = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
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

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  gap: 40px;
`;

const ContentCard = styled(motion.div)`
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

const CardImage = styled.div`
  height: 280px;
  background: ${({ image }) => `url(${image})`};
  background-size: cover;
  background-position: center;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.1) 100%);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  ${ContentCard}:hover &::before {
    opacity: 1;
  }
`;

const CardOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.4) 100%);
  opacity: 0;
  transition: opacity 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  ${ContentCard}:hover & {
    opacity: 1;
  }
`;

const PlayButton = styled.button`
  background: rgba(255, 255, 255, 0.95);
  border: none;
  color: #000000;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.1);
    background: white;
  }
`;

const CardContent = styled.div`
  padding: 32px;
`;

const CardTitle = styled.h3`
  font-size: 28px;
  font-weight: 700;
  color: ${({ theme }) => theme === 'dark' ? '#ffffff' : '#000000'};
  margin: 0 0 16px 0;
  line-height: 1.2;
  letter-spacing: -0.01em;
`;

const CardDescription = styled.p`
  color: ${({ theme }) => theme === 'dark' ? '#888888' : '#666666'};
  font-size: 16px;
  line-height: 1.6;
  margin: 0 0 24px 0;
`;

const CardMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;

const MetaInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const MetaTag = styled.span`
  font-size: 12px;
  color: ${({ theme }) => theme === 'dark' ? '#888888' : '#666666'};
  background: ${({ theme }) => theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'};
  padding: 6px 12px;
  border-radius: 20px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-weight: 600;
  width: fit-content;
`;

const MetaValue = styled.span`
  font-size: 14px;
  color: ${({ theme }) => theme === 'dark' ? '#888888' : '#666666'};
  font-weight: 500;
`;

const CardActions = styled.div`
  display: flex;
  gap: 12px;
`;

const ActionButton = styled.button`
  background: ${({ theme }) => theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'};
  border: 1px solid ${({ theme }) => theme === 'dark' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.1)'};
  color: ${({ theme }) => theme === 'dark' ? '#ffffff' : '#000000'};
  cursor: pointer;
  padding: 12px;
  border-radius: 12px;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;

  &:hover {
    background: ${({ theme }) => theme === 'dark' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.1)'};
    transform: translateY(-2px);
  }
`;

const ForYouPage = () => {
  const { user } = useAuth();
  const { theme } = useTheme();
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
        title: 'Indie Rock Collection',
        description: 'Curated alternative tracks based on your recent listening patterns and mood analysis',
        image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=400&fit=crop',
        type: 'Playlist',
        duration: '2h 34m',
        tracks: 45,
        artist: 'Various Artists'
      },
      {
        id: 2,
        title: 'Jazz Essentials',
        description: 'Timeless jazz compositions perfect for deep work and relaxation sessions',
        image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=600&h=400&fit=crop',
        type: 'Album',
        duration: '1h 12m',
        tracks: 12,
        artist: 'Miles Davis'
      },
      {
        id: 3,
        title: 'Electronic Vibes',
        description: 'High-energy electronic beats for your workout and productivity sessions',
        image: 'https://images.unsplash.com/photo-1516280440614-37939bb1d5e9?w=600&h=400&fit=crop',
        type: 'Playlist',
        duration: '1h 45m',
        tracks: 28,
        artist: 'Daft Punk'
      },
      {
        id: 4,
        title: 'Classical Masterpieces',
        description: 'Symphonic works that enhance focus and creative thinking',
        image: 'https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=600&h=400&fit=crop',
        type: 'Album',
        duration: '3h 20m',
        tracks: 18,
        artist: 'Beethoven'
      }
    ],
    news: [
      {
        id: 1,
        title: 'Tech Industry Insights',
        description: 'Latest developments in AI, startups, and innovation shaping the future',
        image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=600&h=400&fit=crop',
        type: 'Article',
        readTime: '5 min',
        source: 'TechCrunch',
        author: 'Sarah Johnson'
      },
      {
        id: 2,
        title: 'Climate Action Report',
        description: 'Comprehensive analysis of global warming trends and sustainable solutions',
        image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&h=400&fit=crop',
        type: 'Report',
        readTime: '8 min',
        source: 'Nature',
        author: 'Dr. Michael Chen'
      },
      {
        id: 3,
        title: 'Space Exploration',
        description: 'Breakthrough missions to Mars and beyond in modern space exploration',
        image: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=600&h=400&fit=crop',
        type: 'Article',
        readTime: '6 min',
        source: 'NASA',
        author: 'Alex Rodriguez'
      },
      {
        id: 4,
        title: 'Mental Health & Wellness',
        description: 'Comprehensive guide to mental health awareness and wellness practices',
        image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop',
        type: 'Guide',
        readTime: '4 min',
        source: 'HealthLine',
        author: 'Dr. Emily White'
      }
    ],
    shopping: [
      {
        id: 1,
        title: 'Smart Home Collection',
        description: 'Cutting-edge IoT devices and smart home automation solutions',
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop',
        type: 'Category',
        items: 24,
        discount: '20% off',
        brand: 'TechHub'
      },
      {
        id: 2,
        title: 'Fitness & Wellness',
        description: 'Premium home workout equipment and fitness accessories for your lifestyle',
        image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop',
        type: 'Category',
        items: 18,
        discount: '15% off',
        brand: 'FitLife'
      },
      {
        id: 3,
        title: 'Tech Gadgets',
        description: 'Latest smartphones, laptops, and cutting-edge tech accessories',
        image: 'https://images.unsplash.com/photo-1468495244123-6c6a332d6b0f?w=600&h=400&fit=crop',
        type: 'Category',
        items: 32,
        discount: '25% off',
        brand: 'TechZone'
      },
      {
        id: 4,
        title: 'Books & Learning',
        description: 'Educational materials and personal development resources',
        image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600&h=400&fit=crop',
        type: 'Category',
        items: 45,
        discount: '30% off',
        brand: 'BookWorld'
      }
    ],
    entertainment: [
      {
        id: 1,
        title: 'Sci-Fi Cinema',
        description: 'Blockbuster sci-fi films and hidden gems from visionary directors',
        image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=600&h=400&fit=crop',
        type: 'Collection',
        duration: '2h 15m',
        rating: '4.8/5',
        director: 'Christopher Nolan'
      },
      {
        id: 2,
        title: 'Comedy Specials',
        description: 'Stand-up comedy and humorous content from top comedians',
        image: 'https://images.unsplash.com/photo-1516280440614-37939bb1d5e9?w=600&h=400&fit=crop',
        type: 'Series',
        episodes: 12,
        rating: '4.6/5',
        creator: 'Netflix'
      },
      {
        id: 3,
        title: 'Documentary Series',
        description: 'Educational and thought-provoking documentaries from around the world',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop',
        type: 'Series',
        episodes: 8,
        rating: '4.9/5',
        creator: 'BBC'
      },
      {
        id: 4,
        title: 'Action Thrillers',
        description: 'High-octane action movies and TV shows for adrenaline seekers',
        image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=600&h=400&fit=crop',
        type: 'Collection',
        duration: '1h 45m',
        rating: '4.7/5',
        director: 'Michael Bay'
      }
    ]
  };

  const currentData = mockData[activeCategory] || [];

  return (
    <ForYouContainer>
      <HeroSection
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <HeroTitle theme={theme}>For You</HeroTitle>
        <HeroSubtitle theme={theme}>
          Personalized recommendations curated based on your interests, personality, and behavior patterns
        </HeroSubtitle>
      </HeroSection>

      <CategoryNavigation>
        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <CategoryButton
              key={category.id}
              active={activeCategory === category.id}
              onClick={() => setActiveCategory(category.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              theme={theme}
            >
              <Icon style={{ marginRight: '8px' }} />
              {category.name}
            </CategoryButton>
          );
        })}
      </CategoryNavigation>

      <ContentSection>
        <SectionHeader theme={theme}>
          <SectionTitle theme={theme}>Recently Added</SectionTitle>
          <NavigationControls>
            <NavButton theme={theme}>
              <FiArrowLeft />
            </NavButton>
            <NavButton theme={theme}>
              <FiArrowRight />
            </NavButton>
          </NavigationControls>
        </SectionHeader>

        <ContentGrid>
          {currentData.map((item, index) => (
            <ContentCard
              key={item.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              theme={theme}
            >
              <CardImage image={item.image}>
                <CardOverlay>
                  <PlayButton>
                    <FiPlay />
                  </PlayButton>
                </CardOverlay>
              </CardImage>
              <CardContent>
                <CardTitle theme={theme}>{item.title}</CardTitle>
                <CardDescription theme={theme}>{item.description}</CardDescription>
                <CardMeta>
                  <MetaInfo>
                    <MetaTag theme={theme}>{item.type}</MetaTag>
                    {item.duration && <MetaValue theme={theme}>{item.duration}</MetaValue>}
                    {item.readTime && <MetaValue theme={theme}>{item.readTime}</MetaValue>}
                    {item.items && <MetaValue theme={theme}>{item.items} items</MetaValue>}
                    {item.episodes && <MetaValue theme={theme}>{item.episodes} episodes</MetaValue>}
                    {item.rating && <MetaValue theme={theme} style={{ color: '#fbbf24' }}>{item.rating}</MetaValue>}
                    {item.discount && <MetaValue theme={theme} style={{ color: '#10b981' }}>{item.discount}</MetaValue>}
                    {item.artist && <MetaValue theme={theme}>by {item.artist}</MetaValue>}
                    {item.author && <MetaValue theme={theme}>by {item.author}</MetaValue>}
                    {item.brand && <MetaValue theme={theme}>from {item.brand}</MetaValue>}
                    {item.director && <MetaValue theme={theme}>dir. {item.director}</MetaValue>}
                    {item.creator && <MetaValue theme={theme}>by {item.creator}</MetaValue>}
                  </MetaInfo>
                  <CardActions>
                    <ActionButton theme={theme}>
                      <FiHeart />
                    </ActionButton>
                    <ActionButton theme={theme}>
                      <FiBookmark />
                    </ActionButton>
                    <ActionButton theme={theme}>
                      <FiShare2 />
                    </ActionButton>
                  </CardActions>
                </CardMeta>
              </CardContent>
            </ContentCard>
          ))}
        </ContentGrid>
      </ContentSection>
    </ForYouContainer>
  );
};

export default ForYouPage;
