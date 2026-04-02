/*
 * VerseExplorer — "Origin & Echo" Interactive Psalm 27:13 language viewer
 * Design: Hebrew original permanently visible at top, selected translation below.
 * Dark Cathedral Aesthetic · Fully internationalized with react-i18next.
 */

import { useState, useRef, useMemo } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { verseLanguages, VERSE_REF, type VerseLanguage } from "@/lib/verseData";
import { ChevronDown, BookOpen, Languages, Volume2, Sparkles } from "lucide-react";

/* ─── Hebrew original (always shown) ─── */
const hebrewVerse = verseLanguages.find((v) => v.code === "he")!;
const HEBREW_REF = "תהלים כז:יג";

/**
 * Returns the best available pronunciation for the given verse language,
 * based on the active site language (en, es, pt).
 */
function getPronunciation(verse: VerseLanguage, siteLang: string): string | undefined {
  const lang = siteLang.substring(0, 2);
  if (lang === "es" && verse.pronunciation_es) return verse.pronunciation_es;
  if (lang === "pt" && verse.pronunciation_pt) return verse.pronunciation_pt;
  if (lang === "en" && verse.pronunciation_en) return verse.pronunciation_en;
  return verse.pronunciation_es ?? verse.pronunciation_pt ?? verse.pronunciation_en;
}

const accentColors = {
  gold: "oklch(0.82 0.12 80)",
  sapphire: "oklch(0.5 0.15 250)",
  emerald: "oklch(0.6 0.15 155)",
  amber: "oklch(0.75 0.15 65)",
};

/* ─── Script-aware font sizing ─── */
function verseFontClass(script: VerseLanguage["script"]): string {
  switch (script) {
    case "cjk":
      return "text-2xl sm:text-3xl leading-relaxed";
    case "arabic":
    case "hebrew":
      return "text-2xl sm:text-3xl md:text-4xl leading-loose";
    case "devanagari":
      return "text-2xl sm:text-3xl leading-loose";
    default:
      return "text-xl sm:text-2xl md:text-3xl leading-relaxed";
  }
}

/* ─── Non-Hebrew languages for the dropdown ─── */
const selectableLanguages = verseLanguages.filter((v) => v.code !== "he");

