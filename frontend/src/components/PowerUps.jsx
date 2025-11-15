import React, { useState } from 'react'
import { Undo2, ArrowLeftRight, Trash2 } from 'lucide-react'
import Modal from './Modal'
import '../styles/PowerUps.css'

function PowerUps({ powerUps, onUndo, onSwap, onDelete, board }) {
  const [swapModalOpen, setSwapModalOpen] = useState(false)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [selectedTiles, setSelectedTiles] = useState([])

  const handleUndoClick = () => {
    onUndo()
  }

  const handleSwapClick = () => {
    if (powerUps.swap > 0) {
      setSwapModalOpen(true)
      setSelectedTiles([])
    }
  }

  const handleDeleteClick = () => {
    if (powerUps.delete > 0) {
      setDeleteModalOpen(true)
    }
  }

  const handleTileClick = (row, col) => {
    if (board[row][col] === 0) return

    if (selectedTiles.length === 0) {
      setSelectedTiles([[row, col]])
    } else if (selectedTiles.length === 1) {
      const [r1, c1] = selectedTiles[0]
      if (r1 === row && c1 === col) {
        setSelectedTiles([])
      } else {
        onSwap([r1, c1], [row, col])
        setSelectedTiles([])
        setSwapModalOpen(false)
      }
    }
  }

  const handleNumberClick = (number) => {
    const hasNumber = board.some(row => row.some(tile => tile === number))
    if (!hasNumber) return

    onDelete(number)
    setDeleteModalOpen(false)
  }

  const isTileSelected = (row, col) => {
    return selectedTiles.some(([r, c]) => r === row && c === col)
  }

  const getAvailableNumbers = () => {
    const numbers = new Set()
    board.forEach(row => {
      row.forEach(tile => {
        if (tile > 0) numbers.add(tile)
      })
    })
    return Array.from(numbers).sort((a, b) => a - b)
  }

  const availableNumbers = getAvailableNumbers()

  return (
    <>
      <div className="power-ups-panel">
        <div className="power-ups-grid">
          {/* Undo */}
          <button
            className={`power-up-button ${powerUps.undo === 0 ? 'disabled' : ''}`}
            onClick={handleUndoClick}
            disabled={powerUps.undo === 0}
            title="Undo last move"
          >
            <Undo2 className="power-up-icon" strokeWidth={2.5} />
            <div className="power-up-name">Undo</div>
            <div className="power-up-count">{powerUps.undo}</div>
          </button>

          {/* Swap */}
          <button
            className={`power-up-button ${powerUps.swap === 0 ? 'disabled' : ''}`}
            onClick={handleSwapClick}
            disabled={powerUps.swap === 0}
            title="Swap two tiles"
          >
            <ArrowLeftRight className="power-up-icon" strokeWidth={2.5} />
            <div className="power-up-name">Swap</div>
            <div className="power-up-count">{powerUps.swap}</div>
          </button>

          {/* Delete */}
          <button
            className={`power-up-button ${powerUps.delete === 0 ? 'disabled' : ''}`}
            onClick={handleDeleteClick}
            disabled={powerUps.delete === 0}
            title="Delete tiles by number"
          >
            <Trash2 className="power-up-icon" strokeWidth={2.5} />
            <div className="power-up-name">Delete</div>
            <div className="power-up-count">{powerUps.delete}</div>
          </button>
        </div>
      </div>

      {/* Swap Modal */}
      <Modal
        isOpen={swapModalOpen}
        onClose={() => {
          setSwapModalOpen(false)
          setSelectedTiles([])
        }}
        title="Swap Two Tiles"
      >
        <p className="modal-instructions">
          Click on two tiles to swap their positions. First tile selected will be highlighted.
        </p>
        <div className="modal-board">
          {board.map((row, rowIndex) =>
            row.map((tile, colIndex) => (
              <div
                key={`${rowIndex}-${colIndex}`}
                className={`modal-tile ${tile === 0 ? 'empty' : ''} ${isTileSelected(rowIndex, colIndex) ? 'selected' : ''}`}
                onClick={() => handleTileClick(rowIndex, colIndex)}
              >
                {tile !== 0 ? tile : ''}
              </div>
            ))
          )}
        </div>
        <div className="modal-actions">
          <button className="modal-button" onClick={() => {
            setSwapModalOpen(false)
            setSelectedTiles([])
          }}>
            Cancel
          </button>
        </div>
      </Modal>

      {/* Delete Modal */}
      <Modal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        title="Delete Tiles by Number"
      >
        <p className="modal-instructions">
          Select a number to delete all tiles with that value from the board.
        </p>
        <div className="modal-number-grid">
          {[2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048, 4096].map(num => (
            <button
              key={num}
              className={`modal-number-button ${!availableNumbers.includes(num) ? 'disabled' : ''}`}
              onClick={() => handleNumberClick(num)}
              disabled={!availableNumbers.includes(num)}
            >
              {num}
            </button>
          ))}
        </div>
        <div className="modal-actions">
          <button className="modal-button" onClick={() => setDeleteModalOpen(false)}>
            Cancel
          </button>
        </div>
      </Modal>
    </>
  )
}

export default PowerUps
