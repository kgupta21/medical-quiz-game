import React, { useState } from 'react';
import styled from 'styled-components';
import { useGame } from '../../context/GameContext';

const LifelinesContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin: 1rem 0;
`;

const Lifeline = styled.button<{ $available: boolean }>`
  background-color: ${props => props.$available ? props.theme.colors.primary : props.theme.colors.secondary};
  color: ${props => props.theme.colors.text};
  padding: 0.5rem 1rem;
  border: 2px solid ${props => props.$available ? props.theme.colors.highlight : props.theme.colors.secondary};
  border-radius: 8px;
  cursor: ${props => props.$available ? 'pointer' : 'not-allowed'};
  opacity: ${props => props.$available ? 1 : 0.5};
  transition: ${props => props.theme.animations.optionHover};

  &:hover {
    background-color: ${props => props.$available ? props.theme.colors.secondary : props.theme.colors.secondary};
  }
`;

const HintContainer = styled.div`
  background-color: ${props => props.theme.colors.primary};
  padding: 1rem;
  border-radius: 8px;
  margin: 1rem 0;
  text-align: center;
  color: ${props => props.theme.colors.text};
`;

const Lifelines: React.FC = () => {
  const { state, dispatch } = useGame();
  const { lifelines, currentQuestion } = state;
  const [hint, setHint] = useState<string | null>(null);

  const useLifeline = (type: keyof typeof lifelines) => {
    if (lifelines[type] && currentQuestion) {
      dispatch({ type: 'USE_LIFELINE', payload: type });
      
      switch (type) {
        case 'fiftyFifty':
          const correctAnswer = currentQuestion.answer_idx;
          const options = Object.keys(currentQuestion.options);
          const incorrectOptions = options.filter(opt => opt !== correctAnswer);
          const remainingIncorrect = incorrectOptions
            .sort(() => Math.random() - 0.5)
            .slice(0, 2);
          setHint(`Removed options ${remainingIncorrect.join(' and ')}`);
          break;

        case 'askAudience':
          const audienceResults = generateAudienceResults(currentQuestion.answer_idx);
          setHint(
            `Audience votes:\n` +
            Object.entries(audienceResults)
              .map(([option, percentage]) => `${option}: ${percentage}%`)
              .join('\n')
          );
          break;

        case 'phoneAFriend':
          const phrases = currentQuestion.metamap_phrases;
          const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)];
          setHint(`Your friend says: "I think it has something to do with ${randomPhrase}"`);
          break;
      }
    }
  };

  const generateAudienceResults = (correctAnswer: string) => {
    const results: { [key: string]: number } = { A: 0, B: 0, C: 0, D: 0 };
    const correctPercentage = Math.floor(Math.random() * 30) + 40; // 40-70%
    results[correctAnswer] = correctPercentage;

    const remainingPercentage = 100 - correctPercentage;
    const options = Object.keys(results).filter(opt => opt !== correctAnswer);
    
    options.forEach((option, index) => {
      if (index === options.length - 1) {
        results[option] = remainingPercentage - 
          options.slice(0, -1).reduce((sum, opt) => sum + results[opt], 0);
      } else {
        results[option] = Math.floor(Math.random() * (remainingPercentage / 2));
      }
    });

    return results;
  };

  return (
    <>
      <LifelinesContainer>
        <Lifeline
          $available={lifelines.fiftyFifty}
          onClick={() => useLifeline('fiftyFifty')}
        >
          50:50
        </Lifeline>
        <Lifeline
          $available={lifelines.askAudience}
          onClick={() => useLifeline('askAudience')}
        >
          Ask Audience
        </Lifeline>
        <Lifeline
          $available={lifelines.phoneAFriend}
          onClick={() => useLifeline('phoneAFriend')}
        >
          Phone a Friend
        </Lifeline>
      </LifelinesContainer>
      {hint && <HintContainer>{hint}</HintContainer>}
    </>
  );
};

export default Lifelines;
