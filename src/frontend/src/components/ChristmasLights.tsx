/* ── ChristmasLights ────────────────────────────────────────────────────────
   A decorative strip of flickering LED Christmas-light dots for the navbar.
   Each bulb has its own color, glow, and independently staggered flicker.
──────────────────────────────────────────────────────────────────────────── */

const LIGHTS = [
  {
    color: "#ff2222",
    glow: "rgba(255,34,34,0.85)",
    anim: "light-flicker-1",
    delay: "0s",
  },
  {
    color: "#3399ff",
    glow: "rgba(51,153,255,0.85)",
    anim: "light-flicker-2",
    delay: "0.4s",
  },
  {
    color: "#ffdd00",
    glow: "rgba(255,221,0,0.85)",
    anim: "light-flicker-3",
    delay: "0.8s",
  },
  {
    color: "#22cc44",
    glow: "rgba(34,204,68,0.85)",
    anim: "light-flicker-4",
    delay: "1.2s",
  },
  {
    color: "#ffffff",
    glow: "rgba(255,255,255,0.85)",
    anim: "light-flicker-5",
    delay: "0.2s",
  },
  {
    color: "#ff2222",
    glow: "rgba(255,34,34,0.85)",
    anim: "light-flicker-2",
    delay: "1.6s",
  },
  {
    color: "#3399ff",
    glow: "rgba(51,153,255,0.85)",
    anim: "light-flicker-3",
    delay: "0.6s",
  },
  {
    color: "#ffdd00",
    glow: "rgba(255,221,0,0.85)",
    anim: "light-flicker-1",
    delay: "1.0s",
  },
  {
    color: "#22cc44",
    glow: "rgba(34,204,68,0.85)",
    anim: "light-flicker-5",
    delay: "0.3s",
  },
  {
    color: "#ff2222",
    glow: "rgba(255,34,34,0.85)",
    anim: "light-flicker-4",
    delay: "1.4s",
  },
  {
    color: "#ffffff",
    glow: "rgba(255,255,255,0.85)",
    anim: "light-flicker-2",
    delay: "0.7s",
  },
  {
    color: "#3399ff",
    glow: "rgba(51,153,255,0.85)",
    anim: "light-flicker-1",
    delay: "1.8s",
  },
  {
    color: "#22cc44",
    glow: "rgba(34,204,68,0.85)",
    anim: "light-flicker-3",
    delay: "0.5s",
  },
  {
    color: "#ffdd00",
    glow: "rgba(255,221,0,0.85)",
    anim: "light-flicker-5",
    delay: "1.1s",
  },
  {
    color: "#ff2222",
    glow: "rgba(255,34,34,0.85)",
    anim: "light-flicker-2",
    delay: "0.9s",
  },
  {
    color: "#ffffff",
    glow: "rgba(255,255,255,0.85)",
    anim: "light-flicker-4",
    delay: "1.3s",
  },
];

export default function ChristmasLights() {
  return (
    <div
      className="w-full overflow-hidden"
      aria-hidden="true"
      style={{
        background:
          "linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0) 100%)",
        height: "18px",
        display: "flex",
        alignItems: "flex-start",
        paddingTop: "2px",
      }}
    >
      {/* Wire */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          height: "1px",
          background: "rgba(80,80,80,0.5)",
          top: "8px",
        }}
      />

      {/* Lights */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
          width: "100%",
          position: "relative",
          paddingLeft: "12px",
          paddingRight: "12px",
        }}
      >
        {LIGHTS.map((light, i) => (
          <div
            // biome-ignore lint/suspicious/noArrayIndexKey: stable decorative index
            key={i}
            style={{
              width: "8px",
              height: "10px",
              borderRadius: "0 0 4px 4px",
              background: light.color,
              boxShadow: `0 0 6px 2px ${light.glow}, 0 0 12px 3px ${light.glow}`,
              animationName: light.anim,
              animationDuration: "4s",
              animationTimingFunction: "ease-in-out",
              animationIterationCount: "infinite",
              animationDelay: light.delay,
              flexShrink: 0,
            }}
          />
        ))}
      </div>
    </div>
  );
}
