# A Birthday Story Made Just For Her 🎂✨

A personal, interactive birthday surprise website for Meghana — password-
protected, photo-driven, available in English and Kannada.

## Quick start

```bash
npm install
npm run dev
```

Open the local URL it prints (usually http://localhost:5173).

## Password

**PUTTI**

## Personalizing text — one file per language

All copy lives in **`src/i18n/content.js`**, split into `en` and `kn`
objects with the exact same shape. Edit a field in one language, then
edit the matching field in the other so they stay in sync. This includes
the welcome lines, hero subtitle, the letter, special-things cards,
surprise cards, quotes, and everything else.

Settings that are the same regardless of language — her name, the
password, her birthday, and the music track — live in **`src/data/shared.js`**.

A language toggle (EN / ಕನ್ನಡ) appears top-right on every screen,
including the password screen, and remembers the visitor's choice.

## Photos

25 real photos are already in `public/images/` as `photo01.webp` through
`photo25.webp` — resized and compressed (~3.6MB total).

Captions and crop-focus points live in **`src/data/photos.js`**:
- `caption` — edit freely, keep it short and specific to that photo.
- `focus: { x, y }` — a percentage crop anchor computed from face
  detection, so square/circular crops stay centered on her face. Nudge
  it by hand (0–100 for each) if any specific photo ever looks off —
  higher `y` moves the anchor down, higher `x` moves it right.
- `orientation` — `"portrait" | "landscape" | "square"`, drives how
  much space each photo gets in the masonry gallery.

## Music

A track is already in place at `public/music/birthday-song.mp3`.
The floating button in the bottom-right corner plays/pauses it — browsers
block autoplay, so it always waits for a tap.

To swap the song, just replace that file with a new mp3 of the same name.

**A tip for next time:** when saving a file from a browser on Windows, if
you type the extension yourself (e.g. renaming to `.mp3` or `.webp`),
Windows sometimes keeps the *original* extension too, producing something
like `song.mp3.mpeg`. Use "Save As" and pick the format from the dropdown
instead of typing it into the filename, or double-check `dir` /
Explorer's "Type" column after saving.

## A note on the password

The password is a frontend-only "surprise lock," not real security —
anyone who opens dev tools could find it in the code. If real privacy is
ever needed, that requires a backend to check the password server-side —
this project is a static frontend, so there isn't one.

## Deploying it so she can open it on her phone

### Vercel (recommended, free)
1. Push this folder to a GitHub repo (can be private).
2. Go to https://vercel.com → "Add New Project" → import the repo.
3. Framework preset: **Vite**. Leave build settings as default
   (`npm run build`, output dir `dist`).
4. Click Deploy — you'll get a URL like `your-project.vercel.app`.

### Netlify
1. Push to GitHub (or drag-and-drop the `dist/` folder after running
   `npm run build` at https://app.netlify.com/drop).
2. If connecting a repo: build command `npm run build`, publish
   directory `dist`.

### GitHub Pages
1. In `vite.config.js`, add `base: '/your-repo-name/'` inside
   `defineConfig({...})`.
2. Run `npm run build`, then deploy the `dist/` folder to a `gh-pages`
   branch (the `gh-pages` npm package automates this).

## Running it as a Streamlit app

```bash
pip install -r requirements.txt
streamlit run app.py
```

`app.py` embeds `birthday_site.html` — a single self-contained file with
the whole site, all 25 photos, and the song already inlined as base64.
Streamlit doesn't run Node/React itself; it just displays that file
inside the page via `st.components.v1.html()`. That's the honest way
this works — Streamlit only executes Python, so the actual site still
has to exist as HTML/CSS/JS; Streamlit is hosting it, not rebuilding it.

**If you ever edit photos, the song, or the React code**, regenerate the
bundle before it'll show up in the Streamlit version:
```bash
npm install
npm run build
python build_streamlit_bundle.py
```
That last command needs Python 3 (no extra packages) and rewrites
`birthday_site.html`. Commit the updated file afterward.

## Pushing this to GitHub

From inside the project folder:
```bash
git init
git add .
git commit -m "Birthday site for Meghana"
```
Then create an empty repo on https://github.com/new (don't initialize
it with a README), and push:
```bash
git remote add origin https://github.com/<your-username>/<repo-name>.git
git branch -M main
git push -u origin main
```
It'll ask for your GitHub username and a **personal access token** as
the password (GitHub stopped accepting account passwords for git
operations) — generate one at
https://github.com/settings/tokens if you don't have one.

Note: `birthday_site.html` (~6.3MB) is what makes the Streamlit
deployment work with no build step — don't add it to `.gitignore`.

## Deploying the Streamlit app — Streamlit Community Cloud (free)

1. Push the repo to GitHub (above).
2. Go to https://share.streamlit.io → sign in with GitHub → "New app".
3. Pick your repo, branch `main`, main file path `app.py`.
4. Click Deploy. You'll get a link like
   `your-app-name.streamlit.app` to send her.

## Other places you can deploy — Streamlit or otherwise

**For the Streamlit version specifically:**
- **Hugging Face Spaces** (free) — create a Space, choose the
  "Streamlit" SDK, push this same repo to it.
- **Render** (free tier) — new Web Service from your GitHub repo,
  start command `streamlit run app.py --server.port $PORT --server.address 0.0.0.0`.
- Any server that can run Python long-term (Railway, a VPS, etc.) —
  same start command as above.

**For the site on its own, without Streamlit at all** — honestly the
better fit for a pure frontend site like this, since it skips an extra
Python layer entirely and loads faster:
- **Vercel** / **Netlify** — see the Vite deployment steps earlier in
  this README. Detects the framework automatically, free, custom
  domain support.
- **GitHub Pages** — free, works well for a static one-page site like
  this (needs the `base` tweak in `vite.config.js` mentioned above).


## Project structure

```
src/
├── components/         one file per section
├── data/
│   ├── shared.js         name, password, birthday, music path
│   └── photos.js          the 25-photo list with captions + face-focus crops
├── i18n/
│   ├── content.js         all EN/KN text
│   └── LanguageContext.jsx  language state + toggle hook
├── App.jsx              orchestrates the password → welcome → site flow
└── index.css             color tokens, fonts, reduced-motion support

public/
├── images/              25 photos already in place
└── music/               birthday-song.mp3 already in place
```

## Tech stack

React + Vite, Tailwind CSS v4, Framer Motion, Lucide icons.
