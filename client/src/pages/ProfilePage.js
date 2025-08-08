import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { FiEdit2, FiSave, FiX, FiCamera, FiMapPin, FiCalendar, FiUser } from 'react-icons/fi';

const ProfileContainer = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const ProfileHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  margin-bottom: 3rem;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const AvatarSection = styled.div`
  position: relative;
`;

const Avatar = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  color: white;
  font-weight: bold;
  position: relative;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: scale(1.05);
  }
`;

const AvatarOverlay = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 40px;
  height: 40px;
  background: rgba(0, 0, 0, 0.7);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(0, 0, 0, 0.9);
  }
`;

const ProfileInfo = styled.div`
  flex: 1;
`;

const ProfileName = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: white;
`;

const ProfileUsername = styled.p`
  font-size: 1.2rem;
  color: #667eea;
  margin-bottom: 1rem;
`;

const ProfileDetails = styled.div`
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
`;

const DetailItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #b0b0b0;
  font-size: 0.9rem;
`;

const EditButton = styled.button`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
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

const ProfileSections = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Section = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 2rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const SectionEditButton = styled.button`
  background: none;
  border: none;
  color: #667eea;
  cursor: pointer;
  font-size: 1rem;
  padding: 0.5rem;
  border-radius: 50%;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(102, 126, 234, 0.1);
  }
`;

const BioText = styled.p`
  color: #b0b0b0;
  line-height: 1.6;
  font-size: 1rem;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
`;

const StatCard = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 15px;
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

const PersonalityTraits = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
`;

const TraitCard = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 15px;
  padding: 1rem;
  text-align: center;
`;

const TraitName = styled.div`
  font-size: 0.9rem;
  color: #b0b0b0;
  margin-bottom: 0.5rem;
`;

const TraitValue = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
  color: white;
`;

const TraitBar = styled.div`
  width: 100%;
  height: 6px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 3px;
  margin-top: 0.5rem;
  overflow: hidden;
`;

const TraitBarFill = styled.div`
  height: 100%;
  width: ${props => props.value}%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 3px;
  transition: width 0.3s ease;
`;

const EditForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-size: 0.9rem;
  color: #b0b0b0;
  font-weight: 500;
`;

const Input = styled.input`
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  padding: 0.75rem;
  color: white;
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: #667eea;
  }
  
  &::placeholder {
    color: #666;
  }
`;

const TextArea = styled.textarea`
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  padding: 0.75rem;
  color: white;
  font-size: 1rem;
  min-height: 100px;
  resize: vertical;
  
  &:focus {
    outline: none;
    border-color: #667eea;
  }
  
  &::placeholder {
    color: #666;
  }
`;

const FormButtons = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const SaveButton = styled.button`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &:hover {
    transform: translateY(-2px);
  }
`;

const CancelButton = styled.button`
  background: rgba(255, 255, 255, 0.1);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 0.75rem 1.5rem;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &:hover {
    background: rgba(255, 255, 255, 0.15);
  }
