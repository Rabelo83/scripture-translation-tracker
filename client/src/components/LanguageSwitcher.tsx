/*
 * LanguageSwitcher — Floating language selector
 * Design: "Luminous Thread" — Dark Cathedral Aesthetic
 *
 * A compact, elegant language toggle that sits in the top-right corner.
 * Uses flag-style labels and a dropdown with smooth transitions.
 */

import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { Globe } from "lucide-react";

const languages = [
  { code: "en", label: "English", flag: "EN" },
  { code: "es", label: "Español", flag: "ES" },
  { code: "pt", label: "Português", flag: "PT" },
];

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const currentLang = languages.find((l) => i18n.language?.startsWith(l.code)) || languages[0];

  return (
    <div ref={ref} className="fixed top-5 right-5 z-[100]">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-mono tracking-wider transition-all duration-300"
        style={{
          background: "oklch(0.14 0.025 260 / 0.85)",
          backdropFilter: "blur(12px)",
          border: "1px solid oklch(0.3 0.03 260)",
          color: "oklch(0.82 0.12 80)",
          boxShadow: "0 4px 20px oklch(0 0 0 / 0.3)",
        }}
        aria-label="Change language"
      >
        <Globe size={16} />
        <span>{currentLang.flag}</span>
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          className="transition-transform duration-200"
          style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
        >
          <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full right-0 mt-2 rounded-lg overflow-hidden"
            style={{
              background: "oklch(0.14 0.025 260 / 0.95)",
              backdropFilter: "blur(16px)",
              border: "1px solid oklch(0.3 0.03 260)",
              boxShadow: "0 8px 32px oklch(0 0 0 / 0.4)",
              minWidth: "160px",
            }}
          >
            {languages.map((lang) => {
              const isActive = currentLang.code === lang.code;
              return (
                <button
                  key={lang.code}
                  onClick={() => {
                    i18n.changeLanguage(lang.code);
                    setOpen(false);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 text-left text-sm font-mono tracking-wider transition-colors duration-200"
                  style={{
                    color: isActive ? "oklch(0.82 0.12 80)" : "oklch(0.65 0.02 260)",
                    background: isActive ? "oklch(0.82 0.12 80 / 0.08)" : "transparent",
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) (e.target as HTMLElement).style.background = "oklch(0.82 0.12 80 / 0.05)";
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) (e.target as HTMLElement).style.background = "transparent";
                  }}
                >
                  <span className="w-7 text-center font-bold" style={{ color: isActive ? "oklch(0.82 0.12 80)" : "oklch(0.5 0.02 260)" }}>
                    {lang.flag}
                  </span>
                  <span>{lang.label}</span>
                  {isActive && (
                    <span className="ml-auto w-1.5 h-1.5 rounded-full" style={{ background: "oklch(0.82 0.12 80)" }} />
                  )}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
