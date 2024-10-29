import React from 'react';
import styled from 'styled-components';
import { useGame } from '../../context/GameContext';

const QuestionContainer = styled.div`
  background-color: ${props => props.theme.colors.primary};
  padding: 2rem;
  border-radius: 10px;
  margin: 2rem 0;
  color: ${props => props.theme.colors.text};
  font-family: ${props => props.theme.fonts.main};
  max-width: 800px;
  margin: 0 auto;
`;

const QuestionText = styled.div`
  font-size: 1.25rem;
  margin: 1.5rem 0;
  line-height: 1.6;
  text-align: left;
  white-space: pre-wrap;
`;

const Timer = styled.div`
  font-size: 1.2rem;
  text-align: center;
  color: ${props => props.theme.colors.highlight};
  margin-bottom: 1rem;
`;

const QuestionNumber = styled.div`
  text-align: center;
  font-size: 1.1rem;
  color: ${props => props.theme.colors.highlight};
  margin-bottom: 0.5rem;
`;

const Question: React.FC = () => {
  const { state } = useGame();
  const { currentQuestion, timer, currentLevel } = state;

  if (!currentQuestion) return null;

  return (
    <QuestionContainer>
      <QuestionNumber>Question {currentLevel + 1}</QuestionNumber>
      <Timer>{timer} seconds</Timer>
      <QuestionText>{currentQuestion.question}</QuestionText>
    </QuestionContainer>
  );
};

export default Question;