export default function VerseExplorer() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { t, i18n } = useTranslation();
  const [selectedCode, setSelectedCode] = useState("en");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const selected = selectableLanguages.find((v) => v.code === selectedCode) ?? selectableLanguages[0];
  const siteLang = i18n.language;
  const pronunciation = useMemo(() => {
    if (selected.code === siteLang.substring(0, 2)) return undefined;
    return getPronunciation(selected, siteLang);
  }, [selected, siteLang]);

  return (
    <section ref={ref} className="py-20 sm:py-32">
      <div className="container max-w-4xl mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <p
            className="font-mono text-xs tracking-[0.4em] uppercase mb-4"
            style={{ color: accentColors.gold }}
          >
            {t("verse.tagline")}
          </p>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold"
            style={{ fontFamily: "var(--font-display)", color: "oklch(0.95 0.02 80)" }}
          >
            {t("verse.title")}
          </h2>
          <p className="mt-4 max-w-2xl mx-auto" style={{ color: "oklch(0.65 0.02 260)" }}>
            {t("verse.subtitle")}
          </p>
        </motion.div>

        {/* Verse Card — Origin & Echo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="rounded-xl border overflow-hidden"
          style={{ background: "oklch(0.14 0.025 260)", borderColor: "oklch(0.25 0.03 260)" }}
        >
          {/* ─── THE ORIGINAL (Hebrew) ─── */}
          <div
            className="px-6 sm:px-10 pt-6 sm:pt-8 pb-6"
            style={{ background: "oklch(0.11 0.025 260)" }}
          >
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-3.5 h-3.5" style={{ color: accentColors.gold }} />
              <span
                className="font-mono text-[10px] tracking-[0.3em] uppercase"
                style={{ color: accentColors.gold }}
              >
                {t("verse.theOriginal")}
              </span>
              <span className="font-mono text-[10px] tracking-wider ml-1" style={{ color: "oklch(0.5 0.02 260)" }}>
                · {HEBREW_REF}
              </span>
            </div>

            <p
              className="text-xl sm:text-2xl md:text-3xl leading-loose italic font-bold"
              style={{
                fontFamily: "var(--font-display)",
                color: "oklch(0.7 0.08 80)",
                direction: "rtl",
                textAlign: "right",
              }}
            >
              {hebrewVerse.text}
            </p>

            <p
              className="mt-3 font-mono text-xs tracking-wider"
              style={{
                color: "oklch(0.4 0.02 260)",
                textAlign: "right",
              }}
            >
              — {hebrewVerse.version}
            </p>

            {/* Transliteration for the Hebrew */}
            {hebrewVerse.transliteration && (
              <p
                className="mt-3 font-mono text-xs sm:text-sm leading-relaxed"
                style={{ color: "oklch(0.5 0.08 250)" }}
              >
                {hebrewVerse.transliteration}
              </p>
            )}
          </div>

          {/* ─── Golden Divider ─── */}
          <div
            className="h-px mx-6 sm:mx-10"
            style={{
              background: "linear-gradient(90deg, transparent, oklch(0.82 0.12 80 / 0.4), oklch(0.82 0.12 80 / 0.6), oklch(0.82 0.12 80 / 0.4), transparent)",
            }}
          />

          {/* ─── THE ECHO (Selected Translation) ─── */}
          <div className="px-6 sm:px-10 pt-6 pb-6 sm:pb-8">
            {/* Language Selector — inside the card */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4" style={{ color: accentColors.gold }} />
                <span
                  className="font-mono text-xs tracking-[0.3em] uppercase"
                  style={{ color: accentColors.gold }}
                >
                  {VERSE_REF}
                </span>
              </div>

              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg border transition-all duration-200"
                  style={{
                    background: "oklch(0.12 0.02 260)",
                    borderColor: dropdownOpen ? accentColors.gold : "oklch(0.22 0.03 260)",
                    color: "oklch(0.85 0.02 80)",
                  }}
                >
                  <Languages className="w-3.5 h-3.5" style={{ color: accentColors.gold }} />
                  <span className="font-mono text-xs tracking-wider">
                    {selected.nativeName}
                    <span className="ml-1.5 opacity-50 hidden sm:inline">({selected.name})</span>
                  </span>
                  <ChevronDown
                    className="w-3.5 h-3.5 transition-transform duration-200"
                    style={{
                      color: accentColors.gold,
                      transform: dropdownOpen ? "rotate(180deg)" : "rotate(0deg)",
                    }}
                  />
                </button>

                {dropdownOpen && (
                  <div
                    className="absolute z-50 mt-2 right-0 min-w-[240px] rounded-lg border overflow-hidden shadow-2xl"
                    style={{
                      background: "oklch(0.14 0.025 260)",
                      borderColor: "oklch(0.25 0.03 260)",
                    }}
                  >
                    <div className="max-h-72 overflow-y-auto">
                      {selectableLanguages.map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => {
                            setSelectedCode(lang.code);
                            setDropdownOpen(false);
                          }}
                          className="w-full text-left px-4 py-3 flex items-center gap-3 transition-colors duration-150"
                          style={{
                            background: lang.code === selectedCode ? "oklch(0.82 0.12 80 / 0.1)" : "transparent",
                            color: lang.code === selectedCode ? accentColors.gold : "oklch(0.75 0.02 80)",
                          }}
                          onMouseEnter={(e) => {
                            if (lang.code !== selectedCode) e.currentTarget.style.background = "oklch(0.18 0.02 260)";
                          }}
                          onMouseLeave={(e) => {
                            if (lang.code !== selectedCode) e.currentTarget.style.background = "transparent";
                          }}
                        >
                          <span className="text-base">{lang.nativeName}</span>
                          <span className="text-xs font-mono opacity-50">{lang.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Selected verse text */}
            <AnimatePresence mode="wait">
              <motion.div
                key={selected.code + "-text"}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35 }}
              >
                <p
                  className={`italic font-bold ${verseFontClass(selected.script)}`}
                  style={{
                    fontFamily: "var(--font-display)",
                    color: accentColors.gold,
                    direction: selected.direction,
                    textAlign: selected.direction === "rtl" ? "right" : "left",
                  }}
                >
                  "{selected.text}"
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Version citation */}
            <AnimatePresence mode="wait">
              <motion.p
                key={selected.code + "-version"}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25, delay: 0.1 }}
                className="mt-4 font-mono text-xs tracking-wider"
                style={{
                  color: "oklch(0.45 0.02 260)",
                  textAlign: selected.direction === "rtl" ? "right" : "left",
                }}
              >
                — {selected.version}
                {selected.versionYear ? ` (${selected.versionYear})` : ""}
              </motion.p>
            </AnimatePresence>

            {/* Transliteration */}
            <AnimatePresence mode="wait">
              {selected.transliteration && (
                <motion.div
                  key={selected.code + "-translit"}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.35, delay: 0.1 }}
                >
                  <div
                    className="my-5 h-px"
                    style={{ background: "linear-gradient(90deg, transparent, oklch(0.25 0.03 260), transparent)" }}
                  />
                  <p
                    className="font-mono text-[10px] tracking-widest uppercase mb-2"
                    style={{ color: "oklch(0.5 0.02 260)" }}
                  >
                    {t("verse.transliteration")}
                  </p>
                  <p
                    className="font-mono text-sm sm:text-base leading-relaxed"
                    style={{ color: "oklch(0.65 0.1 250)" }}
                  >
                    {selected.transliteration}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Pronunciation guide */}
            <AnimatePresence mode="wait">
              {pronunciation && (
                <motion.div
                  key={selected.code + "-pron-" + siteLang}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.35, delay: 0.15 }}
                >
                  <div
                    className="my-5 h-px"
                    style={{ background: "linear-gradient(90deg, transparent, oklch(0.25 0.03 260), transparent)" }}
                  />
                  <div className="flex items-center gap-2 mb-2">
                    <Volume2 className="w-3.5 h-3.5" style={{ color: accentColors.amber }} />
                    <p
                      className="font-mono text-[10px] tracking-widest uppercase"
                      style={{ color: "oklch(0.5 0.02 260)" }}
                    >
                      {t("verse.pronunciation")}
                    </p>
                  </div>
                  <p
                    className="text-sm sm:text-base leading-loose rounded-lg px-4 py-3"
                    style={{
                      color: "oklch(0.75 0.08 65)",
                      background: "oklch(0.12 0.02 260 / 0.6)",
                      fontFamily: "var(--font-mono)",
                    }}
                  >
                    {pronunciation}
                  </p>
                  <p
                    className="mt-2 text-[10px] font-mono"
                    style={{ color: "oklch(0.4 0.02 260)" }}
                  >
                    {t("verse.pronunciationNote")}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Language count */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-6 text-center text-xs font-mono tracking-wider"
          style={{ color: "oklch(0.35 0.02 260)" }}
        >
          {t("verse.languageCount", { count: verseLanguages.length })}
        </motion.p>
      </div>
    </section>
  );
}
