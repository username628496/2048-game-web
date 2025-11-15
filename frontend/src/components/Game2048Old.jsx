import React, { useState, useEffect, useCallback } from 'react'
import { gameApi } from '../services/api'
import Board from './Board'
import '../styles/Game2048.css'

function Game2048() {
  const [gameId, setGameId] = useState(null)
  const [board, setBoard] = useState([[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]])
  const [score, setScore] = useState(0)
  const [bestScore, setBestScore] = useState(0)
  const [gameOver, setGameOver] = useState(false)
  const [won, setWon] = useState(false)
  const [keepPlaying, setKeepPlaying] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')

  // Load best score from localStorage on mount
  useEffect(() => {
    const savedBestScore = localStorage.getItem('bestScore2048')
    if (savedBestScore) {
      setBestScore(parseInt(savedBestScore, 10))
    }
  }, [])

  // Update best score when score changes
  useEffect(() => {
    if (score > bestScore) {
      setBestScore(score)
      localStorage.setItem('bestScore2048', score.toString())
    }
  }, [score, bestScore])

  // Check for win (2048 tile reached)
  const checkWin = (boardData) => {
    for (let row of boardData) {
      for (let value of row) {
        if (value === 2048) {
          return true
        }
      }
    }
    return false
  }

  // Start new game
  const startNewGame = async () => {
    setIsLoading(true)
    setMessage('')
    setWon(false)
    setKeepPlaying(false)
    try {
      const data = await gameApi.newGame()
      setGameId(data.game_id)
      setBoard(data.board)
      setScore(data.score)
      setGameOver(data.game_over)
    } catch (error) {
      console.error('Error starting new game:', error)
      setMessage('Error starting game. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  // Handle move
  const handleMove = useCallback(async (direction) => {
    if (!gameId || (gameOver && !keepPlaying) || isLoading) return

    try {
      const data = await gameApi.move(gameId, direction)
      setBoard(data.board)
      setScore(data.score)
      setGameOver(data.game_over)

      // Check for win
      if (!won && !keepPlaying && checkWin(data.board)) {
        setWon(true)
      }

      if (data.game_over && !won) {
        setMessage('Game Over! Press "New Game" to try again.')
      }
    } catch (error) {
      console.error('Error making move:', error)
      setMessage('Error making move. Please try again.')
    }
  }, [gameId, gameOver, isLoading, won, keepPlaying])

  // Handle keyboard input
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((gameOver && !keepPlaying) || (won && !keepPlaying) || isLoading) return

      const keyMap = {
        'ArrowUp': 'up',
        'ArrowDown': 'down',
        'ArrowLeft': 'left',
        'ArrowRight': 'right'
      }

      if (keyMap[e.key]) {
        e.preventDefault()
        handleMove(keyMap[e.key])
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleMove, gameOver, isLoading, won, keepPlaying])

  // Start game on mount
  useEffect(() => {
    startNewGame()
  }, [])

  return (
    <div className="game-container">
      <div className="game-header">
        <div className="scores-wrapper">
          <div className="score-container">
            <div className="score-label">SCORE</div>
            <div className="score-value">{score}</div>
          </div>
          <div className="score-container">
            <div className="score-label">BEST</div>
            <div className="score-value">{bestScore}</div>
          </div>
        </div>
        <button
          className="new-game-button"
          onClick={startNewGame}
          disabled={isLoading}
        >
          {isLoading ? 'Loading...' : 'New Game'}
        </button>
      </div>

      {message && !won && !gameOver && (
        <div className="message">
          {message}
        </div>
      )}

      <div className="board-wrapper">
        <Board board={board} />

        {/* Win Overlay */}
        {won && !keepPlaying && (
          <div className="game-overlay">
            <div className="overlay-content">
              <h2>You win!</h2>
              <div className="overlay-buttons">
                <button className="try-again-button" onClick={startNewGame}>
                  Try again
                </button>
                <button className="keep-playing-button" onClick={() => setKeepPlaying(true)}>
                  Keep playing
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Game Over Overlay */}
        {gameOver && !won && (
          <div className="game-overlay">
            <div className="overlay-content">
              <h2>Game over!</h2>
              <div className="overlay-buttons">
                <button className="try-again-button" onClick={startNewGame}>
                  Try again
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="controls-hint">
        <strong>HOW TO PLAY:</strong> Use your <strong>arrow keys</strong> to move the tiles.
        Tiles with the same number <strong>merge into one</strong> when they touch.
        Add them up to reach <strong>2048!</strong>
      </div>
    </div>
  )
}

export default Game2048
