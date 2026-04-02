/*
 * Design: "Luminous Thread" — Dark Cathedral Aesthetic
 * Deep midnight-blue background, golden glowing timeline thread,
 * stained-glass accent colors, Playfair Display + Source Serif 4 typography.
 * Fully internationalized with react-i18next.
 */

import { useEffect, useRef, useState, useMemo } from "react";
import { motion, useInView } from "framer-motion";
import { useTranslation } from "react-i18next";
import { eras, timelineEvents, translationGrowthData, type TimelineEvent, type Era } from "@/lib/timelineData";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import CountdownClock from "@/components/CountdownClock";
import VerseExplorer from "@/components/VerseExplorer";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { ExternalLink } from "lucide-react";

const HERO_IMAGE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663488259868/VjUGuydrAHXpGVYaWdwTng/hero-cathedral-oQbnzUTSRCKcsQHEZuxsfy.webp";
const SCROLL_IMAGE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663488259868/VjUGuydrAHXpGVYaWdwTng/ancient-scroll-gxshgT7Arrje3szSrtQogG.webp";
const GLOBE_IMAGE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663488259868/VjUGuydrAHXpGVYaWdwTng/stained-glass-globe-LyU45xazMU6fWJgo379fzB.webp";
const FUTURE_IMAGE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663488259868/VjUGuydrAHXpGVYaWdwTng/future-light-EaWqtKaPJ7JARfWDK3PSYr.webp";
const PRESS_IMAGE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663488259868/VjUGuydrAHXpGVYaWdwTng/printing-press-m4BmURWr6RRer3NWiBj4ng.webp";

function FallbackImg({ src, alt, className, style }: { src: string; alt: string; className?: string; style?: React.CSSProperties }) {
  const [failed, setFailed] = useState(false);
  if (failed) return <div className={className} style={{ ...style, background: "linear-gradient(135deg, oklch(0.15 0.03 260), oklch(0.1 0.02 260))" }} />;
  return <img src={src} alt={alt} className={className} style={style} onError={() => setFailed(true)} />;
}

const accentColors: Record<string, string> = {
  gold: "oklch(0.82 0.12 80)",
  ruby: "oklch(0.55 0.2 15)",
  sapphire: "oklch(0.5 0.15 250)",
  emerald: "oklch(0.6 0.15 155)",
  amber: "oklch(0.75 0.15 65)",
};

const accentBg: Record<string, string> = {
  gold: "bg-[oklch(0.82_0.12_80/0.1)]",
  ruby: "bg-[oklch(0.55_0.2_15/0.1)]",
  sapphire: "bg-[oklch(0.5_0.15_250/0.1)]",
  emerald: "bg-[oklch(0.6_0.15_155/0.1)]",
  amber: "bg-[oklch(0.75_0.15_65/0.1)]",
};

const accentBorder: Record<string, string> = {
  gold: "border-[oklch(0.82_0.12_80/0.3)]",
  ruby: "border-[oklch(0.55_0.2_15/0.3)]",
  sapphire: "border-[oklch(0.5_0.15_250/0.3)]",
  emerald: "border-[oklch(0.6_0.15_155/0.3)]",
  amber: "border-[oklch(0.75_0.15_65/0.3)]",
};

const accentText: Record<string, string> = {
  gold: "text-[oklch(0.82_0.12_80)]",
  ruby: "text-[oklch(0.65_0.2_15)]",
  sapphire: "text-[oklch(0.6_0.15_250)]",
  emerald: "text-[oklch(0.7_0.15_155)]",
  amber: "text-[oklch(0.8_0.15_65)]",
};

const accentDot: Record<string, string> = {
  gold: "bg-[oklch(0.82_0.12_80)]",
  ruby: "bg-[oklch(0.55_0.2_15)]",
  sapphire: "bg-[oklch(0.5_0.15_250)]",
  emerald: "bg-[oklch(0.6_0.15_155)]",
  amber: "bg-[oklch(0.75_0.15_65)]",
};

const eraImages: Partial<Record<Era, string>> = {
  ancient: SCROLL_IMAGE,
  reformation: PRESS_IMAGE,
  acceleration: GLOBE_IMAGE,
  future: FUTURE_IMAGE,
};

