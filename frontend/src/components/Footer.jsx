import React from 'react';
import styled, { keyframes } from 'styled-components';
import { FaLeaf, FaHeart, FaTwitter, FaInstagram, FaGithub } from 'react-icons/fa';

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
`;

const FooterContainer = styled.footer`
  background: linear-gradient(135deg, #1a1a1a 0%, #2c3e50 100%);
  color: white;
  padding: 3rem 0;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #4CAF50, #81C784, #4CAF50);
    background-size: 200% 100%;
    animation: gradient 3s linear infinite;
  }

  @keyframes gradient {
    0% { background-position: 0%; }
    100% { background-position: 200%; }
  }
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  padding: 0 2rem;
`;

const FooterSection = styled.div`
  h3 {
    color: #4CAF50;
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  ul {
    list-style: none;
    padding: 0;
    
    li {
      margin: 0.5rem 0;
      
      a {
        color: #ecf0f1;
        text-decoration: none;
        transition: all 0.3s ease;
        display: inline-block;
        
        &:hover {
          color: #4CAF50;
          transform: translateX(5px);
        }
      }
    }
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;

  a {
    color: #ecf0f1;
    font-size: 1.5rem;
    transition: all 0.3s ease;

    &:hover {
      color: #4CAF50;
      transform: translateY(-3px);
    }
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterSection>
          <h3><FaLeaf /> Plant Care Hub</h3>
          <p>Nurturing your green companions with expert care and guidance.</p>
          <SocialLinks>
            <a href="#"><FaTwitter /></a>
            <a href="#"><FaInstagram /></a>
            <a href="#"><FaGithub /></a>
          </SocialLinks>
        </FooterSection>
        {/* Add more footer sections as needed */}
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;
