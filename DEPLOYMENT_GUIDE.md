# 🚀 Deployment Guide - 2048 Game to VPS

## Prerequisites

- VPS with Ubuntu 20.04+ or similar
- Domain name (2048web.com) pointed to your VPS IP
- SSH access to your VPS
- Root or sudo privileges

## 📦 Step 1: Prepare Your VPS

### 1.1 Update System & Install Dependencies

```bash
# Connect to VPS
ssh root@your-vps-ip

# Update system
sudo apt update && sudo apt upgrade -y

# Install required packages
sudo apt install -y python3 python3-pip python3-venv nginx git curl

# Install Node.js 18.x
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Verify installations
python3 --version
node --version
npm --version
nginx -v
```

### 1.2 Create Deploy User (Optional but Recommended)

```bash
# Create user
sudo adduser deploy
sudo usermod -aG sudo deploy

# Switch to deploy user
su - deploy
```

## 📥 Step 2: Clone & Setup Application

### 2.1 Clone Repository

```bash
cd /home/deploy  # or your preferred directory
git clone https://github.com/yourusername/game-2048.git
cd game-2048
```

### 2.2 Setup Backend

```bash
cd backend

# Create virtual environment
python3 -m venv venv
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Create production config (if needed)
cp .env.example .env  # Edit with production values
```

### 2.3 Build Frontend

```bash
cd ../frontend

# Install dependencies
npm install

# Build for production
npm run build

# The build output will be in /frontend/dist
```

## 🔧 Step 3: Configure Nginx

### 3.1 Create Nginx Configuration

```bash
sudo nano /etc/nginx/sites-available/2048web.com
```

Copy the configuration from `nginx.conf` file (see below).

### 3.2 Enable Site

```bash
# Create symbolic link
sudo ln -s /etc/nginx/sites-available/2048web.com /etc/nginx/sites-enabled/

# Remove default site
sudo rm /etc/nginx/sites-enabled/default

# Test configuration
sudo nginx -t

# Restart nginx
sudo systemctl restart nginx
```

## ⚙️ Step 4: Setup Backend Service

### 4.1 Create Systemd Service

```bash
sudo nano /etc/systemd/system/2048-backend.service
```

Copy the configuration from `2048-backend.service` file (see below).

### 4.2 Enable & Start Service

```bash
# Reload systemd
sudo systemctl daemon-reload

# Enable service to start on boot
sudo systemctl enable 2048-backend

# Start service
sudo systemctl start 2048-backend

# Check status
sudo systemctl status 2048-backend
```

## 🔒 Step 5: Setup SSL with Let's Encrypt

```bash
# Install certbot
sudo apt install -y certbot python3-certbot-nginx

# Get SSL certificate
sudo certbot --nginx -d 2048web.com -d www.2048web.com

# Certbot will automatically configure nginx for HTTPS
# Test auto-renewal
sudo certbot renew --dry-run
```

## 🔥 Step 6: Setup Firewall

```bash
# Enable UFW
sudo ufw enable

# Allow SSH
sudo ufw allow ssh

# Allow HTTP & HTTPS
sudo ufw allow 'Nginx Full'

# Check status
sudo ufw status
```

## 📊 Step 7: Monitor & Logs

### View Backend Logs
```bash
# View logs
sudo journalctl -u 2048-backend -f

# View last 100 lines
sudo journalctl -u 2048-backend -n 100
```

### View Nginx Logs
```bash
# Access log
sudo tail -f /var/log/nginx/access.log

# Error log
sudo tail -f /var/log/nginx/error.log
```

## 🔄 Step 8: Update Deployment

Create an update script for easy updates:

```bash
nano ~/update-2048.sh
```

Copy content from `update-2048.sh` (see below), then:

```bash
chmod +x ~/update-2048.sh
```

To update: `./update-2048.sh`

## ✅ Post-Deployment Checklist

- [ ] Website accessible at https://2048web.com
- [ ] SSL certificate working (green padlock)
- [ ] Backend API responding (check /api/new-game)
- [ ] Game playable on desktop
- [ ] Game playable on mobile
- [ ] PWA installable
- [ ] Service worker caching correctly
- [ ] Dark mode working
- [ ] All power-ups functional
- [ ] SEO meta tags present (view source)
- [ ] Sitemap accessible (/sitemap.xml)
- [ ] Robots.txt accessible (/robots.txt)

## 🐛 Troubleshooting

### Backend not starting
```bash
# Check service status
sudo systemctl status 2048-backend

# Check logs
sudo journalctl -u 2048-backend -n 50

# Check if port 5001 is in use
sudo lsof -i :5001
```

### Frontend not loading
```bash
# Check nginx config
sudo nginx -t

# Check nginx logs
sudo tail -f /var/log/nginx/error.log

# Verify build files exist
ls -la /home/deploy/game-2048/frontend/dist
```

### SSL Issues
```bash
# Renew certificate manually
sudo certbot renew

# Check certificate expiry
sudo certbot certificates
```

## 🎯 Performance Optimization

### Enable Gzip Compression
Already included in nginx.conf

### Enable Browser Caching
Already included in nginx.conf

### Monitor Resources
```bash
# Install htop
sudo apt install htop

# Monitor
htop
```

## 📱 Testing

### Test from different devices
- Desktop (Chrome, Firefox, Safari)
- Mobile (iOS Safari, Android Chrome)
- Tablet

### Test PWA Installation
- Chrome: Install button should appear
- Mobile: "Add to Home Screen" should work

### Test Performance
- Google PageSpeed Insights: https://pagespeed.web.dev/
- GTmetrix: https://gtmetrix.com/
- WebPageTest: https://www.webpagetest.org/

## 🔐 Security Best Practices

1. **Keep system updated**
   ```bash
   sudo apt update && sudo apt upgrade -y
   ```

2. **Use strong passwords**
3. **Disable root SSH login** (edit `/etc/ssh/sshd_config`)
4. **Setup fail2ban**
   ```bash
   sudo apt install fail2ban
   sudo systemctl enable fail2ban
   ```

5. **Regular backups**
   - Database (if using)
   - Application files
   - Nginx configs

## 📧 Support

For issues or questions:
- Check logs first
- Review this guide
- Check nginx and systemd service status

---

**Congratulations! Your 2048 game is now live! 🎉**

Visit: https://2048web.com
