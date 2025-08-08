import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
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
  FiChevronRight,
  FiMoon,
  FiSun,
  FiBell,
  FiShield,
  FiHelpCircle
} from 'react-icons/fi';

const LayoutContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background: ${({ theme }) => theme === 'dark' ? '#0a0a0a' : '#f8f9fa'};
  transition: background 0.3s ease;
`;

const Sidebar = styled(motion.div)`
  width: ${({ collapsed }) => collapsed ? '80px' : '280px'};
  background: ${({ theme }) => theme === 'dark' ? 'rgba(20, 20, 20, 0.95)' : 'rgba(255, 255, 255, 0.95)'};
  backdrop-filter: blur(20px);
  border-right: 1px solid ${({ theme }) => theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'};
  transition: width 0.3s ease;
  position: relative;
  z-index: 1000;
`;

const SidebarHeader = styled.div`
  padding: 24px;
  border-bottom: 1px solid ${({ theme }) => theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'};
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Logo = styled.div`
  font-size: 24px;
  font-weight: 900;
  color: ${({ theme }) => theme === 'dark' ? '#ffffff' : '#000000'};
  display: flex;
  align-items: center;
  gap: 12px;
`;

const LogoIcon = styled.div`
  width: 32px;
  height: 32px;
  background: ${({ theme }) => theme === 'dark' ? '#ffffff' : '#000000'};
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme === 'dark' ? '#000000' : '#ffffff'};
  font-weight: bold;
`;

const ToggleButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme === 'dark' ? '#666666' : '#666666'};
  cursor: pointer;
  padding: 8px;
  border-radius: 8px;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: ${({ theme }) => theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'};
    color: ${({ theme }) => theme === 'dark' ? '#ffffff' : '#000000'};
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
  color: ${({ active, theme }) => active ? (theme === 'dark' ? '#ffffff' : '#000000') : (theme === 'dark' ? '#666666' : '#666666')};
  text-decoration: none;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
  font-weight: ${({ active }) => active ? '600' : '500'};

  &:hover {
    background: ${({ theme }) => theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'};
    color: ${({ theme }) => theme === 'dark' ? '#ffffff' : '#000000'};
  }

  ${({ active }) => active && `
    background: ${({ theme }) => theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'};
    
    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      width: 3px;
      background: ${({ theme }) => theme === 'dark' ? '#ffffff' : '#000000'};
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
  border-top: 1px solid ${({ theme }) => theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'};
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
  border: 2px solid ${({ theme }) => theme === 'dark' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.1)'};
`;

const UserDetails = styled.div`
  flex: 1;
  opacity: ${({ collapsed }) => collapsed ? 0 : 1};
  transition: opacity 0.2s ease;
`;

const UserName = styled.div`
  font-weight: 600;
  color: ${({ theme }) => theme === 'dark' ? '#ffffff' : '#000000'};
  font-size: 14px;
`;

const UserEmail = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme === 'dark' ? '#666666' : '#666666'};
  margin-top: 2px;
`;

const LogoutButton = styled.button`
  width: 100%;
  background: none;
  border: 1px solid ${({ theme }) => theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'};
  color: ${({ theme }) => theme === 'dark' ? '#666666' : '#666666'};
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
    background: ${({ theme }) => theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'};
    color: ${({ theme }) => theme === 'dark' ? '#ffffff' : '#000000'};
  }

  opacity: ${({ collapsed }) => collapsed ? 0 : 1};
  transition: opacity 0.2s ease;
`;

const MainContent = styled.main`
  flex: 1;
  background: ${({ theme }) => theme === 'dark' ? '#0a0a0a' : '#f8f9fa'};
  overflow-y: auto;
  transition: background 0.3s ease;
`;

const Header = styled.header`
  background: ${({ theme }) => theme === 'dark' ? 'rgba(20, 20, 20, 0.95)' : 'rgba(255, 255, 255, 0.95)'};
  backdrop-filter: blur(20px);
  border-bottom: 1px solid ${({ theme }) => theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'};
  padding: 20px 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: sticky;
  top: 0;
  z-index: 100;
  transition: all 0.3s ease;
`;

const PageTitle = styled.h1`
  font-size: 28px;
  font-weight: 700;
  color: ${({ theme }) => theme === 'dark' ? '#ffffff' : '#000000'};
  margin: 0;
  transition: color 0.3s ease;
`;

const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const ActionButton = styled.button`
  background: ${({ theme }) => theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.8)'};
  border: 1px solid ${({ theme }) => theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'};
  color: ${({ theme }) => theme === 'dark' ? '#ffffff' : '#666666'};
  padding: 8px 16px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 8px;

  &:hover {
    background: ${({ theme }) => theme === 'dark' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 1)'};
    color: ${({ theme }) => theme === 'dark' ? '#ffffff' : '#000000'};
    border-color: ${({ theme }) => theme === 'dark' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)'};
  }
`;

const Content = styled.div`
  padding: 32px;
`;

// Settings Modal Components
const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(10px);
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

const SettingsModal = styled(motion.div)`
  background: ${({ theme }) => theme === 'dark' ? 'rgba(30, 30, 30, 0.95)' : 'rgba(255, 255, 255, 0.95)'};
  backdrop-filter: blur(20px);
  border: 1px solid ${({ theme }) => theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'};
  border-radius: 20px;
  padding: 32px;
  max-width: 500px;
  width: 100%;
  max-height: 80vh;
  overflow-y: auto;
  position: relative;
`;

const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 32px;
`;

const ModalTitle = styled.h2`
  font-size: 24px;
  font-weight: 700;
  color: ${({ theme }) => theme === 'dark' ? '#ffffff' : '#000000'};
  margin: 0;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme === 'dark' ? '#666666' : '#666666'};
  cursor: pointer;
  padding: 8px;
  border-radius: 8px;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'};
    color: ${({ theme }) => theme === 'dark' ? '#ffffff' : '#000000'};
  }
`;

const SettingsSection = styled.div`
  margin-bottom: 32px;
`;

const SectionTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: ${({ theme }) => theme === 'dark' ? '#ffffff' : '#000000'};
  margin: 0 0 16px 0;
  display: flex;
  align-items: center;
  gap: 12px;
`;

const SettingItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  background: ${({ theme }) => theme === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.02)'};
  border: 1px solid ${({ theme }) => theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'};
  border-radius: 12px;
  margin-bottom: 12px;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'};
    border-color: ${({ theme }) => theme === 'dark' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.1)'};
  }
`;

const SettingInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const SettingIcon = styled.div`
  width: 40px;
  height: 40px;
  background: ${({ theme }) => theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'};
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme === 'dark' ? '#ffffff' : '#000000'};
`;

const SettingDetails = styled.div`
  flex: 1;
`;

const SettingName = styled.div`
  font-weight: 600;
  color: ${({ theme }) => theme === 'dark' ? '#ffffff' : '#000000'};
  margin-bottom: 4px;
`;

const SettingDescription = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme === 'dark' ? '#666666' : '#666666'};
`;

const ToggleSwitch = styled.button`
  width: 48px;
  height: 24px;
  background: ${({ active, theme }) => active ? (theme === 'dark' ? '#ffffff' : '#000000') : (theme === 'dark' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.1)')};
  border: none;
  border-radius: 12px;
  cursor: pointer;
  position: relative;
  transition: all 0.2s ease;

  &::after {
    content: '';
    position: absolute;
    top: 2px;
    left: ${({ active }) => active ? '26px' : '2px'};
    width: 20px;
    height: 20px;
    background: ${({ active, theme }) => active ? (theme === 'dark' ? '#000000' : '#ffffff') : (theme === 'dark' ? '#666666' : '#666666')};
    border-radius: 50%;
    transition: all 0.2s ease;
  }
`;

const Layout = ({ children }) => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

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

  const handleSettingsClick = () => {
    setSettingsOpen(true);
  };

  const handleCloseSettings = () => {
    setSettingsOpen(false);
  };

  return (
    <LayoutContainer theme={theme}>
      <Sidebar collapsed={sidebarCollapsed} theme={theme}>
        <SidebarHeader theme={theme}>
          <Logo theme={theme}>
            <LogoIcon theme={theme}>R</LogoIcon>
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
          <ToggleButton onClick={() => setSidebarCollapsed(!sidebarCollapsed)} theme={theme}>
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
                    theme={theme}
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

        <UserSection theme={theme}>
          <UserInfo>
            <UserAvatar src={user?.profile?.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'} alt="Profile" theme={theme} />
            <UserDetails collapsed={sidebarCollapsed} theme={theme}>
              <UserName theme={theme}>{user?.firstName} {user?.lastName}</UserName>
              <UserEmail theme={theme}>{user?.email}</UserEmail>
            </UserDetails>
          </UserInfo>
          <LogoutButton collapsed={sidebarCollapsed} onClick={handleLogout} theme={theme}>
            <FiLogOut />
            {!sidebarCollapsed && 'Logout'}
          </LogoutButton>
        </UserSection>
      </Sidebar>

      <MainContent theme={theme}>
        <Header theme={theme}>
          <PageTitle theme={theme}>{getPageTitle()}</PageTitle>
          <HeaderActions>
            <ActionButton onClick={handleSettingsClick} theme={theme}>
              <FiSettings />
              Settings
            </ActionButton>
          </HeaderActions>
        </Header>
        <Content>
          {children}
        </Content>
      </MainContent>

      <AnimatePresence>
        {settingsOpen && (
          <ModalOverlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleCloseSettings}
          >
            <SettingsModal
              theme={theme}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <ModalHeader>
                <ModalTitle theme={theme}>Settings</ModalTitle>
                <CloseButton onClick={handleCloseSettings} theme={theme}>
                  <FiX />
                </CloseButton>
              </ModalHeader>

              <SettingsSection>
                <SectionTitle theme={theme}>
                  <FiSettings />
                  Appearance
                </SectionTitle>
                <SettingItem theme={theme}>
                  <SettingInfo>
                    <SettingIcon theme={theme}>
                      {theme === 'dark' ? <FiMoon /> : <FiSun />}
                    </SettingIcon>
                    <SettingDetails>
                      <SettingName theme={theme}>Dark Theme</SettingName>
                      <SettingDescription theme={theme}>Switch between light and dark mode</SettingDescription>
                    </SettingDetails>
                  </SettingInfo>
                  <ToggleSwitch
                    active={theme === 'dark'}
                    onClick={toggleTheme}
                    theme={theme}
                  />
                </SettingItem>
              </SettingsSection>

              <SettingsSection>
                <SectionTitle theme={theme}>
                  <FiBell />
                  Notifications
                </SectionTitle>
                <SettingItem theme={theme}>
                  <SettingInfo>
                    <SettingIcon theme={theme}>
                      <FiBell />
                    </SettingIcon>
                    <SettingDetails>
                      <SettingName theme={theme}>Push Notifications</SettingName>
                      <SettingDescription theme={theme}>Receive notifications for new matches</SettingDescription>
                    </SettingDetails>
                  </SettingInfo>
                  <ToggleSwitch active={true} theme={theme} />
                </SettingItem>
              </SettingsSection>

              <SettingsSection>
                <SectionTitle theme={theme}>
                  <FiShield />
                  Privacy & Security
                </SectionTitle>
                <SettingItem theme={theme}>
                  <SettingInfo>
                    <SettingIcon theme={theme}>
                      <FiShield />
                    </SettingIcon>
                    <SettingDetails>
                      <SettingName theme={theme}>Profile Visibility</SettingName>
                      <SettingDescription theme={theme}>Control who can see your profile</SettingDescription>
                    </SettingDetails>
                  </SettingInfo>
                  <ToggleSwitch active={false} theme={theme} />
                </SettingItem>
              </SettingsSection>

              <SettingsSection>
                <SectionTitle theme={theme}>
                  <FiHelpCircle />
                  Support
                </SectionTitle>
                <SettingItem theme={theme}>
                  <SettingInfo>
                    <SettingIcon theme={theme}>
                      <FiHelpCircle />
                    </SettingIcon>
                    <SettingDetails>
                      <SettingName theme={theme}>Help & Support</SettingName>
                      <SettingDescription theme={theme}>Get help with your account</SettingDescription>
                    </SettingDetails>
                  </SettingInfo>
                </SettingItem>
              </SettingsSection>
            </SettingsModal>
          </ModalOverlay>
        )}
      </AnimatePresence>
    </LayoutContainer>
  );
};

export default Layout;
