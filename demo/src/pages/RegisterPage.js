import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const RegisterContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.colors.background[950]};
  padding: 24px;
`;

const RegisterCard = styled(motion.div)`
  background: ${({ theme }) => theme.colors.background[900]};
  border: 1px solid ${({ theme }) => theme.colors.border.dark};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  padding: 48px;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
`;

const Logo = styled.h1`
  font-size: 32px;
  font-weight: 800;
  text-align: center;
  margin-bottom: 32px;
  background: ${({ theme }) => theme.gradients.primary};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const Message = styled.p`
  text-align: center;
  color: ${({ theme }) => theme.colors.text[400]};
  margin-bottom: 24px;
`;

const LoginLink = styled(Link)`
  display: block;
  text-align: center;
  color: ${({ theme }) => theme.colors.primary[500]};
  text-decoration: none;
  font-weight: 600;
  
  &:hover {
    text-decoration: underline;
  }
`;

const RegisterPage = () => {
  return (
    <RegisterContainer>
      <RegisterCard
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Logo>RCHXTYPE</Logo>
        <Message>
          Registration is not available in the demo version. 
          Please use the login credentials to access the demo.
        </Message>
        <LoginLink to="/login">Go to Login</LoginLink>
      </RegisterCard>
    </RegisterContainer>
  );
};

export default RegisterPage;
