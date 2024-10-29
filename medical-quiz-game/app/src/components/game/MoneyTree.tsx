import React from 'react';
import styled from 'styled-components';
import { useGame } from '../../context/GameContext';
import { moneyLevels } from '../../utils/questionLoader';

interface LevelProps {
  $active: boolean;
  $completed: boolean;
  $safeHaven: boolean;
}

const MoneyTreeContainer = styled.div`
  background-color: ${props => props.theme.colors.primary};
  padding: 1rem;
  border-radius: 8px;
  position: fixed;
  right: 2rem;
  top: 2rem;
  width: 200px;
`;

const Level = styled.div<LevelProps>`
  padding: 0.5rem 1rem;
  margin: 0.25rem 0;
  color: ${props => props.theme.colors.text};
  background-color: ${props => {
    if (props.$active) return props.theme.colors.highlight;
    if (props.$completed) return props.theme.colors.correct;
    return 'transparent';
  }};
  border-radius: 4px;
  display: flex;
  justify-content: space-between;
  font-weight: ${props => (props.$active || props.$safeHaven) ? 'bold' : 'normal'};
  border-left: ${props => props.$safeHaven ? `4px solid ${props.theme.colors.highlight}` : 'none'};
`;

const MoneyTree: React.FC = () => {
  const { state } = useGame();
  const { currentLevel } = state;

  return (
    <MoneyTreeContainer>
      {moneyLevels.slice().reverse().map((amount, idx) => {
        const level = 14 - idx;
        const active = currentLevel === level;
        const completed = currentLevel > level;
        const safeHaven = amount === 1000 || amount === 32000;

        return (
          <Level
            key={amount}
            $active={active}
            $completed={completed}
            $safeHaven={safeHaven}
          >
            <span>{15 - idx}</span>
            <span>${amount.toLocaleString()}</span>
          </Level>
        );
      })}
    </MoneyTreeContainer>
  );
};

export default MoneyTree;
