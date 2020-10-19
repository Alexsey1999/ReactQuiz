import React from 'react'
import classnames from 'classnames'

export type Question = {
  category: string
  type: string
  difficulty: string
  question: string
  correct_answer: string
  incorrect_answers: string[]
  allAnswers: string[]
}

type Props = {
  questions: Question[]
  questionsQuantity: number
  currentQuestion: Question
  answers: string[]
  questionIndex: number
  chooseAnswer: (
    e: React.MouseEvent<HTMLButtonElement>,
    answer: string,
    currentQuestion: Question,
    index: number
  ) => void
  activeAnswer: number | null
  pauseGame: boolean
}

const QuizList: React.FC<Props> = ({
  questions,
  answers,
  questionsQuantity,
  currentQuestion,
  chooseAnswer,
  questionIndex,
  activeAnswer,
  pauseGame,
}) => {
  return (
    <div className="quiz-list">
      <div className="questions-quantity">
        {questionIndex + 1} / {questionsQuantity}
      </div>
      <div className="quiz-question">{currentQuestion.question}</div>
      <ul className="answers-list">
        {answers.map((answer, index) => (
          <li key={answer + index} className="quiz-item">
            <button
              disabled={pauseGame}
              onClick={(e) => chooseAnswer(e, answer, currentQuestion, index)}
              className={classnames(
                'quiz-answer',
                {
                  correct:
                    answer === currentQuestion.correct_answer &&
                    activeAnswer !== null,
                },
                {
                  incorrect:
                    activeAnswer === index &&
                    answer !== currentQuestion.correct_answer,
                }
              )}
            >
              {answer}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default QuizList
