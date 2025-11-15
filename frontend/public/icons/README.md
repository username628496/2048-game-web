# 🎨 Icons for 2048 Game

Upload all your icon files to this folder.

## Required Icon Sizes

### PWA Icons (Essential)
- **icon-72x72.png** - Badge/small notification icon
- **icon-96x96.png** - Android home screen
- **icon-144x144.png** - iOS splash screen
- **icon-192x192.png** - Android home screen (high-res)
- **icon-512x512.png** - Android splash screen

### Favicon Icons (Recommended)
- **favicon.ico** - Browser tab icon (16x16, 32x32, 48x48 combined)
- **favicon-16x16.png** - Browser tab
- **favicon-32x32.png** - Browser tab
- **apple-touch-icon.png** - iOS home screen (180x180)

### Optional (for better device support)
- **icon-128x128.png** - Chrome Web Store
- **icon-256x256.png** - Windows start menu
- **icon-384x384.png** - Better quality option

## Upload Instructions

1. **Upload all icons to this folder**: `/frontend/public/icons/`

2. **Check icons are in place**:
   ```bash
   ls -la /Users/peter/game-2048/frontend/public/icons/
   ```

3. **Restart dev server** to see changes:
   ```bash
   # The icons will be automatically available at:
   # http://localhost:3002/icons/icon-192x192.png
   ```

## Icon Design Guidelines

- **Style**: Minimal, clean, recognizable
- **Colors**: Use classic 2048 palette (beige, orange, gold)
- **Background**:
  - Light mode: #faf8ef (beige)
  - Dark mode: Transparent or #1a1a1a
- **Logo**: "2048" text or tile design
- **Safe area**: Keep important content in 80% center
- **Format**: PNG with transparency (for non-ico files)

## Quick Test

After uploading, test icons:

1. **Browser tab**: Should see favicon
2. **Manifest**: Open DevTools → Application → Manifest
3. **PWA Install**: Try installing on mobile/desktop

## Generation Tools (if needed)

If you need to generate icons from one image:

- **Online**: https://realfavicongenerator.net/
- **CLI**: `npm install -g pwa-asset-generator`
  ```bash
  pwa-asset-generator logo.png ./icons
  ```

---

**Status**: ⏳ Waiting for icons upload
