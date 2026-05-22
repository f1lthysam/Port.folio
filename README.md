# Ryan Sullivan — Portfolio

A pixel/retro aesthetic personal portfolio website built with pure HTML, CSS, and vanilla JS.

## 📁 Project Structure

```
portfolio/
├── index.html        ← Main HTML page (all sections)
├── css/
│   └── style.css     ← All styles + responsive layout + animations
├── js/
│   └── main.js       ← Scroll reveal, counter, marquee, cursor, interactions
├── images/           ← Drop your assets here
│   └── (your-photo.jpg, project thumbnails, etc.)
└── README.md
```

## 🎨 Design Tokens

| Token | Value | Usage |
|-------|-------|-------|
| `--bg` | `#e8e8d8` | Page background (warm beige) |
| `--orange` | `#E88020` | Accent color |
| `--black` | `#0a0a0a` | Borders, text, dark cards |
| `--white` | `#ffffff` | Light cards |

## ✏️ Customisation Guide

### 1. Replace your photo
In `index.html`, find the `.avatar` div and replace the SVG placeholder:
```html
<div class="avatar">
  <img src="images/your-photo.jpg" alt="Your Name">
</div>
```

For the hero halftone portrait, swap the SVG inside `.halftone-portrait` with an `<img>` and apply a CSS filter to get the halftone effect, or use an actual halftone PNG.

### 2. Update your name & title
```html
<h1 class="name">Your Name</h1>
<p class="subtitle">Your Title</p>
```

### 3. Update social links
Find `.status-social` and replace the `href` values:
```html
<a href="https://wa.me/YOUR_NUMBER" ...>
<a href="https://linkedin.com/in/YOUR_HANDLE" ...>
<a href="https://instagram.com/YOUR_HANDLE" ...>
```

### 4. Update your email
Search and replace `name@company.com` with your actual email across `index.html`.

### 5. Update location
Find `3193 Gibson Run, 47747-1193, NYC` and replace with your city/location.

### 6. Add real project thumbnails
Replace the CSS art inside each `.work-card` with actual `<img>` tags pointing to your project screenshots in the `images/` folder.

### 7. Update experience cards
Edit the `.exp-card` blocks with your actual companies, roles, and date ranges.

## ⚡ Features

- **Scroll-reveal animations** — every section fades in on scroll
- **Animated stat counters** — numbers count up when visible
- **Infinite email marquee** — scrolling email in the footer
- **Pixel cursor** — custom orange square cursor on desktop
- **Hover tilt** — work cards lift on hover
- **Social ripple** — click ripple effect on social buttons
- **Fully responsive** — mobile-first, adapts to tablet & desktop

## 🚀 Running Locally

Just open `index.html` in any browser — no build step needed.

For live reload during editing, use VS Code Live Server or:
```bash
npx serve .
```
