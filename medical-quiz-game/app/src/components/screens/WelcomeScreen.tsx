import React from 'react';
import styled from 'styled-components';
import { useGame } from '../../context/GameContext';

const WelcomeContainer = styled.div`
  text-align: center;
  color: ${props => props.theme.colors.text};
  padding: 2rem;
`;

const Title = styled.h1`
  font-size: 3rem;
  margin-bottom: 2rem;
  color: ${props => props.theme.colors.highlight};
  font-family: ${props => props.theme.fonts.display};
`;

const StartButton = styled.button`
  background-color: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.text};
  padding: 1rem 3rem;
  font-size: 1.5rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: ${props => props.theme.animations.optionHover};
  margin-top: 2rem;

  &:hover {
    background-color: ${props => props.theme.colors.secondary};
  }
`;

const Instructions = styled.div`
  max-width: 600px;
  margin: 2rem auto;
  text-align: left;
  font-size: 1.1rem;
  line-height: 1.6;
`;

const WelcomeScreen: React.FC = () => {
  const { dispatch } = useGame();

  const handleStart = () => {
    dispatch({ type: 'START_GAME' });
  };

  return (
    <WelcomeContainer>
      <Title>Medical Quiz Game</Title>
      <Instructions>
        <h2>How to Play:</h2>
        <ul>
          <li>Answer 15 medical questions correctly to win $1,000,000</li>
          <li>You have 30 seconds to answer each question</li>
          <li>Three lifelines are available:
            <ul>
              <li>50:50 - Removes two incorrect answers</li>
              <li>Ask the Audience - Shows audience poll results</li>
              <li>Phone a Friend - Provides a hint based on medical terminology</li>
            </ul>
          </li>
          <li>Safe havens at $1,000 and $32,000</li>
        </ul>
      </Instructions>
      <StartButton onClick={handleStart}>Start Game</StartButton>
    </WelcomeContainer>
  );
};

export default WelcomeScreen;
