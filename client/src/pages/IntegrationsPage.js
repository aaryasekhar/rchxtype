import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { FiMusic, FiYoutube, FiLinkedin, FiFacebook, FiRefreshCw, FiLink, FiUnlink, FiClock } from 'react-icons/fi';

const IntegrationsContainer = styled.div`
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

const IntegrationsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
`;

const IntegrationCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 2rem;
  position: relative;
  overflow: hidden;
`;

const IntegrationHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
`;

const IntegrationInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const IntegrationIcon = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  color: white;
  background: ${props => props.connected ? 
    'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : 
    'rgba(255, 255, 255, 0.1)'
  };
`;

const IntegrationDetails = styled.div``;

const IntegrationName = styled.h3`
  font-size: 1.3rem;
  font-weight: 600;
  color: white;
  margin-bottom: 0.25rem;
`;

const IntegrationStatus = styled.div`
  font-size: 0.9rem;
  color: ${props => props.connected ? '#22c55e' : '#fbbf24'};
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const ConnectButton = styled.button`
  background: ${props => props.connected ? 
    'rgba(239, 68, 68, 0.2)' : 
    'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
  };
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
`;

const DataSection = styled.div`
  margin-top: 1.5rem;
`;

const DataTitle = styled.h4`
  font-size: 1.1rem;
  font-weight: 600;
  color: white;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const DataGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
`;

const DataCard = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 1rem;
`;

const DataLabel = styled.div`
  font-size: 0.8rem;
  color: #b0b0b0;
  margin-bottom: 0.5rem;
`;

const DataValue = styled.div`
  font-size: 1rem;
  color: white;
  font-weight: 500;
`;

const LastSync = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.8rem;
  color: #b0b0b0;
  margin-top: 1rem;
`;

const SyncButton = styled.button`
  background: rgba(255, 255, 255, 0.1);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &:hover {
    background: rgba(255, 255, 255, 0.15);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem;
  color: #b0b0b0;
`;

const EmptyIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;
  opacity: 0.5;
`;

const EmptyText = styled.p`
  font-size: 1.1rem;
  margin-bottom: 1rem;
