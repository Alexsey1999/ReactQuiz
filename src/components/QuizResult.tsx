import React from 'react'

import { Question } from './QuizList'

type Props = {
  allCorrectAnswers: string[]
  questions: Question[]
  setQuestionIndex: (questionIndex: number) => void
  setAllCorrectAnswers: (allCorrectAnswers: []) => void
}

const QuizResult: React.FC<Props> = ({
  setQuestionIndex,
  allCorrectAnswers,
  questions,
  setAllCorrectAnswers,
}) => {
  const startNewGame = (e: React.MouseEvent<HTMLButtonElement>): void => {
    setQuestionIndex(0)
    setAllCorrectAnswers([])
  }

  return (
    <div className="quiz-result">
      <div className="quiz-result-header">
        <div className="quiz-result-title">Ваш результат:</div>
        <div className="gauge">
          {allCorrectAnswers.length === 10
            ? 'Отлично'
            : allCorrectAnswers.length >= 7
            ? 'Хорошо'
            : allCorrectAnswers.length >= 5
            ? 'Средний'
            : allCorrectAnswers.length < 5
            ? 'Плохо'
            : ''}
        </div>
      </div>
      <div className="result-info">
        Вы ответили правильно на{' '}
        <span className="correct-answers">{allCorrectAnswers.length}</span>{' '}
        вопросов и сделали{' '}
        <span className="incorrect-answers">
          {questions.length - allCorrectAnswers.length}
        </span>{' '}
        ошибок
      </div>
      <button onClick={startNewGame} className="start-new-game">
        Начать новую игру
      </button>
    </div>
  )
}

export default QuizResult
