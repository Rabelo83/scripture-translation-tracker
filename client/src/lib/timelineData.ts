export interface TimelineEvent {
  year: number;
  yearLabel: string;
  title: string;
  description: string;
  era: Era;
  type: "milestone" | "statistic" | "projection";
  accent: "gold" | "ruby" | "sapphire" | "emerald" | "amber";
  stats?: { label: string; value: string }[];
  source?: { label: string; url: string };
  i18nKey: string; // key into translations events.*
  statI18nKeys?: string[]; // keys into translations statLabels.*
}

export type Era =
  | "ancient"
  | "early-church"
  | "medieval"
  | "reformation"
  | "missions"
  | "modern"
  | "acceleration"
  | "future";

export interface EraInfo {
  id: Era;
  title: string;
  subtitle: string;
  yearRange: string;
  color: string;
}

export const eras: EraInfo[] = [
  { id: "ancient", title: "The Ancient Texts", subtitle: "The original Scriptures are written and first translated", yearRange: "1400 BC \u2013 100 AD", color: "var(--color-amber)" },
  { id: "early-church", title: "The Early Church", subtitle: "Scripture spreads across the Roman world and beyond", yearRange: "100 \u2013 500 AD", color: "var(--color-ruby)" },
  { id: "medieval", title: "The Medieval Era", subtitle: "Translations preserved through centuries of upheaval", yearRange: "500 \u2013 1450 AD", color: "var(--color-sapphire)" },
  { id: "reformation", title: "Reformation & Print", subtitle: "The printing press ignites a translation revolution", yearRange: "1450 \u2013 1800", color: "var(--color-emerald)" },
  { id: "missions", title: "The Missionary Age", subtitle: "Global missions carry the Bible to every continent", yearRange: "1800 \u2013 1942", color: "var(--color-gold)" },
  { id: "modern", title: "The Modern Movement", subtitle: "Systematic translation efforts transform the landscape", yearRange: "1942 \u2013 2000", color: "var(--color-ruby)" },
  { id: "acceleration", title: "The Great Acceleration", subtitle: "Technology and collaboration drive exponential growth", yearRange: "2000 \u2013 2026", color: "var(--color-sapphire)" },
  { id: "future", title: "The Projected Future", subtitle: "When will every language have Scripture?", yearRange: "2026 \u2013 2062+", color: "var(--color-gold)" },
];

