# ⚡ Quick Deploy Guide - 2048 Game

Hướng dẫn deploy nhanh cho người dùng tiếng Việt.

## 🎯 Yêu cầu trước khi bắt đầu

1. **VPS** (Ubuntu 20.04+)
2. **Domain** (2048web.com) đã trỏ về IP VPS
3. **SSH access** vào VPS

## 🚀 Deploy trong 10 phút

### Bước 1: Kết nối VPS và cài đặt

```bash
# Kết nối SSH
ssh root@your-vps-ip

# Chạy script cài đặt tự động
curl -o- https://raw.githubusercontent.com/yourusername/game-2048/main/install.sh | bash
```

**HOẶC** cài đặt thủ công:

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Cài đặt packages
sudo apt install -y python3 python3-pip python3-venv nginx git curl

# Cài Node.js 18
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs
```

### Bước 2: Clone và Setup

```bash
# Clone project
cd /home
git clone https://github.com/yourusername/game-2048.git
cd game-2048

# Setup Backend
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
deactivate

# Build Frontend
cd ../frontend
npm install
npm run build
```

### Bước 3: Config Nginx

```bash
# Copy nginx config
sudo cp /home/game-2048/nginx.conf /etc/nginx/sites-available/2048web.com

# Enable site
sudo ln -s /etc/nginx/sites-available/2048web.com /etc/nginx/sites-enabled/
sudo rm /etc/nginx/sites-enabled/default

# Test và restart
sudo nginx -t
sudo systemctl restart nginx
```

### Bước 4: Setup Backend Service

```bash
# Copy service file
sudo cp /home/game-2048/2048-backend.service /etc/systemd/system/

# Start service
sudo systemctl daemon-reload
sudo systemctl enable 2048-backend
sudo systemctl start 2048-backend

# Check status
sudo systemctl status 2048-backend
```

### Bước 5: Cài SSL (HTTPS)

```bash
# Cài certbot
sudo apt install -y certbot python3-certbot-nginx

# Lấy SSL certificate
sudo certbot --nginx -d 2048web.com -d www.2048web.com
```

### Bước 6: Setup Firewall

```bash
sudo ufw enable
sudo ufw allow ssh
sudo ufw allow 'Nginx Full'
```

## ✅ Kiểm tra

Truy cập: **https://2048web.com**

Nếu thấy game → **Thành công!** 🎉

## 🔄 Update sau này

```bash
# SSH vào VPS
ssh root@your-vps-ip

# Chạy update script
cd /home/game-2048
chmod +x update-2048.sh
./update-2048.sh
```

## 🐛 Troubleshooting

### Website không load?

```bash
# Check nginx
sudo systemctl status nginx
sudo nginx -t

# Check logs
sudo tail -f /var/log/nginx/error.log
```

### Backend không chạy?

```bash
# Check service
sudo systemctl status 2048-backend

# Check logs
sudo journalctl -u 2048-backend -n 50

# Restart
sudo systemctl restart 2048-backend
```

### SSL không work?

```bash
# Check DNS trước
nslookup 2048web.com

# Renew SSL
sudo certbot renew
```

## 📞 Cần trợ giúp?

Xem hướng dẫn chi tiết: **DEPLOYMENT_GUIDE.md**

---

**Deploy xong rồi? Tuyệt vời! Giờ đi chơi game thôi! 🎮**
