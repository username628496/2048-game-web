import React, { useState, useEffect, useCallback } from 'react'
import { RotateCcw } from 'lucide-react'
import { gameApi } from '../services/api'
import Board from './Board'
import PowerUps from './PowerUps'
import Toast from './Toast'
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
  const [toast, setToast] = useState(null)
  const [powerUps, setPowerUps] = useState({ undo: 3, swap: 3, delete: 3 })

  // Toast helper
  const showToast = (message, type = 'info') => {
    setToast({ message, type })
  }

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
    setToast(null)
    setWon(false)
    setKeepPlaying(false)
    try {
      const data = await gameApi.newGame()
      setGameId(data.game_id)
      setBoard(data.board)
      setScore(data.score)
      setGameOver(data.game_over)
      setPowerUps(data.power_ups)
      showToast('New game started! Good luck!', 'success')
    } catch (error) {
      console.error('Error starting new game:', error)
      showToast('Error starting game. Please try again.', 'error')
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
      setPowerUps(data.power_ups)

      // Check for win
      if (!won && !keepPlaying && checkWin(data.board)) {
        setWon(true)
      }

      if (data.game_over && !won) {
        showToast('Game Over! Press "New Game" to try again.', 'info')
      }
    } catch (error) {
      console.error('Error making move:', error)
      showToast('Error making move. Please try again.', 'error')
    }
  }, [gameId, gameOver, isLoading, won, keepPlaying])

  // Handle undo
  const handleUndo = async () => {
    if (!gameId) return

    try {
      const data = await gameApi.undo(gameId)
      if (data.success) {
        setBoard(data.board)
        setScore(data.score)
        setGameOver(data.game_over)
        setPowerUps(data.power_ups)
        showToast('Move undone successfully!', 'success')
      } else {
        showToast(data.message, 'error')
      }
    } catch (error) {
      console.error('Error undoing:', error)
      showToast('Error undoing move', 'error')
    }
  }

  // Handle swap
  const handleSwap = async (pos1, pos2) => {
    if (!gameId) return

    try {
      const data = await gameApi.swap(gameId, pos1, pos2)
      if (data.success) {
        setBoard(data.board)
        setScore(data.score)
        setGameOver(data.game_over)
        setPowerUps(data.power_ups)
        showToast(data.message, 'success')
      } else {
        showToast(data.message, 'error')
      }
    } catch (error) {
      console.error('Error swapping:', error)
      showToast('Error swapping tiles', 'error')
    }
  }

  // Handle delete
  const handleDelete = async (number) => {
    if (!gameId) return

    try {
      const data = await gameApi.deleteTiles(gameId, number)
      if (data.success) {
        setBoard(data.board)
        setScore(data.score)
        setGameOver(data.game_over)
        setPowerUps(data.power_ups)
        showToast(data.message, 'success')
      } else {
        showToast(data.message, 'error')
      }
    } catch (error) {
      console.error('Error deleting:', error)
      showToast('Error deleting tiles', 'error')
    }
  }

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
      <div className="score-section">
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
          className="new-game-button-full"
          onClick={startNewGame}
          disabled={isLoading}
        >
          <RotateCcw className="new-game-icon" strokeWidth={2.5} />
          <span>{isLoading ? 'Loading...' : 'New Game'}</span>
        </button>
      </div>

      <PowerUps
        powerUps={powerUps}
        onUndo={handleUndo}
        onSwap={handleSwap}
        onDelete={handleDelete}
        board={board}
        onNewGame={startNewGame}
        isLoading={isLoading}
      />

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      <div className="board-wrapper">
        <Board board={board} onSwipe={handleMove} />

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
        <strong>HOW TO PLAY:</strong> Use your <strong>arrow keys</strong> or <strong>swipe</strong> to move the tiles.
        Tiles with the same number <strong>merge into one</strong> when they touch.
        Add them up to reach <strong>2048!</strong>
      </div>
    </div>
  )
}

export default Game2048
