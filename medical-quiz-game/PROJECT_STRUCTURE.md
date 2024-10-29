# Medical Quiz Game - Project Structure

```
medical-quiz-game/
├── public/
│   ├── index.html
│   ├── favicon.ico
│   ├── questions.jsonl
│   └── assets/
│       ├── sounds/
│       │   ├── correct.mp3
│       │   ├── wrong.mp3
│       │   ├── final-answer.mp3
│       │   ├── background.mp3
│       │   └── lifeline.mp3
│       └── images/
│           ├── logo.png
│           └── backgrounds/
├── src/
│   ├── components/
│   │   ├── game/
│   │   │   ├── Question.tsx
│   │   │   ├── AnswerOptions.tsx
│   │   │   ├── Timer.tsx
│   │   │   ├── MoneyTree.tsx
│   │   │   ├── Lifelines.tsx
│   │   │   └── GameControls.tsx
│   │   ├── screens/
│   │   │   ├── WelcomeScreen.tsx
│   │   │   ├── GameScreen.tsx
│   │   │   └── ResultScreen.tsx
│   │   └── common/
│   │       ├── Button.tsx
│   │       ├── Modal.tsx
│   │       └── Loading.tsx
│   ├── context/
│   │   ├── GameContext.tsx
│   │   └── SoundContext.tsx
│   ├── hooks/
│   │   ├── useGame.ts
│   │   ├── useQuestions.ts
│   │   ├── useTimer.ts
│   │   └── useSound.ts
│   ├── utils/
│   │   ├── questionLoader.ts
│   │   ├── gameHelpers.ts
│   │   ├── animations.ts
│   │   └── storage.ts
│   ├── types/
│   │   ├── question.ts
│   │   └── game.ts
│   ├── styles/
│   │   ├── theme.ts
│   │   ├── globalStyles.ts
│   │   └── animations.ts
│   ├── constants/
│   │   ├── gameConfig.ts
│   │   └── messages.ts
│   ├── App.tsx
│   └── index.tsx
├── tests/
│   ├── unit/
│   │   ├── gameLogic.test.ts
│   │   └── components.test.tsx
│   ├── integration/
│   │   └── gameFlow.test.tsx
│   └── e2e/
│       └── gameplay.test.ts
├── package.json
├── tsconfig.json
├── README.md
└── .gitignore
```

## Key Directory Explanations

### `/public`
- Static assets including JSONL question file
- Sound effects and music
- Images and icons

### `/src/components`
- Organized by feature and common components
- Each component has its own styles
- Follows atomic design principles

### `/src/context`
- Game state management
- Sound management
- Global state providers

### `/src/hooks`
- Custom hooks for game logic
- Question management
- Timer functionality
- Sound control

### `/src/utils`
- JSONL file loading and parsing
- Helper functions
- Local storage management
- Animation utilities

### `/src/types`
- TypeScript interfaces
- Type definitions for questions and game state

### `/src/styles`
- Theme configuration
- Global styles
- Animation definitions

### `/src/constants`
- Game configuration
- Static content
- Message strings

## Key Files

### `questionLoader.ts`
```typescript
// Handles loading and parsing of JSONL file
async function loadQuestions(): Promise<Question[]> {
  const response = await fetch('/questions.jsonl');
  const text = await response.text();
  return text
    .trim()
    .split('\n')
    .map(line => JSON.parse(line));
}
```

### `GameContext.tsx`
```typescript
// Manages global game state
interface GameState {
  currentQuestion: Question | null;
  level: number;
  score: number;
  lifelines: LifelineState;
  gameStatus: GameStatus;
}

const GameContext = createContext<{
  state: GameState;
  dispatch: Dispatch<GameAction>;
}>(initialContext);
```

### `useGame.ts`
```typescript
// Custom hook for game logic
function useGame() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  
  // Game logic implementation
  const startGame = () => {/* ... */};
  const answerQuestion = (answer: string) => {/* ... */};
  const useLifeline = (type: LifelineType) => {/* ... */};
  
  return {
    questions,
    currentQuestion,
    startGame,
    answerQuestion,
    useLifeline,
  };
}
```

## Development Workflow

### 1. Setup
```bash
npm install
npm run dev
```

### 2. Testing
```bash
npm run test        # Unit tests
npm run test:e2e    # E2E tests
```

### 3. Building
```bash
npm run build
npm run preview
```

### 4. Deployment
```bash
npm run build
# Deploy 'dist' folder to static hosting
