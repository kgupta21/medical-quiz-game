# Medical Quiz Game - Design Document

## Overview
A frontend-only web-based medical trivia game inspired by "Who Wants to be a Millionaire" that presents medical questions from a JSONL file in an engaging, interactive format.

## Technical Stack
- **Framework**: React.js
  - Component-based architecture
  - Built-in state management with Context API
  - Smooth animations and transitions
  - Responsive design
- **Styling**: Styled-components
  - Consistent theming
  - Dynamic styling based on game states
  - Responsive design utilities

## Data Management
### JSONL Structure
```json
{
  "question": "Question text",
  "answer": "Correct answer text",
  "options": {
    "A": "First option",
    "B": "Second option",
    "C": "Third option",
    "D": "Fourth option"
  },
  "meta_info": "category info",
  "answer_idx": "correct answer letter",
  "metamap_phrases": ["relevant", "medical", "phrases"]
}
```

### Question Loading and Processing
- Load JSONL file at application startup
- Parse and store questions in memory
- Randomize question order
- Track used questions within game session

## Core Features

### 1. Game Mechanics
- Progressive difficulty levels (15 questions total)
- Money tree progression ($100 to $1,000,000)
- Timer for each question (30 seconds)
- Three lifelines:
  - 50:50 (removes two incorrect answers)
  - Ask the Audience (simulated audience response based on difficulty)
  - Phone a Friend (provides a hint based on metamap_phrases)
- Sound effects and background music
- Safe havens at $1,000 and $32,000

### 2. Game States
```typescript
interface GameState {
  currentQuestion: Question;
  currentLevel: number;
  moneyWon: number;
  lifelines: {
    fiftyFifty: boolean;
    askAudience: boolean;
    phoneAFriend: boolean;
  };
  timer: number;
  gameStatus: 'ready' | 'playing' | 'paused' | 'ended';
  questionHistory: string[];
}
```

### 3. User Interface Components

#### Welcome Screen
- Game title and theme
- Start game button
- Brief instructions
- Sound toggle

#### Game Screen
- Question display
- Four answer options (A, B, C, D)
- Money tree sidebar
- Timer display
- Lifelines
- Current prize level
- Sound controls

#### Answer Selection Process
1. Initial selection (highlighted)
2. Confirmation prompt
3. Final answer lock-in
4. Reveal correct/incorrect
5. Feedback and explanation

#### Results Screen
- Final score display
- Questions answered correctly
- Money won
- Play again option
- Share score option (local storage high scores)

## Styling Theme
```javascript
const theme = {
  colors: {
    primary: '#1a237e',
    secondary: '#0d47a1',
    correct: '#2e7d32',
    incorrect: '#c62828',
    background: '#000033',
    text: '#ffffff',
    highlight: '#ffd700'
  },
  fonts: {
    main: 'Roboto, sans-serif',
    display: 'Montserrat, sans-serif'
  },
  animations: {
    questionFade: '0.3s ease-in',
    optionHover: '0.2s ease-out',
    resultReveal: '0.5s cubic-bezier(0.4, 0, 0.2, 1)'
  }
}
```

## Game Logic

### Question Selection
1. Load and parse JSONL file on game start
2. Shuffle questions
3. Assign difficulty levels based on question order
4. Track used questions to prevent repetition

### Lifeline Implementation
#### 50:50
- Randomly remove two incorrect answers
- Ensure correct answer remains
- Disable after use

#### Ask the Audience
- Generate simulated audience response
- Higher accuracy for easier questions
- Lower accuracy for harder questions
- Visual bar graph display

#### Phone a Friend
- Analyze metamap_phrases
- Generate hint based on medical terminology
- Confidence level varies with question difficulty

### Scoring System
- 15 progressive money levels
- Two safe havens ($1,000 and $32,000)
- Walk away option at any time
- Final score based on last safe haven if incorrect

## Performance Optimization
- Lazy loading of assets
- Question preloading
- Audio preloading
- Efficient state updates
- Minimal re-renders
- Local storage for game statistics

## Accessibility Features
- Keyboard navigation
- Screen reader compatibility
- Color contrast compliance
- Font size adjustments
- Audio feedback options
- Pause functionality

## Local Storage
- High scores
- Sound preferences
- Game statistics
- Current game state (for resume capability)

## Testing Strategy
1. Unit tests for game logic
2. Component testing
3. Integration testing
4. Accessibility testing
5. Performance testing
6. Cross-browser testing

## Future Enhancements
1. Offline support (PWA)
2. Additional question categories
3. Custom difficulty paths
4. Achievement system
5. Detailed statistics
6. Practice mode
7. Multiple language support
8. Custom theme options
