import React from 'react'
import Game2048 from './components/Game2048'
import ThemeToggle from './components/ThemeToggle'
import FullscreenToggle from './components/FullscreenToggle'
import FAQ from './components/FAQ'
import './styles/App.css'

function App() {
  return (
    <div className="App">
      <div className="heading">
        <h1 className="title">2048</h1>
        <div className="controls-row">
          <ThemeToggle />
          <FullscreenToggle />
        </div>
      </div>
      <div className="intro-section">
        <p className="subtitle">
          Join the tiles, get to <strong>2048!</strong>
        </p>
        <p className="description">
          Play 2048 online - a fun, addictive puzzle game. Merge tiles with the same numbers
          to reach the 2048 tile. Play now on <strong>2048web.com</strong>!
        </p>
      </div>

      <Game2048 />

      <div className="game-explanation">
        <h2>About 2048 Game</h2>
        <p>
          <strong>2048</strong> is a highly addictive puzzle game where you combine numbered tiles
          to reach the elusive 2048 tile. Use the arrow keys to slide tiles in any direction.
          When two tiles with the same number touch, they merge into one with their sum.
          Your goal is to create a tile with the number 2048!
        </p>
        <p>
          The game was originally created by Gabriele Cirulli and has become one of the most
          popular online puzzle games. Challenge yourself and see if you can beat 2048!
        </p>

        <h3>How to Play 2048</h3>
        <ul>
          <li><strong>Move tiles:</strong> Use arrow keys (↑ ↓ ← →) to slide all tiles</li>
          <li><strong>Merge tiles:</strong> When two tiles with the same number touch, they merge</li>
          <li><strong>New tiles:</strong> After each move, a new tile (2 or 4) appears</li>
          <li><strong>Win condition:</strong> Create a 2048 tile to win!</li>
          <li><strong>Game over:</strong> When no moves are possible, the game ends</li>
        </ul>

        <h3>Tips & Strategy</h3>
        <ul>
          <li>Keep your highest tile in a corner</li>
          <li>Build numbers in ascending order around your highest tile</li>
          <li>Focus on one direction - don't scatter tiles randomly</li>
          <li>Plan ahead - think about where new tiles might appear</li>
          <li>Be patient - rushing leads to mistakes!</li>
        </ul>
      </div>

      <FAQ />

      <footer className="App-footer">
        <p>&copy; 2024 2048web.com - Play 2048 Game Online Free</p>
        <p className="credits">
          Original game by <a href="https://gabrielecirulli.com" target="_blank" rel="noopener noreferrer">Gabriele Cirulli</a>
        </p>
      </footer>
    </div>
  )
}

export default App
