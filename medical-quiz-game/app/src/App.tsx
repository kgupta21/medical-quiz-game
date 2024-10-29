import React from 'react';
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';
import { GameProvider } from './context/GameContext';
import { theme } from './styles/theme';
import Question from './components/game/Question';
import AnswerOptions from './components/game/AnswerOptions';
import WelcomeScreen from './components/screens/WelcomeScreen';
import GameOverScreen from './components/screens/GameOverScreen';
import MoneyTree from './components/game/MoneyTree';
import Lifelines from './components/game/Lifelines';
import { useGame } from './context/GameContext';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: ${props => props.theme.fonts.main};
    background-color: ${props => props.theme.colors.background};
  }
`;

const AppContainer = styled.div`
  min-height: 100vh;
  padding: 2rem;
`;

const GameContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 15px;
  position: relative;
  margin-right: 240px; // Space for MoneyTree
`;

const GameLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const GameContent: React.FC = () => {
  const { state } = useGame();

  if (state.gameStatus === 'ready') {
    return <WelcomeScreen />;
  }

  if (state.gameStatus === 'ended') {
    return <GameOverScreen />;
  }

  return (
    <GameLayout>
      <MoneyTree />
      <Question />
      <Lifelines />
      <AnswerOptions />
    </GameLayout>
  );
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <GameProvider>
        <AppContainer>
          <GameContainer>
            <GameContent />
          </GameContainer>
        </AppContainer>
      </GameProvider>
    </ThemeProvider>
  );
}

export default App;
