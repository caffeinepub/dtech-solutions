import { useState } from "react";

export interface SiteTheme {
  key: string;
  name: string;
  description: string;
  primarySwatch: string;
  accentSwatch: string;
  vars: Record<string, string>;
}

export const SITE_THEMES: SiteTheme[] = [
  {
    key: "cyber-blue",
    name: "Cyber Blue",
    description: "Electric cyan on deep navy — the default DTech look.",
    primarySwatch: "#00c3ff",
    accentSwatch: "#ff9600",
    vars: {
      "--primary": "0.72 0.20 210",
      "--primary-foreground": "0.08 0.02 255",
      "--ring": "0.72 0.20 210",
      "--accent": "0.75 0.19 55",
      "--accent-foreground": "0.10 0.015 50",
      "--sidebar-primary": "0.72 0.20 210",
      "--sidebar-ring": "0.72 0.20 210",
      "--chart-1": "0.72 0.20 210",
      "--neon-primary": "#00c3ff",
      "--neon-accent": "#ff9600",
      "--theme-primary-rgb": "0,195,255",
      "--theme-accent-rgb": "255,150,30",
    },
  },
  {
    key: "orange-black",
    name: "Orange & Black",
    description:
      "Fierce orange neon on pitch black — high-impact brand energy.",
    primarySwatch: "#ff7700",
    accentSwatch: "#ffb300",
    vars: {
      "--primary": "0.72 0.19 50",
      "--primary-foreground": "0.08 0.02 30",
      "--ring": "0.72 0.19 50",
      "--accent": "0.80 0.15 80",
      "--accent-foreground": "0.08 0.015 60",
      "--sidebar-primary": "0.72 0.19 50",
      "--sidebar-ring": "0.72 0.19 50",
      "--chart-1": "0.72 0.19 50",
      "--neon-primary": "#ff7700",
      "--neon-accent": "#ffb300",
      "--theme-primary-rgb": "255,119,0",
      "--theme-accent-rgb": "255,179,0",
    },
  },
  {
    key: "crimson-red",
    name: "Crimson Red",
    description: "Blood-red neon pulse — bold, urgent, unforgettable.",
    primarySwatch: "#ff2244",
    accentSwatch: "#ff6600",
    vars: {
      "--primary": "0.62 0.22 25",
      "--primary-foreground": "0.98 0.005 0",
      "--ring": "0.62 0.22 25",
      "--accent": "0.75 0.18 40",
      "--accent-foreground": "0.08 0.015 30",
      "--sidebar-primary": "0.62 0.22 25",
      "--sidebar-ring": "0.62 0.22 25",
      "--chart-1": "0.62 0.22 25",
      "--neon-primary": "#ff2244",
      "--neon-accent": "#ff6600",
      "--theme-primary-rgb": "255,34,68",
      "--theme-accent-rgb": "255,102,0",
    },
  },
  {
    key: "emerald-green",
    name: "Emerald Green",
    description: "Fresh emerald glow on dark — tech meets nature.",
    primarySwatch: "#00e57a",
    accentSwatch: "#00d4aa",
    vars: {
      "--primary": "0.70 0.20 150",
      "--primary-foreground": "0.08 0.02 155",
      "--ring": "0.70 0.20 150",
      "--accent": "0.75 0.17 160",
      "--accent-foreground": "0.08 0.015 155",
      "--sidebar-primary": "0.70 0.20 150",
      "--sidebar-ring": "0.70 0.20 150",
      "--chart-1": "0.70 0.20 150",
      "--neon-primary": "#00e57a",
      "--neon-accent": "#00d4aa",
      "--theme-primary-rgb": "0,229,122",
      "--theme-accent-rgb": "0,212,170",
    },
  },
  {
    key: "purple-neon",
    name: "Purple Neon",
    description: "Electric violet on black — vaporwave meets enterprise.",
    primarySwatch: "#b400ff",
    accentSwatch: "#ff00cc",
    vars: {
      "--primary": "0.65 0.22 290",
      "--primary-foreground": "0.98 0.005 290",
      "--ring": "0.65 0.22 290",
      "--accent": "0.72 0.18 310",
      "--accent-foreground": "0.08 0.015 295",
      "--sidebar-primary": "0.65 0.22 290",
      "--sidebar-ring": "0.65 0.22 290",
      "--chart-1": "0.65 0.22 290",
      "--neon-primary": "#b400ff",
      "--neon-accent": "#ff00cc",
      "--theme-primary-rgb": "180,0,255",
      "--theme-accent-rgb": "255,0,204",
    },
  },
  {
    key: "monochrome",
    name: "Monochrome",
    description: "Silver & grey on void black — stripped-down precision.",
    primarySwatch: "#ccccdd",
    accentSwatch: "#999aaa",
    vars: {
      "--primary": "0.75 0.005 250",
      "--primary-foreground": "0.08 0.015 250",
      "--ring": "0.75 0.005 250",
      "--accent": "0.60 0.005 250",
      "--accent-foreground": "0.08 0.010 250",
      "--sidebar-primary": "0.75 0.005 250",
      "--sidebar-ring": "0.75 0.005 250",
      "--chart-1": "0.75 0.005 250",
      "--neon-primary": "#ccccdd",
      "--neon-accent": "#999aaa",
      "--theme-primary-rgb": "204,204,221",
      "--theme-accent-rgb": "153,154,170",
    },
  },
];

const STORAGE_KEY = "site-theme";

export function applySiteTheme(key: string): void {
  const theme = SITE_THEMES.find((t) => t.key === key);
  if (!theme) return;

  const root = document.documentElement;

  for (const [prop, value] of Object.entries(theme.vars)) {
    root.style.setProperty(prop, value);
  }

  // Sync legacy glow utility vars so existing glow-cyan-sm / glow-orange-sm adapt
  root.style.setProperty(
    "--cyan-rgb",
    theme.vars["--theme-primary-rgb"] ?? "0,195,255",
  );
  root.style.setProperty(
    "--orange-rgb",
    theme.vars["--theme-accent-rgb"] ?? "255,150,30",
  );

  localStorage.setItem(STORAGE_KEY, key);
}

export function initSiteTheme(): void {
  const saved = localStorage.getItem(STORAGE_KEY) ?? "cyber-blue";
  applySiteTheme(saved);
}

export function useSiteTheme(): {
  activeTheme: string;
  setTheme: (key: string) => void;
} {
  const [activeTheme, setActiveTheme] = useState<string>(
    () => localStorage.getItem(STORAGE_KEY) ?? "cyber-blue",
  );

  const setTheme = (key: string) => {
    applySiteTheme(key);
    setActiveTheme(key);
  };

  return { activeTheme, setTheme };
}