`;

const ProfilePage = () => {
  const { user, updateProfile } = useAuth();
  const [editing, setEditing] = useState(false);
  const [editingSection, setEditingSection] = useState(null);
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    bio: user?.bio || '',
    location: user?.location || '',
    dateOfBirth: user?.dateOfBirth || ''
  });

  const handleEdit = (section) => {
    setEditingSection(section);
    setEditing(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await updateProfile(formData);
      setEditing(false);
      setEditingSection(null);
    } catch (error) {
      console.error('Failed to update profile:', error);
    }
  };

  const handleCancel = () => {
    setEditing(false);
    setEditingSection(null);
    setFormData({
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      bio: user?.bio || '',
      location: user?.location || '',
      dateOfBirth: user?.dateOfBirth || ''
    });
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <ProfileContainer>
      <ProfileHeader>
        <AvatarSection>
          <Avatar>
            {user.firstName?.[0]}{user.lastName?.[0]}
          </Avatar>
          <AvatarOverlay>
            <FiCamera />
          </AvatarOverlay>
        </AvatarSection>
        
        <ProfileInfo>
          {editing && editingSection === 'basic' ? (
            <EditForm onSubmit={handleSave}>
              <FormGroup>
                <Label>First Name</Label>
                <Input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  placeholder="Enter first name"
                />
              </FormGroup>
              <FormGroup>
                <Label>Last Name</Label>
                <Input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  placeholder="Enter last name"
                />
              </FormGroup>
              <FormButtons>
                <SaveButton type="submit">
                  <FiSave />
                  Save
                </SaveButton>
                <CancelButton type="button" onClick={handleCancel}>
                  <FiX />
                  Cancel
                </CancelButton>
              </FormButtons>
            </EditForm>
          ) : (
            <>
              <ProfileName>{user.firstName} {user.lastName}</ProfileName>
              <ProfileUsername>@{user.username}</ProfileUsername>
              <ProfileDetails>
                <DetailItem>
                  <FiMapPin />
                  {user.location}
                </DetailItem>
                <DetailItem>
                  <FiCalendar />
                  {new Date(user.dateOfBirth).toLocaleDateString()}
                </DetailItem>
                <DetailItem>
                  <FiUser />
                  Member since {new Date().getFullYear()}
                </DetailItem>
              </ProfileDetails>
              <EditButton onClick={() => handleEdit('basic')}>
                <FiEdit2 />
                Edit Profile
              </EditButton>
            </>
          )}
        </ProfileInfo>
      </ProfileHeader>

      <ProfileSections>
        <Section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <SectionTitle>
            About Me
            {!editing && (
              <SectionEditButton onClick={() => handleEdit('bio')}>
                <FiEdit2 />
              </SectionEditButton>
            )}
          </SectionTitle>
          
          {editing && editingSection === 'bio' ? (
            <EditForm onSubmit={handleSave}>
              <FormGroup>
                <Label>Bio</Label>
                <TextArea
                  value={formData.bio}
                  onChange={(e) => handleInputChange('bio', e.target.value)}
                  placeholder="Tell us about yourself..."
                />
              </FormGroup>
              <FormButtons>
                <SaveButton type="submit">
                  <FiSave />
                  Save
                </SaveButton>
                <CancelButton type="button" onClick={handleCancel}>
                  <FiX />
                  Cancel
                </CancelButton>
              </FormButtons>
            </EditForm>
          ) : (
            <BioText>{user.bio}</BioText>
          )}
        </Section>

        <Section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <SectionTitle>Statistics</SectionTitle>
          <StatsGrid>
            <StatCard>
              <StatValue>{user.statistics?.profileViews || 0}</StatValue>
              <StatLabel>Profile Views</StatLabel>
            </StatCard>
            <StatCard>
              <StatValue>{user.statistics?.connectionRequests || 0}</StatValue>
              <StatLabel>Connection Requests</StatLabel>
            </StatCard>
            <StatCard>
              <StatValue>{user.statistics?.successfulMatches || 0}</StatValue>
              <StatLabel>Successful Matches</StatLabel>
            </StatCard>
            <StatCard>
              <StatValue>{user.statistics?.profileCompletion || 0}%</StatValue>
              <StatLabel>Profile Completion</StatLabel>
            </StatCard>
          </StatsGrid>
        </Section>

        <Section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <SectionTitle>Personality Traits</SectionTitle>
          <PersonalityTraits>
            {Object.entries(user.personalityProfile?.bigFive || {}).map(([trait, value]) => (
              <TraitCard key={trait}>
                <TraitName>{trait.charAt(0).toUpperCase() + trait.slice(1)}</TraitName>
                <TraitValue>{value}%</TraitValue>
                <TraitBar>
                  <TraitBarFill value={value} />
                </TraitBar>
              </TraitCard>
            ))}
          </PersonalityTraits>
        </Section>

        <Section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <SectionTitle>Custom Dimensions</SectionTitle>
          <PersonalityTraits>
            {Object.entries(user.personalityProfile?.customDimensions || {}).map(([trait, value]) => (
              <TraitCard key={trait}>
                <TraitName>{trait.charAt(0).toUpperCase() + trait.slice(1)}</TraitName>
                <TraitValue>{value}%</TraitValue>
                <TraitBar>
                  <TraitBarFill value={value} />
                </TraitBar>
              </TraitCard>
            ))}
          </PersonalityTraits>
        </Section>
      </ProfileSections>
    </ProfileContainer>
  );
};

export default ProfilePage; 