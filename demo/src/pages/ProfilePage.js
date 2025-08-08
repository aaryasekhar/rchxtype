import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const ProfileContainer = styled.div`
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

const ProfilePage = () => {
  return (
    <ProfileContainer>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Title>Profile</Title>
        <Message>
          Profile page coming soon! This will show detailed user information and settings.
        </Message>
      </motion.div>
    </ProfileContainer>
  );
};

export default ProfilePage;
