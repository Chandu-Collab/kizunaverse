# 🎁 Gift World - A Personalized Digital Gift Website

A beautiful, interactive, and magical digital world created as a special gift. Built with Next.js, Three.js, and modern web technologies.

## ✨ Features

### 🏠 Home World
- Interactive 3D floating island with smooth animations
- Clickable objects to navigate between zones
- Ambient particle effects
- Smooth camera controls

### 🎂 Birthday Zone
- Animated 3D birthday cake
- Confetti particle effects
- Personalized birthday messages
- Celebration animations

### 🎮 Fun Zone
- Interactive mini-game with collectible objects
- Real-time score tracking
- Timer-based gameplay
- Smooth 3D interactions

### 📚 Study Zone
- Pomodoro timer (25 min work / 5 min break)
- Motivational quotes
- Notes panel with local storage
- Calm animated background

### 💌 Your Space
- Personal journal with mood tracking
- Message board
- Local storage persistence
- Beautiful mood selector

## 🛠 Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **3D Graphics**: Three.js + React Three Fiber + Drei
- **Animations**: Framer Motion
- **Audio**: Howler.js
- **State Management**: React Context API

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. **Navigate to the project directory:**
   ```bash
   cd gift-world
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
gift-world/
├── src/
│   ├── app/
│   │   ├── zones/          # Zone components
│   │   │   ├── HomeWorld.tsx
│   │   │   ├── BirthdayZone.tsx
│   │   │   ├── FunZone.tsx
│   │   │   ├── StudyZone.tsx
│   │   │   └── YourSpace.tsx
│   │   ├── layout.tsx      # Root layout
│   │   ├── page.tsx        # Main entry point
│   │   └── globals.css     # Global styles
│   ├── components/
│   │   ├── 3d/             # 3D components
│   │   │   ├── Scene.tsx
│   │   │   ├── FloatingIsland.tsx
│   │   │   ├── InteractiveObject.tsx
│   │   │   └── Particles.tsx
│   │   ├── audio/          # Audio components
│   │   │   ├── AudioManager.tsx
│   │   │   └── MusicToggle.tsx
│   │   └── ui/             # UI primitives
│   │       ├── GlassCard.tsx
│   │       ├── Button.tsx
│   │       └── ParticleBackground.tsx
│   ├── hooks/
│   │   └── useNavigation.tsx
│   └── types/
│       └── index.ts
├── public/                  # Static assets
├── package.json
└── README.md
```

## 🎨 Customization

### Adding Background Music

1. Add your music file to `public/audio/` directory
2. Update `src/components/audio/AudioManager.tsx`:
   ```typescript
   const music = new Howl({
     src: ['/audio/background-music.mp3'],
     loop: true,
     volume: 0.3,
   });
   ```

### Personalizing Messages

Edit the zone components in `src/app/zones/` to customize:
- Birthday messages in `BirthdayZone.tsx`
- Motivational quotes in `StudyZone.tsx`
- Default journal prompts in `YourSpace.tsx`

### Changing Colors & Theme

Modify the gradient in `src/app/globals.css`:
```css
background: linear-gradient(135deg, #667eea 0%, #764ba2 25%, ...);
```

### Adding New Zones

1. Create a new zone component in `src/app/zones/`
2. Add the zone type to `src/types/index.ts`
3. Update `src/app/page.tsx` to include the new zone
4. Add a navigation object in `HomeWorld.tsx`

## 🎮 Controls

- **Mouse/Trackpad**: Click and drag to rotate 3D scenes
- **Scroll**: Zoom in/out (on desktop)
- **Touch**: Swipe and pinch on mobile devices
- **Music Toggle**: Click the music icon in the top-right corner

## 📱 Mobile Support

The website is fully responsive and optimized for mobile devices:
- Touch-friendly interactions
- Responsive layouts
- Optimized 3D rendering
- Gesture support

## 🚢 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Deploy with default settings

### Netlify

This repository is configured for Netlify with `netlify.toml` at the repo root.

1. Push your code to GitHub.
2. In Netlify, click **Add new site** and import your repository.
3. Keep default build settings (Netlify reads `netlify.toml` automatically):
   - Base directory: `gift-world`
   - Build command: `npm run build`
   - Node version: `20`
4. Deploy.

If Netlify asks for a framework preset, choose **Next.js**.

### Other Platforms

```bash
# Build the production bundle
npm run build

# Start production server
npm start
```

## 🎯 Performance Optimization

- Lazy loading for 3D components
- Suspense boundaries for async loading
- Memoized components
- Optimized particle counts
- Efficient re-renders

## 🔧 Troubleshooting

### 3D Scene Not Loading
- Check browser console for errors
- Ensure WebGL is supported in your browser
- Try disabling browser extensions

### Audio Not Playing
- Check browser autoplay policies
- Ensure audio files are in the correct path
- Check browser console for CORS errors

### Build Errors
- Clear `.next` folder: `rm -rf .next`
- Reinstall dependencies: `rm -rf node_modules && npm install`

## 💡 Future Enhancements

- [ ] Voice greeting feature
- [ ] Surprise unlock animations
- [ ] Hidden Easter eggs
- [ ] Custom theme colors
- [ ] PWA offline mode
- [ ] Photo gallery integration
- [ ] More mini-games
- [ ] Social sharing features

## 📝 License

This is a personal project created as a gift. Feel free to use and modify for your own purposes.

## 🙏 Acknowledgments

- Built with love using Next.js, Three.js, and modern web technologies
- Inspired by beautiful digital experiences and interactive art

---

**Made with ❤️ for someone special**
