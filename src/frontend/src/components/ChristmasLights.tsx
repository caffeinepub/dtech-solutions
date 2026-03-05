/* CyberBar — a sleek animated data-stream bar for the navbar bottom edge */

export default function ChristmasLights() {
  return (
    <div
      className="relative w-full overflow-hidden"
      aria-hidden="true"
      style={{ height: "2px" }}
    >
      {/* Base glow line */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(0,195,255,0.08) 15%, rgba(0,195,255,0.45) 50%, rgba(0,195,255,0.08) 85%, transparent 100%)",
        }}
      />
      {/* Moving scan highlight */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(90deg, transparent 0%, rgba(0,195,255,0.9) 50%, transparent 100%)",
          backgroundSize: "200px 100%",
          backgroundRepeat: "no-repeat",
          animation: "shimmer 3s linear infinite",
        }}
      />
    </div>
  );
}
