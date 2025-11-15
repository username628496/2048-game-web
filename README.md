# 🎮 2048 Game - Classic Puzzle Game

Play the addictive 2048 puzzle game online for free! Merge tiles to reach 2048 and beyond.

🌐 **Live Demo**: [2048web.com](https://2048web.com)

## ✨ Features

- 🎯 Classic 2048 gameplay with smooth animations
- 🌓 Dark/Light mode support
- 📱 Fully responsive - works on all devices
- 🔄 Power-ups: Undo, Swap tiles, Delete tiles
- 💾 Best score tracking with localStorage
- ⚡ Progressive Web App (PWA) - Install and play offline
- 🎨 Minimal elegant UI design
- ⌨️ Keyboard controls (Arrow keys)
- 👆 Touch controls for mobile

## 🚀 Tech Stack

### Frontend
- ⚛️ React 18
- ⚡ Vite
- 🎨 CSS3 with minimal design
- 📦 Service Worker for PWA

### Backend
- 🐍 Python 3.8+
- 🌶️ Flask
- 🔄 Flask-CORS

## 📦 Installation

### Prerequisites
- Node.js 18+
- Python 3.8+
- npm or yarn

### Setup

1. **Clone the repository**
```bash
git clone https://github.com/username628496/2048-game-web.git
cd 2048-game-web
```

2. **Setup Backend**
```bash
cd backend
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

3. **Setup Frontend**
```bash
cd frontend
npm install
```

## 🏃 Running Locally

### Start Backend (Terminal 1)
```bash
cd backend
source venv/bin/activate
python app.py
```
Backend runs on: http://localhost:5001

### Start Frontend (Terminal 2)
```bash
cd frontend
npm run dev
```
Frontend runs on: http://localhost:3002

Visit http://localhost:3002 to play!

## 🎮 How to Play

1. Use **arrow keys** (↑ ↓ ← →) to move tiles
2. When two tiles with the same number touch, they **merge** into one
3. Create a tile with **2048** to win!
4. Continue playing to get even higher scores

### Power-ups
- **Undo**: Revert your last move (3 uses)
- **Swap**: Swap two tiles (3 uses)
- **Delete**: Remove all tiles of a specific number (3 uses)

## 🚀 Deployment

See [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) for detailed deployment instructions.

### Quick Deploy to VPS
```bash
# See QUICK_DEPLOY.md for step-by-step guide
```

## 📱 PWA Installation

### Desktop
- Visit the site in Chrome/Edge
- Click the install icon in the address bar
- Click "Install"

### Mobile
- Visit the site
- Tap the share/menu button
- Select "Add to Home Screen"

## 🎨 UI Design

The game features a **Minimal Elegant** design:
- Glass morphism with backdrop blur
- Transparent UI elements
- Classic 2048 color palette
- Smooth animations
- Clean typography with JetBrains Mono

## 📄 License

MIT License - feel free to use this project for learning or commercial purposes.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Contact

For issues or questions, please open an issue on GitHub.

## 🙏 Credits

Original 2048 game concept by Gabriele Cirulli.

---

**Made with ❤️ for puzzle game enthusiasts**

⭐ Star this repo if you like it!
