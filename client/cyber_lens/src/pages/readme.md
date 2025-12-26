# Frontend Structure Update (Issue #2)

## Changes Implemented

### 1. Routing Setup

- Installed `react-router-dom`.
- Configured `BrowserRouter` in `App.tsx`.
- Defined routes for:
  - `/` -> **Home**
  - `/history` -> **History**
  - `/news` -> **News**

### 2. Components Created

- **Navbar (`src/components/Navbar.tsx`)**:
  - Contains navigation links to Home, History, and News.
  - Persistent across all pages.
- **Footer (`src/components/Footer.tsx`)**:
  - Displays copyright info.
  - Sticky at the bottom of the viewport.

### 3. Pages Added (`src/pages/`)

- `Home.tsx`
- `History.tsx`
- `News.tsx`

### 4. Layout

- Implemented a flexbox-based layout in `App.tsx` ensuring the footer stays at the bottom.
- Added basic CSS utilities in `App.css` to support the layout structure.
