export interface Question {
  question: string;
  answer: string;
  options: {
    A: string;
    B: string;
    C: string;
    D: string;
  };
  meta_info: string;
  answer_idx: string;
  metamap_phrases: string[];
}

export interface GameState {
  currentQuestion: Question | null;
  questions: Question[];
  currentLevel: number;
  score: number;
  lifelines: {
    fiftyFifty: boolean;
    askAudience: boolean;
    phoneAFriend: boolean;
  };
  timer: number;
  gameStatus: 'ready' | 'playing' | 'paused' | 'ended';
  questionHistory: string[];
}
