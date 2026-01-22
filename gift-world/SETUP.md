# 🚀 Quick Setup Guide

## Step 1: Install Dependencies

All dependencies are already installed! If you need to reinstall:

```bash
cd gift-world
npm install
```

## Step 2: Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Step 3: Customize (Optional)

### Add Background Music

1. Create `public/audio/` directory
2. Add your music file (e.g., `background.mp3`)
3. Update `src/components/audio/AudioManager.tsx`:
   ```typescript
   src: ['/audio/background.mp3'],
   ```

### Personalize Messages

- **Birthday Zone**: Edit `src/app/zones/BirthdayZone.tsx`
- **Study Zone Quotes**: Edit `MOTIVATIONAL_QUOTES` in `src/app/zones/StudyZone.tsx`
- **Welcome Message**: Edit `src/app/zones/HomeWorld.tsx`

### Change Colors

Edit the gradient in `src/app/globals.css`:
```css
background: linear-gradient(135deg, #your-color-1, #your-color-2, ...);
```

## Step 4: Build for Production

```bash
npm run build
npm start
```

## 🎁 Ready to Deploy!

The website is ready to be deployed to Vercel, Netlify, or any hosting platform that supports Next.js.

---

**Note**: Make sure to test all zones and interactions before deploying!
