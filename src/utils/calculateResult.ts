import type { AnswerRecord, ResultGrade, TestResult } from '../types';

export function calculateResult(answers: AnswerRecord[]): TestResult {
  const correctCount = answers.filter((a) => a.isCorrect).length;
  const wrongCount = answers.filter((a) => !a.isCorrect).length;
  const totalQuestions = answers.length;

  const score = Math.max(0, correctCount * 100 - wrongCount * 50);
  const accuracy = totalQuestions > 0 ? correctCount / totalQuestions : 0;

  const reactionTimes = answers.map((a) => a.reactionMs);
  const averageReactionMs =
    reactionTimes.length > 0
      ? Math.round(reactionTimes.reduce((a, b) => a + b, 0) / reactionTimes.length)
      : null;
  const fastestReactionMs = reactionTimes.length > 0 ? Math.min(...reactionTimes) : null;
  const slowestReactionMs = reactionTimes.length > 0 ? Math.max(...reactionTimes) : null;

  return {
    score,
    grade: calculateGrade(score, accuracy),
    accuracy,
    averageReactionMs,
    fastestReactionMs,
    slowestReactionMs,
    totalQuestions,
    correctCount,
    wrongCount,
  };
}

function calculateGrade(score: number, accuracy: number): ResultGrade {
  if (accuracy >= 0.9 && score >= 2000) return 'S';
  if (accuracy >= 0.8 && score >= 1500) return 'A';
  if (accuracy >= 0.65 && score >= 1000) return 'B';
  if (accuracy >= 0.5) return 'C';
  return 'D';
}
