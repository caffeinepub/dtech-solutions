import { Button } from "@/components/ui/button";
import { Palette } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { SITE_THEMES, useSiteTheme } from "../hooks/useSiteTheme";

export default function SiteThemeEditor() {
  const { activeTheme, setTheme } = useSiteTheme();
  const [selected, setSelected] = useState<string>(activeTheme);

  const handleApply = () => {
    setTheme(selected);
    toast.success("Theme applied! The site colour scheme has been updated.");
  };

  const hasChanges = selected !== activeTheme;

  return (
    <div className="max-w-2xl">
      {/* Section header */}
      <div className="mb-6">
        <div className="mb-2 font-mono-tech text-xs uppercase tracking-widest text-neon-cyan">
          {"// Site Appearance"}
        </div>
        <h2 className="font-display text-2xl font-black flex items-center gap-3">
          <Palette className="h-6 w-6 text-primary" />
          Site Theme
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Choose a colour scheme for your site. Changes apply instantly.
        </p>
      </div>

      {/* Theme grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
        {SITE_THEMES.map((theme, idx) => {
          const isActive = selected === theme.key;
          return (
            <motion.button
              key={theme.key}
              type="button"
              data-ocid={`sitetheme.item.${idx + 1}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: idx * 0.06,
                duration: 0.35,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setSelected(theme.key)}
              aria-pressed={isActive}
              className="w-full text-left cursor-pointer rounded-xl border bg-card p-4 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              style={{
                borderColor: isActive
                  ? theme.primarySwatch
                  : "rgba(var(--border), 0.6)",
                boxShadow: isActive
                  ? `0 0 12px ${theme.primarySwatch}40, 0 0 24px ${theme.primarySwatch}20`
                  : "none",
              }}
            >
              {/* Colour swatch */}
              <div className="mb-3 h-10 w-full overflow-hidden rounded-lg">
                <div className="flex h-full">
                  <div
                    className="flex-1 transition-all duration-300"
                    style={{ backgroundColor: theme.primarySwatch }}
                  />
                  <div
                    className="flex-1 transition-all duration-300"
                    style={{ backgroundColor: theme.accentSwatch }}
                  />
                </div>
              </div>

              {/* Theme info */}
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <p className="font-display text-sm font-bold leading-tight truncate">
                    {theme.name}
                  </p>
                  <p className="mt-0.5 font-mono-tech text-xs text-muted-foreground leading-relaxed line-clamp-2">
                    {theme.description}
                  </p>
                </div>

                {/* Active indicator */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      key="check"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 30,
                      }}
                      className="shrink-0 mt-0.5 h-4 w-4 rounded-full flex items-center justify-center"
                      style={{
                        backgroundColor: theme.primarySwatch,
                        boxShadow: `0 0 8px ${theme.primarySwatch}80`,
                      }}
                    >
                      <svg
                        className="h-2.5 w-2.5"
                        viewBox="0 0 10 10"
                        fill="none"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                        role="img"
                      >
                        <title>Selected</title>
                        <polyline points="2,5 4,7 8,3" />
                      </svg>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Active theme label */}
              {activeTheme === theme.key && (
                <div className="mt-2">
                  <span
                    className="font-mono-tech text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full"
                    style={{
                      backgroundColor: `${theme.primarySwatch}20`,
                      color: theme.primarySwatch,
                      border: `1px solid ${theme.primarySwatch}40`,
                    }}
                  >
                    Active
                  </span>
                </div>
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Apply button */}
      <div className="flex items-center gap-4">
        <Button
          data-ocid="sitetheme.save_button"
          onClick={handleApply}
          disabled={!hasChanges}
          className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold glow-cyan-sm disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <Palette className="mr-2 h-4 w-4" />
          Apply Theme
        </Button>

        {hasChanges && (
          <motion.p
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            className="font-mono-tech text-xs text-muted-foreground"
          >
            You have unsaved theme changes.
          </motion.p>
        )}

        {!hasChanges && (
          <p className="font-mono-tech text-xs text-muted-foreground">
            Theme is up to date.
          </p>
        )}
      </div>
    </div>
  );
}
