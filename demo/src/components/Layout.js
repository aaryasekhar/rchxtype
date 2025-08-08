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
  FiSettings,
  FiHeart,
  FiChevronLeft,
  FiChevronRight
} from 'react-icons/fi';

const LayoutContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background: #f8f9fa;
`;

const Sidebar = styled(motion.div)`
  width: ${({ collapsed }) => collapsed ? '80px' : '280px'};
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-right: 1px solid rgba(0, 0, 0, 0.1);
  transition: width 0.3s ease;
  position: relative;
  z-index: 1000;
`;

const SidebarHeader = styled.div`
  padding: 24px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Logo = styled.div`
  font-size: 24px;
  font-weight: 900;
  color: #000000;
  display: flex;
  align-items: center;
  gap: 12px;
`;

const LogoIcon = styled.div`
  width: 32px;
  height: 32px;
  background: #000000;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
`;

const ToggleButton = styled.button`
  background: none;
  border: none;
  color: #666666;
  cursor: pointer;
  padding: 8px;
  border-radius: 8px;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: rgba(0, 0, 0, 0.05);
    color: #000000;
  }
`;

const Navigation = styled.nav`
  padding: 24px 0;
`;

const NavList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

const NavItem = styled.li`
  margin: 0;
`;

const NavLink = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px 24px;
  color: ${({ active }) => active ? '#000000' : '#666666'};
  text-decoration: none;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
  font-weight: ${({ active }) => active ? '600' : '500'};

  &:hover {
    background: rgba(0, 0, 0, 0.05);
    color: #000000;
  }

  ${({ active }) => active && `
    background: rgba(0, 0, 0, 0.05);
    
    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      width: 3px;
      background: #000000;
    }
  `}
`;

const NavIcon = styled.div`
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

const NavText = styled.span`
  font-size: 14px;
  white-space: nowrap;
  opacity: ${({ collapsed }) => collapsed ? 0 : 1};
  transition: opacity 0.2s ease;
`;

const UserSection = styled.div`
  padding: 24px;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  margin-top: auto;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
`;

const UserAvatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid rgba(0, 0, 0, 0.1);
`;

const UserDetails = styled.div`
  flex: 1;
  opacity: ${({ collapsed }) => collapsed ? 0 : 1};
  transition: opacity 0.2s ease;
`;

const UserName = styled.div`
  font-weight: 600;
  color: #000000;
  font-size: 14px;
`;

const UserEmail = styled.div`
  font-size: 12px;
  color: #666666;
  margin-top: 2px;
`;

const LogoutButton = styled.button`
  width: 100%;
  background: none;
  border: 1px solid rgba(0, 0, 0, 0.1);
  color: #666666;
  padding: 12px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  &:hover {
    background: rgba(0, 0, 0, 0.05);
    color: #000000;
  }

  opacity: ${({ collapsed }) => collapsed ? 0 : 1};
  transition: opacity 0.2s ease;
`;

const MainContent = styled.main`
  flex: 1;
  background: #f8f9fa;
  overflow-y: auto;
`;

const Header = styled.header`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  padding: 20px 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: sticky;
  top: 0;
  z-index: 100;
`;

const PageTitle = styled.h1`
  font-size: 28px;
  font-weight: 700;
  color: #000000;
  margin: 0;
`;

const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const ActionButton = styled.button`
  background: rgba(255, 255, 255, 0.8);
  border: 1px solid rgba(0, 0, 0, 0.1);
  color: #666666;
  padding: 8px 16px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 8px;

  &:hover {
    background: rgba(255, 255, 255, 1);
    color: #000000;
    border-color: rgba(0, 0, 0, 0.2);
  }
`;

const Content = styled.div`
  padding: 32px;
`;

const Layout = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const navigationItems = [
    { path: '/dashboard', label: 'Dashboard', icon: FiHome },
    { path: '/matching', label: 'Matching', icon: FiUsers },
    { path: '/connections', label: 'Connections', icon: FiMessageSquare },
    { path: '/for-you', label: 'For You', icon: FiHeart },
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getPageTitle = () => {
    const currentItem = navigationItems.find(item => item.path === location.pathname);
    return currentItem ? currentItem.label : 'Dashboard';
  };

  return (
    <LayoutContainer>
      <Sidebar collapsed={sidebarCollapsed}>
        <SidebarHeader>
          <Logo>
            <LogoIcon>R</LogoIcon>
            <AnimatePresence>
              {!sidebarCollapsed && (
                <motion.span
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: 'auto' }}
                  exit={{ opacity: 0, width: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  RCHXTYPE
                </motion.span>
              )}
            </AnimatePresence>
          </Logo>
          <ToggleButton onClick={() => setSidebarCollapsed(!sidebarCollapsed)}>
            {sidebarCollapsed ? <FiChevronRight /> : <FiChevronLeft />}
          </ToggleButton>
        </SidebarHeader>

        <Navigation>
          <NavList>
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <NavItem key={item.path}>
                  <NavLink
                    active={isActive}
                    onClick={() => navigate(item.path)}
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <NavIcon>
                      <Icon />
                    </NavIcon>
                    <NavText collapsed={sidebarCollapsed}>{item.label}</NavText>
                  </NavLink>
                </NavItem>
              );
            })}
          </NavList>
        </Navigation>

        <UserSection>
          <UserInfo>
            <UserAvatar src={user?.profile?.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'} alt="Profile" />
            <UserDetails collapsed={sidebarCollapsed}>
              <UserName>{user?.firstName} {user?.lastName}</UserName>
              <UserEmail>{user?.email}</UserEmail>
            </UserDetails>
          </UserInfo>
          <LogoutButton collapsed={sidebarCollapsed} onClick={handleLogout}>
            <FiLogOut />
            {!sidebarCollapsed && 'Logout'}
          </LogoutButton>
        </UserSection>
      </Sidebar>

      <MainContent>
        <Header>
          <PageTitle>{getPageTitle()}</PageTitle>
          <HeaderActions>
            <ActionButton>
              <FiSettings />
              Settings
            </ActionButton>
          </HeaderActions>
        </Header>
        <Content>
          {children}
        </Content>
      </MainContent>
    </LayoutContainer>
  );
};

export default Layout;
