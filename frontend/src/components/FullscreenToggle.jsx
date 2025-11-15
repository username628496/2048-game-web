import React, { useState, useEffect } from 'react'
import { Maximize, Minimize } from 'lucide-react'
import '../styles/FullscreenToggle.css'

function FullscreenToggle() {
  const [isFullscreen, setIsFullscreen] = useState(() => {
    const saved = localStorage.getItem('fullscreenMode')
    return saved === 'true'
  })

  useEffect(() => {
    if (isFullscreen) {
      document.body.classList.add('fullscreen-mode')
    } else {
      document.body.classList.remove('fullscreen-mode')
    }
  }, [isFullscreen])

  const toggleFullscreen = () => {
    const newState = !isFullscreen
    setIsFullscreen(newState)
    localStorage.setItem('fullscreenMode', newState.toString())

    if (newState) {
      document.body.classList.add('fullscreen-mode')
    } else {
      document.body.classList.remove('fullscreen-mode')
    }
  }

  return (
    <button
      className="fullscreen-toggle"
      onClick={toggleFullscreen}
      aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
      title={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
    >
      <div className="fullscreen-toggle-icon">
        {isFullscreen ? (
          <Minimize size={18} strokeWidth={2.5} />
        ) : (
          <Maximize size={18} strokeWidth={2.5} />
        )}
      </div>
    </button>
  )
}

export default FullscreenToggle