/* ─── Source Link ─── */
function SourceLink({ source }: { source?: { label: string; url: string } }) {
  if (!source) return null;
  return (
    <a
      href={source.url}
      target="_blank"
      rel="noopener noreferrer"
      className="mt-4 inline-flex items-center gap-1.5 text-[10px] font-mono tracking-wider uppercase opacity-60 hover:opacity-100 transition-opacity duration-200"
      style={{ color: "oklch(0.65 0.1 80)" }}
    >
      <ExternalLink className="w-3 h-3" />
      {source.label}
    </a>
  );
}

/* ─── Hero Section ─── */
function HeroSection() {
  const { t } = useTranslation();
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <FallbackImg src={HERO_IMAGE} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-[oklch(0.12_0.02_260/0.4)] via-[oklch(0.12_0.02_260/0.6)] to-[oklch(0.12_0.02_260)]" />
      </div>
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="font-mono text-sm tracking-[0.3em] uppercase mb-6"
          style={{ color: accentColors.gold }}
        >
          {t("hero.tagline")}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[1.05] tracking-tight text-glow-gold"
          style={{ fontFamily: "var(--font-display)", color: "oklch(0.95 0.03 80)" }}
        >
          {t("hero.title")}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="mt-8 text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto"
          style={{ color: "oklch(0.78 0.02 80)" }}
        >
          {t("hero.subtitle")}
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="mt-16"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-6 h-10 rounded-full border-2 mx-auto flex items-start justify-center pt-2"
            style={{ borderColor: "oklch(0.82 0.12 80 / 0.4)" }}
          >
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: accentColors.gold }} />
          </motion.div>
          <p className="mt-3 text-xs tracking-widest uppercase" style={{ color: "oklch(0.5 0.02 260)" }}>
            {t("hero.scroll")}
          </p>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Era Navigator ─── */
function EraNavigator({ activeEra }: { activeEra: Era }) {
  const { t } = useTranslation();
  return (
    <nav className="fixed left-4 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-2">
      {eras.map((era) => (
        <a key={era.id} href={`#era-${era.id}`} className="group flex items-center gap-3" title={t(`eras.${era.id}.title`)}>
          <div
            className="w-2.5 h-2.5 rounded-full transition-all duration-300"
            style={{
              background: activeEra === era.id ? era.color : "oklch(0.3 0.02 260)",
              boxShadow: activeEra === era.id ? `0 0 12px ${era.color}` : "none",
              transform: activeEra === era.id ? "scale(1.4)" : "scale(1)",
            }}
          />
          <span
            className="text-xs font-mono tracking-wider uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap"
            style={{ color: era.color }}
          >
            {t(`eras.${era.id}.yearRange`)}
          </span>
        </a>
      ))}
    </nav>
  );
}

