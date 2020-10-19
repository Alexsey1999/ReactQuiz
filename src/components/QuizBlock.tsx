import React from 'react'

import QuizList from './QuizList'
import Loader from './Loader'
import QuizResult from './QuizResult'

import fetchTriviaQuestions from '../TriviaApi'

import { Question } from './QuizList'

const QuizBlock: React.FC = () => {
  const [isLoading, setIsLoading] = React.useState<boolean>(true)
  const [questions, setQuestions] = React.useState<Array<Question>>([])
  const [questionIndex, setQuestionIndex] = React.useState<number>(0)
  const [activeAnswer, setActiveAnswer] = React.useState<number | null>(null)
  const [allCorrectAnswers, setAllCorrectAnswers] = React.useState<string[]>([])
  const [pauseGame, setPauseGame] = React.useState<boolean>(false)

  React.useEffect(() => {
    fetchTriviaQuestions(
      'https://opentdb.com/api.php?amount=10&category=27&difficulty=easy&type=multiple'
    )
      .then((data) => {
        setQuestions(data)
        data.forEach((obj) => {
          obj.allAnswers = obj.incorrect_answers.map((elem: Question) => {
            return elem
          })
          obj.allAnswers.push(obj.correct_answer)
          var j, temp
          for (var i = obj.allAnswers.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1))
            temp = obj.allAnswers[j]
            obj.allAnswers[j] = obj.allAnswers[i]
            obj.allAnswers[i] = temp
          }
        })
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [])

  const chooseAnswer = (
    e: React.MouseEvent<HTMLButtonElement>,
    answer: string,
    currentQuestion: Question,
    index: number
  ): void => {
    setPauseGame(true)
    setActiveAnswer(index)
    setTimeout(() => {
      if (answer === currentQuestion.correct_answer) {
        setAllCorrectAnswers((prevVal) => [...prevVal, answer])
      }
      setActiveAnswer(null)
      setQuestionIndex((prevVal) => prevVal + 1)
      setPauseGame(false)
    }, 1000)
  }

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="quiz-block">
          <div className="quiz-wrapper">
            {questionIndex < questions.length ? (
              <QuizList
                questions={questions}
                answers={questions[questionIndex].allAnswers}
                questionIndex={questionIndex}
                currentQuestion={questions[questionIndex]}
                questionsQuantity={questions.length}
                chooseAnswer={chooseAnswer}
                activeAnswer={activeAnswer}
                pauseGame={pauseGame}
              />
            ) : (
              <QuizResult
                allCorrectAnswers={allCorrectAnswers}
                questions={questions}
                setQuestionIndex={setQuestionIndex}
                setAllCorrectAnswers={setAllCorrectAnswers}
              />
            )}
          </div>
        </div>
      )}
    </>
  )
}

export default QuizBlock
