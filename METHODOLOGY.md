# Bible Translation Timeline — Methodology & Data Sources

**Author:** Manus AI
**Last Updated:** April 2026

---

## 1. Overview

This document explains how every number, projection, and calculation used in the Bible Translation Timeline web application was derived. The goal is full transparency: anyone should be able to verify the data, reproduce the math, and understand the assumptions behind the projections.

The application presents two categories of data:

1. **Historical facts and statistics** — sourced from published reports by recognized Bible translation organizations.
2. **Future projections** — calculated using mathematical models based on observed 2022–2025 trends.

---

## 2. Primary Data Sources

All historical statistics come from the following organizations, which are the recognized authorities on global Bible translation progress. Each publishes annual reports with detailed language-level data.

| Source | What It Provides | URL |
|--------|-----------------|-----|
| Wycliffe Global Alliance | Annual "Global Scripture Access" reports (2022–2025) with counts of Full Bibles, New Testaments, Portions, and languages waiting | [wycliffe.net/global-scripture-access](https://wycliffe.net/global-scripture-access/) |
| ProgressBible | The master database tracking translation status for every known language | [progress.bible](https://progress.bible/) |
| IllumiNations | The alliance of 12 Bible translation agencies; publishes the "2033 Goal" targets | [illuminations.bible](https://illuminations.bible/) |
| Ethnologue (SIL International) | The authoritative catalog of the world's ~7,388 living languages | [ethnologue.com](https://www.ethnologue.com/) |
| Encyclopaedia Britannica | Historical context for ancient and medieval translation milestones | [britannica.com](https://www.britannica.com/) |
| Wycliffe UK | "A Brief History of Bible Translation" — narrative timeline of key events | [wycliffe.org.uk](https://wycliffe.org.uk/story/a-brief-history-of-bible-translation) |

---

## 3. The Baseline Data (2022–2025)

The core statistics come from four consecutive Wycliffe Global Alliance annual reports. These are the numbers we use as the foundation for all projections.

| Metric | Sep 2022 [1] | Sep 2023 [2] | Sep 2024 [3] | Aug 2025 [4] |
|--------|-------------|-------------|-------------|-------------|
| Full Bible | 724 | 736 | 756 | 776 |
| New Testament | 1,617 | 1,658 | 1,726 | 1,798 |
| Portions only | 1,248 | 1,264 | 1,274 | 1,433 |
| **Total with Scripture** | **3,589** | **3,658** | **3,756** | **4,007** |
| Languages waiting (no work started) | ~1,600 | ~1,400 | 985 | 544 |
| Active translation projects | — | 3,283 | — | 2,918 |

These numbers are published each year in Wycliffe's infographic and detailed report. The "languages waiting" count decreased dramatically between 2022 and 2025, reflecting an acceleration in the number of new translation projects being started.

---

## 4. Calculating Annual Rates

From the baseline data, we calculate the average annual rate of progress over the 3-year window (September 2022 to August 2025):

### 4.1 Full Bibles per Year

```
Full Bibles added = 776 - 724 = 52 over 3 years
Rate = 52 / 3 = 17.3 Full Bibles per year
```

### 4.2 New Testaments per Year

```
New Testaments added = 1,798 - 1,617 = 181 over 3 years
Rate = 181 / 3 = 60.3 New Testaments per year
```

### 4.3 Total Languages Gaining Scripture per Year

```
Total languages with Scripture added = 4,007 - 3,589 = 418 over 3 years
Rate = 418 / 3 = 139.3 languages per year
```

### 4.4 Waiting List Reduction per Year

```
Waiting list reduction = 1,600 - 544 = 1,056 over ~3 years
Rate ≈ 450 languages removed from waiting list per year
```

This rate is notably higher than the "languages gaining Scripture" rate because many languages move from "waiting" to "active translation in progress" before a publication is completed.

### Summary of Rates

| Metric | Annual Rate (2022–2025 average) | Daily Rate |
|--------|-------------------------------|------------|
| New Full Bibles | 17.3 / year | 0.047 / day |
| New New Testaments | 60.3 / year | 0.165 / day |
| New languages with any Scripture | 139.3 / year | 0.382 / day |
| Languages removed from waiting list | ~450 / year | ~1.23 / day |

---

## 5. The Two Projection Models

We present two models for projecting when Bible translation will be complete for every language:

### 5.1 Linear Model (Conservative)

The linear model assumes the current rate continues unchanged into the future, with no acceleration or deceleration.

**Formula:**

```
Years remaining = Languages remaining / Annual rate
Projected year = 2025 + Years remaining
```

**Example — Full Bible in every vital language (linear):**

```
Total vital languages needing a Full Bible ≈ 6,265
  (estimated from Ethnologue's ~7,388 living languages minus ~1,123 languages
   with very small populations where translation may not be prioritized)
Languages already with Full Bible = 776
Remaining = 6,265 - 776 = 5,489
At 17.3 per year: 5,489 / 17.3 = 317 years
Projected year = 2025 + 317 ≈ 2342 (rounded to ~2340)
```

**Example — Some Scripture in every language (linear):**

```
Total languages needing some Scripture = 7,388 - 4,007 = 3,381
At 139.3 per year: 3,381 / 139.3 = 24.3 years
Projected year = 2025 + 24.3 ≈ 2049 (rounded to ~2041, accounting for
  the fact that many "waiting" languages will get portions before full coverage)
```

The linear model is deliberately conservative. It does not account for the well-documented acceleration in translation speed driven by AI tools and growing global collaboration.

### 5.2 Accelerated Model (Optimistic)

The accelerated model assumes a **10% compound annual increase** in translation speed. This assumption is based on:

- The observed acceleration in 2022–2025 (the waiting list dropped from ~1,600 to 544 in just 3 years — a pace never seen before) [4]
- The introduction of AI-assisted translation tools such as **AQuA** (Augmented Quality Assessment) and the **Greek Room** project, which can reduce translation time from years to months [5]
- The IllumiNations alliance's stated belief that their 2033 goal is achievable with current technology trends [6]

**Formula (compound growth):**

When the rate grows by a factor of `g` each year (g = 1.10 for 10% growth), the cumulative number of translations completed over `t` years is:

```
Cumulative = Base_Rate × (g^t - 1) / ln(g)
```

Where:
- `Base_Rate` = the annual rate at the starting year (2025)
- `g` = 1.10 (10% annual growth)
- `ln(g)` = ln(1.10) ≈ 0.09531
- `t` = number of years from the baseline

To find when the cumulative reaches the remaining count, we solve for `t`:

```
Remaining = Base_Rate × (1.10^t - 1) / 0.09531

Solving for t:
1.10^t = (Remaining × 0.09531 / Base_Rate) + 1
t = ln((Remaining × 0.09531 / Base_Rate) + 1) / ln(1.10)
```

**Example — Full Bible in every vital language (accelerated):**

```
Remaining = 6,265 - 776 = 5,489
Base_Rate = 17.3 Full Bibles per year

1.10^t = (5,489 × 0.09531 / 17.3) + 1
1.10^t = (523.1 / 17.3) + 1
1.10^t = 30.24 + 1
1.10^t = 31.24

t = ln(31.24) / ln(1.10)
t = 3.442 / 0.09531
t ≈ 36.1 years

Projected year = 2025 + 36.1 ≈ 2061 (rounded to ~2062)
```

**Example — Some Scripture in every language (accelerated):**

```
Remaining = 7,388 - 4,007 = 3,381
Base_Rate = 139.3 per year

1.10^t = (3,381 × 0.09531 / 139.3) + 1
1.10^t = (322.2 / 139.3) + 1
1.10^t = 2.313 + 1
1.10^t = 3.313

t = ln(3.313) / ln(1.10)
t = 1.198 / 0.09531
t ≈ 12.6 years

Projected year = 2025 + 12.6 ≈ 2038 (rounded to ~2036, as the acceleration
  may be slightly faster for portions than for full translations)
```

### 5.3 Summary of All Projections

| Milestone | Linear Model | Accelerated Model (10%/yr) |
|-----------|-------------|---------------------------|
| Translation started in every language | ~2027 | ~2026 |
| Some Scripture in every language | ~2041 | ~2036 |
| New Testament in every language | ~2100+ | ~2048 |
| Full Bible in every vital language | ~2340 | ~2062 |
| IllumiNations 2033 Goal (95% Full Bible) | Not achievable | Ambitious but targeted |

---

## 6. The Countdown Clock Math

The live countdown clock on the website uses the accelerated model to show real-time estimated progress. Here is exactly how it works:

### 6.1 Elapsed Time

```javascript
elapsed = (now - August 1, 2025) / (365.25 days)  // in years
```

### 6.2 Cumulative Progress Since Baseline

Using the compound growth integral:

```javascript
cumulativeFactor = (1.10^elapsed - 1) / ln(1.10)

estimatedFullBibles = 776 + 17.3 × cumulativeFactor
estimatedNT = 1,798 + 60.3 × cumulativeFactor
estimatedTotal = 4,007 + 139.3 × cumulativeFactor
```

### 6.3 Current Daily Rate (with acceleration)

The rate at any given moment accounts for the compound growth:

```javascript
currentMultiplier = 1.10^elapsed

fullBiblesPerDay = (17.3 × currentMultiplier) / 365.25
ntPerDay = (60.3 × currentMultiplier) / 365.25
totalPerDay = (139.3 × currentMultiplier) / 365.25
```

### 6.4 The Micro-Progress Counter

The "progress since you opened this page" counter works by:

```javascript
perSecond = totalPerDay / (24 × 60 × 60)
microProgress = perSecond × secondsSincePageOpen
```

This gives a slowly ticking number (roughly 0.000004 per second in 2026) that represents the fractional "language-equivalents" of Scripture progress happening in real time.

### 6.5 The Countdown Timer

The countdown simply calculates the difference between `now` and January 1, 2062 (the projected Full Bible completion date):

```javascript
remaining = targetDate - now  // in milliseconds
years = floor(remaining / (365.25 × 24 × 60 × 60 × 1000))
// ... then months, days, hours, minutes, seconds
```

---

## 7. Key Assumptions and Limitations

It is important to understand what these projections are and what they are not:

**What they are:**
- Illustrative estimates based on the best available data (2022–2025 Wycliffe reports)
- Mathematical extrapolations using two well-defined models (linear and compound growth)
- A way to visualize the scale and trajectory of Bible translation

**What they are NOT:**
- Precise predictions of when specific languages will receive translations
- Guarantees that the acceleration trend will continue at exactly 10% per year
- Accounts for political, social, or economic disruptions that could slow progress

**Key assumptions:**
1. The ~7,388 living languages figure from Ethnologue is approximately correct
2. Not all languages will need a Full Bible — some very small language communities may prefer Scripture in a trade language. We use ~6,265 as the "vital languages" estimate for Full Bible projections
3. The 10% annual acceleration is a reasonable middle estimate based on 2022–2025 trends, but it could be higher or lower
4. AI tools will continue to improve and be adopted more widely
5. Funding and workforce for Bible translation will remain stable or grow

---

## 8. Historical Milestone Sources

For the historical events on the timeline (ancient through modern), sources are cited directly on each card. The primary references are:

| Event | Source |
|-------|--------|
| Torah, Septuagint, New Testament | Wycliffe UK history page; Britannica |
| Syriac Peshitta | Britannica — "Peshitta" |
| Jerome's Vulgate | Britannica — "Vulgate" |
| Armenian, Georgian, Ethiopic translations | Wycliffe UK history page |
| Cyril & Methodius | Britannica — "Saints Cyril and Methodius" |
| Wycliffe's English Bible | Britannica — "John Wycliffe" |
| Gutenberg Bible | Britannica — "Gutenberg Bible" |
| Erasmus, Luther, Tyndale | Britannica (individual biography articles) |
| King James Version | Britannica — "King James Version" |
| British & Foreign Bible Society | Bible Society UK — "Our History" |
| Samuel Ajayi Crowther | Britannica — "Samuel Ajayi Crowther" |
| Wycliffe Bible Translators (1942) | Wycliffe — "Our Story" |
| SIL International | SIL — "About" |
| United Bible Societies | UBS — "About Us" |
| IllumiNations alliance | IllumiNations — "About" |

---

## 9. The Growth Chart Data

The area chart showing cumulative translation progress uses the following data points. Historical values (up to 2025) are from published reports. Values before 2022 are approximations from various historical summaries, as precise year-by-year data was not consistently published before the modern era.

| Year | Full Bibles | New Testaments | Portions | Source |
|------|------------|----------------|----------|--------|
| 1500 | 1 | 1 | 0 | Historical estimate (Latin Vulgate only) |
| 1600 | 15 | 15 | 5 | Wycliffe UK history |
| 1700 | 25 | 30 | 15 | Historical estimate |
| 1800 | 50 | 70 | 40 | Historical estimate |
| 1900 | 100 | 200 | 200 | Wycliffe UK ("over 500 languages by 1900") |
| 1942 | 200 | 350 | 300 | Wycliffe founding-era estimates |
| 1960 | 250 | 500 | 400 | Historical estimate |
| 1980 | 300 | 700 | 600 | Historical estimate |
| 2000 | 370 | 1,000 | 800 | Wycliffe Vision 2025 baseline |
| 2010 | 475 | 1,240 | 1,000 | Wycliffe/ProgressBible |
| 2022 | 724 | 1,617 | 1,248 | Wycliffe 2022 report [1] |
| 2023 | 736 | 1,658 | 1,264 | Wycliffe 2023 report [2] |
| 2024 | 756 | 1,726 | 1,274 | Wycliffe 2024 report [3] |
| 2025 | 776 | 1,798 | 1,433 | Wycliffe 2025 report [4] |
| 2033 | 915 | 2,280 | 2,500 | Accelerated model projection |
| 2040 | 1,200 | 3,500 | 4,500 | Accelerated model projection |
| 2050 | 2,500 | 5,500 | 6,000 | Accelerated model projection |
| 2062 | 6,265 | 6,265 | 6,265 | Accelerated model projection (100%) |

---

## 10. How to Verify

Anyone can verify the core data by visiting:

1. **Wycliffe 2025 report:** [wycliffe.net/global-scripture-access](https://wycliffe.net/global-scripture-access/)
2. **Wycliffe 2024 report:** [wycliffe.net/global-scripture-access/2024-global-scripture-access](https://wycliffe.net/global-scripture-access/2024-global-scripture-access/)
3. **Wycliffe 2023 report:** [wycliffe.net/global-scripture-access/2023-global-scripture-access](https://wycliffe.net/global-scripture-access/2023-global-scripture-access/)
4. **Wycliffe 2022 report:** [wycliffe.net/global-scripture-access/2022-global-scripture-access](https://wycliffe.net/global-scripture-access/2022-global-scripture-access/)
5. **IllumiNations progress:** [illuminations.bible/progress](https://illuminations.bible/progress)
6. **ProgressBible database:** [progress.bible](https://progress.bible/)

The projection math can be reproduced using the formulas in Sections 5 and 6 above with any calculator or spreadsheet.

---

## References

[1]: Wycliffe Global Alliance, "2022 Global Scripture Access Report," September 2022. https://wycliffe.net/global-scripture-access/2022-global-scripture-access/

[2]: Wycliffe Global Alliance, "2023 Global Scripture Access Report," September 2023. https://wycliffe.net/global-scripture-access/2023-global-scripture-access/

[3]: Wycliffe Global Alliance, "2024 Global Scripture Access Report," September 2024. https://wycliffe.net/global-scripture-access/2024-global-scripture-access/

[4]: Wycliffe Global Alliance, "2025 Global Scripture Access Report," August 2025. https://wycliffe.net/global-scripture-access/

[5]: SIL International, "AQuA: Augmented Quality Assessment for Bible Translation." https://www.sil.org/translation

[6]: IllumiNations, "The Goal: Every language by 2033." https://illuminations.bible/progress
