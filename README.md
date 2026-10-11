# A Personal Birthday Website for Asmita — by Abyss

A handcrafted, romantic editorial and scrapbook-inspired birthday surprise website created by **Abyss** for **Asmita**.

Built purely with **HTML5, CSS3, and Vanilla JavaScript (ES6+)**. No build steps, no compilers, no node modules, and zero server dependencies.

---

## 📁 Project Structure

```text
d:/bhfx/
├── index.html            # Main website structure & editable text/letter
├── css/
│   └── style.css         # Responsive editorial & scrapbook styles
├── js/
│   └── script.js         # Lightbox, audio player, envelope & interactions
├── assets/
│   ├── images/           # Photos of Asmita (hero, gallery 1-8, closing, SVGs)
│   ├── music/            # Background audio (place song.mp3 here)
│   └── fonts/            # Web fonts (Google Fonts with offline fallbacks)
├── .gitignore
└── README.md
```

---

## 🚀 How to Run Locally

Because this project is built entirely on native web standards:

1. **Directly in Browser**: Double-click [index.html](file:///d:/bhfx/index.html) or right-click and choose **Open With > Google Chrome / Edge / Safari / Firefox**.
2. **Via Local Static Server (Optional)**:
   - If you have Python installed: `python -m http.server 8000`
   - Or with VS Code: Click **"Go Live"** via the Live Server extension.

---

## 📷 How to Add Your Photographs of Asmita

Place your real image files in the `assets/images/` folder with these filenames:

| Photo Location | Filename | Description / Recommendation |
| :--- | :--- | :--- |
| **Hero Section** | `assets/images/hero.jpg` | Vertical portrait, warm natural lighting, face clear and unobstructed. |
| **Gallery Card 1** | `assets/images/photo-1.jpg` | "A Rare Smile" |
| **Gallery Card 2** | `assets/images/photo-2.jpg` | "Sunlight & Quiet Thoughts" |
| **Gallery Card 3** | `assets/images/photo-3.jpg` | "The Unspoken Moments" |
| **Gallery Card 4** | `assets/images/photo-4.jpg` | "Across the Miles" |
| **Gallery Card 5** | `assets/images/photo-5.jpg` | "When Words Were Everything" |
| **Gallery Card 6** | `assets/images/photo-6.jpg` | "The Day We Finally Met" |
| **Gallery Card 7** | `assets/images/photo-7.jpg` | "Quiet Grace & Strength" |
| **Gallery Card 8** | `assets/images/photo-8.jpg` | "A Brighter Horizon" |
| **Closing Portrait** | `assets/images/closing.jpg` | A peaceful, gentle closing photo to end the site. |

> **Graceful Fallbacks Included**: If any photograph file has not yet been placed in the folder, the site automatically renders an elegant romantic SVG illustration so that no broken links or missing image icons appear.

### 💡 Selecting Photos from Google Drive
If you have photos on Google Drive:
1. Download your preferred vertical/portrait shots.
2. Rename the best portrait to `hero.jpg`.
3. Pick 8 expressive or memorable candid shots and rename them `photo-1.jpg` through `photo-8.jpg`.
4. Pick one quiet, smiling closing shot and rename it `closing.jpg`.
5. Copy them into `assets/images/`.

---

## 🎵 How to Add the Music

Place your chosen MP3 file in:
`assets/music/song.mp3`

- When Asmita clicks the music player button in the bottom-right corner, your song will start playing.
- If no song file is added yet, clicking the player activates a soothing ambient chime generated in real-time via the Web Audio API, ensuring the experience never feels silent or broken.
- Autoplay is strictly disabled to respect browser policies and user experience.

---

## ✍️ How to Edit the Letter & Text

All written content is clearly commented and located inside [index.html](file:///d:/bhfx/index.html):
- **Hero Title & Copy**: Search for `<!-- 2. BIRTHDAY HERO SECTION -->`
- **Story Reflection**: Search for `<!-- 3. A REFLECTION ON THE STORY -->`
- **A Small, Honest Apology**: Search for `<!-- 3.5 A SMALL, HONEST APOLOGY -->`
- **Gallery Titles & Notes**: Search for `<!-- 4. PHOTO GALLERY -->`
- **Birthday Wishes**: Search for `<!-- 5. BIRTHDAY WISHES SECTION -->`
- **Personal Letter**: Search for `<!-- 6. PERSONAL LETTER SECTION -->`
- **Closing Words**: Search for `<!-- 7. CLOSING SECTION & FINAL MESSAGE -->`

---

## 🌐 How to Deploy to GitHub Pages or Vercel

### Option 1: GitHub Pages
1. Push this folder to a GitHub repository (e.g. `asmita-birthday`).
2. Go to your repository on GitHub and click **Settings**.
3. Under the **Pages** tab on the left sidebar:
   - **Source**: Select `Deploy from a branch`.
   - **Branch**: Select `main` (or `master`) and folder `/ (root)`.
   - Click **Save**.
4. GitHub Pages will generate a public link (e.g. `https://yourusername.github.io/asmita-birthday/`).

### Option 2: Vercel
1. Log in to [vercel.com](https://vercel.com) and click **"Add New Project"**.
2. Import your GitHub repository.
3. In **Build and Output Settings**:
   - **Framework Preset**: Choose `Other`.
   - **Build Command**: Leave empty / toggle Override OFF.
   - **Output Directory**: Leave empty / root.
4. Click **Deploy**. Your site will be live instantly with global CDN caching.

---

## 🔒 Privacy Notice

- This website was designed as a private, personal birthday gift.
- If you deploy to GitHub Pages or Vercel, the resulting link can be accessed by anyone who has the URL.
- If you wish to keep it strictly between you and Asmita, consider sending the folder as a zip file to open locally, or using password protection if deployed online.
