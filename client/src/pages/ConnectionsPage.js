import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { FiUsers, FiMessageCircle, FiUserCheck, FiClock, FiStar, FiMoreVertical } from 'react-icons/fi';

const ConnectionsContainer = styled.div`
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

const StatsSection = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
  margin-bottom: 3rem;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const StatCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 1.5rem;
  text-align: center;
`;

const StatValue = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: #667eea;
  margin-bottom: 0.5rem;
`;

const StatLabel = styled.div`
  font-size: 0.9rem;
  color: #b0b0b0;
`;

const TabsSection = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

const Tab = styled.button`
  background: none;
  border: none;
  color: ${props => props.active ? 'white' : '#b0b0b0'};
  padding: 1rem 2rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  border-bottom: 2px solid ${props => props.active ? '#667eea' : 'transparent'};
  
  &:hover {
    color: white;
  }
`;

const ConnectionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
`;

const ConnectionCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 2rem;
  position: relative;
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

const StatusBadge = styled.span`
  position: absolute;
  top: 1rem;
  right: 1rem;
  padding: 0.25rem 0.75rem;
  border-radius: 15px;
  font-size: 0.8rem;
  font-weight: 500;
  background: ${props => {
    switch (props.status) {
      case 'connected': return 'rgba(34, 197, 94, 0.2)';
      case 'pending': return 'rgba(251, 191, 36, 0.2)';
      case 'requested': return 'rgba(59, 130, 246, 0.2)';
      default: return 'rgba(255, 255, 255, 0.1)';
    }
  }};
  color: ${props => {
    switch (props.status) {
      case 'connected': return '#22c55e';
      case 'pending': return '#fbbf24';
      case 'requested': return '#3b82f6';
      default: return '#b0b0b0';
    }
  }};
`;

const CompatibilityScore = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
  font-size: 0.9rem;
  color: #667eea;
  font-weight: 600;
