# Google Play Console listing: Iqra

Package `com.iqra2.app`, version 1.1.0. Character counts are at the bottom and were checked with `store/check-lengths.cjs`.
The app has **no AI, no ads and no in-app purchases**. In Play Console: *Contains ads: No*, *In-app purchases: No*.

**Community is not in 1.1.0** (hidden by `COMMUNITY_ENABLED`), so the answers below leave out chat, voice messages and posts. Restore them from git history (commit d4f9604) when Community ships.

---

## en-US (default)

**App name** (30 max)
```
Iqra: Learn Arabic & Quran
```

**Short description** (80 max)
```
Learn the Arabic alphabet, read the Quran, and hear the stories of the prophets.
```

**Full description** (4000 max)
Same text as the App Store en-US description in `store/app-store.md`, with one difference: replace "Keeps playing in the background with the screen locked" with:
```
• Keeps playing in the background with the screen off, with controls in the notification
```
(Plain text: Play shows the • bullets and line breaks as they are. Don't use HTML or emoji.)

## fr-FR

**Nom de l'application**
```
Iqra : Arabe & Coran
```

**Description courte**
```
Apprenez l'alphabet arabe, lisez le Coran, écoutez les histoires des prophètes.
```

**Description complète**
The fr-FR App Store description, with "La lecture continue en arrière-plan, écran verrouillé" replaced by:
```
• La lecture continue en arrière-plan, écran éteint, avec les commandes dans la notification
```

---

## Store settings

- **App category:** Education
- **Tags** (pick up to 5 in Play Console): Language learning, Religion & spirituality, Reading, Education, Reference
- **Contact email:** support@mkaztek.com. Website: the support URL from the App Store file.
- **Privacy policy:** `https://kaztekapp.github.io/iqra-legal/privacy-policy.html` *(confirm it's live and updated)*

## Content rating (IARC questionnaire)

- Category: **Reference, News, or Educational**
- Violence: the stories mention killing and drowning as scripture, with nothing shown. Answer **No** to graphic violence and describe it as non-graphic references if asked.
- Sexuality, language, controlled substances, gambling: **No**
- Users can interact or exchange content: **No** (Community is hidden in 1.1.0)
- Shares the user's location: No. Digital purchases: No.
- With no user interaction, expect a lower rating than Teen; the scripture stories' non-graphic violence is the only content item.

## Target audience and content

- Target age groups: **13–15, 16–17, 18+**. Do **not** tick under-13: that puts the app under the Families policy, and Community (planned) would not meet it.
- Appeals to children: No.

## Data safety form

**Is data encrypted in transit?** Yes (HTTPS to Supabase, Sentry, Expo).
**Can users request that data be deleted?** Yes, in the app (Profile → Delete Account), or by email to support@mkaztek.com.

| Data type | Collected | Shared | Optional? | Purpose |
|---|---|---|---|---|
| Personal info → Email address | Yes | No | Required (an account is required) | Account management, App functionality |
| Personal info → Name (display name) | Yes | No | Same as email | Account management, App functionality |
| Personal info → User IDs | Yes | No | Same as email | Account management, App functionality, Analytics |
| App activity → Other actions (learning progress, XP, streaks) | Yes | No | Required | App functionality |
| App info and performance → Crash logs | Yes (Sentry) | No | Required | Analytics |
| App info and performance → Diagnostics | Yes (Sentry performance, 20 % sample) | No | Required | Analytics |
| Device or other IDs | Yes (push token, stored with the account) | No | Optional | App functionality |

"Shared" is **No** everywhere. The services above act on our behalf, and Play's form treats processors as not sharing. Location, contacts, photos, financial, health, web history and calendar: **not collected**.
Speech recognition goes through the phone's own Google service, not to us, so it isn't declared. It is mentioned in the privacy policy.

## Permissions to justify

**`FOREGROUND_SERVICE_MEDIA_PLAYBACK`** (Play Console → App content → Foreground service permissions)

- Type: **Media playback**
- Description to paste:
```
Iqra plays Quran recitations and the read-aloud stories of the prophets. When the user starts
playback and turns off the screen or switches apps, a media-playback foreground service keeps
the audio playing, with a notification to pause or stop it. It only runs while audio the user
started is playing.
```
- **Video to record** (under 60 s; upload unlisted to YouTube and paste the link): open the Quran tab, open a surah, tap **Play All** and let it play. Press the power button and show the audio still playing. Wake the phone and pull down the notification shade to show the media notification. Tap pause.

**`RECORD_AUDIO`**: used for pronunciation practice. It is requested only when the user taps the mic.

## User-generated content (App content → UGC)

Not applicable in 1.1.0: Community is hidden, so users cannot post anything others can see. Declare **No** user-generated content.

## App access (App content → App access)

All functionality is behind sign-in. Choose **"All or some functionality is restricted"** and add:
- Name: `Reviewer account`
- Username: `playreview@mkaztek.com`
- Password: type it in Play Console yourself (it is not kept in this repo)
- Instructions: `Sign in with the email and password above after the first onboarding screens. No other step is needed.`

## Account deletion (App content → Data deletion)

- In-app path: Profile → Delete Account
- Web path, required by Play: a page on the legal site that explains the in-app steps and gives the email support@mkaztek.com. Suggested URL: `https://kaztekapp.github.io/iqra-legal/delete-account.html`. The page is `docs/delete-account.html` in this repo; copy it to the legal site.

## Release notes 1.1.0

EN
```
• Stories of the prophets, from the Quran and authentic hadith only, read aloud
• Tap any paragraph of a story to listen from there
• Arabic letters in Naskh, Ruqʿah and Nastaʿliq
• New Islamic calendar course
• Study reminders and a streak warning
• Recitations stay on your phone for offline listening
```
FR
```
• Les histoires des prophètes, du Coran et des hadiths authentiques uniquement, lues à voix haute
• Touchez un paragraphe d'une histoire pour l'écouter à partir de là
• Les lettres arabes en Naskh, Ruqʿah et Nastaʿliq
• Nouveau cours sur le calendrier islamique
• Rappels d'étude et alerte de série
• Les récitations restent sur votre téléphone pour l'écoute hors ligne
```