/* ─── Era Header ─── */
function EraHeader({ era, image }: { era: typeof eras[0]; image?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { t } = useTranslation();

  return (
    <div id={`era-${era.id}`} ref={ref} className="relative py-24 sm:py-32 scroll-mt-20">
      {image && (
        <div className="absolute inset-0 overflow-hidden">
          <FallbackImg src={image} alt="" className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-b from-[oklch(0.12_0.02_260)] via-[oklch(0.12_0.02_260/0.7)] to-[oklch(0.12_0.02_260)]" />
        </div>
      )}
      <div className="relative container max-w-4xl mx-auto px-4 text-center">
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mx-auto mb-8 h-px w-48"
          style={{ background: `linear-gradient(90deg, transparent, ${era.color}, transparent)` }}
        />
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-mono text-xs tracking-[0.4em] uppercase mb-4"
          style={{ color: era.color }}
        >
          {t(`eras.${era.id}.yearRange`)}
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-4xl sm:text-5xl md:text-6xl font-bold"
          style={{ fontFamily: "var(--font-display)", color: "oklch(0.95 0.02 80)" }}
        >
          {t(`eras.${era.id}.title`)}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-4 text-lg max-w-xl mx-auto"
          style={{ color: "oklch(0.65 0.02 260)" }}
        >
          {t(`eras.${era.id}.subtitle`)}
        </motion.p>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          className="mx-auto mt-8 h-px w-48"
          style={{ background: `linear-gradient(90deg, transparent, ${era.color}, transparent)` }}
        />
      </div>
    </div>
  );
}

/* ─── Timeline Event Card ─── */
function CardContent({ event }: { event: TimelineEvent }) {
  const { t } = useTranslation();
  return (
    <>
      {event.type === "projection" && (
        <span
          className="inline-block mb-3 px-2 py-0.5 text-[10px] font-mono tracking-widest uppercase rounded border border-dashed"
          style={{ borderColor: accentColors[event.accent], color: accentColors[event.accent] }}
        >
          {t("projection")}
        </span>
      )}
      <p className="font-mono text-xs tracking-wider mb-1" style={{ color: accentColors[event.accent] }}>
        {t(`events.${event.i18nKey}.yearLabel`, { defaultValue: event.yearLabel })}
      </p>
      <h3
        className="text-xl font-bold mb-3"
        style={{ fontFamily: "var(--font-display)", color: "oklch(0.95 0.02 80)" }}
      >
        {t(`events.${event.i18nKey}.title`)}
      </h3>
      <p className="text-sm leading-relaxed" style={{ color: "oklch(0.72 0.02 260)" }}>
        {t(`events.${event.i18nKey}.description`)}
      </p>
      {event.stats && (
        <div className="mt-4 grid grid-cols-2 gap-2">
          {event.stats.map((stat, i) => (
            <div key={i} className="rounded px-3 py-2" style={{ background: "oklch(0.12 0.02 260 / 0.6)" }}>
              <p className="text-[10px] font-mono uppercase tracking-wider" style={{ color: "oklch(0.5 0.02 260)" }}>
                {event.statI18nKeys?.[i] ? t(`statLabels.${event.statI18nKeys[i]}`) : stat.label}
              </p>
              <p className={`text-sm font-bold mt-0.5 ${accentText[event.accent]}`}>{stat.value}</p>
            </div>
          ))}
        </div>
      )}
      <SourceLink source={event.source} />
    </>
  );
}

function TimelineCard({ event, index }: { event: TimelineEvent; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const isLeft = index % 2 === 0;

  return (
    <div ref={ref} className="relative flex items-start gap-4 sm:gap-8 mb-12 sm:mb-16">
      {/* Desktop layout */}
      <div className={`hidden md:flex w-full items-start ${isLeft ? "flex-row" : "flex-row-reverse"}`}>
        <motion.div
          initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className={`w-[calc(50%-2rem)] ${accentBg[event.accent]} ${accentBorder[event.accent]} border rounded-lg p-6 backdrop-blur-sm`}
        >
          <CardContent event={event} />
        </motion.div>
        <div className="flex flex-col items-center mx-4 flex-shrink-0">
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ duration: 0.4, delay: 0.2 }}
            className={`w-4 h-4 rounded-full ${accentDot[event.accent]} mt-6`}
            style={{ boxShadow: `0 0 12px ${accentColors[event.accent]}` }}
          />
        </div>
        <div className="w-[calc(50%-2rem)]" />
      </div>

      {/* Mobile layout */}
      <div className="flex md:hidden items-start gap-4 w-full">
        <div className="flex flex-col items-center flex-shrink-0">
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ duration: 0.4 }}
            className={`w-3 h-3 rounded-full ${accentDot[event.accent]} mt-6`}
            style={{ boxShadow: `0 0 10px ${accentColors[event.accent]}` }}
          />
          <div
            className="w-px flex-1 mt-2"
            style={{ background: `linear-gradient(to bottom, ${accentColors[event.accent]}, transparent)` }}
          />
        </div>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5 }}
          className={`flex-1 ${accentBg[event.accent]} ${accentBorder[event.accent]} border rounded-lg p-5 backdrop-blur-sm`}
        >
          <CardContent event={event} />
        </motion.div>
      </div>
    </div>
  );
}