`;

const UserBio = styled.p`
  color: #b0b0b0;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  font-size: 0.9rem;
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
  
  &.primary {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 10px 20px rgba(102, 126, 234, 0.3);
    }
  }
  
  &.secondary {
    background: rgba(255, 255, 255, 0.1);
    color: white;
    border: 1px solid rgba(255, 255, 255, 0.2);
    
    &:hover {
      background: rgba(255, 255, 255, 0.15);
    }
  }
  
  &.danger {
    background: rgba(239, 68, 68, 0.2);
    color: #ef4444;
    border: 1px solid rgba(239, 68, 68, 0.3);
    
    &:hover {
      background: rgba(239, 68, 68, 0.3);
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

const ConnectionsPage = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('connected');

  // Mock connections data
  const connections = [
    {
      id: 'user1',
      firstName: 'Sarah',
      lastName: 'Johnson',
      location: 'New York, NY',
      bio: 'Passionate about technology and music. Love exploring new places and meeting interesting people.',
      compatibility: 92,
      status: 'connected',
      interests: ['Technology', 'Music', 'Travel', 'Art'],
      lastMessage: '2024-01-15T10:30:00Z'
    },
    {
      id: 'user2',
      firstName: 'Michael',
      lastName: 'Chen',
      location: 'San Francisco, CA',
      bio: 'Software engineer by day, musician by night. Always curious about new technologies and creative projects.',
      compatibility: 87,
      status: 'connected',
      interests: ['Technology', 'Music', 'Science', 'Photography'],
      lastMessage: '2024-01-14T15:45:00Z'
    },
    {
      id: 'user3',
      firstName: 'Emma',
      lastName: 'Williams',
      location: 'Austin, TX',
      bio: 'UX designer who loves psychology and human behavior. Enjoys hiking, reading, and deep conversations.',
      compatibility: 85,
      status: 'pending',
      interests: ['Design', 'Psychology', 'Nature', 'Books'],
      lastMessage: null
    },
    {
      id: 'user4',
      firstName: 'David',
      lastName: 'Rodriguez',
      location: 'Miami, FL',
      bio: 'Entrepreneur and fitness enthusiast. Passionate about helping others achieve their goals.',
      compatibility: 78,
      status: 'requested',
      interests: ['Business', 'Fitness', 'Motivation', 'Travel'],
      lastMessage: null
    }
  ];

  const filteredConnections = connections.filter(connection => {
    switch (activeTab) {
      case 'connected':
        return connection.status === 'connected';
      case 'pending':
        return connection.status === 'pending';
      case 'requests':
        return connection.status === 'requested';
      default:
        return true;
    }
  });

  const stats = {
    connected: connections.filter(c => c.status === 'connected').length,
    pending: connections.filter(c => c.status === 'pending').length,
    requests: connections.filter(c => c.status === 'requested').length,
    total: connections.length
  };

  const handleAccept = async (userId) => {
    // Simulate accept action
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log(`Accepted connection request from ${userId}...`);
  };

  const handleReject = async (userId) => {
    // Simulate reject action
    await new Promise(resolve => setTimeout(resolve, 500));
    console.log(`Rejected connection request from ${userId}...`);
  };

  const handleMessage = async (userId) => {
    // Simulate message action
    console.log(`Opening message with ${userId}...`);
  };

  const handleRemove = async (userId) => {
    // Simulate remove action
    await new Promise(resolve => setTimeout(resolve, 500));
    console.log(`Removed connection with ${userId}...`);
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <ConnectionsContainer>
      <Header>
        <Title>Your Connections</Title>
        <Subtitle>
          Manage your connections and discover new relationships
        </Subtitle>
      </Header>

      <StatsSection>
        <StatCard
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <StatValue>{stats.total}</StatValue>
          <StatLabel>Total Connections</StatLabel>
        </StatCard>
        <StatCard
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <StatValue>{stats.connected}</StatValue>
          <StatLabel>Connected</StatLabel>
        </StatCard>
        <StatCard
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <StatValue>{stats.pending}</StatValue>
          <StatLabel>Pending</StatLabel>
        </StatCard>
        <StatCard
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <StatValue>{stats.requests}</StatValue>
          <StatLabel>Requests</StatLabel>
        </StatCard>
      </StatsSection>

      <TabsSection>
        <Tab
          active={activeTab === 'connected'}
          onClick={() => setActiveTab('connected')}
        >
          Connected ({stats.connected})
        </Tab>
        <Tab
          active={activeTab === 'pending'}
          onClick={() => setActiveTab('pending')}
        >
          Pending ({stats.pending})
        </Tab>
        <Tab
          active={activeTab === 'requests'}
          onClick={() => setActiveTab('requests')}
        >
          Requests ({stats.requests})
        </Tab>
      </TabsSection>

      {filteredConnections.length > 0 ? (
        <ConnectionsGrid>
          {filteredConnections.map((connection, index) => (
            <ConnectionCard
              key={connection.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <StatusBadge status={connection.status}>
                {connection.status.charAt(0).toUpperCase() + connection.status.slice(1)}
              </StatusBadge>
              
              <CardHeader>
                <Avatar>
                  {connection.firstName[0]}{connection.lastName[0]}
                </Avatar>
                <UserInfo>
                  <UserName>{connection.firstName} {connection.lastName}</UserName>
                  <UserLocation>{connection.location}</UserLocation>
                </UserInfo>
              </CardHeader>
              
              <CompatibilityScore>
                <FiStar />
                {connection.compatibility}% Match
              </CompatibilityScore>
              
              <UserBio>{connection.bio}</UserBio>
              
              <CommonInterests>
                <InterestsTitle>Common Interests</InterestsTitle>
                <InterestsList>
                  {connection.interests.map((interest, idx) => (
                    <InterestTag key={idx}>{interest}</InterestTag>
                  ))}
                </InterestsList>
              </CommonInterests>
              
              <ActionButtons>
                {connection.status === 'connected' && (
                  <>
                    <ActionButton
                      className="primary"
                      onClick={() => handleMessage(connection.id)}
                    >
                      <FiMessageCircle />
                      Message
                    </ActionButton>
                    <ActionButton
                      className="danger"
                      onClick={() => handleRemove(connection.id)}
                    >
                      <FiMoreVertical />
                      Remove
                    </ActionButton>
                  </>
                )}
                
                {connection.status === 'pending' && (
                  <>
                    <ActionButton
                      className="primary"
                      onClick={() => handleAccept(connection.id)}
                    >
                      <FiUserCheck />
                      Accept
                    </ActionButton>
                    <ActionButton
                      className="secondary"
                      onClick={() => handleReject(connection.id)}
                    >
                      <FiX />
                      Decline
                    </ActionButton>
                  </>
                )}
                
                {connection.status === 'requested' && (
                  <ActionButton
                    className="secondary"
                    onClick={() => handleMessage(connection.id)}
                  >
                    <FiClock />
                    Request Sent
                  </ActionButton>
                )}
              </ActionButtons>
            </ConnectionCard>
          ))}
        </ConnectionsGrid>
      ) : (
        <EmptyState>
          <EmptyIcon>
            <FiUsers />
          </EmptyIcon>
          <EmptyText>No {activeTab} connections</EmptyText>
          <EmptyDescription>
            {activeTab === 'connected' && 'Start connecting with people to see them here'}
            {activeTab === 'pending' && 'No pending connection requests'}
            {activeTab === 'requests' && 'No outgoing connection requests'}
          </EmptyDescription>
        </EmptyState>
      )}
    </ConnectionsContainer>
  );
};

export default ConnectionsPage; 