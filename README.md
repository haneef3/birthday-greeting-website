# birthday-greeting-website
A responsive and interactive birthday website designed to celebrate special moments with personalized wishes, animations, photo galleries, and memorable messages. Built using modern web technologies to create a fun, engaging, and visually appealing birthday experience.
# 🎂 Birthday Surprise Website

A beautifully crafted, multi-page interactive birthday surprise website built with pure HTML, CSS, and JavaScript. Features a secret passcode vault, animated cake, wish board, photo gallery, music player, and a special video message — all wrapped in a stunning dark glassmorphic design.

---

## 🌟 Live Flow

```
index.html  ──▶  cake.html  ──▶  celebration.html  ──▶  gallery.html  ──▶  video.html
  (Passcode)      (Loading)        (Celebration)        (Gallery+Music)    (Video Msg)
```

---

## 📁 Project Files

### `birthday-website.html` — 🎉 All-in-One Single File Version
> The original, self-contained version of the entire birthday website in **one file**.

**What it does:**
- Contains the **entire birthday experience** — all CSS, JavaScript, and HTML bundled together in a single file (~93KB, 2,993 lines).
- No external files needed (except images/video) — open it directly in any browser and it works instantly.
- Includes all these sections on one long scrollable page:
  - 🎈 **Hero Section** — Animated name display, floating balloons, glow effects, and a CTA button
  - 🔢 **Age Counter** — Giant animated age number with handwriting suffix
  - ⏱️ **Birthday Countdown Timer** — Live countdown showing days/hours/minutes/seconds
  - 🕯️ **Interactive Virtual Cake** — Clickable candle flames with blow sound + puff smoke
  - 🎁 **Gift Box** — 3D open animation that reveals a personal handwritten letter
  - 📌 **Sticky Wishes Wall** — Family birthday messages on colorful sticky notes
  - And more...

**Difference vs the multi-page version:**

| Feature | `birthday-website.html` | Multi-page version |
|---|---|---|
| Structure | Single file, all-in-one | 5 separate HTML pages |
| CSS | Embedded `<style>` tag | External `style.css` |
| JavaScript | Embedded `<script>` tags | External `shared.js` |
| Passcode lock | ❌ No lock screen | ✅ `index.html` passcode entry |
| Best use case | Quick share / single file | Full website / GitHub Pages |

> 💡 **When to use which:** Use `birthday-website.html` if you want to share just one file. Use the multi-page version for a full website experience with the passcode vault.

---

### `index.html` — 🔐 Passcode Entry (Entry Point)
> The very first page the birthday person sees.

**What it does:**
- Displays a stunning **split-screen layout** — a large photo cover on the left, and a passcode entry card on the right.
- The user must enter a **6-digit secret passcode** (`110615`) to unlock the surprise.
- Auto-advances to the next digit input box as each number is typed.
- Shows a **"Reveal Passcode Clue"** button that displays the code in a large glowing overlay (useful if the person needs help).
- On correct passcode, triggers a **firework + confetti animation** and **success chime sound**, then redirects to `cake.html` after 2.5 seconds.
- On incorrect passcode, shows an error message and highlights the input fields red.

**Key customization points in this file:**
| Thing to change | Where |
|---|---|
| Correct passcode | `const correctCode = "110615";` (line 80) |
| Cover photo on left panel | `<img src="pic4.jpg" ...>` (line 27) |
| Subtitle text | Updated automatically from `shared.js` config |

---

### `cake.html` — 🎂 Loading / Baking Screen (Page 2)
> A fun animated transition screen shown after the passcode is entered.

**What it does:**
- Displays a hand-drawn **SVG birthday cake** illustration that bounces up and down.
- Shows a **progress bar** that fills from 0% to 100% over ~3.5 seconds.
- Updates the loading status text at different progress milestones (e.g., *"Stirring the birthday cake batter..."*, *"Lighting the virtual candles..."*).
- Plays a **success chime sound** when loading completes.
- Automatically redirects to `celebration.html` when the bar reaches 100%.

**Key customization points:**
| Thing to change | Where |
|---|---|
| Loading duration | `const duration = 3500;` (milliseconds) |
| Status messages | `statusUpdates` array |
| Recipient name in heading | Pulled from `shared.js` config (`activeConfig.name`) |

---

### `celebration.html` — 🎉 Main Celebration Page (Page 3)
> The heart of the experience — big birthday greeting, interactive cake, and a wishes wall.

