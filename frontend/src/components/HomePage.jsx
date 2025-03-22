import React from 'react';
import styled, { keyframes } from 'styled-components';
import { FaLeaf, FaSeedling, FaCloudSun, FaHandHoldingHeart } from 'react-icons/fa';

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

const HeroSection = styled.section`
  background: linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%);
  padding: 6rem 2rem;
  text-align: center;
  position: relative;
  overflow: hidden;

  h1 {
    font-size: 3.5rem;
    color: #2c3e50;
    margin-bottom: 1.5rem;
    animation: ${float} 3s ease-in-out infinite;
  }

  p {
    font-size: 1.2rem;
    color: #34495e;
    max-width: 600px;
    margin: 0 auto;
  }
`;

const FeaturesSection = styled.section`
  padding: 4rem 2rem;
  background: linear-gradient(135deg, #f5f7fa 0%, #e8f5e9 100%);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: radial-gradient(#4CAF50 0.5px, transparent 0.5px);
    background-size: 24px 24px;
    opacity: 0.1;
    z-index: 1;
  }
`;

const FeatureGrid = styled.div`
  position: relative;
  z-index: 2;
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
`;

const FeatureCard = styled.div`
  background: ${props => props.$gradient};
  border-radius: 16px;
  padding: 2rem;
  text-align: center;
  transition: all 0.3s ease;
  color: white;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  }

  svg {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    animation: ${float} 3s ease-in-out infinite;
  }

  h3 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }
`;

const ServiceSection = styled.section`
  padding: 6rem 2rem;
  background: linear-gradient(135deg, #1a2a6c 0%, #b21f1f 50%, #fdbb2d 100%);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: 
      linear-gradient(45deg, rgba(0,0,0,0.2) 25%, transparent 25%),
      linear-gradient(-45deg, rgba(0,0,0,0.2) 25%, transparent 25%),
      linear-gradient(45deg, transparent 75%, rgba(0,0,0,0.2) 75%),
      linear-gradient(-45deg, transparent 75%, rgba(0,0,0,0.2) 75%);
    background-size: 20px 20px;
    background-position: 0 0, 0 10px, 10px -10px, -10px 0px;
    opacity: 0.1;
  }
`;

const ServiceGrid = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  position: relative;
  z-index: 1;
`;

const ServiceCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 2rem;
  color: white;
  text-align: center;
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: translateY(-10px);
    background: rgba(255, 255, 255, 0.2);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    border-color: rgba(255, 255, 255, 0.3);
  }

  svg {
    font-size: 3rem;
    margin-bottom: 1.5rem;
    color: #FFD700;
    filter: drop-shadow(0 0 10px rgba(255, 215, 0, 0.3));
  }

  h3 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    color: #FFD700;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }

  p {
    color: white;
    line-height: 1.6;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  }
`;

const SectionTitle = styled.h2`
  color: white;
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 3rem;
  position: relative;
  z-index: 1;

  &::after {
    content: '';
    display: block;
    width: 60px;
    height: 4px;
    background: #4CAF50;
    margin: 1rem auto 0;
  }
`;

const HomePage = () => {
  const features = [
    {
      icon: <FaLeaf />,
      title: "Expert Plant Care",
      description: "Get personalized care tips for your plants",
      gradient: "linear-gradient(135deg, #2ecc71 0%, #27ae60 100%)"
    },
    {
      icon: <FaSeedling />,
      title: "Growth Tracking",
      description: "Monitor your plants' progress over time",
      gradient: "linear-gradient(135deg, #3498db 0%, #2980b9 100%)"
    },
    {
      icon: <FaCloudSun />,
      title: "Weather Integration",
      description: "Smart care recommendations based on local weather",
      gradient: "linear-gradient(135deg, #e67e22 0%, #d35400 100%)"
    },
    {
      icon: <FaHandHoldingHeart />,
      title: "Community Support",
      description: "Connect with other plant enthusiasts",
      gradient: "linear-gradient(135deg, #9b59b6 0%, #8e44ad 100%)"
    }
  ];

  const services = [
    {
      icon: <FaLeaf />,
      title: "Plant Recognition",
      description: "Instant identification of plants"
    },
    {
      icon: <FaCloudSun />,
      title: "Photo Upload",
      description: "Easy image upload system"
    },
    {
      icon: <FaSeedling />,
      title: "Plant Database",
      description: "Extensive plant information"
    },
    {
      icon: <FaHandHoldingHeart />,
      title: "Mobile Friendly",
      description: "Use on any device"
    }
  ];

  return (
    <>
      <HeroSection>
        <h1>Welcome to Plant Care Hub</h1>
        <p>Your digital companion for nurturing healthy and happy plants</p>
      </HeroSection>

      <FeaturesSection>
        <FeatureGrid>
          {features.map((feature, index) => (
            <FeatureCard key={index} $gradient={feature.gradient}>
              {feature.icon}
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </FeatureCard>
          ))}
        </FeatureGrid>
      </FeaturesSection>

      <ServiceSection>
        <SectionTitle>Our Services</SectionTitle>
        <ServiceGrid>
          {services.map((service, index) => (
            <ServiceCard key={index}>
              {service.icon}
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </ServiceCard>
          ))}
        </ServiceGrid>
      </ServiceSection>
    </>
  );
};

export default HomePage;
