import React from 'react'
import '../styles/Tile.css'

function Tile({ value }) {
  if (value === 0) {
    return <div className="tile tile-empty" />
  }

  return (
    <div className={`tile tile-${value}`}>
      <span className="tile-value">{value}</span>
    </div>
  )
}

export default Tile
