import React, { useState } from 'react';
import styled from 'styled-components';
import { useGame } from '../../context/GameContext';

const OptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 1rem auto;
  max-width: 800px;
`;

interface OptionButtonProps {
  $selected: boolean;
}

const OptionButton = styled.button<OptionButtonProps>`
  background-color: ${props => 
    props.$selected ? props.theme.colors.secondary : props.theme.colors.primary};
  color: ${props => props.theme.colors.text};
  padding: 1.5rem;
  border: 2px solid ${props => props.theme.colors.highlight};
  border-radius: 8px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: ${props => props.theme.animations.optionHover};
  text-align: left;
  width: 100%;

  &:hover {
    background-color: ${props => props.theme.colors.secondary};
  }
`;

const ConfirmButton = styled.button`
  background-color: ${props => props.theme.colors.correct};
  color: ${props => props.theme.colors.text};
  padding: 1rem 2rem;
  border: none;
  border-radius: 8px;
  font-size: 1.2rem;
  cursor: pointer;
  margin: 1rem auto;
  display: block;
  width: 200px;
`;

const AnswerOptions: React.FC = () => {
  const { state, dispatch } = useGame();
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const { currentQuestion } = state;

  if (!currentQuestion) return null;

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
  };

  const handleConfirm = () => {
    if (selectedOption) {
      dispatch({ type: 'ANSWER_QUESTION', payload: selectedOption });
      setSelectedOption(null);
    }
  };

  return (
    <>
      <OptionsContainer>
        {Object.entries(currentQuestion.options).map(([key, value]) => (
          <OptionButton
            key={key}
            $selected={selectedOption === key}
            onClick={() => handleOptionSelect(key)}
          >
            {key}: {value}
          </OptionButton>
        ))}
      </OptionsContainer>
      {selectedOption && (
        <ConfirmButton onClick={handleConfirm}>
          Final Answer?
        </ConfirmButton>
      )}
    </>
  );
};

export default AnswerOptions;
