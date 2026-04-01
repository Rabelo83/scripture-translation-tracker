/*
 * CountdownClock — Live progress tracker & countdown timer
 * Design: "Luminous Thread" — Dark Cathedral Aesthetic
 *
 * Shows:
 * 1. A live countdown to the projected completion date (Full Bible in every language, ~2062)
 * 2. Estimated daily/real-time progress based on current translation rates
 * 3. Progress bars for Full Bible, New Testament, and Some Scripture
 *
 * Math basis:
 * - 2022-2025 Wycliffe data shows ~17.3 new Full Bibles, ~60.3 new NTs, ~139.3 new languages
 *   gaining Scripture per year.
 * - We assume a 10% annual acceleration (AI + collaboration) for the accelerated model.
 * - The "daily progress" counter interpolates from the Aug 2025 baseline forward.
 */

import { useState, useEffect, useRef, useMemo } from "react";
import { motion, useInView } from "framer-motion";
import { KNOWN_2025, TARGET_FULL_BIBLE, TARGET_SOME_SCRIPTURE, CURRENT_RATES } from "@/lib/timelineData";

const accentColors = {
  gold: "oklch(0.82 0.12 80)",
  sapphire: "oklch(0.5 0.15 250)",
  emerald: "oklch(0.6 0.15 155)",
  ruby: "oklch(0.55 0.2 15)",
  amber: "oklch(0.75 0.15 65)",
};

interface CountdownValues {
  years: number;
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function getCountdown(target: Date): CountdownValues {
  const now = new Date();
  let diff = target.getTime() - now.getTime();
  if (diff < 0) diff = 0;

  const seconds = Math.floor(diff / 1000) % 60;
  const minutes = Math.floor(diff / (1000 * 60)) % 60;
  const hours = Math.floor(diff / (1000 * 60 * 60)) % 24;
  const totalDays = Math.floor(diff / (1000 * 60 * 60 * 24));
  const years = Math.floor(totalDays / 365.25);
  const remainingDays = totalDays - Math.floor(years * 365.25);
  const months = Math.floor(remainingDays / 30.44);
  const days = Math.floor(remainingDays - months * 30.44);

  return { years, months, days, hours, minutes, seconds };
}

/**
 * Estimate current progress since the known 2025 baseline.
 * Uses the base rate + 10% annual acceleration compound.
 */
function getEstimatedProgress() {
  const now = new Date();
  const elapsed = (now.getTime() - KNOWN_2025.date.getTime()) / (1000 * 60 * 60 * 24 * 365.25); // years since baseline

  // Compound acceleration: rate * ((1.1^t - 1) / ln(1.1)) gives cumulative with 10% annual growth
  const ln1_1 = Math.log(1.1);
  const cumulativeFactor = elapsed > 0 ? (Math.pow(1.1, elapsed) - 1) / ln1_1 : 0;

  const estFullBibles = Math.floor(KNOWN_2025.fullBible + CURRENT_RATES.fullBiblesPerYear * cumulativeFactor);
  const estNT = Math.floor(KNOWN_2025.newTestament + CURRENT_RATES.newTestamentsPerYear * cumulativeFactor);
  const estTotal = Math.floor(KNOWN_2025.totalWithScripture + CURRENT_RATES.totalScripturePerYear * cumulativeFactor);
  const estWaiting = Math.max(0, Math.floor(KNOWN_2025.languagesWaiting - CURRENT_RATES.waitingListReductionPerYear * cumulativeFactor));

  // Daily micro-progress (how much is being done RIGHT NOW)
  const currentYearRate = Math.pow(1.1, elapsed); // acceleration multiplier
  const fullBiblesPerDay = (CURRENT_RATES.fullBiblesPerYear * currentYearRate) / 365.25;
  const ntPerDay = (CURRENT_RATES.newTestamentsPerYear * currentYearRate) / 365.25;
  const totalPerDay = (CURRENT_RATES.totalScripturePerYear * currentYearRate) / 365.25;

  return {
    estFullBibles: Math.min(estFullBibles, TARGET_FULL_BIBLE.totalLanguages),
    estNT: Math.min(estNT, KNOWN_2025.totalLanguagesNeeded),
    estTotal: Math.min(estTotal, KNOWN_2025.totalLanguagesNeeded),
    estWaiting,
    fullBiblesPerDay,
    ntPerDay,
    totalPerDay,
    pctFullBible: Math.min(100, (estFullBibles / TARGET_FULL_BIBLE.totalLanguages) * 100),
    pctNT: Math.min(100, (estNT / KNOWN_2025.totalLanguagesNeeded) * 100),
    pctTotal: Math.min(100, (estTotal / KNOWN_2025.totalLanguagesNeeded) * 100),
  };
}

function CountdownDigit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div
        className="relative w-16 h-20 sm:w-20 sm:h-24 rounded-lg flex items-center justify-center overflow-hidden"
        style={{
          background: "oklch(0.14 0.025 260)",
          border: "1px solid oklch(0.25 0.03 260)",
          boxShadow: `0 0 20px oklch(0.82 0.12 80 / 0.05), inset 0 1px 0 oklch(1 0 0 / 0.05)`,
        }}
      >
        <span
          className="text-3xl sm:text-4xl font-bold tabular-nums"
          style={{ fontFamily: "var(--font-mono)", color: accentColors.gold }}
        >
          {String(value).padStart(2, "0")}
        </span>
      </div>
      <span
        className="mt-2 text-[10px] sm:text-xs font-mono tracking-[0.2em] uppercase"
        style={{ color: "oklch(0.5 0.02 260)" }}
      >
        {label}
      </span>
    </div>
  );
}

