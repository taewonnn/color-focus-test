export type ColorKey = 'red' | 'blue' | 'yellow' | 'green';

export type TestStatus = 'idle' | 'ready' | 'playing' | 'finished';

export type ResultGrade = 'S' | 'A' | 'B' | 'C' | 'D';

export type FullScreenAdStatus =
  | 'unsupported'
  | 'idle'
  | 'loading'
  | 'loaded'
  | 'showing'
  | 'rewarded'
  | 'failed';

export type TestQuestion = {
  id: string;
  wordLabel: string;
  textColor: ColorKey;
  correctColor: ColorKey;
  shownAt: number;
};

export type AnswerRecord = {
  questionId: string;
  selectedColor: ColorKey;
  correctColor: ColorKey;
  isCorrect: boolean;
  reactionMs: number;
};

export type TestResult = {
  score: number;
  grade: ResultGrade;
  accuracy: number;
  averageReactionMs: number | null;
  fastestReactionMs: number | null;
  slowestReactionMs: number | null;
  totalQuestions: number;
  correctCount: number;
  wrongCount: number;
};
