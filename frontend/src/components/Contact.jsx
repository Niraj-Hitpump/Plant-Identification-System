import React from 'react';
import styled, { keyframes } from 'styled-components';
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter, FaGithub, FaEnvelope } from 'react-icons/fa';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #2c3e50;
  margin-bottom: 2rem;
  animation: ${fadeIn} 0.6s ease forwards;
`;

const IconWrapper = styled.div`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  transition: all 0.5s ease;
  position: relative;
  z-index: 2;
`;

const SocialGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
  padding: 2rem;
`;

const SocialLink = styled.a`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.4s ease;
  text-decoration: none;
  color: #2c3e50;
  position: relative;
  overflow: hidden;
  animation: ${fadeIn} 0.6s ease forwards, ${float} 3s ease-in-out infinite;
  animation-delay: ${props => props.$delay}s;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: ${props => props.$bgColor};
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: 1;
  }

  &:hover {
    transform: translateY(-10px) scale(1.05);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);

    &::before {
      opacity: 0.1;
    }

    ${IconWrapper} {
      transform: rotate(360deg) scale(1.2);
      color: ${props => props.$iconColor};
    }
  }
`;

const SocialName = styled.span`
  font-weight: 600;
  font-size: 1.1rem;
  position: relative;
  z-index: 2;
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: #666;
  margin: 1rem 0;
  animation: ${fadeIn} 0.6s ease forwards;
  animation-delay: 0.2s;
  max-width: 600px;
  margin: 1rem auto;
`;

const Contact = () => {
  const socialLinks = [
    { 
      name: 'Facebook', 
      icon: <FaFacebook />, 
      url: 'https://facebook.com/yourpage',
      bgColor: '#1877f2',
      iconColor: '#1877f2'
    },
    { 
      name: 'Instagram', 
      icon: <FaInstagram />, 
      url: 'https://instagram.com/yourpage',
      bgColor: '#e4405f',
      iconColor: '#e4405f'
    },
    { 
      name: 'LinkedIn', 
      icon: <FaLinkedin />, 
      url: 'https://linkedin.com/in/yourprofile',
      bgColor: '#0077b5',
      iconColor: '#0077b5'
    },
    { 
      name: 'Twitter', 
      icon: <FaTwitter />, 
      url: 'https://twitter.com/yourhandle',
      bgColor: '#1da1f2',
      iconColor: '#1da1f2'
    },
    { 
      name: 'GitHub', 
      icon: <FaGithub />, 
      url: 'https://github.com/yourusername',
      bgColor: '#333',
      iconColor: '#333'
    },
    { 
      name: 'Email', 
      icon: <FaEnvelope />, 
      url: 'mailto:your@email.com',
      bgColor: '#ea4335',
      iconColor: '#ea4335'
    }
  ];

  return (
    <Container>
      <Title>Let's Connect</Title>
      <Subtitle>
        Join our growing community of plant lovers and stay updated with the latest trends in plant care
      </Subtitle>
      
      <SocialGrid>
        {socialLinks.map((link, index) => (
          <SocialLink 
            key={link.name} 
            href={link.url} 
            target="_blank" 
            rel="noopener noreferrer"
            $delay={index * 0.1}
            $bgColor={link.bgColor}
            $iconColor={link.iconColor}
          >
            <IconWrapper>{link.icon}</IconWrapper>
            <SocialName>{link.name}</SocialName>
          </SocialLink>
        ))}
      </SocialGrid>
    </Container>
  );
};

export default Contact;