export const timelineEvents: TimelineEvent[] = [
  // ANCIENT
  { year: -1400, yearLabel: "c. 1400 BC", title: "The Torah is Written", description: "The earliest books of the Hebrew Bible begin to be composed. These texts, written in Hebrew, form the foundation of all Scripture that will follow.", era: "ancient", type: "milestone", accent: "amber", i18nKey: "torah", source: { label: "Wycliffe UK \u2014 A Brief History of Bible Translation", url: "https://wycliffe.org.uk/story/a-brief-history-of-bible-translation" } },
  { year: -250, yearLabel: "c. 250 BC", title: "The Septuagint", description: "Jewish scholars in Alexandria translate the Hebrew Old Testament into Greek, creating the Septuagint.", era: "ancient", type: "milestone", accent: "gold", i18nKey: "septuagint", stats: [{ label: "Languages with Scripture", value: "2" }], statI18nKeys: ["languagesWithScripture"], source: { label: "Britannica \u2014 Septuagint", url: "https://www.britannica.com/topic/Septuagint" } },
  { year: 50, yearLabel: "c. 50\u2013100 AD", title: "The New Testament is Written", description: "The Gospels, letters of Paul, and other New Testament books are composed in Koine Greek.", era: "ancient", type: "milestone", accent: "gold", i18nKey: "nt-written", source: { label: "Wycliffe UK \u2014 A Brief History of Bible Translation", url: "https://wycliffe.org.uk/story/a-brief-history-of-bible-translation" } },

  // EARLY CHURCH
  { year: 170, yearLabel: "c. 170 AD", title: "The Syriac Peshitta", description: "The first translation of Scripture in the Christian era is completed in Syriac.", era: "early-church", type: "milestone", accent: "ruby", i18nKey: "peshitta", source: { label: "Britannica \u2014 Peshitta", url: "https://www.britannica.com/topic/Peshitta" } },
  { year: 200, yearLabel: "c. 200 AD", title: "Latin & Coptic Translations", description: "Early Latin translations (Vetus Latina) appear in North Africa and Europe.", era: "early-church", type: "milestone", accent: "ruby", i18nKey: "latin-coptic", source: { label: "Wycliffe UK \u2014 A Brief History of Bible Translation", url: "https://wycliffe.org.uk/story/a-brief-history-of-bible-translation" } },
  { year: 382, yearLabel: "382\u2013405 AD", title: "Jerome's Vulgate", description: "Commissioned by Pope Damasus, Jerome produces a fresh Latin translation.", era: "early-church", type: "milestone", accent: "gold", i18nKey: "vulgate", stats: [{ label: "Major languages with Scripture", value: "~7" }], statI18nKeys: ["majorLanguagesWithScripture"], source: { label: "Britannica \u2014 Vulgate", url: "https://www.britannica.com/topic/Vulgate" } },
  { year: 400, yearLabel: "c. 350\u2013450 AD", title: "Armenian, Georgian & Ethiopic", description: "Translations appear in Armenian, Georgian, and Ge'ez.", era: "early-church", type: "milestone", accent: "emerald", i18nKey: "armenian", source: { label: "Wycliffe UK \u2014 A Brief History of Bible Translation", url: "https://wycliffe.org.uk/story/a-brief-history-of-bible-translation" } },

  // MEDIEVAL
  { year: 863, yearLabel: "c. 863 AD", title: "Cyril & Methodius", description: "The missionary brothers translate Scripture into Old Church Slavonic.", era: "medieval", type: "milestone", accent: "sapphire", i18nKey: "cyril", source: { label: "Britannica \u2014 Saints Cyril and Methodius", url: "https://www.britannica.com/biography/Saints-Cyril-and-Methodius" } },
  { year: 1000, yearLabel: "c. 735\u20131000 AD", title: "Anglo-Saxon Translations", description: "The Venerable Bede translates the Gospel of John into Old English.", era: "medieval", type: "milestone", accent: "sapphire", i18nKey: "anglo-saxon", source: { label: "Wycliffe UK \u2014 A Brief History of Bible Translation", url: "https://wycliffe.org.uk/story/a-brief-history-of-bible-translation" } },
  { year: 1382, yearLabel: "1382\u20131384", title: "Wycliffe's English Bible", description: "John Wycliffe produces the first complete Bible in English.", era: "medieval", type: "milestone", accent: "gold", i18nKey: "wycliffe-bible", stats: [{ label: "Languages with some Scripture", value: "~33" }], statI18nKeys: ["languagesWithSomeScripture"], source: { label: "Britannica \u2014 John Wycliffe", url: "https://www.britannica.com/biography/John-Wycliffe" } },

  // REFORMATION & PRINT
  { year: 1455, yearLabel: "c. 1455", title: "The Gutenberg Bible", description: "Gutenberg's printing press produces the first major printed book.", era: "reformation", type: "milestone", accent: "emerald", i18nKey: "gutenberg", source: { label: "Britannica \u2014 Gutenberg Bible", url: "https://www.britannica.com/topic/Gutenberg-Bible" } },
  { year: 1516, yearLabel: "1516", title: "Erasmus's Greek New Testament", description: "Erasmus publishes the first printed edition of the Greek New Testament.", era: "reformation", type: "milestone", accent: "emerald", i18nKey: "erasmus", source: { label: "Britannica \u2014 Erasmus", url: "https://www.britannica.com/biography/Erasmus-Dutch-humanist" } },
  { year: 1522, yearLabel: "1522", title: "Luther's German New Testament", description: "Martin Luther translates the New Testament into German.", era: "reformation", type: "milestone", accent: "emerald", i18nKey: "luther", source: { label: "Britannica \u2014 Martin Luther", url: "https://www.britannica.com/biography/Martin-Luther" } },
  { year: 1526, yearLabel: "1526", title: "Tyndale's English New Testament", description: "William Tyndale produces the first printed English New Testament.", era: "reformation", type: "milestone", accent: "gold", i18nKey: "tyndale", source: { label: "Britannica \u2014 William Tyndale", url: "https://www.britannica.com/biography/William-Tyndale" } },
  { year: 1600, yearLabel: "c. 1600", title: "15 European Languages", description: "The entire Bible has been printed in 15 European languages.", era: "reformation", type: "statistic", accent: "emerald", i18nKey: "15-languages", stats: [{ label: "Languages with Full Bible", value: "15" }], statI18nKeys: ["languagesWithFullBible"], source: { label: "Wycliffe UK \u2014 A Brief History of Bible Translation", url: "https://wycliffe.org.uk/story/a-brief-history-of-bible-translation" } },
  { year: 1611, yearLabel: "1611", title: "The King James Version", description: "47 scholars produce the Authorized Version.", era: "reformation", type: "milestone", accent: "gold", i18nKey: "kjv", source: { label: "Britannica \u2014 King James Version", url: "https://www.britannica.com/topic/King-James-Version" } },

  // MISSIONARY AGE
  { year: 1804, yearLabel: "1804", title: "British & Foreign Bible Society", description: "The founding of the BFBS marks the beginning of organized global Bible distribution.", era: "missions", type: "milestone", accent: "gold", i18nKey: "bfbs", source: { label: "British & Foreign Bible Society \u2014 Our History", url: "https://www.biblesociety.org.uk/about-us/our-history/" } },
  { year: 1815, yearLabel: "1815\u20131914", title: "The Great Century of Missions", description: "Missionary movements carry the Bible to Africa, Asia, and the Pacific.", era: "missions", type: "statistic", accent: "amber", i18nKey: "great-century", stats: [{ label: "Languages with some Scripture by 1900", value: "~500" }], statI18nKeys: ["languagesWithScriptureBy1900"], source: { label: "Wycliffe UK \u2014 A Brief History of Bible Translation", url: "https://wycliffe.org.uk/story/a-brief-history-of-bible-translation" } },
  { year: 1858, yearLabel: "1858", title: "Crowther's Yoruba Bible", description: "Samuel Ajayi Crowther completes the Yoruba Bible.", era: "missions", type: "milestone", accent: "gold", i18nKey: "crowther", source: { label: "Britannica \u2014 Samuel Ajayi Crowther", url: "https://www.britannica.com/biography/Samuel-Ajayi-Crowther" } },

  // MODERN MOVEMENT
  { year: 1942, yearLabel: "1942", title: "Wycliffe Bible Translators Founded", description: "William Cameron Townsend founds Wycliffe Bible Translators.", era: "modern", type: "milestone", accent: "ruby", i18nKey: "wycliffe-founded", stats: [{ label: "Languages with Full Bible", value: "~200" }], statI18nKeys: ["languagesWithFullBible"], source: { label: "Wycliffe \u2014 Our Story", url: "https://www.wycliffe.org/about" } },
  { year: 1951, yearLabel: "1951", title: "SIL International Established", description: "SIL is formally established as the academic partner of Wycliffe.", era: "modern", type: "milestone", accent: "ruby", i18nKey: "sil", source: { label: "SIL International \u2014 About", url: "https://www.sil.org/about" } },
  { year: 1966, yearLabel: "1966", title: "United Bible Societies Alliance", description: "The UBS formalizes a global network of Bible Societies.", era: "modern", type: "milestone", accent: "ruby", i18nKey: "ubs", source: { label: "United Bible Societies \u2014 About", url: "https://www.unitedbiblesocieties.org/about-us/" } },
  { year: 1999, yearLabel: "1999", title: "Vision 2025 Adopted", description: "Wycliffe and SIL adopt Vision 2025.", era: "modern", type: "milestone", accent: "gold", i18nKey: "vision2025", stats: [{ label: "Languages needing translation to start", value: "5,000+" }, { label: "Languages with Full Bible", value: "~370" }], statI18nKeys: ["languagesNeedingTranslation", "languagesWithFullBible"], source: { label: "Wycliffe \u2014 Vision 2025", url: "https://www.wycliffe.net/vision-2025/" } },

  // GREAT ACCELERATION
  { year: 2000, yearLabel: "2000", title: "The Digital Revolution Begins", description: "Digital tools begin transforming Bible translation.", era: "acceleration", type: "milestone", accent: "sapphire", i18nKey: "digital", source: { label: "SIL International \u2014 Translation Technology", url: "https://www.sil.org/translation" } },
  { year: 2010, yearLabel: "2010", title: "IllumiNations Alliance Formed", description: "The world's largest Bible translation agencies form the IllumiNations alliance.", era: "acceleration", type: "milestone", accent: "sapphire", i18nKey: "illuminations", source: { label: "IllumiNations \u2014 About", url: "https://illuminations.bible/about" } },
  { year: 2020, yearLabel: "2020", title: "2,000 Languages Still Waiting", description: "Over 2,000 languages still have no Bible translation work underway.", era: "acceleration", type: "statistic", accent: "sapphire", i18nKey: "2020-waiting", stats: [{ label: "Languages needing translation to start", value: "2,000+" }, { label: "Languages with Full Bible", value: "704" }], statI18nKeys: ["languagesNeedingTranslation", "languagesWithFullBible"], source: { label: "Wycliffe Global Alliance \u2014 2020 Scripture Access Report", url: "https://wycliffe.net/global-scripture-access/" } },
  { year: 2022, yearLabel: "September 2022", title: "Record-Breaking Progress", description: "A record-breaking year for Bible translation.", era: "acceleration", type: "statistic", accent: "sapphire", i18nKey: "2022-record", stats: [{ label: "Full Bible", value: "724 languages" }, { label: "New Testament", value: "1,617 languages" }, { label: "Portions", value: "1,248 languages" }, { label: "Total with Scripture", value: "3,589 languages" }], statI18nKeys: ["fullBible", "newTestament", "portions", "totalWithScripture"], source: { label: "Wycliffe \u2014 2022 Global Scripture Access Report", url: "https://wycliffe.net/global-scripture-access/2022-global-scripture-access/" } },
  { year: 2023, yearLabel: "September 2023", title: "97% of People Reached", description: "Up to 97% of the world's population now has access to at least some Scripture.", era: "acceleration", type: "statistic", accent: "sapphire", i18nKey: "2023-97pct", stats: [{ label: "Full Bible", value: "736 languages" }, { label: "New Testament", value: "1,658 languages" }, { label: "Portions", value: "1,264 languages" }, { label: "Total with Scripture", value: "3,658 languages" }], statI18nKeys: ["fullBible", "newTestament", "portions", "totalWithScripture"], source: { label: "Wycliffe \u2014 2023 Global Scripture Access Report", url: "https://wycliffe.net/global-scripture-access/2023-global-scripture-access/" } },
  { year: 2024, yearLabel: "September 2024", title: "Under 1,000 Languages Waiting", description: "Fewer than 1,000 languages remain on the waiting list.", era: "acceleration", type: "statistic", accent: "gold", i18nKey: "2024-under1000", stats: [{ label: "Full Bible", value: "756 languages" }, { label: "New Testament", value: "1,726 languages" }, { label: "Languages waiting to start", value: "985" }], statI18nKeys: ["fullBible", "newTestament", "languagesWaitingToStart"], source: { label: "Wycliffe \u2014 2024 Global Scripture Access Report", url: "https://wycliffe.net/global-scripture-access/2024-global-scripture-access/" } },
  { year: 2025, yearLabel: "August 2025", title: "99% of People Reached", description: "Over 99% of the world's population has access to at least some Scripture.", era: "acceleration", type: "statistic", accent: "gold", i18nKey: "2025-99pct", stats: [{ label: "Full Bible", value: "776 languages" }, { label: "New Testament", value: "1,798 languages" }, { label: "Total with Scripture", value: "4,007 languages" }, { label: "Languages waiting to start", value: "544" }], statI18nKeys: ["fullBible", "newTestament", "totalWithScripture", "languagesWaitingToStart"], source: { label: "Wycliffe \u2014 2025 Global Scripture Access Report", url: "https://wycliffe.net/global-scripture-access/" } },

  // FUTURE PROJECTIONS
  { year: 2027, yearLabel: "~2027", title: "Translation Started in Every Language", description: "Bible translation work will have been started in every known living language.", era: "future", type: "projection", accent: "gold", i18nKey: "proj-2027", stats: [{ label: "Projection basis", value: "Linear trend 2022\u20132025" }], statI18nKeys: ["projectionBasis"], source: { label: "Projection based on Wycliffe 2022\u20132025 data", url: "https://wycliffe.net/global-scripture-access/" } },
  { year: 2033, yearLabel: "2033", title: "IllumiNations 2033 Goal", description: "The IllumiNations alliance targets 2033.", era: "future", type: "projection", accent: "gold", i18nKey: "proj-2033", stats: [{ label: "Some Scripture", value: "100% of languages" }, { label: "New Testament", value: "99.9% of languages" }, { label: "Full Bible", value: "95% of languages" }], statI18nKeys: ["someScripture", "newTestament", "fullBible"], source: { label: "IllumiNations \u2014 The Goal", url: "https://illuminations.bible/progress" } },
  { year: 2036, yearLabel: "~2036", title: "Some Scripture in Every Language", description: "Every vital language could have at least some Scripture portions.", era: "future", type: "projection", accent: "amber", i18nKey: "proj-2036", stats: [{ label: "Projection basis", value: "Accelerated model (10% annual growth)" }], statI18nKeys: ["projectionBasis"], source: { label: "Projection based on Wycliffe 2022\u20132025 data", url: "https://wycliffe.net/global-scripture-access/" } },
  { year: 2041, yearLabel: "~2041", title: "Some Scripture (Linear Projection)", description: "Every vital language would have at least some Scripture by approximately 2041.", era: "future", type: "projection", accent: "sapphire", i18nKey: "proj-2041", stats: [{ label: "Projection basis", value: "Linear trend (no acceleration)" }], statI18nKeys: ["projectionBasis"], source: { label: "Projection based on Wycliffe 2022\u20132025 data", url: "https://wycliffe.net/global-scripture-access/" } },
  { year: 2048, yearLabel: "~2048", title: "New Testament in Every Language (Accelerated)", description: "Every vital language could have a complete New Testament by the late 2040s.", era: "future", type: "projection", accent: "amber", i18nKey: "proj-2048", stats: [{ label: "Projection basis", value: "Accelerated model (10% annual growth)" }], statI18nKeys: ["projectionBasis"], source: { label: "Projection based on Wycliffe 2022\u20132025 data", url: "https://wycliffe.net/global-scripture-access/" } },
  { year: 2062, yearLabel: "~2062", title: "Full Bible in Every Language (Accelerated)", description: "Every vital language could have a complete Bible by the early 2060s.", era: "future", type: "projection", accent: "gold", i18nKey: "proj-2062", stats: [{ label: "Accelerated projection", value: "~2062" }, { label: "Linear projection", value: "~2340" }], statI18nKeys: ["acceleratedProjection", "linearProjection"], source: { label: "Projection based on Wycliffe 2022\u20132025 data", url: "https://wycliffe.net/global-scripture-access/" } },
];

