import axios from 'axios'

const API_BASE_URL = '/api'

export const gameApi = {
  // Start a new game
  newGame: async () => {
    const response = await axios.post(`${API_BASE_URL}/new-game`)
    return response.data
  },

  // Make a move
  move: async (gameId, direction) => {
    const response = await axios.post(`${API_BASE_URL}/move`, {
      game_id: gameId,
      direction: direction
    })
    return response.data
  },

  // Get game state
  getGame: async (gameId) => {
    const response = await axios.get(`${API_BASE_URL}/game/${gameId}`)
    return response.data
  },

  // Undo last move
  undo: async (gameId) => {
    const response = await axios.post(`${API_BASE_URL}/undo`, {
      game_id: gameId
    })
    return response.data
  },

  // Swap two tiles
  swap: async (gameId, pos1, pos2) => {
    const response = await axios.post(`${API_BASE_URL}/swap`, {
      game_id: gameId,
      pos1: pos1,
      pos2: pos2
    })
    return response.data
  },

  // Delete tiles by number
  deleteTiles: async (gameId, number) => {
    const response = await axios.post(`${API_BASE_URL}/delete`, {
      game_id: gameId,
      number: number
    })
    return response.data
  }
}
