import React from 'react';
import styled from 'styled-components';
import { useGame } from '../../context/GameContext';
import { getSafeHavenAmount, getMoneyForLevel } from '../../utils/questionLoader';

const GameOverContainer = styled.div`
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

const Amount = styled.div`
  font-size: 2.5rem;
  margin: 2rem 0;
  color: ${props => props.theme.colors.highlight};
`;

const Message = styled.div`
  font-size: 1.5rem;
  margin: 1rem 0;
`;

const PlayAgainButton = styled.button`
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

const GameOverScreen: React.FC = () => {
  const { state, dispatch } = useGame();
  const { currentLevel } = state;

  const amountWon = getSafeHavenAmount(currentLevel);
  const lastLevel = currentLevel > 0 ? currentLevel - 1 : 0;
  const attemptedAmount = getMoneyForLevel(lastLevel);

  const handlePlayAgain = () => {
    dispatch({ type: 'START_GAME' });
  };

  return (
    <GameOverContainer>
      <Title>Game Over</Title>
      <Message>You attempted the ${attemptedAmount.toLocaleString()} question</Message>
      <Amount>You won: ${amountWon.toLocaleString()}</Amount>
      <PlayAgainButton onClick={handlePlayAgain}>
        Play Again
      </PlayAgainButton>
    </GameOverContainer>
  );
};

export default GameOverScreen;
