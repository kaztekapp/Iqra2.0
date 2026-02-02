// Arabic Quiz Types

export interface QuizConfig {
  questionCount: number;
  timePerQuestion: number; // seconds
  passingScore: number; // percentage
  xpPerCorrect: number;
  streakBonus: number;
}

export const DEFAULT_QUIZ_CONFIG: QuizConfig = {
  questionCount: 10,
  timePerQuestion: 15,
  passingScore: 70,
  xpPerCorrect: 10,
  streakBonus: 5,
};
