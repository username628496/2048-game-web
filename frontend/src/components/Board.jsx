import React, { useRef, useEffect } from 'react'
import Tile from './Tile'
import '../styles/Board.css'

function Board({ board, onSwipe }) {
  const touchStartX = useRef(null)
  const touchStartY = useRef(null)
  const boardRef = useRef(null)

  useEffect(() => {
    const board = boardRef.current
    if (!board) return

    const handleTouchStart = (e) => {
      touchStartX.current = e.touches[0].clientX
      touchStartY.current = e.touches[0].clientY
    }

    const handleTouchMove = (e) => {
      // Prevent default scroll behavior during swipe
      if (e.cancelable) {
        e.preventDefault()
      }
    }

    const handleTouchEnd = (e) => {
      if (touchStartX.current === null || touchStartY.current === null) return

      const touchEndX = e.changedTouches[0].clientX
      const touchEndY = e.changedTouches[0].clientY

      const deltaX = touchEndX - touchStartX.current
      const deltaY = touchEndY - touchStartY.current

      const minSwipeDistance = 30 // Minimum distance for a swipe

      // Determine swipe direction
      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        // Horizontal swipe
        if (Math.abs(deltaX) > minSwipeDistance) {
          if (deltaX > 0) {
            onSwipe?.('right')
          } else {
            onSwipe?.('left')
          }
        }
      } else {
        // Vertical swipe
        if (Math.abs(deltaY) > minSwipeDistance) {
          if (deltaY > 0) {
            onSwipe?.('down')
          } else {
            onSwipe?.('up')
          }
        }
      }

      touchStartX.current = null
      touchStartY.current = null
    }

    board.addEventListener('touchstart', handleTouchStart, { passive: true })
    board.addEventListener('touchmove', handleTouchMove, { passive: false })
    board.addEventListener('touchend', handleTouchEnd, { passive: true })

    return () => {
      board.removeEventListener('touchstart', handleTouchStart)
      board.removeEventListener('touchmove', handleTouchMove)
      board.removeEventListener('touchend', handleTouchEnd)
    }
  }, [onSwipe])

  return (
    <div className="board" ref={boardRef}>
      {board.map((row, rowIndex) => (
        <div key={rowIndex} className="board-row">
          {row.map((value, colIndex) => (
            <Tile key={`${rowIndex}-${colIndex}`} value={value} />
          ))}
        </div>
      ))}
    </div>
  )
}

export default Board
