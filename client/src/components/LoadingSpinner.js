import React from 'react';
import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const pulse = keyframes`
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
`;

const LoadingSpinner = ({ size = 'medium', color = 'primary', text = 'Loading...' }) => {
  return (
    <Container>
      <Spinner size={size} color={color}>
        <SpinnerRing />
      </Spinner>
      {text && <LoadingText>{text}</LoadingText>}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 200px;
  gap: ${({ theme }) => theme.spacing[4]};
`;

const Spinner = styled.div`
  position: relative;
  width: ${({ size, theme }) => {
    switch (size) {
      case 'small': return '24px';
      case 'large': return '64px';
      default: return '40px';
    }
  }};
  height: ${({ size, theme }) => {
    switch (size) {
      case 'small': return '24px';
      case 'large': return '64px';
      default: return '40px';
    }
  }};
`;

const SpinnerRing = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border: 3px solid ${({ theme }) => theme.colors.border};
  border-top: 3px solid ${({ theme }) => theme.colors.primary};
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;

const LoadingText = styled.div`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  animation: ${pulse} 2s ease-in-out infinite;
`;

export default LoadingSpinner; 