import React, { useEffect, useState } from 'react'
import { CheckCircle2, XCircle, Info } from 'lucide-react'
import '../styles/Game2048.css'

function Toast({ message, type = 'info', duration = 2000, onClose }) {
  const [isClosing, setIsClosing] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsClosing(true)
      setTimeout(() => {
        onClose()
      }, 300) // Wait for animation to complete
    }, duration)

    return () => clearTimeout(timer)
  }, [duration, onClose])

  const iconComponents = {
    success: <CheckCircle2 size={20} strokeWidth={2.5} />,
    error: <XCircle size={20} strokeWidth={2.5} />,
    info: <Info size={20} strokeWidth={2.5} />
  }

  return (
    <div className={`toast-notification ${type} ${isClosing ? 'closing' : ''}`}>
      <div className="toast-content">
        <div className="toast-icon">{iconComponents[type]}</div>
        <div className="toast-text">{message}</div>
      </div>
    </div>
  )
}

export default Toast
