import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const ConnectionsContainer = styled.div`
  padding: 24px;
`;

const Title = styled.h1`
  font-size: 32px;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.text[100]};
  margin-bottom: 24px;
`;

const Message = styled.p`
  color: ${({ theme }) => theme.colors.text[400]};
  font-size: 18px;
`;

const ConnectionsPage = () => {
  return (
    <ConnectionsContainer>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Title>Connections</Title>
        <Message>
          Connections page coming soon! This will show your network and manage relationships.
        </Message>
      </motion.div>
    </ConnectionsContainer>
  );
};

export default ConnectionsPage;