`;

const IntegrationsPage = () => {
  const { user } = useAuth();
  const [syncing, setSyncing] = useState({});

  const integrations = [
    {
      id: 'spotify',
      name: 'Spotify',
      icon: <FiMusic />,
      description: 'Connect your Spotify account to analyze your music preferences',
      color: '#1DB954'
    },
    {
      id: 'youtube',
      name: 'YouTube',
      icon: <FiYoutube />,
      description: 'Connect your YouTube account to analyze your viewing habits',
      color: '#FF0000'
    },
    {
      id: 'linkedin',
      name: 'LinkedIn',
      icon: <FiLinkedin />,
      description: 'Connect your LinkedIn account to analyze your professional interests',
      color: '#0077B5'
    },
    {
      id: 'meta',
      name: 'Meta Services',
      icon: <FiFacebook />,
      description: 'Connect your Meta services to analyze your social interactions',
      color: '#4267B2'
    }
  ];

  const handleConnect = async (integrationId) => {
    // Simulate connection process
    await new Promise(resolve => setTimeout(resolve, 2000));
    console.log(`Connecting to ${integrationId}...`);
  };

  const handleDisconnect = async (integrationId) => {
    // Simulate disconnection process
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log(`Disconnecting from ${integrationId}...`);
  };

  const handleSync = async (integrationId) => {
    setSyncing(prev => ({ ...prev, [integrationId]: true }));
    // Simulate sync process
    await new Promise(resolve => setTimeout(resolve, 3000));
    setSyncing(prev => ({ ...prev, [integrationId]: false }));
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  const connectedCount = Object.values(user.integrations || {}).filter(i => i.connected).length;
  const totalDataPoints = Object.values(user.integrations || {}).reduce((total, integration) => {
    if (integration.connected && integration.data) {
      return total + Object.keys(integration.data).length;
    }
    return total;
  }, 0);

  return (
    <IntegrationsContainer>
      <Header>
        <Title>External Integrations</Title>
        <Subtitle>
          Connect your external accounts to enrich your personality profile with real data
        </Subtitle>
      </Header>

      <StatsSection>
        <StatCard
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <StatValue>{connectedCount}</StatValue>
          <StatLabel>Connected Services</StatLabel>
        </StatCard>
        <StatCard
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <StatValue>{totalDataPoints}</StatValue>
          <StatLabel>Data Points</StatLabel>
        </StatCard>
        <StatCard
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <StatValue>{user.statistics?.profileCompletion || 0}%</StatValue>
          <StatLabel>Profile Enhanced</StatLabel>
        </StatCard>
        <StatCard
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <StatValue>{integrations.length}</StatValue>
          <StatLabel>Available Services</StatLabel>
        </StatCard>
      </StatsSection>

      <IntegrationsGrid>
        {integrations.map((integration, index) => {
          const userIntegration = user.integrations?.[integration.id];
          const isConnected = userIntegration?.connected;
          const data = userIntegration?.data;

          return (
            <IntegrationCard
              key={integration.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <IntegrationHeader>
                <IntegrationInfo>
                  <IntegrationIcon connected={isConnected}>
                    {integration.icon}
                  </IntegrationIcon>
                  <IntegrationDetails>
                    <IntegrationName>{integration.name}</IntegrationName>
                    <IntegrationStatus connected={isConnected}>
                      {isConnected ? 'Connected' : 'Not Connected'}
                    </IntegrationStatus>
                  </IntegrationDetails>
                </IntegrationInfo>
                <ConnectButton
                  connected={isConnected}
                  onClick={() => isConnected ? 
                    handleDisconnect(integration.id) : 
                    handleConnect(integration.id)
                  }
                >
                  {isConnected ? (
                    <>
                      <FiUnlink />
                      Disconnect
                    </>
                  ) : (
                    <>
                      <FiLink />
                      Connect
                    </>
                  )}
                </ConnectButton>
              </IntegrationHeader>

              <p style={{ color: '#b0b0b0', marginBottom: '1.5rem' }}>
                {integration.description}
              </p>

              {isConnected && data ? (
                <DataSection>
                  <DataTitle>
                    <FiRefreshCw />
                    Your Data
                  </DataTitle>
                  <DataGrid>
                    {Object.entries(data).map(([key, value]) => (
                      <DataCard key={key}>
                        <DataLabel>{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</DataLabel>
                        <DataValue>
                          {Array.isArray(value) ? value.slice(0, 3).join(', ') + (value.length > 3 ? '...' : '') : value}
                        </DataValue>
                      </DataCard>
                    ))}
                  </DataGrid>
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem' }}>
                    <LastSync>
                      <FiClock />
                      Last synced: {userIntegration.lastSync ? 
                        new Date(userIntegration.lastSync).toLocaleDateString() : 
                        'Never'
                      }
                    </LastSync>
                    <SyncButton
                      onClick={() => handleSync(integration.id)}
                      disabled={syncing[integration.id]}
                    >
                      {syncing[integration.id] ? (
                        <>
                          <FiRefreshCw style={{ animation: 'spin 1s linear infinite' }} />
                          Syncing...
                        </>
                      ) : (
                        <>
                          <FiRefreshCw />
                          Sync Now
                        </>
                      )}
                    </SyncButton>
                  </div>
                </DataSection>
              ) : (
                <EmptyState>
                  <EmptyIcon>{integration.icon}</EmptyIcon>
                  <EmptyText>No data available</EmptyText>
                  <p style={{ fontSize: '0.9rem', opacity: 0.7 }}>
                    Connect your account to start collecting data
                  </p>
                </EmptyState>
              )}
            </IntegrationCard>
          );
        })}
      </IntegrationsGrid>
    </IntegrationsContainer>
  );
};

export default IntegrationsPage; 