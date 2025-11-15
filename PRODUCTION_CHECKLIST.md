# ✅ Production Deployment Checklist

## 📋 Pre-Deployment

### Code & Configuration
- [ ] Remove all console.log() from frontend code
- [ ] Remove debug statements from backend
- [ ] Set `FLASK_ENV=production` in backend
- [ ] Update API_URL in frontend to production domain
- [ ] Test all features locally one final time
- [ ] Commit all changes to git
- [ ] Tag release version: `git tag v1.0.0`

### Domain & DNS
- [ ] Domain registered (2048web.com)
- [ ] DNS A record pointing to VPS IP
- [ ] DNS propagation complete (check: https://dnschecker.org/)
- [ ] Wait 24-48 hours if DNS just updated

### VPS Setup
- [ ] VPS provisioned and accessible
- [ ] Root/sudo access confirmed
- [ ] Firewall configured (ports 22, 80, 443)
- [ ] SSH key authentication setup
- [ ] Disable password authentication (optional, security)

## 🚀 Deployment Steps

### 1. Server Preparation
- [ ] System updated: `sudo apt update && sudo apt upgrade -y`
- [ ] Python 3.8+ installed
- [ ] Node.js 18+ installed
- [ ] Nginx installed
- [ ] Git installed
- [ ] SSL certificates installed (certbot)

### 2. Application Deployment
- [ ] Repository cloned to VPS
- [ ] Backend virtual environment created
- [ ] Backend dependencies installed
- [ ] Frontend dependencies installed
- [ ] Frontend built: `npm run build`
- [ ] Build artifacts in `/frontend/dist`

### 3. Service Configuration
- [ ] Nginx config copied to `/etc/nginx/sites-available/`
- [ ] Nginx config symlinked to `/etc/nginx/sites-enabled/`
- [ ] Nginx config tested: `sudo nginx -t`
- [ ] Systemd service file created
- [ ] Service enabled: `sudo systemctl enable 2048-backend`
- [ ] Service started: `sudo systemctl start 2048-backend`

### 4. SSL Setup
- [ ] Certbot installed
- [ ] SSL certificate obtained
- [ ] Auto-renewal configured
- [ ] HTTPS redirect working
- [ ] Certificate valid (green padlock in browser)

## 🧪 Post-Deployment Testing

### Functionality Tests
- [ ] Homepage loads at https://2048web.com
- [ ] Game starts correctly
- [ ] Arrow keys work
- [ ] Touch controls work on mobile
- [ ] Tiles merge correctly
- [ ] Score updates properly
- [ ] Best score persists after refresh
- [ ] New Game button works
- [ ] Undo power-up works (if count > 0)
- [ ] Swap power-up works (if count > 0)
- [ ] Delete power-up works (if count > 0)
- [ ] Game over detection works
- [ ] Win (2048 tile) detection works

### UI/UX Tests
- [ ] Dark mode toggle works
- [ ] Theme persists after refresh
- [ ] Fullscreen mode works
- [ ] Animations smooth
- [ ] No visual glitches
- [ ] Responsive on desktop (1920px, 1366px, 1024px)
- [ ] Responsive on tablet (768px, 834px)
- [ ] Responsive on mobile (375px, 390px, 414px)

### PWA Tests
- [ ] PWA installable on desktop
- [ ] PWA installable on mobile
- [ ] Works offline after first visit
- [ ] Service worker registered
- [ ] Manifest.json accessible
- [ ] Icons display correctly

### SEO Tests
- [ ] Meta title present and correct
- [ ] Meta description present
- [ ] Open Graph tags present
- [ ] Twitter Card tags present
- [ ] Schema.org markup present
- [ ] Sitemap.xml accessible
- [ ] Robots.txt accessible
- [ ] Canonical URL correct
- [ ] H1 tag present and unique
- [ ] Images have alt text

### Performance Tests
- [ ] PageSpeed Insights Score > 90
  - Desktop: https://pagespeed.web.dev/
  - Mobile: https://pagespeed.web.dev/
- [ ] First Contentful Paint < 1.5s
- [ ] Largest Contentful Paint < 2.5s
- [ ] Time to Interactive < 3.5s
- [ ] Cumulative Layout Shift < 0.1
- [ ] Total page size < 2MB
- [ ] Images optimized and compressed
- [ ] Gzip compression working
- [ ] Browser caching working

### Security Tests
- [ ] HTTPS working (no mixed content warnings)
- [ ] Security headers present
  - X-Frame-Options
  - X-Content-Type-Options
  - X-XSS-Protection
  - Content-Security-Policy
- [ ] No sensitive data in frontend code
- [ ] CORS configured correctly
- [ ] Rate limiting configured (if needed)
- [ ] SQL injection prevention (if using database)
- [ ] XSS prevention measures in place

### Backend Tests
- [ ] API endpoints responding
  - GET /api/new-game
  - POST /api/move
  - POST /api/undo
  - POST /api/swap-tiles
  - POST /api/delete-tiles
- [ ] API returns correct status codes
- [ ] Error handling works
- [ ] Backend logs accessible
- [ ] Backend service auto-starts on reboot

### Browser Compatibility
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)

