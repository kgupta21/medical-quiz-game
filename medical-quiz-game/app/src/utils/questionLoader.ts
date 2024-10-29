import { Question } from '../types/question';

export async function loadQuestions(): Promise<Question[]> {
  try {
    console.log('Attempting to load questions...');
    const response = await fetch('/phrases_no_exclude_test.jsonl');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const text = await response.text();
    console.log('Questions loaded, parsing JSONL...');
    const questions = text
      .trim()
      .split('\n')
      .map((line, index) => {
        try {
          return JSON.parse(line);
        } catch (error) {
          console.error(`Error parsing line ${index + 1}:`, line);
          throw error;
        }
      });
    console.log(`Successfully loaded ${questions.length} questions`);
    return questions;
  } catch (error) {
    console.error('Error loading questions:', error);
    return [];
  }
}

export function shuffleQuestions(questions: Question[]): Question[] {
  const shuffled = [...questions];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export const moneyLevels = [
  100, 200, 300, 500, 1000,
  2000, 4000, 8000, 16000, 32000,
  64000, 125000, 250000, 500000, 1000000
];

export function getMoneyForLevel(level: number): number {
  return moneyLevels[level] || 0;
}

export function getSafeHavenAmount(level: number): number {
  if (level >= 10) return 32000;
  if (level >= 5) return 1000;
  return 0;
}
