import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { GameState, Question } from '../types/question';
import { loadQuestions, shuffleQuestions } from '../utils/questionLoader';

interface GameContextType {
  state: GameState;
  dispatch: React.Dispatch<GameAction>;
}

type GameAction =
  | { type: 'START_GAME' }
  | { type: 'SET_QUESTION'; payload: Question }
  | { type: 'ANSWER_QUESTION'; payload: string }
  | { type: 'USE_LIFELINE'; payload: keyof GameState['lifelines'] }
  | { type: 'UPDATE_TIMER' }
  | { type: 'END_GAME' }
  | { type: 'LOAD_QUESTIONS'; payload: Question[] };

const initialState: GameState = {
  currentQuestion: null,
  questions: [], // Added questions array to initial state
  currentLevel: 0,
  score: 0,
  lifelines: {
    fiftyFifty: true,
    askAudience: true,
    phoneAFriend: true,
  },
  timer: 30,
  gameStatus: 'ready',
  questionHistory: [],
};

const GameContext = createContext<GameContextType | undefined>(undefined);

function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'START_GAME':
      if (state.questions.length === 0) return state;
      return {
        ...initialState,
        questions: state.questions,
        currentQuestion: state.questions[0],
        gameStatus: 'playing',
      };
    case 'SET_QUESTION':
      return {
        ...state,
        currentQuestion: action.payload,
        timer: 30,
      };
    case 'ANSWER_QUESTION':
      if (!state.currentQuestion) return state;
      const correct = action.payload === state.currentQuestion.answer_idx;
      if (!correct) {
        return {
          ...state,
          gameStatus: 'ended',
        };
      }
      const nextLevel = state.currentLevel + 1;
      const nextQuestion = state.questions[nextLevel];
      return {
        ...state,
        currentLevel: nextLevel,
        currentQuestion: nextQuestion,
        questionHistory: [...state.questionHistory, state.currentQuestion.question],
        gameStatus: nextLevel === 15 ? 'ended' : state.gameStatus,
      };
    case 'USE_LIFELINE':
      return {
        ...state,
        lifelines: {
          ...state.lifelines,
          [action.payload]: false,
        },
      };
    case 'UPDATE_TIMER':
      if (state.timer === 0) {
        return {
          ...state,
          gameStatus: 'ended',
        };
      }
      return {
        ...state,
        timer: state.timer - 1,
      };
    case 'END_GAME':
      return {
        ...state,
        gameStatus: 'ended',
      };
    case 'LOAD_QUESTIONS':
      return {
        ...state,
        questions: action.payload,
      };
    default:
      return state;
  }
}

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  useEffect(() => {
    const loadGameQuestions = async () => {
      try {
        const questions = await loadQuestions();
        const shuffledQuestions = shuffleQuestions(questions);
        dispatch({ type: 'LOAD_QUESTIONS', payload: shuffledQuestions });
      } catch (error) {
        console.error('Error loading questions:', error);
      }
    };

    loadGameQuestions();
  }, []);

  useEffect(() => {
    if (state.gameStatus === 'playing') {
      const timer = setInterval(() => {
        dispatch({ type: 'UPDATE_TIMER' });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [state.gameStatus]);

  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
}
