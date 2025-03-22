import React from 'react';
import styled, { keyframes } from 'styled-components';
import { FaLeaf, FaSeedling, FaTree } from 'react-icons/fa';

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const slideIn = keyframes`
  from { transform: translateX(-50px); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
`;

const rotateIn = keyframes`
  from { transform: rotate(-10deg); opacity: 0; }
  to { transform: rotate(0); opacity: 1; }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const Section = styled.section`
  margin: 2rem 0;
  animation: ${fadeInUp} 0.6s ease forwards;
  animation-delay: ${props => props.$delay}s;
  opacity: 0;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #2c3e50;
  margin-bottom: 1.5rem;
  border-bottom: 3px solid #4CAF50;
  padding-bottom: 0.5rem;
`;

const ProjectGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

const ProjectCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-5px) scale(1.02);
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2);
    
    &::before {
      transform: scale(1.5);
    }
  }

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(76, 175, 80, 0.1) 0%, rgba(255,255,255,0) 70%);
    transition: transform 0.5s ease;
    z-index: 0;
  }

  h3 {
    position: relative;
    color: #2c3e50;
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    animation: ${slideIn} 0.5s ease forwards;
  }

  p {
    position: relative;
    line-height: 1.6;
    color: #34495e;
    animation: ${fadeInUp} 0.5s ease forwards;
  }
`;

const SkillsSection = styled(Section)`
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border-radius: 16px;
  padding: 2rem;
  margin-top: 3rem;
`;

const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
`;

const SkillCard = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  animation: ${rotateIn} 0.5s ease forwards;
  animation-delay: ${props => props.$delay}s;
  opacity: 0;

  h4 {
    color: #2c3e50;
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
`;

const About = () => {
  const projects = [
    {
      title: "Plant Identification",
      description: "Advanced AI-powered system to identify plants and provide care instructions. Features include real-time recognition and detailed care guides.",
      icon: <FaLeaf />
    },
    {
      title: "Care Guidelines",
      description: "Comprehensive database of plant care instructions with seasonal tips, watering schedules, and pest control measures.",
      icon: <FaSeedling />
    },
    {
      title: "Community Garden",
      description: "A thriving community platform where plant enthusiasts share experiences, trade plants, and participate in workshops.",
      icon: <FaTree />
    }
  ];

  const skills = [
    {
      title: "Plant Care Expertise",
      items: ["Indoor Plants", "Outdoor Gardens", "Hydroponics", "Organic Farming"]
    },
    {
      title: "Technical Features",
      items: ["AI Recognition", "Care Scheduling", "Climate Analysis", "Growth Tracking"]
    },
    {
      title: "Community Services",
      items: ["Expert Consultations", "Workshop Sessions", "Plant Exchange", "Community Events"]
    }
  ];

  return (
    <Container>
      <Section $delay={0.1}>
        <Title>About Plant Care Hub</Title>
        <p>Welcome to Plant Care Hub, your ultimate destination for plant care information and guidance. Our mission is to help plant enthusiasts nurture their green companions with expert knowledge and easy-to-follow care instructions.</p>
      </Section>

      <Section $delay={0.3}>
        <Title>Our Projects</Title>
        <ProjectGrid>
          {projects.map((project, index) => (
            <ProjectCard key={index}>
              <h3>{project.icon} {project.title}</h3>
              <p>{project.description}</p>
            </ProjectCard>
          ))}
        </ProjectGrid>
      </Section>

      <SkillsSection $delay={0.5}>
        <Title>What We Offer</Title>
        <SkillsGrid>
          {skills.map((skill, index) => (
            <SkillCard key={index} $delay={0.2 * index}>
              <h4>{skill.title}</h4>
              <ul>
                {skill.items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </SkillCard>
          ))}
        </SkillsGrid>
      </SkillsSection>
    </Container>
  );
};

export default About;
