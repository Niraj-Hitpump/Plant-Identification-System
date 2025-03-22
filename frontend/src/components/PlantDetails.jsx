import React from 'react';
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const Container = styled.div`
  max-width: 900px;
  margin: 2rem auto;
  padding: 2rem;
  background: #f8f9fa;
  border-radius: 16px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Section = styled.div`
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  margin: 1rem 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  animation: ${fadeIn} 0.5s ease forwards;
  animation-delay: ${props => props.$delay}s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`;

const SectionTitle = styled.h2`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1.5rem;
  color: #2c3e50;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #4CAF50;
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1rem;
`;

const InfoItem = styled.div`
  padding: 0.75rem;
  border-radius: 8px;
  transition: all 0.2s ease;
  
  &:hover {
    background: rgba(76, 175, 80, 0.05);
  }
`;

const Label = styled.span`
  font-weight: 600;
  color: #2c3e50;
  display: block;
  margin-bottom: 0.25rem;
`;

const Value = styled.span`
  color: #34495e;
  display: block;
  line-height: 1.5;
`;

const parseContent = (content) => {
  const sectionData = {};
  let currentSection = '';
  
  const lines = content.split('\n').map(line => line.trim()).filter(line => line);
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // Match section headers (emoji + text)
    const sectionMatch = line.match(/^(🌿|🎯|🌍|💪|⚠️)\s*(.+)/);
    if (sectionMatch) {
      currentSection = sectionMatch[2].replace(/Plant|Key|Growing|\&|\bCare|Precautions/g, '').trim();
      sectionData[currentSection] = {};
      continue;
    }
    
    // Skip divider lines
    if (line.includes('---')) continue;
    
    // Match key-value pairs
    const keyValue = line.split(':');
    if (keyValue.length >= 2 && currentSection) {
      const key = keyValue[0].trim();
      const value = keyValue.slice(1).join(':').trim();
      if (key && !key.includes('---')) {
        sectionData[currentSection][key] = value || 'Not Available';
      }
    }
  }
  
  return sectionData;
};

const PlantDetails = ({ data }) => {
  const sections = {
    'Plant Identification': { icon: '🌿', items: ['Common Name', 'Scientific Name', 'Family', 'Origin'] },
    'Key Features': { icon: '🎯', items: ['Plant Type', 'Height/Spread', 'Leaf Description', 'Flowering', 'Growth Rate'] },
    'Growing Conditions': { icon: '🌍', items: ['Light Requirements', 'Water Needs', 'Soil Type', 'Temperature Range', 'Humidity Level'] },
    'Benefits & Uses': { icon: '💪', items: ['Main Uses', 'Environmental Benefits', 'Medicinal Properties', 'Cultural Significance'] },
    'Care & Precautions': { icon: '⚠️', items: ['Common Issues', 'Toxicity', 'Special Care Notes', 'Warning Signs'] }
  };

  const parsedData = parseContent(data);
  console.log('Parsed Data:', parsedData); // For debugging

  return (
    <Container>
      {Object.entries(sections).map(([sectionName, { icon, items }], index) => {
        const sectionKey = sectionName.replace(/Plant|Key|Growing|\&|\bCare|Precautions/g, '').trim();
        return (
          <Section key={sectionName} $delay={index * 0.1}>
            <SectionTitle>
              <span style={{ fontSize: '1.5rem' }}>{icon}</span>
              <span>{sectionName}</span>
            </SectionTitle>
            <InfoGrid>
              {items.map(item => {
                const value = parsedData[sectionKey]?.[item] || 'Not Available';
                return (
                  <InfoItem key={item}>
                    <Label>{item}</Label>
                    <Value dangerouslySetInnerHTML={{ 
                      __html: value.replace(/\*(.*?)\*/g, '<em>$1</em>') 
                    }} />
                  </InfoItem>
                );
              })}
            </InfoGrid>
          </Section>
        );
      })}
    </Container>
  );
};

export default PlantDetails;
