'use client';

import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import {
  AlertCircle,
  CheckCircle2,
  XCircle,
  Clock,
  Award,
  ArrowRight,
  ArrowLeft,
  X
} from 'lucide-react';

interface Question {
  question: string;
  options: string[];
  correct: number;
  explanation: string;
  reference?: string;
}

interface QuizInterfaceProps {
  moduleId: string;
  contractorId: string;
  onComplete: () => void;
  onCancel: () => void;
}

export function QuizInterface({ moduleId, contractorId, onComplete, onCancel }: QuizInterfaceProps) {
  const [quiz, setQuiz] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(1800); // 30 minutes
  const [submittingResult, setSubmittingResult] = useState(false);

  const fetchQuiz = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/onboarding/quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ moduleId, contractorId }),
      });

      const data = await response.json();

      if (data.success) {
        setQuiz(data.quiz);
        setTimeRemaining(data.quiz.timeLimit * 60); // Convert minutes to seconds
      }
    } catch (error) {
      console.error('Failed to fetch quiz:', error);
    } finally {
      setLoading(false);
    }
  }, [moduleId, contractorId]);

  useEffect(() => {
    fetchQuiz();
  }, [fetchQuiz]);

  useEffect(() => {
    if (!submitted && timeRemaining > 0) {
      const timer = setInterval(() => {
        setTimeRemaining(prev => Math.max(0, prev - 1));
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [submitted, timeRemaining]);

  const handleAnswerSelect = (answerIndex: string) => {
    const parsed = Number.parseInt(answerIndex, 10);
    if (!Number.isFinite(parsed)) return;
    setAnswers({ ...answers, [currentQuestion]: parsed });
  };

  const handleNext = () => {
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = () => {
    // Calculate score
    let correctCount = 0;
    quiz.questions.forEach((q: Question, index: number) => {
      if (answers[index] === q.correct) {
        correctCount++;
      }
    });

    const percentage = Math.round((correctCount / quiz.questions.length) * 100);
    setScore(percentage);
    setSubmitted(true);
  };

  const submitResult = useCallback(async () => {
    if (!quiz) return;
    try {
      setSubmittingResult(true);
      await fetch('/api/onboarding/assessment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contractorId,
          moduleId,
          score,
        }),
      });
    } catch (error) {
      console.error('Failed to submit assessment result:', error);
    } finally {
      setSubmittingResult(false);
    }
  }, [contractorId, moduleId, quiz, score]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (loading) {
    return (
      <div className="container mx-auto py-8">
        <Card>
          <CardContent className="py-12">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">Generating your personalized quiz...</p>
              <p className="text-sm text-muted-foreground mt-2">This may take a moment</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!quiz) {
    return (
      <div className="container mx-auto py-8">
        <Card>
          <CardHeader>
            <CardTitle>Quiz Not Available</CardTitle>
            <CardDescription>Unable to load quiz. Please try again later.</CardDescription>
          </CardHeader>
          <CardFooter>
            <Button onClick={onCancel}>Return to Dashboard</Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  if (submitted) {
    const passed = score >= quiz.passingScore;

    return (
      <div className="container mx-auto py-8">
        <Card className={passed ? 'border-green-500' : 'border-yellow-500'}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  {passed ? (
                    <CheckCircle2 className="h-6 w-6 text-green-600" />
                  ) : (
                    <AlertCircle className="h-6 w-6 text-yellow-600" />
                  )}
                  Quiz {passed ? 'Passed' : 'Incomplete'}
                </CardTitle>
                <CardDescription className="mt-2">
                  {moduleId}
                </CardDescription>
              </div>
              <Badge
                variant={passed ? 'default' : 'secondary'}
                className={passed ? 'bg-green-600' : ''}
              >
                {score}%
              </Badge>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="text-center py-8">
              <Award className={`h-20 w-20 mx-auto mb-4 ${passed ? 'text-green-600' : 'text-yellow-600'}`} />
              <h3 className="text-2xl font-bold mb-2">Your Score: {score}%</h3>
              <p className="text-muted-foreground">
                {passed
                  ? `Congratulations! You've passed with a score of ${score}%.`
                  : `You scored ${score}%. You need ${quiz.passingScore}% to pass. Keep learning!`}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="pt-6 text-center">
                  <p className="text-3xl font-bold text-green-600">
                    {quiz.questions.filter((q: Question, i: number) => answers[i] === q.correct).length}
                  </p>
                  <p className="text-sm text-muted-foreground">Correct Answers</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6 text-center">
                  <p className="text-3xl font-bold text-red-600">
                    {quiz.questions.filter((q: Question, i: number) => answers[i] !== q.correct).length}
                  </p>
                  <p className="text-sm text-muted-foreground">Incorrect Answers</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6 text-center">
                  <p className="text-3xl font-bold">{quiz.questions.length}</p>
                  <p className="text-sm text-muted-foreground">Total Questions</p>
                </CardContent>
              </Card>
            </div>

            {/* Review Answers */}
            <div className="space-y-4">
              <h4 className="font-semibold text-lg">Review Your Answers</h4>
              {quiz.questions.map((q: Question, index: number) => {
                const userAnswer = answers[index];
                const isCorrect = userAnswer === q.correct;
                const userAnswerText =
                  typeof userAnswer === 'number' ? (q.options[userAnswer] ?? '') : '';
                const correctAnswerText = q.options[q.correct] ?? '';

                return (
                  <Card key={index} className={isCorrect ? 'border-green-500' : 'border-red-500'}>
                    <CardContent className="pt-6 space-y-3">
                      <div className="flex items-start gap-2">
                        {isCorrect ? (
                          <CheckCircle2 className="h-5 w-5 text-green-600 mt-1" />
                        ) : (
                          <XCircle className="h-5 w-5 text-red-600 mt-1" />
                        )}
                        <div className="flex-1">
                          <p className="font-medium mb-2">
                            Question {index + 1}: {q.question}
                          </p>
                          <p className="text-sm">
                            <span className="text-muted-foreground">Your answer: </span>
                            <span className={isCorrect ? 'text-green-600' : 'text-red-600'}>
                              {userAnswerText || 'Not answered'}
                            </span>
                          </p>
                          {!isCorrect && (
                            <p className="text-sm mt-1">
                              <span className="text-muted-foreground">Correct answer: </span>
                              <span className="text-green-600">{correctAnswerText}</span>
                            </p>
                          )}
                          {q.reference && (
                            <p className="text-xs text-muted-foreground mt-1">Reference: {q.reference}</p>
                          )}
                          <p className="text-sm text-muted-foreground mt-2 italic">
                            {q.explanation}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </CardContent>

          <CardFooter className="flex gap-2">
            {!passed && (
              <Button onClick={() => window.location.reload()} variant="outline" className="flex-1">
                Retake Quiz
              </Button>
            )}
            <Button
              onClick={async () => {
                await submitResult();
                onComplete();
              }}
              className="flex-1"
              disabled={submittingResult}
            >
              {passed ? 'Continue to Next Module' : 'Return to Dashboard'}
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  const question = quiz.questions[currentQuestion];
  const progress = ((currentQuestion + 1) / quiz.questions.length) * 100;
  const allAnswered = Object.keys(answers).length === quiz.questions.length;

  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>{moduleId} Assessment</CardTitle>
              <CardDescription className="mt-1">
                Question {currentQuestion + 1} of {quiz.questions.length}
              </CardDescription>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-mono">{formatTime(timeRemaining)}</span>
              </div>
              <Button variant="ghost" size="sm" onClick={onCancel}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <Progress value={progress} className="mt-4" />
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="min-h-[200px]">
            <h3 className="text-lg font-semibold mb-4">{question.question}</h3>

            <RadioGroup
              value={typeof answers[currentQuestion] === 'number' ? String(answers[currentQuestion]) : ''}
              onValueChange={handleAnswerSelect}
              className="space-y-3"
            >
              {question.options.map((option: string, index: number) => (
                <div
                  key={index}
                  className={`flex items-center space-x-2 rounded-lg border p-4 cursor-pointer transition-colors ${
                    answers[currentQuestion] === index
                      ? 'border-primary bg-primary/5'
                      : 'hover:bg-muted/50'
                  }`}
                >
                  <RadioGroupItem value={String(index)} id={`option-${index}`} />
                  <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div className="flex items-center justify-between pt-4 border-t">
            <div className="text-sm text-muted-foreground">
              {Object.keys(answers).length} of {quiz.questions.length} answered
            </div>
            <div className="flex gap-2">
              {quiz.questions.map((_: any, index: number) => (
                <div
                  key={index}
                  className={`h-2 w-8 rounded-full ${
                    index === currentQuestion
                      ? 'bg-primary'
                      : typeof answers[index] === 'number'
                      ? 'bg-green-500'
                      : 'bg-gray-200'
                  }`}
                />
              ))}
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex justify-between">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Previous
          </Button>

          {currentQuestion === quiz.questions.length - 1 ? (
            <Button
              onClick={handleSubmit}
              disabled={!allAnswered}
              className="bg-green-600 hover:bg-green-700"
            >
              Submit Quiz
              <CheckCircle2 className="h-4 w-4 ml-2" />
            </Button>
          ) : (
            <Button onClick={handleNext}>
              Next
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
