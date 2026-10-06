# Screenshots and graphics

## Required sizes

| Store | Asset | Size | Notes |
|---|---|---|---|
| App Store | iPhone 6.9" screenshots | **1320 × 2868** portrait (1290 × 2796 also accepted) | 3–10 per locale. Apple scales these down for smaller iPhones. No iPad set is needed: the app is iPhone only. |
| Google Play | Phone screenshots | 1080 × 1920 up to 1080 × 2400 (9:16 to 9:20), PNG/JPEG, 320–3840 px per side | 2–8 per language; at least 4 to be eligible for featuring |
| Google Play | Feature graphic | **1024 × 500** PNG/JPEG, no transparency | Keep text away from the edges; Play can crop it |
| Google Play | App icon | **512 × 512** PNG, 32-bit, under 1 MB | Export from `assets/images/icon.png` (1024², no alpha) |

Use the app's light green "garden" palette for the caption band: a mint background, emerald headline text, and gold only as an accent. Put the caption above the phone frame. Take the French shots with the app set to French.

## Shot list (in order: the first 3 show in search results)

| # | Screen to capture | Caption EN | Caption FR |
|---|---|---|---|
| 1 | Alphabet: one letter screen showing its four forms | Learn Arabic from letter one | L'arabe dès la première lettre |
| 2 | Surah reader with tajweed colors and translation on, reciter shown | Read the Quran with tajweed | Lisez le Coran avec le tajwid |
| 3 | A prophet story mid-read, with a verse card in Arabic and translation, the narration playing | Stories of the prophets | Les histoires des prophètes |
| 4 | Alphabet → Scripts: one letter in Naskh, Ruqʿah and Nastaʿliq | Three ways to write Arabic | Trois styles d'écriture |
| 5 | Vocabulary flashcard (Arabic side, with the theme visible) | Build your vocabulary | Enrichissez votre vocabulaire |
| 6 | Surah Learn mode: verse range, speed and repeat controls | Memorize at your own pace | Mémorisez à votre rythme |
| 7 | A dua: Arabic, transliteration and meaning, with the audio playing | Duas for every day | Invocations du quotidien |
| 8 | Home: streak, XP, daily goal | Keep your streak going | Gardez le rythme |

Every caption is 30 characters or fewer (see `check-lengths.cjs`).

**Before capturing:** use a clean account with a realistic streak. Turn vowel marks on. Make sure no real users' names or messages appear; group-chat content must be your own sample content. Don't show the word "AI" or any purchase screen.

## Feature graphic (Play)

The app icon on the left. "Iqra" in large emerald text, and "Learn Arabic & Quran" beneath it, on a mint background with a soft gold arabesque at the edge. Make a French version with "Arabe & Coran".

**Ready to upload** in `store/assets/`: `feature-graphic-en.png`, `feature-graphic-fr.png` (1024 × 500, opaque) and `play-icon-512.png`. Regenerate the graphics with `scripts/make-feature-graphic.sh` (see its header); the icon is `sips -z 512 512 assets/images/icon.png --out store/assets/play-icon-512.png`.
