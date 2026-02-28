import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

const WHATSAPP_URL = "https://wa.me/917411438800";

export default function WhatsAppButton() {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3"
      style={{ pointerEvents: "none" }}
    >
      {/* Tooltip */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, x: 10, scale: 0.92 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 10, scale: 0.92 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="pointer-events-none select-none rounded-lg px-3 py-1.5 text-sm font-semibold shadow-lg"
            style={{
              background: "#111",
              color: "#fff",
              whiteSpace: "nowrap",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            Chat with us!
          </motion.div>
        )}
      </AnimatePresence>

      {/* Button */}
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with DTech Solutions on WhatsApp"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onFocus={() => setHovered(true)}
        onBlur={() => setHovered(false)}
        style={{ pointerEvents: "auto" }}
      >
        <motion.div
          className="relative flex h-14 w-14 items-center justify-center rounded-full shadow-xl"
          style={{ background: "#25D366" }}
          whileHover={{ scale: 1.12 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 350, damping: 22 }}
        >
          {/* Pulse ring */}
          <motion.span
            className="absolute inset-0 rounded-full"
            style={{ background: "#25D366" }}
            animate={{
              scale: [1, 1.45, 1],
              opacity: [0.55, 0, 0.55],
            }}
            transition={{
              duration: 2.2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />

          {/* WhatsApp SVG icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 32 32"
            fill="white"
            width="30"
            height="30"
            aria-hidden="true"
          >
            <path d="M16.003 2.667C8.638 2.667 2.667 8.638 2.667 16c0 2.354.625 4.662 1.812 6.683L2.667 29.333l6.854-1.795A13.283 13.283 0 0016.003 29.333C23.366 29.333 29.333 23.362 29.333 16S23.366 2.667 16.003 2.667zm0 24.267a11.035 11.035 0 01-5.624-1.546l-.403-.239-4.07 1.066 1.083-3.963-.263-.408A10.988 10.988 0 015.005 16c0-6.065 4.935-11 10.998-11C22.065 5 27 9.935 27 16s-4.935 11-10.997 11zm6.04-8.231c-.332-.165-1.962-.966-2.267-1.075-.304-.11-.525-.165-.745.165-.22.33-.854 1.075-1.047 1.296-.193.22-.386.248-.718.083-.332-.165-1.401-.516-2.67-1.648-.987-.88-1.654-1.967-1.849-2.299-.193-.331-.02-.51.145-.675.15-.148.332-.386.498-.58.165-.192.22-.33.332-.55.11-.22.055-.413-.028-.58-.083-.165-.745-1.796-1.02-2.46-.268-.645-.54-.557-.745-.567l-.635-.012c-.22 0-.58.083-.883.413-.304.33-1.158 1.13-1.158 2.755s1.185 3.196 1.35 3.418c.165.22 2.33 3.558 5.65 4.99.79.34 1.407.544 1.888.697.793.252 1.515.217 2.085.131.636-.095 1.962-.802 2.238-1.577.275-.776.275-1.44.193-1.578-.083-.137-.304-.22-.635-.385z" />
          </svg>
        </motion.div>
      </a>
    </div>
  );
}
