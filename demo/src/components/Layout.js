import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { 
  FiHome, 
  FiUser, 
  FiCpu, 
  FiLink, 
  FiUsers, 
  FiMessageSquare, 
  FiMenu, 
  FiX,
  FiLogOut,
  FiSettings
} from 'react-icons/fi';

const LayoutContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.background[950]};
`;

const Sidebar = styled(motion.div)`
  width: 280px;
  background: ${({ theme }) => theme.colors.background[900]};
  border-right: 1px solid ${({ theme }) => theme.colors.border.dark};
  display: flex;
  flex-direction: column;
  position: fixed;
  height: 100vh;
  z-index: 1000;

  @media (max-width: 768px) {
    transform: translateX(${({ isOpen }) => isOpen ? '0' : '-100%'});
    transition: transform 0.3s ease;
  }
`;

const SidebarHeader = styled.div`
  padding: 24px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.dark};
`;

const Logo = styled.h1`
  font-size: 24px;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.primary[500]};
  margin: 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const NavMenu = styled.nav`
  flex: 1;
  padding: 16px 0;
`;

const NavItem = styled(motion.div)`
  margin: 4px 16px;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  overflow: hidden;
`;

const NavLink = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 16px;
  color: ${({ theme, active }) => active ? theme.colors.primary[500] : theme.colors.text[300]};
  background: ${({ theme, active }) => active ? theme.colors.primary[500] + '20' : 'transparent'};
  text-decoration: none;
  font-weight: ${({ active }) => active ? 600 : 500};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme, active }) => active ? theme.colors.primary[500] + '30' : theme.colors.background[800]};
    color: ${({ theme, active }) => active ? theme.colors.primary[400] : theme.colors.text[200]};
  }
`;

const NavIcon = styled.div`
  margin-right: 12px;
  font-size: 18px;
`;

const UserSection = styled.div`
  padding: 16px;
  border-top: 1px solid ${({ theme }) => theme.colors.border.dark};
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 12px;
`;

const UserAvatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 12px;
  object-fit: cover;
`;

const UserDetails = styled.div`
  flex: 1;
`;

const UserName = styled.div`
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text[100]};
  font-size: 14px;
`;

const UserEmail = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.text[400]};
`;

const LogoutButton = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px 16px;
  background: ${({ theme }) => theme.colors.status.error + '20'};
  color: ${({ theme }) => theme.colors.status.error};
  border: 1px solid ${({ theme }) => theme.colors.status.error + '40'};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.status.error + '30'};
  }
`;

const MainContent = styled.main`
  flex: 1;
  margin-left: 280px;
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    margin-left: 0;
  }
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 24px;
  background: ${({ theme }) => theme.colors.background[900]};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.dark};
  position: sticky;
  top: 0;
  z-index: 100;
`;

const PageTitle = styled.h2`
  font-size: 24px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text[100]};
  margin: 0;
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.text[300]};
  font-size: 24px;
  cursor: pointer;
  padding: 8px;

  @media (max-width: 768px) {
    display: block;
  }
`;

const Content = styled.div`
  flex: 1;
  padding: 24px;
  overflow-y: auto;
`;

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
  display: none;

  @media (max-width: 768px) {
    display: ${({ isOpen }) => isOpen ? 'block' : 'none'};
  }
`;

const navigationItems = [
  { path: '/dashboard', label: 'Dashboard', icon: FiHome },
  { path: '/profile', label: 'Profile', icon: FiUser },
  { path: '/personality', label: 'Personality', icon: FiCpu },
  { path: '/integrations', label: 'Integrations', icon: FiLink },
  { path: '/matching', label: 'Matching', icon: FiUsers },
  { path: '/connections', label: 'Connections', icon: FiMessageSquare },
];

const Layout = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleNavigation = (path) => {
    navigate(path);
    setIsSidebarOpen(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getPageTitle = () => {
    const currentItem = navigationItems.find(item => item.path === location.pathname);
    return currentItem ? currentItem.label : 'RCHXTYPE';
  };

  return (
    <LayoutContainer>
      <Overlay 
        isOpen={isSidebarOpen} 
        onClick={() => setIsSidebarOpen(false)}
        initial={{ opacity: 0 }}
        animate={{ opacity: isSidebarOpen ? 1 : 0 }}
        transition={{ duration: 0.2 }}
      />
      
      <Sidebar
        initial={{ x: -280 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.3 }}
        isOpen={isSidebarOpen}
      >
        <SidebarHeader>
          <Logo>RCHXTYPE</Logo>
        </SidebarHeader>

        <NavMenu>
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <NavItem key={item.path}>
                <NavLink 
                  active={isActive}
                  onClick={() => handleNavigation(item.path)}
                >
                  <NavIcon>
                    <Icon />
                  </NavIcon>
                  {item.label}
                </NavLink>
              </NavItem>
            );
          })}
        </NavMenu>

        <UserSection>
          <UserInfo>
            <UserAvatar src={user?.profile?.avatar || 'https://via.placeholder.com/40'} alt="User" />
            <UserDetails>
              <UserName>{user?.firstName} {user?.lastName}</UserName>
              <UserEmail>{user?.email}</UserEmail>
            </UserDetails>
          </UserInfo>
          <LogoutButton onClick={handleLogout}>
            <FiLogOut style={{ marginRight: 8 }} />
            Logout
          </LogoutButton>
        </UserSection>
      </Sidebar>

      <MainContent>
        <Header>
          <MobileMenuButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            {isSidebarOpen ? <FiX /> : <FiMenu />}
          </MobileMenuButton>
          <PageTitle>{getPageTitle()}</PageTitle>
          <div style={{ width: 40 }} /> {/* Spacer for centering */}
        </Header>
        
        <Content>
          {children}
        </Content>
      </MainContent>
    </LayoutContainer>
  );
};

export default Layout;