**What it does:**
- Shows a **giant "HAPPY BIRTHDAY HANNUUU"** heading with glowing gradient text.
- Displays an **interactive virtual cake** with 5 clickable candle flames — clicking each flame extinguishes it with a puff of smoke and blow sound.
- **"Make a Wish & Blow Candles"** button blows all candles at once, launches a shooting star animation, and adds a secret wish to the board.
- A **Sticky Notes Wishes Wall** displays 7 personalized birthday messages from family members (Ishaan, Dad, Mom, GrandPa & GrandMa, Arhaan, Tulya, Atta) — each note uses a different background photo (`wp1.jpg` through `wp7.jpg`).
- A **Customizer Drawer** (slide-in panel) lets you change the color theme and recipient name, saved to `localStorage`.
- **Floating balloons** animate upward in the background.
- Clicking **"Walk down Memory Lane"** navigates to `gallery.html`.

**Key customization points:**
| Thing to change | Where |
|---|---|
| Birthday person's name | `shared.js` → `DEFAULT_CONFIG.name` |
| Celebration hero subtext | `shared.js` → `DEFAULT_CONFIG.heroSubtext` |
| Wish card messages & authors | `shared.js` → `DEFAULT_CONFIG.wishes` array |
| Sticky note background photos | `wp1.jpg` to `wp7.jpg` (replace files in folder) |

---

### `gallery.html` — 📸 Photo Gallery + Music + Timeline (Page 4)
> A memory lane experience with a polaroid photo slider, music player, and life timeline.

**What it does:**
- **Polaroid Photo Carousel Slider** — displays photos from the `activeConfig.photos` array as polaroid-style cards with slight rotation and captions. Navigate with ← → arrow buttons or dot indicators.
- **Web Audio Music Player** — plays the full "Happy Birthday" melody using the browser's Web Audio API (no external files needed). Has Play/Pause, Restart, and Random Note buttons with an animated progress bar and spinning cover art.
- **Life Timeline Section** — renders milestone cards for each year defined in `shared.js` (2015 → 2026), displayed vertically with icons, titles, and descriptions.
- **Customizer Drawer** — lets you upload new polaroid photos, upload a video file, and change music track title/subtitle. Settings are saved in `localStorage`.
- Clicking **"Watch Secret Video Message"** navigates to `video.html`.

**Key customization points:**
| Thing to change | Where |
|---|---|
| Default gallery photos | `shared.js` → `DEFAULT_CONFIG.photos` array (filenames like `pic1.jpg`) |
| Timeline milestones | `shared.js` → `DEFAULT_CONFIG.timeline` array |
| Music track label | `shared.js` → `DEFAULT_CONFIG.musicTitle` & `musicArtist` |
| Photo captions | `photoCaptions` array inside `gallery.html` script |

---

### `video.html` — 🎥 Secret Video Message (Page 5)
> The final surprise — a special birthday video message.

**What it does:**
- Shows a **glassmorphic video player card** that plays the file `11.mp4` by default.
- The video plays with **full volume** and has standard controls (play, pause, seek, fullscreen).
- The **Customizer Drawer** allows uploading a custom video file to replace the birthday video (files under 3.5MB are saved to `localStorage`; larger files play for the session only).
- Navigation buttons let the user go **"Back to Memories"** (gallery) or **"Unlock Start"** (back to index).
- The page title greeting updates dynamically with the recipient's name from config.

**Key customization points:**
| Thing to change | Where |
|---|---|
| Default video file | Replace `11.mp4` in the project folder |
| Recipient name in title | Pulled from `shared.js` config |

---

### `shared.js` — ⚙️ Global Configuration & Utilities (Core Brain)
> Loaded by every page. Contains all shared data, configuration, and reusable functions.

**What it contains:**

#### `DEFAULT_CONFIG` object — all editable content lives here:
| Field | Description |
|---|---|
| `name` | Birthday person's name (e.g., `"hannu"`) |
| `age` / `ageSuffix` | Age number and suffix (e.g., `11`, `"st"`) |
| `birthdayDate` | Date string for display |
| `heroSubtext` | Subtitle shown on celebration page |
| `message` | Personal letter/message text |
| `messageSig` | Signature line of the message |
| `musicTitle` / `musicArtist` | Music player labels |
| `theme` | Default color theme (`"rose"`, `"cosmic"`, `"emerald"`, `"retro"`) |
| `wishes` | Array of wish objects — each has `icon`, `text`, `author`, `color` |
| `timeline` | Array of life milestone objects — each has `year`, `icon`, `title`, `desc` |
| `photos` | Array of photo filenames for the gallery slider |

