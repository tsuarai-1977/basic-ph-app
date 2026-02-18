import { useState } from 'react'
import StartScreen from './components/StartScreen.jsx'
import QuestionForm from './components/QuestionForm.jsx'
import ResultScreen from './components/ResultScreen.jsx'
import { calcScores } from './utils/scoring.js'

// 画面状態: 'start' | 'question' | 'result'
export default function App() {
  const [screen, setScreen] = useState('start')
  const [answers, setAnswers] = useState({})
  const [scores, setScores] = useState(null)

  function handleStart() {
    setAnswers({})
    setScores(null)
    setScreen('question')
  }

  function handleFinish(finalAnswers) {
    const result = calcScores(finalAnswers)
    setAnswers(finalAnswers)
    setScores(result)
    setScreen('result')
  }

  function handleRetake() {
    setAnswers({})
    setScores(null)
    setScreen('start')
  }

  return (
    <div className="app-container">
      {screen === 'start' && <StartScreen onStart={handleStart} />}
      {screen === 'question' && <QuestionForm onFinish={handleFinish} />}
      {screen === 'result' && (
        <ResultScreen scores={scores} answers={answers} onRetake={handleRetake} />
      )}
    </div>
  )
}
