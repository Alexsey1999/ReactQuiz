import React from 'react'

import QuizBlock from './components/QuizBlock'

const App: React.FC = () => {
  const [isGameStarted, setIsGameStarted] = React.useState<boolean>(false)

  const startGame = (e: React.MouseEvent<HTMLButtonElement>): void => {
    setIsGameStarted(true)
  }

  return (
    <div className="app">
      {isGameStarted ? (
        <QuizBlock />
      ) : (
        <button className="start-quiz" onClick={startGame}>
          Start Quiz
        </button>
      )}
    </div>
  )
}

export default App