#### Shared utility functions:
| Function | What it does |
|---|---|
| `saveConfig()` | Saves `activeConfig` to `localStorage` |
| `applyTheme(name)` | Sets the CSS `data-theme` attribute to switch color palettes |
| `initCursor()` | Starts the custom cursor + trail LERP animation |
| `initBackgroundCanvas()` | Draws animated floating particles and firework explosions on a canvas |
| `launchConfetti()` | Spawns colorful confetti pieces that fall from the top of the screen |
| `initAudio()` | Initializes the Web Audio API context |
| `playBlowSound()` | Plays a short puff/blow sound effect using synthesized white noise |
| `playSuccessChime()` | Plays a 4-note ascending arpeggio (C→E→G→C) chime |

---

### `style.css` — 🎨 Global Stylesheet (All Visual Design)
> One unified stylesheet used by all pages.

**What it covers:**
- **CSS Custom Properties (Variables)** — full color system for 4 themes: `rose` (default), `cosmic`, `emerald`, `retro`. All colors, fonts, shadows, and glass effects are defined as variables.
- **Keyframe Animations** — `floatGlow`, `fadeUp`, `fadeDown`, `flicker` (candle flame), `heartbeat`, `riseUp` (balloons), `confettiFall`, `pulseGlow`, `floatUpStar`, `shake`.
- **Custom Cursor** — styled circular cursor dot + trailing ring that follows the mouse with hover effects.
- **Background Canvas** — fixed, full-screen canvas overlay for particle effects.
- **Page-specific layout sections:**
  - **Page 1** — Split-screen passcode layout, digit input boxes, passcode overlay.
  - **Page 2** — Loading/baking screen, animated SVG cake, progress bar.
  - **Page 3** — Celebration hero, interactive virtual cake & candles, sticky note wishes wall.
  - **Page 4** — Polaroid gallery carousel, music player, life timeline, customizer drawer.
  - **Page 5** — Video player card (reuses music player styles).
- **Responsive Design** — uses `clamp()` for fluid font sizing; mobile-friendly layouts.
- **Google Fonts** used: `Outfit` (headings), `DM Sans` (body), `Dancing Script` (handwriting).

---

## 🗂️ Media Files Used

| File | Used By | Purpose |
|---|---|---|
| `pic1.jpg` – `pic8.jpg`, `pic77.jpg` | `shared.js`, `gallery.html` | Gallery polaroid photo slider images |
| `wp1.jpg` – `wp7.jpg` | `celebration.html` | Background photos for sticky note wish cards |
| `11.mp4` | `video.html` | Default birthday video message |

> ℹ️ To replace any photo, simply drop a new file with the **same filename** into the project folder. To change which photos appear in the gallery, edit the `photos` array in `shared.js`.

---

## 🚀 How to Run

This is a **pure HTML/CSS/JS project** — no build tools or dependencies required!

1. Download or clone this repository.
2. Open `index.html` in any modern web browser (Chrome, Edge, Firefox).
3. Enter passcode `110615` to begin the experience.

> **Note:** Some browsers may block local file access for video/audio. If the video doesn't load, try running a local server (e.g., VS Code Live Server extension).

---

## 🎨 Themes Available

Switch themes using the **Customizer Drawer** (✨ button, visible from celebration/gallery/video pages):

| Theme | Primary Color | Vibe |
|---|---|---|
| 🌸 Rose | Pink `#ff4f7b` | Romantic & warm (default) |
| 🌌 Cosmic | Purple `#e0aaff` | Dreamy & mystical |
| 🌿 Emerald | Green `#52b788` | Fresh & natural |
| ⚡ Retro | Neon `#ff007f` | Bold & electric |

---

## 🛠️ Tech Stack

- **HTML5** — semantic structure across 6 pages
- **CSS3** — glassmorphism, CSS variables, keyframe animations, responsive layout
- **Vanilla JavaScript** — Web Audio API, Canvas API, IntersectionObserver, localStorage
- **Google Fonts** — Outfit, DM Sans, Dancing Script
- **No frameworks, no dependencies, no build step**

---

*Made with 💖 as a special birthday surprise.*