// Chart data for the growth visualization
export const translationGrowthData = [
  { year: 1500, fullBible: 1, nt: 1, portions: 0 },
  { year: 1600, fullBible: 15, nt: 15, portions: 5 },
  { year: 1700, fullBible: 25, nt: 30, portions: 15 },
  { year: 1800, fullBible: 50, nt: 70, portions: 40 },
  { year: 1900, fullBible: 100, nt: 200, portions: 200 },
  { year: 1942, fullBible: 200, nt: 350, portions: 300 },
  { year: 1960, fullBible: 250, nt: 500, portions: 400 },
  { year: 1980, fullBible: 300, nt: 700, portions: 600 },
  { year: 2000, fullBible: 370, nt: 1000, portions: 800 },
  { year: 2010, fullBible: 475, nt: 1240, portions: 1000 },
  { year: 2022, fullBible: 724, nt: 1617, portions: 1248 },
  { year: 2023, fullBible: 736, nt: 1658, portions: 1264 },
  { year: 2024, fullBible: 756, nt: 1726, portions: 1274 },
  { year: 2025, fullBible: 776, nt: 1798, portions: 1433 },
  // Projections
  { year: 2033, fullBible: 915, nt: 2280, portions: 2500 },
  { year: 2040, fullBible: 1200, nt: 3500, portions: 4500 },
  { year: 2050, fullBible: 2500, nt: 5500, portions: 6000 },
  { year: 2062, fullBible: 6265, nt: 6265, portions: 6265 },
];

// ─── Countdown / Progress Constants ───
export const KNOWN_2025 = {
  date: new Date("2025-08-01"),
  fullBible: 776,
  newTestament: 1798,
  totalWithScripture: 4007,
  languagesWaiting: 544,
  totalLanguagesNeeded: 7388,
};

export const TARGET_FULL_BIBLE = {
  date: new Date("2062-01-01"),
  totalLanguages: 6265,
};

export const TARGET_SOME_SCRIPTURE = {
  date: new Date("2036-01-01"),
  totalLanguages: 7388,
};

export const TARGET_ILLUMINATIONS = {
  date: new Date("2033-12-31"),
};

export const CURRENT_RATES = {
  fullBiblesPerYear: 17.3,
  newTestamentsPerYear: 60.3,
  totalScripturePerYear: 139.3,
  waitingListReductionPerYear: 450,
};
