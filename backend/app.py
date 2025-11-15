from flask import Flask, jsonify, request
from flask_cors import CORS
import random
import os

app = Flask(__name__)

# CORS configuration for production
# Allow requests from your domain
allowed_origins = os.environ.get('ALLOWED_ORIGINS', 'https://2048web.com,http://localhost:3000,http://localhost:3002').split(',')

CORS(app,
     resources={r"/api/*": {
         "origins": allowed_origins,
         "methods": ["GET", "POST", "OPTIONS"],
         "allow_headers": ["Content-Type"]
     }},
     supports_credentials=False)

class Game2048:
    def __init__(self):
        self.board = [[0] * 4 for _ in range(4)]
        self.score = 0
        self.history = []  # Store move history for undo
        self.power_ups = {
            'undo': 3,
            'swap': 3,
            'delete': 3
        }
        self.add_random_tile()
        self.add_random_tile()
        self.save_state()  # Save initial state

    def add_random_tile(self):
        empty_cells = [(i, j) for i in range(4) for j in range(4) if self.board[i][j] == 0]
        if empty_cells:
            i, j = random.choice(empty_cells)
            self.board[i][j] = 2 if random.random() < 0.9 else 4

    def move_left(self):
        moved = False
        for i in range(4):
            # Compact non-zero values
            non_zero = [val for val in self.board[i] if val != 0]

            # Merge adjacent equal values
            merged = []
            skip = False
            for j in range(len(non_zero)):
                if skip:
                    skip = False
                    continue
                if j < len(non_zero) - 1 and non_zero[j] == non_zero[j + 1]:
                    merged.append(non_zero[j] * 2)
                    self.score += non_zero[j] * 2
                    skip = True
                else:
                    merged.append(non_zero[j])

            # Pad with zeros
            new_row = merged + [0] * (4 - len(merged))

            if new_row != self.board[i]:
                moved = True
            self.board[i] = new_row

        return moved

    def rotate_board(self):
        self.board = [list(row) for row in zip(*self.board[::-1])]

    def save_state(self):
        """Save current state to history for undo"""
        self.history.append({
            'board': [row[:] for row in self.board],
            'score': self.score
        })
        # Keep only last 10 states
        if len(self.history) > 10:
            self.history.pop(0)

    def move(self, direction):
        rotations = {'left': 0, 'down': 1, 'right': 2, 'up': 3}

        if direction not in rotations:
            return False

        # Rotate board to make all moves equivalent to left
        for _ in range(rotations[direction]):
            self.rotate_board()

        moved = self.move_left()

        # Rotate back
        for _ in range(4 - rotations[direction]):
            self.rotate_board()

        if moved:
            self.add_random_tile()
            self.save_state()  # Save state after successful move

        return moved

    def undo(self):
        """Undo last move"""
        if self.power_ups['undo'] <= 0:
            return False, "No undo power-ups left"

        if len(self.history) < 2:
            return False, "No moves to undo"

        # Remove current state
        self.history.pop()

        # Restore previous state
        prev_state = self.history[-1]
        self.board = [row[:] for row in prev_state['board']]
        self.score = prev_state['score']

        self.power_ups['undo'] -= 1
        return True, "Undo successful"

    def swap_tiles(self, pos1, pos2):
        """Swap two tiles"""
        if self.power_ups['swap'] <= 0:
            return False, "No swap power-ups left"

        r1, c1 = pos1
        r2, c2 = pos2

        if not (0 <= r1 < 4 and 0 <= c1 < 4 and 0 <= r2 < 4 and 0 <= c2 < 4):
            return False, "Invalid positions"

        # Swap tiles
        self.board[r1][c1], self.board[r2][c2] = self.board[r2][c2], self.board[r1][c1]

        self.power_ups['swap'] -= 1
        self.save_state()
        return True, "Swap successful"

    def delete_tile(self, number):
        """Delete all tiles with specific number"""
        if self.power_ups['delete'] <= 0:
            return False, "No delete power-ups left"

        deleted = False
        for i in range(4):
            for j in range(4):
                if self.board[i][j] == number:
                    self.board[i][j] = 0
                    deleted = True

        if not deleted:
            return False, f"No tiles with number {number} found"

        self.power_ups['delete'] -= 1
        self.save_state()
        return True, f"Deleted all {number} tiles"

    def is_game_over(self):
        # Check for empty cells
        for i in range(4):
            for j in range(4):
                if self.board[i][j] == 0:
                    return False

        # Check for possible merges
        for i in range(4):
            for j in range(4):
                if j < 3 and self.board[i][j] == self.board[i][j + 1]:
                    return False
                if i < 3 and self.board[i][j] == self.board[i + 1][j]:
                    return False

        return True

    def get_state(self):
        return {
            'board': self.board,
            'score': self.score,
            'game_over': self.is_game_over(),
            'power_ups': self.power_ups
        }

# Store game sessions
games = {}

@app.route('/api/new-game', methods=['POST'])
def new_game():
    game_id = str(random.randint(1000000, 9999999))
    games[game_id] = Game2048()
    return jsonify({
        'game_id': game_id,
        **games[game_id].get_state()
    })

@app.route('/api/move', methods=['POST'])
def move():
    data = request.json
    game_id = data.get('game_id')
    direction = data.get('direction')

    if game_id not in games:
        return jsonify({'error': 'Game not found'}), 404

    game = games[game_id]
    moved = game.move(direction)

    return jsonify({
        'moved': moved,
        **game.get_state()
    })

@app.route('/api/game/<game_id>', methods=['GET'])
def get_game(game_id):
    if game_id not in games:
        return jsonify({'error': 'Game not found'}), 404

    return jsonify(games[game_id].get_state())

@app.route('/api/undo', methods=['POST'])
def undo():
    data = request.json
    game_id = data.get('game_id')

    if game_id not in games:
        return jsonify({'error': 'Game not found'}), 404

    game = games[game_id]
    success, message = game.undo()

    return jsonify({
        'success': success,
        'message': message,
        **game.get_state()
    })

@app.route('/api/swap', methods=['POST'])
def swap():
    data = request.json
    game_id = data.get('game_id')
    pos1 = data.get('pos1')  # [row, col]
    pos2 = data.get('pos2')  # [row, col]

    if game_id not in games:
        return jsonify({'error': 'Game not found'}), 404

    game = games[game_id]
    success, message = game.swap_tiles(pos1, pos2)

    return jsonify({
        'success': success,
        'message': message,
        **game.get_state()
    })

@app.route('/api/delete', methods=['POST'])
def delete():
    data = request.json
    game_id = data.get('game_id')
    number = data.get('number')

    if game_id not in games:
        return jsonify({'error': 'Game not found'}), 404

    game = games[game_id]
    success, message = game.delete_tile(number)

    return jsonify({
        'success': success,
        'message': message,
        **game.get_state()
    })

if __name__ == '__main__':
    app.run(debug=True, port=5001)
