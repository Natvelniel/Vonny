# Vonny's Love Surprise Website 💌

A personalized, romantic, interactive surprise website crafted specifically for **Vonny**, combining an intimate scrapbook aesthetic with dreamy pastel animations.

---

## 🌹 Features & Experience Flow

1. **Screen 1: Identity Question ("Are you Vonny?")**
   - Elegant warm cream card with washi tape and floating romantic ambient particles.
   - **YES**: Smoothly transitions to the next inquiry without reloading.
   - **NO**: Directly redirects to [`https://youtu.be/ZRQImzbEnPU`](https://youtu.be/ZRQImzbEnPU).

2. **Screen 2: Love Question ("Do you love Nathaniel?")**
   - Subtitle: *"Choose wisely, hehe."*
   - **YES**: Unlocks the grand full-screen surprise celebration.
   - **NO**: Playfully runs away and evades the cursor / touch input, keeping within visible safe viewport bounds without causing horizontal scroll or trapping keyboard users.

3. **Screen 3: The Full-Screen Romantic Celebration**
   - **Scene A (Balloon Lift)**: Continuous ascending pastel balloons (blush pink, dusty rose, cream, muted red) drifting with realistic sway and strings.
   - **Scene B (Gift Opening & Scrapbook Reveal)**: 3D gift box with bow opens with radiant glow and sparkle effects, revealing all 5 authentic photographs of Vonny suspended in organic scrapbook polaroid frames with washi tape accents.
   - **Scene C (Grand Declaration)**: Prominent, shimmering focal title **"I LOVE YOU"** and *"For you, Vonny. Always. ♡"*.
   - **Interactive Polaroid Lightbox**: Clicking/tapping any photo opens a full-resolution modal with an intimate caption.
   - **Play Again Button**: Re-triggers the celebration sequence at any time.
   - **Ambient Chimes Toggle**: Non-autoplay, gentle music-box melody synthesized in pure Web Audio API (zero audio file dependencies).

---

## 📸 Photographs Used

The website utilizes the authentic 5 photographs discovered in the root directory:
1. `WhatsApp Image 2026-10-21 at 10.43.22 PM.jpeg` (Portrait, 900×1600) — *"My favorite smile ✨"*
2. `WhatsApp Image 2026-10-21 at 10.43.22 PM (1).jpeg` (Portrait, 901×1600) — *"Cutest girl in the world 💕"*
3. `WhatsApp Image 2026-10-21 at 10.43.22 PM (2).jpeg` (Landscape, 1600×900) — *"Every second with you is magic 🌸"*
4. `WhatsApp Image 2026-10-21 at 10.43.23 PM.jpeg` (Portrait, 900×1599) — *"Forever captivating 🌷"*
5. `WhatsApp Image 2026-10-21 at 10.43.23 PM (1).jpeg` (Landscape, 1364×768) — *"You make my heart full ♡"*

*Original files were preserved untouched with aspect ratios intact.*

---

## 🛠️ Technology Stack

- **HTML5**: Semantic tags, accessible landmarks, preloaded web fonts.
- **CSS3**: Custom design tokens, high-performance GPU keyframe animations, responsive grid/flex layouts, `prefers-reduced-motion` compliance.
- **Vanilla JavaScript**: Zero frameworks or third-party dependencies.

---

## 🚀 Running Locally

### Option 1: Python Built-in Server (Recommended)
```bash
python -m http.server 3000
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Option 2: Node.js `serve` / `npx`
```bash
npx serve .
```

---

## 🌐 Deploying to Vercel

The project is pre-configured with `vercel.json` for static deployment.

### Method A: Vercel CLI
```bash
# Install Vercel CLI (if not already installed)
npm i -g vercel

# Deploy directly from the project directory
vercel
```

### Method B: Git + Vercel Dashboard
1. Initialize a git repository and commit the project:
   ```bash
   git init
   git add .
   git commit -m "Vonny's Love Surprise website"
   ```
2. Push to your GitHub / GitLab repository.
3. Import the repository in the [Vercel Dashboard](https://vercel.com/new).
4. Framework Preset: **Other** (Static Site).
5. Click **Deploy**.

---

## ✅ Verified Behavior & Testing Summary

All features were verified through automated Chromium/Edge DevTools Protocol (CDP) and visual inspections:
- **Screen 1**: YES transition verified; NO redirect destination verified.
- **Screen 2**: NO button evades smoothly on hover and touch within screen safe bounds; keyboard accessibility verified with friendly fallback message.
- **Screen 3**: Balloons ascend continuously; gift box opens; all 5 photos emerge and float without overlapping the love message; lightbox modal opens and closes cleanly.
- **Responsive Tests**: Verified on 1280×800 desktop and 375×667 mobile portrait viewports.
- **No Console Errors**: 0 runtime or asset loading errors.