function ProgressBar({
  label,
  current,
  total,
  pct,
  color,
  perDay,
}: {
  label: string;
  current: number;
  total: number;
  pct: number;
  color: string;
  perDay: number;
}) {
  return (
    <div className="mb-6">
      <div className="flex justify-between items-baseline mb-2">
        <span className="text-sm font-mono tracking-wider" style={{ color: "oklch(0.75 0.02 80)" }}>
          {label}
        </span>
        <span className="text-xs font-mono" style={{ color: "oklch(0.55 0.02 260)" }}>
          {current.toLocaleString()} / {total.toLocaleString()} languages
        </span>
      </div>
      <div
        className="w-full h-3 rounded-full overflow-hidden"
        style={{ background: "oklch(0.18 0.02 260)" }}
      >
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="h-full rounded-full"
          style={{
            background: `linear-gradient(90deg, ${color}, oklch(0.9 0.1 80))`,
            boxShadow: `0 0 10px ${color}`,
          }}
        />
      </div>
      <div className="flex justify-between mt-1.5">
        <span className="text-[10px] font-mono" style={{ color: "oklch(0.45 0.02 260)" }}>
          ~{perDay.toFixed(2)} new languages/day at current pace
        </span>
        <span className="text-[10px] font-mono font-bold" style={{ color }}>
          {pct.toFixed(1)}%
        </span>
      </div>
    </div>
  );
}