### Monitoring & Logs
- [ ] Backend logs accessible: `sudo journalctl -u 2048-backend -f`
- [ ] Nginx access logs: `/var/log/nginx/2048web-access.log`
- [ ] Nginx error logs: `/var/log/nginx/2048web-error.log`
- [ ] No errors in logs
- [ ] Log rotation configured

## 📊 Analytics & SEO Setup

### Google Search Console
- [ ] Domain verified
- [ ] Sitemap submitted
- [ ] Coverage issues resolved
- [ ] Mobile usability checked

### Google Analytics (Optional)
- [ ] GA4 property created
- [ ] Tracking code installed
- [ ] Events configured
- [ ] Real-time data showing

### Other Tools
- [ ] Bing Webmaster Tools verified (optional)
- [ ] Search results showing (may take 2-4 weeks)

## 🔄 Maintenance Setup

### Backup Strategy
- [ ] Automated backups configured
- [ ] Backup location secured
- [ ] Restore procedure tested

### Update Procedure
- [ ] Update script created (`update-2048.sh`)
- [ ] Update script tested
- [ ] Rollback plan documented

### Monitoring
- [ ] Uptime monitoring setup (e.g., UptimeRobot)
- [ ] Error alerts configured
- [ ] SSL expiry alerts configured

## 🎯 Launch Checklist

### Final Checks Before Announcement
- [ ] All above items completed
- [ ] Tested by 3+ people
- [ ] Tested on 3+ devices
- [ ] No critical bugs found
- [ ] Performance acceptable
- [ ] SEO basics in place

### Launch Day
- [ ] Announce on social media
- [ ] Submit to directories (optional)
  - Product Hunt
  - Hacker News
  - Reddit (r/webdev, r/gaming)
- [ ] Share with friends/colleagues
- [ ] Monitor for issues
- [ ] Respond to feedback

## 📈 Post-Launch (Week 1)

- [ ] Monitor server resources (CPU, RAM, disk)
- [ ] Check for errors in logs
- [ ] Review analytics data
- [ ] Address user feedback
- [ ] Fix any bugs discovered
- [ ] Optimize based on real-world usage

## 🎉 Success Metrics

Target metrics after 1 week:
- [ ] Uptime: 99.9%+
- [ ] Page load time: < 3 seconds
- [ ] Lighthouse score: 90+
- [ ] Zero critical errors
- [ ] Positive user feedback

---

## 📞 Emergency Contacts

**In case of issues:**
- VPS Provider Support: [contact info]
- Domain Registrar Support: [contact info]
- Developer Contact: [your email]

## 🔗 Important URLs

- **Website**: https://2048web.com
- **Repository**: [GitHub URL]
- **VPS Dashboard**: [VPS provider URL]
- **Domain Dashboard**: [Domain registrar URL]
- **Analytics**: [Google Analytics URL]
- **Search Console**: [GSC URL]

---

**Last Updated**: [Date]
**Version**: 1.0.0
**Status**: ☐ Not Started | ☐ In Progress | ☐ Completed
