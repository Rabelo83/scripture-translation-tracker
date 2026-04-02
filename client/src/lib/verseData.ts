/**
 * Psalm 27:13 — Verse data for the interactive language explorer.
 *
 * All translations used here are in the public domain.
 * Structure is designed to scale to 200+ languages.
 * Pronunciation guides are targeted at English speakers first;
 * additional pronunciation_es / pronunciation_pt fields can be added per entry.
 */

export interface VerseLanguage {
  code: string;
  name: string;
  nativeName: string;
  script: "latin" | "hebrew" | "greek" | "arabic" | "cjk" | "cyrillic" | "devanagari" | "other";
  direction: "ltr" | "rtl";
  version: string;
  versionYear?: number;
  text: string;
  transliteration?: string;
  pronunciation_en?: string;
  audio?: string;
  // pronunciation_es?: string;
  // pronunciation_pt?: string;
}

export const VERSE_REF = "Psalm 27:13";

export const verseLanguages: VerseLanguage[] = [
  // ── THE ORIGINALS ──────────────────────────────────────────────
  {
    code: "he",
    name: "Hebrew",
    nativeName: "עברית",
    script: "hebrew",
    direction: "rtl",
    version: "Westminster Leningrad Codex",
    text: "לוּלֵא הֶאֱמַנְתִּי לִרְאוֹת בְּטוּב יְהוָה בְּאֶרֶץ חַיִּים׃",
    transliteration: "lūlē' he'ĕmantī lir'ōt bəṭūv YHWH bə'ereṣ ḥayyīm",
    pronunciation_en: "loo-LEH heh-eh-MAHN-tee leer-OHT beh-TOOV Adonai beh-EH-rets khah-YEEM",
  },
  {
    code: "el",
    name: "Greek",
    nativeName: "Ελληνικά",
    script: "greek",
    direction: "ltr",
    version: "Septuagint (Brenton)",
    text: "Πιστεύω τοῦ ἰδεῖν τὰ ἀγαθὰ Κυρίου ἐν γῇ ζώντων.",
    transliteration: "Pisteúō toû ideîn tà agathà Kyríou en gē zṓntōn.",
    pronunciation_en: "pee-STEH-voh too ee-DHEEN tah ah-gah-THAH kee-REE-oo en yee ZOHN-tohn",
  },
  {
    code: "la",
    name: "Latin",
    nativeName: "Latina",
    script: "latin",
    direction: "ltr",
    version: "Vulgate (Jerome)",
    versionYear: 405,
    text: "Credo videre bona Domini in terra viventium.",
    pronunciation_en: "KREH-doh vee-DEH-reh BOH-nah DOH-mee-nee in TEH-rah vee-VEN-tee-oom",
  },

  // ── PRIMARY AUDIENCE ───────────────────────────────────────────
  {
    code: "en",
    name: "English",
    nativeName: "English",
    script: "latin",
    direction: "ltr",
    version: "King James Version",
    versionYear: 1611,
    text: "I had fainted, unless I had believed to see the goodness of the LORD in the land of the living.",
  },
  {
    code: "es",
    name: "Spanish",
    nativeName: "Español",
    script: "latin",
    direction: "ltr",
    version: "Reina-Valera",
    versionYear: 1909,
    text: "Hubiera yo desmayado, si no creyese que tengo de ver la bondad de Jehová en la tierra de los vivientes.",
  },
  {
    code: "pt",
    name: "Portuguese",
    nativeName: "Português",
    script: "latin",
    direction: "ltr",
    version: "Almeida Revista e Corrigida",
    versionYear: 1969,
    text: "Bem sei que verei a bondade do Senhor na terra dos viventes.",
  },

  // ── REFORMATION & WORLD LANGUAGES ─────────────────────────────
  {
    code: "de",
    name: "German",
    nativeName: "Deutsch",
    script: "latin",
    direction: "ltr",
    version: "Luther Bible",
    versionYear: 1912,
    text: "Ich glaube aber doch, daß ich sehen werde die Güte des HERRN im Lande der Lebendigen.",
    pronunciation_en: "ikh GLOW-beh AH-ber dokh dahs ikh ZEH-en VEHR-deh dee GOO-teh des HEHRN im LAHN-deh dehr leh-BEN-dee-gen",
  },
  {
    code: "fr",
    name: "French",
    nativeName: "Français",
    script: "latin",
    direction: "ltr",
    version: "Louis Segond",
    versionYear: 1910,
    text: "Oh! si je n'étais pas sûr de voir la bonté de l'Éternel sur la terre des vivants!...",
    pronunciation_en: "oh see zhuh neh-TEH pah SOOR deh VWAHR lah bohn-TAY deh leh-tehr-NEL soor lah TEHR deh vee-VAHN",
  },
  {
    code: "ar",
    name: "Arabic",
    nativeName: "العربية",
    script: "arabic",
    direction: "rtl",
    version: "Van Dyck Arabic Bible",
    versionYear: 1865,
    text: "لَوْلَا أَنِّي آمَنْتُ أَنْ أَرَى جُودَ الرَّبِّ فِي أَرْضِ الْأَحْيَاءِ.",
    transliteration: "lawlā annī āmantu an arā jūda ar-Rabbi fī arḍi al-aḥyā'",
    pronunciation_en: "LAW-lah AHN-nee AH-man-too an ah-RAH JOO-dah ar-RAH-bee fee AR-dee al-ah-YAH",
  },
  {
    code: "zh",
    name: "Mandarin Chinese",
    nativeName: "中文",
    script: "cjk",
    direction: "ltr",
    version: "Chinese Union Version",
    versionYear: 1919,
    text: "我若不信在活人之地得见耶和华的恩惠，就早已丧胆了。",
    transliteration: "Wǒ ruò bù xìn zài huó rén zhī dì dé jiàn Yēhéhuá de ēnhuì, jiù zǎo yǐ sàng dǎn le.",
    pronunciation_en: "woh rwoh boo sheen dzai hwoh ren juh dee duh jee-en yeh-huh-HWAH duh uhn-hway, jee-oh dzow yee sahng dahn luh",
  },
];