/* ─── Growth Chart ─── */
function GrowthChart() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { t } = useTranslation();

  return (
    <section ref={ref} className="py-20 sm:py-32">
      <div className="container max-w-5xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <p className="font-mono text-xs tracking-[0.4em] uppercase mb-4" style={{ color: accentColors.gold }}>
            {t("chart.tagline")}
          </p>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold"
            style={{ fontFamily: "var(--font-display)", color: "oklch(0.95 0.02 80)" }}
          >
            {t("chart.title")}
          </h2>
          <p className="mt-4 max-w-2xl mx-auto" style={{ color: "oklch(0.65 0.02 260)" }}>
            {t("chart.subtitle")}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.3 }}
          className="rounded-xl border p-4 sm:p-6"
          style={{ background: "oklch(0.14 0.02 260)", borderColor: "oklch(0.25 0.03 260)" }}
        >
          <ResponsiveContainer width="100%" height={400}>
            <AreaChart data={translationGrowthData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="gradFull" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={accentColors.gold} stopOpacity={0.3} />
                  <stop offset="95%" stopColor={accentColors.gold} stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gradNT" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={accentColors.sapphire} stopOpacity={0.3} />
                  <stop offset="95%" stopColor={accentColors.sapphire} stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gradPortions" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={accentColors.emerald} stopOpacity={0.3} />
                  <stop offset="95%" stopColor={accentColors.emerald} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.25 0.02 260)" />
              <XAxis
                dataKey="year"
                stroke="oklch(0.4 0.02 260)"
                tick={{ fill: "oklch(0.55 0.02 260)", fontSize: 12, fontFamily: "var(--font-mono)" }}
              />
              <YAxis
                stroke="oklch(0.4 0.02 260)"
                tick={{ fill: "oklch(0.55 0.02 260)", fontSize: 12, fontFamily: "var(--font-mono)" }}
              />
              <Tooltip
                contentStyle={{
                  background: "oklch(0.18 0.025 260)",
                  border: "1px solid oklch(0.3 0.03 260)",
                  borderRadius: "8px",
                  fontFamily: "var(--font-mono)",
                  fontSize: "12px",
                  color: "oklch(0.85 0.02 80)",
                }}
              />
              <Area type="monotone" dataKey="portions" name={t("chart.portions")} stroke={accentColors.emerald} fill="url(#gradPortions)" strokeWidth={2} />
              <Area type="monotone" dataKey="nt" name={t("chart.newTestament")} stroke={accentColors.sapphire} fill="url(#gradNT)" strokeWidth={2} />
              <Area type="monotone" dataKey="fullBible" name={t("chart.fullBible")} stroke={accentColors.gold} fill="url(#gradFull)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>

          <div className="flex flex-wrap justify-center gap-6 mt-4">
            {[
              { label: t("chart.fullBible"), color: accentColors.gold },
              { label: t("chart.newTestament"), color: accentColors.sapphire },
              { label: t("chart.portions"), color: accentColors.emerald },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ background: item.color }} />
                <span className="text-xs font-mono" style={{ color: "oklch(0.65 0.02 260)" }}>
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Stats Banner ─── */
function StatsBanner() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { t } = useTranslation();

  const stats = [
    { value: "776", label: t("stats.fullBibles"), color: accentColors.gold },
    { value: "1,798", label: t("stats.newTestaments"), color: accentColors.sapphire },
    { value: "4,007", label: t("stats.withScripture"), color: accentColors.emerald },
    { value: "544", label: t("stats.stillWaiting"), color: accentColors.ruby },
  ];

  return (
    <section ref={ref} className="py-16 sm:py-24 border-y" style={{ borderColor: "oklch(0.2 0.02 260)" }}>
      <div className="container max-w-5xl mx-auto px-4">
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          className="text-center font-mono text-xs tracking-[0.4em] uppercase mb-10"
          style={{ color: accentColors.gold }}
        >
          {t("stats.asOf")}
        </motion.p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="text-center"
            >
              <p
                className="text-3xl sm:text-4xl md:text-5xl font-bold"
                style={{ fontFamily: "var(--font-display)", color: stat.color }}
              >
                {stat.value}
              </p>
              <p className="mt-2 text-xs sm:text-sm font-mono tracking-wider" style={{ color: "oklch(0.55 0.02 260)" }}>
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Footer ─── */
function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="py-16 border-t" style={{ borderColor: "oklch(0.2 0.02 260)" }}>
      <div className="container max-w-3xl mx-auto px-4 text-center">
        <p className="text-sm leading-relaxed" style={{ color: "oklch(0.5 0.02 260)" }}>
          {t("footer.sources")}{" "}
          <a href="https://progress.bible/" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline" style={{ color: accentColors.gold }}>
            ProgressBible
          </a>
          ,{" "}
          <a href="https://wycliffe.net/global-scripture-access/" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline" style={{ color: accentColors.gold }}>
            Wycliffe Global Alliance
          </a>
          ,{" "}
          <a href="https://illuminations.bible/" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline" style={{ color: accentColors.gold }}>
            IllumiNations
          </a>
          ,{" "}
          <a href="https://www.britannica.com/" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline" style={{ color: accentColors.gold }}>
            Encyclopaedia Britannica
          </a>
          . {t("footer.disclaimer")}
        </p>
        <div className="mt-6 h-px w-24 mx-auto" style={{ background: `linear-gradient(90deg, transparent, ${accentColors.gold}, transparent)` }} />
        <p className="mt-6 font-mono text-xs tracking-wider" style={{ color: "oklch(0.35 0.02 260)" }}>
          {t("footer.copyright")}
        </p>
        <div className="mt-8 pt-6 border-t" style={{ borderColor: "oklch(0.18 0.02 260)" }}>
          <p className="text-xs" style={{ color: "oklch(0.4 0.02 260)" }}>
            {t("footer.builtBy")}{" "}
            <a
              href="https://am2ar.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium hover:underline transition-colors duration-200"
              style={{ color: accentColors.gold }}
            >
              Alfredo Rabelo
            </a>
          </p>
          <p className="mt-2 font-mono text-[10px] tracking-wider" style={{ color: "oklch(0.32 0.02 260)" }}>
            <a href="https://am2ar.com" target="_blank" rel="noopener noreferrer" className="hover:underline">am2ar.com</a>
            {" · "}
            <a href="mailto:alfredo.rabelo@am2ar.com" className="hover:underline">alfredo.rabelo@am2ar.com</a>
            {" · "}
            <a href="tel:+13523284402" className="hover:underline">+1 (352) 328-4402</a>
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ─── Main Page ─── */
export default function Home() {
  const [activeEra, setActiveEra] = useState<Era>("ancient");
  const { t } = useTranslation();

  const eventsByEra = useMemo(() => {
    const grouped: Record<string, TimelineEvent[]> = {};
    for (const era of eras) {
      grouped[era.id] = timelineEvents.filter((e) => e.era === era.id);
    }
    return grouped;
  }, []);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    for (const era of eras) {
      const el = document.getElementById(`era-${era.id}`);
      if (!el) continue;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveEra(era.id);
        },
        { rootMargin: "-40% 0px -40% 0px" }
      );
      obs.observe(el);
      observers.push(obs);
    }
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <div className="min-h-screen" style={{ background: "oklch(0.12 0.02 260)" }}>
      <LanguageSwitcher />
      <HeroSection />
      <EraNavigator activeEra={activeEra} />
      <StatsBanner />

      {/* Timeline */}
      <div className="relative">
        <div
          className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2"
          style={{
            background: "linear-gradient(to bottom, transparent, oklch(0.82 0.12 80 / 0.2) 10%, oklch(0.82 0.12 80 / 0.2) 90%, transparent)",
          }}
        />
        {eras.map((era) => (
          <div key={era.id}>
            <EraHeader era={era} image={eraImages[era.id]} />
            <div className="container max-w-5xl mx-auto px-4 py-8">
              {eventsByEra[era.id]?.map((event, idx) => (
                <TimelineCard key={`${event.year}-${event.i18nKey}`} event={event} index={idx} />
              ))}
            </div>
          </div>
        ))}
      </div>

      <GrowthChart />
      <CountdownClock />
      <VerseExplorer />

      {/* Closing */}
      <section className="py-20 sm:py-32 relative overflow-hidden">
        <div className="absolute inset-0">
          <FallbackImg src={FUTURE_IMAGE} alt="" className="w-full h-full object-cover opacity-15" />
          <div className="absolute inset-0 bg-gradient-to-b from-[oklch(0.12_0.02_260)] via-[oklch(0.12_0.02_260/0.8)] to-[oklch(0.12_0.02_260)]" />
        </div>
        <div className="relative container max-w-3xl mx-auto px-4 text-center">
          <p className="font-mono text-xs tracking-[0.4em] uppercase mb-6" style={{ color: accentColors.gold }}>
            {t("closing.tagline")}
          </p>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight text-glow-gold"
            style={{ fontFamily: "var(--font-display)", color: "oklch(0.95 0.03 80)" }}
          >
            {t("closing.title")}
          </h2>
          <p
            className="mt-6 text-lg leading-relaxed"
            style={{ color: "oklch(0.72 0.02 260)" }}
            dangerouslySetInnerHTML={{ __html: t("closing.text") }}
          />
          <div className="mt-12 h-px w-24 mx-auto" style={{ background: `linear-gradient(90deg, transparent, ${accentColors.gold}, transparent)` }} />
          <blockquote className="mt-8">
            <p
              className="text-xl sm:text-2xl italic leading-relaxed"
              style={{ fontFamily: "var(--font-display)", color: "oklch(0.82 0.12 80)" }}
            >
              "{t("closing.verse")}"
            </p>
            <cite
              className="block mt-3 text-sm font-mono tracking-wider not-italic"
              style={{ color: "oklch(0.55 0.02 260)" }}
            >
              — {t("closing.verseRef")}
            </cite>
          </blockquote>
        </div>
      </section>

      <Footer />
    </div>
  );
}