export default function CountdownClock() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [countdown, setCountdown] = useState<CountdownValues>(getCountdown(TARGET_FULL_BIBLE.date));
  const [progress, setProgress] = useState(getEstimatedProgress);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(getCountdown(TARGET_FULL_BIBLE.date));
      setProgress(getEstimatedProgress());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Animated "languages translated since you opened this page"
  const [openTime] = useState(() => Date.now());
  const [microProgress, setMicroProgress] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      const elapsedSec = (Date.now() - openTime) / 1000;
      // Total languages gaining Scripture per second (accelerated current rate)
      const perSec = progress.totalPerDay / (24 * 60 * 60);
      setMicroProgress(perSec * elapsedSec);
    }, 100);
    return () => clearInterval(interval);
  }, [progress.totalPerDay, openTime]);

  return (
    <section ref={ref} className="py-20 sm:py-32 relative overflow-hidden">
      {/* Subtle radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, oklch(0.82 0.12 80 / 0.03) 0%, transparent 70%)",
        }}
      />

      <div className="relative container max-w-5xl mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p
            className="font-mono text-xs tracking-[0.4em] uppercase mb-4"
            style={{ color: accentColors.gold }}
          >
            Live Progress Tracker
          </p>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold"
            style={{ fontFamily: "var(--font-display)", color: "oklch(0.95 0.02 80)" }}
          >
            Countdown to Every Language
          </h2>
          <p className="mt-4 max-w-2xl mx-auto" style={{ color: "oklch(0.65 0.02 260)" }}>
            Based on the 2022–2025 translation rhythm with projected 10% annual acceleration from AI and global collaboration.
          </p>
        </motion.div>

        {/* Countdown Timer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-16"
        >
          <p
            className="text-center text-sm font-mono tracking-wider mb-6"
            style={{ color: "oklch(0.6 0.02 260)" }}
          >
            Time remaining until Full Bible in every language (~2062)
          </p>
          <div className="flex justify-center gap-2 sm:gap-4 flex-wrap">
            <CountdownDigit value={countdown.years} label="Years" />
            <div className="flex items-center pb-6" style={{ color: accentColors.gold }}>
              <span className="text-2xl font-bold">:</span>
            </div>
            <CountdownDigit value={countdown.months} label="Months" />
            <div className="flex items-center pb-6" style={{ color: accentColors.gold }}>
              <span className="text-2xl font-bold">:</span>
            </div>
            <CountdownDigit value={countdown.days} label="Days" />
            <div className="flex items-center pb-6" style={{ color: accentColors.gold }}>
              <span className="text-2xl font-bold">:</span>
            </div>
            <CountdownDigit value={countdown.hours} label="Hours" />
            <div className="flex items-center pb-6" style={{ color: accentColors.gold }}>
              <span className="text-2xl font-bold">:</span>
            </div>
            <CountdownDigit value={countdown.minutes} label="Min" />
            <div className="flex items-center pb-6" style={{ color: accentColors.gold }}>
              <span className="text-2xl font-bold">:</span>
            </div>
            <CountdownDigit value={countdown.seconds} label="Sec" />
          </div>
        </motion.div>

        {/* Live micro-progress */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mb-16 rounded-xl border p-6 sm:p-8"
          style={{ background: "oklch(0.14 0.025 260)", borderColor: "oklch(0.25 0.03 260)" }}
        >
          <p className="text-xs font-mono tracking-widest uppercase mb-3" style={{ color: "oklch(0.5 0.02 260)" }}>
            Estimated progress since you opened this page
          </p>
          <p className="text-4xl sm:text-5xl md:text-6xl font-bold tabular-nums" style={{ fontFamily: "var(--font-display)", color: accentColors.gold }}>
            {microProgress.toFixed(6)}
          </p>
          <p className="mt-2 text-sm" style={{ color: "oklch(0.6 0.02 260)" }}>
            language-equivalents of Scripture progress
          </p>
          <div className="mt-4 h-px w-32 mx-auto" style={{ background: `linear-gradient(90deg, transparent, ${accentColors.gold}, transparent)` }} />
          <p className="mt-4 text-xs leading-relaxed max-w-lg mx-auto" style={{ color: "oklch(0.45 0.02 260)" }}>
            This counter estimates real-time progress based on the average rate of ~{progress.totalPerDay.toFixed(1)} new languages gaining Scripture per day (with 10% annual acceleration).
            The actual work happens in bursts — translation teams complete projects over months and years — but this gives a sense of the ongoing momentum.
          </p>
        </motion.div>

        {/* Progress Bars */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="rounded-xl border p-6 sm:p-8"
          style={{ background: "oklch(0.14 0.025 260)", borderColor: "oklch(0.25 0.03 260)" }}
        >
          <p className="text-xs font-mono tracking-widest uppercase mb-8" style={{ color: "oklch(0.5 0.02 260)" }}>
            Estimated Current Translation Progress
          </p>

          <ProgressBar
            label="Full Bible"
            current={progress.estFullBibles}
            total={TARGET_FULL_BIBLE.totalLanguages}
            pct={progress.pctFullBible}
            color={accentColors.gold}
            perDay={progress.fullBiblesPerDay}
          />
          <ProgressBar
            label="New Testament"
            current={progress.estNT}
            total={KNOWN_2025.totalLanguagesNeeded}
            pct={progress.pctNT}
            color={accentColors.sapphire}
            perDay={progress.ntPerDay}
          />
          <ProgressBar
            label="Some Scripture"
            current={progress.estTotal}
            total={KNOWN_2025.totalLanguagesNeeded}
            pct={progress.pctTotal}
            color={accentColors.emerald}
            perDay={progress.totalPerDay}
          />

          {/* Waiting list */}
          <div className="mt-6 pt-6 border-t" style={{ borderColor: "oklch(0.22 0.02 260)" }}>
            <div className="flex justify-between items-center">
              <span className="text-sm font-mono tracking-wider" style={{ color: "oklch(0.75 0.02 80)" }}>
                Languages still waiting
              </span>
              <span
                className="text-2xl font-bold tabular-nums"
                style={{ fontFamily: "var(--font-display)", color: accentColors.ruby }}
              >
                ~{progress.estWaiting.toLocaleString()}
              </span>
            </div>
            <p className="mt-1 text-[10px] font-mono" style={{ color: "oklch(0.45 0.02 260)" }}>
              Decreasing by ~{(CURRENT_RATES.waitingListReductionPerYear / 365.25).toFixed(1)} languages/day
            </p>
          </div>
        </motion.div>

        {/* Methodology note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-8 text-center text-xs leading-relaxed max-w-2xl mx-auto"
          style={{ color: "oklch(0.4 0.02 260)" }}
        >
          Methodology: Baseline data from{" "}
          <a href="https://wycliffe.net/global-scripture-access/" target="_blank" rel="noopener noreferrer" className="underline" style={{ color: "oklch(0.55 0.12 80)" }}>
            Wycliffe Global Alliance reports (2022–2025)
          </a>
          . Annual rates: ~17.3 Full Bibles, ~60.3 New Testaments, ~139.3 total languages gaining Scripture.
          Acceleration model assumes 10% compound annual growth driven by AI tools (AQuA, Greek Room) and expanded global collaboration.
          These are illustrative estimates, not precise predictions.
        </motion.p>
      </div>
    </section>
  );
}
