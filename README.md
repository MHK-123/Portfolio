# Mohammed Hussain — Terminal Portfolio

An interactive terminal-driven portfolio website. Navigate with commands, explore projects in a live preview panel, and connect via an integrated contact form.

**Live:** [mhk-portfolio.me](https://www.mhk-portfolio.me/)

## Features

- **Boot screen** with animated startup sequence
- **Command-line navigation** — type commands instead of scrolling
- **Live preview panel** — rich content renders alongside the terminal
- **6 featured projects** with status badges and external links
- **5 color themes** — cyan (default), matrix, purple, amber, white
- **Responsive design** — full-screen preview overlay on mobile
- **Contact form** powered by Formspree
- **Accessibility** — keyboard navigation, focus states, reduced-motion support

## Quick Start

```bash
git clone https://github.com/MHK-123/portfolio.git
cd portfolio
# Open index.html in a browser, or serve locally:
python -m http.server 3000
```

Visit `http://localhost:3000`

## Commands

| Command | Description |
|---|---|
| `help` | Show all commands |
| `about` | Professional introduction |
| `skills` | Technical skills by category |
| `projects` | List all projects |
| `open <slug>` | Open project preview |
| `experience` | Internship experience |
| `leadership` | Community leadership |
| `achievements` | Key accomplishments |
| `timeline` | Career journey |
| `resume` | View / download resume |
| `contact` | Contact form & social links |
| `socials` | Social media links |
| `theme [name]` | Switch color theme |
| `clear` | Clear terminal output |
| `history` | Command history |
| `whoami` | Quick identity |
| `neofetch` | System-style info card |
| `github` / `linkedin` | Open profiles |

**Project slugs:** `blueprint`, `finvora`, `fluxa`, `scribe`, `subscription`, `dungeonkeeper`

## Project Structure

```
portfolio/
├── index.html          # Boot screen + terminal shell
├── style.css           # Themes, layout, responsive styles
├── js/
│   ├── data.js         # All portfolio content
│   ├── terminal.js     # Command parser & boot sequence
│   ├── preview.js      # Preview panel renderers
│   └── main.js         # Init, Formspree, notifications
├── assets/images/      # Project thumbnails & avatar
└── README.md
```

## Customization

Edit [`js/data.js`](js/data.js) to update bio, projects, skills, experience, social links, and resume URL. No build step required.

### Themes

Run `theme matrix`, `theme purple`, `theme amber`, or `theme white` in the terminal. Choice persists in `localStorage`.

### Assets

Place images in `assets/images/`:
- `avatar.png` — profile avatar
- `finvora.png` — Finvora thumbnail
- `dungeonkeeper.png` — DungeonKeeper thumbnail

Projects without images use CSS gradient placeholders.

## Deployment

Static hosting works anywhere:
- **GitHub Pages** — push to `main`, enable Pages
- **Netlify / Vercel** — drag-and-drop or connect repo

## Contact

- **Email:** mithanihussain.123@gmail.com
- **GitHub:** [@MHK-123](https://github.com/MHK-123)
- **LinkedIn:** [mohammed-hussain-6306a1334](https://www.linkedin.com/in/mohammed-hussain-6306a1334/)

---

Built by Mohammed Hussain
