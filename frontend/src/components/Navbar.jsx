import React from 'react';
import { Link } from 'react-router-dom';
import { FaLeaf, FaSeedling } from 'react-icons/fa';
import styled, { keyframes } from 'styled-components';

const floating = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-5px); }
  100% { transform: translateY(0px); }
`;

const Nav = styled.nav`
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  padding: 1rem 2rem;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 4px 20px rgba(76, 175, 80, 0.2);
  }
`;

const Logo = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.5rem;
  font-weight: 700;
  color: #2c3e50;
  text-decoration: none;
  animation: ${floating} 3s ease-in-out infinite;

  svg {
    color: #4CAF50;
    font-size: 1.8rem;
    transition: transform 0.3s ease;
  }

  &:hover svg {
    transform: rotate(15deg) scale(1.1);
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;

  a {
    color: #34495e;
    text-decoration: none;
    padding: 0.5rem 1rem;
    border-radius: 8px;
    transition: all 0.3s ease;
    position: relative;

    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 50%;
      width: 0;
      height: 2px;
      background: #4CAF50;
      transition: all 0.3s ease;
      transform: translateX(-50%);
    }

    &:hover {
      color: #4CAF50;
      background: rgba(76, 175, 80, 0.1);

      &::after {
        width: 80%;
      }
    }

    &.active {
      color: #4CAF50;
      background: rgba(76, 175, 80, 0.1);
      
      &::after {
        width: 80%;
      }
    }
  }
`;

const NavContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Navbar = () => {
  return (
    <Nav>
      <NavContainer>
        <Logo to="/">
          <FaLeaf /> Plant Care Hub
        </Logo>
        <NavLinks>
          <Link to="/">Home</Link>
          <Link to="/plants">Plants</Link>
          <Link to="/search">Search</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
        </NavLinks>
      </NavContainer>
    </Nav>
  );
};

export default Navbar;
