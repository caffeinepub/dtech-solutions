# DTech Solutions

## Current State
The admin dashboard has three tabs: Repair Dashboard, Business Info, and Change Password. The site currently uses a fixed cyber blue/cyan theme defined in `index.css` CSS custom properties (OKLCH tokens). Theme changes require a code rebuild.

## Requested Changes (Diff)

### Add
- A new "Site Theme" tab in the admin dashboard (4th tab after Change Password)
- A `SiteThemeEditor` component that shows preset colour themes as selectable swatches
- A `useSiteTheme` hook that stores the selected theme key in `localStorage` and applies CSS variable overrides to `document.documentElement` at startup
- Preset themes: Cyber Blue (current default), Orange & Black, Crimson Red, Emerald Green, Purple Neon, and Monochrome

### Modify
- `AdminPage.tsx`: add the new tab trigger and render `SiteThemeEditor`
- `App.tsx` or `main.tsx`: initialise the theme on page load by calling the hook's init function
- Each theme updates `--primary`, `--ring`, `--cyan-rgb` (renamed to `--accent-rgb` dynamically), glow classes source values, and any neon colour references via CSS variable injection on `:root`

### Remove
- Nothing removed

## Implementation Plan
1. Create `src/frontend/src/hooks/useSiteTheme.ts` — define 6 theme presets, persist/restore from localStorage, apply tokens to `:root` via `style.setProperty`
2. Create `src/frontend/src/components/SiteThemeEditor.tsx` — grid of theme cards (swatch + name), animated selection ring, Save confirmation toast
3. Update `AdminPage.tsx` — import Palette icon from lucide, add "Site Theme" tab, render `<SiteThemeEditor />` inside AnimatePresence
4. Update `main.tsx` — call `initSiteTheme()` before React renders so the correct theme is applied before paint
