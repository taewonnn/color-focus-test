import { useCallback, useEffect, useRef, useState } from 'react';
import type { AnswerRecord, ColorKey, TestQuestion, TestResult } from '../types';
import { generateQuestion } from '../utils/generateQuestion';
import { calculateResult } from '../utils/calculateResult';
import { useTimer } from './useTimer';

const DEFAULT_TEST_DURATION_MS = 30_000;

export type FeedbackState = 'correct' | 'incorrect' | null;

export function useTestGame(onFinish: (result: TestResult) => void) {
  const [currentQuestion, setCurrentQuestion] = useState<TestQuestion>(() =>
    generateQuestion(),
  );
  const [score, setScore] = useState(0);
  const [isDisabled, setIsDisabled] = useState(false);
  const [feedback, setFeedback] = useState<FeedbackState>(null);
  const answersRef = useRef<AnswerRecord[]>([]);
  const onFinishRef = useRef(onFinish);
  onFinishRef.current = onFinish;

  const handleEnd = useCallback(() => {
    const result = calculateResult(answersRef.current);
    onFinishRef.current(result);
  }, []);

  const { remainingMs, isRunning, start } = useTimer({
    totalMs: DEFAULT_TEST_DURATION_MS,
    onEnd: handleEnd,
  });

  useEffect(() => { start(); }, [start]);

  const handleAnswer = useCallback(
    (selectedColor: ColorKey) => {
      if (isDisabled) return;
      setIsDisabled(true);

      const reactionMs = Date.now() - currentQuestion.shownAt;
      const isCorrect = selectedColor === currentQuestion.correctColor;

      const record: AnswerRecord = {
        questionId: currentQuestion.id,
        selectedColor,
        correctColor: currentQuestion.correctColor,
        isCorrect,
        reactionMs,
      };
      answersRef.current = [...answersRef.current, record];

      const correct = answersRef.current.filter((a) => a.isCorrect).length;
      const wrong = answersRef.current.filter((a) => !a.isCorrect).length;
      setScore(Math.max(0, correct * 100 - wrong * 50));
      setFeedback(isCorrect ? 'correct' : 'incorrect');

      setTimeout(() => {
        setCurrentQuestion((prev) => generateQuestion(prev));
        setFeedback(null);
        setIsDisabled(false);
      }, 150);
    },
    [currentQuestion, isDisabled],
  );

  return {
    currentQuestion,
    remainingMs,
    totalMs: DEFAULT_TEST_DURATION_MS,
    score,
    isDisabled,
    isRunning,
    feedback,
    handleAnswer,
  };
}
