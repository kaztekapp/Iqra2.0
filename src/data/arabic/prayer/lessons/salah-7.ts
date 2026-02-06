// Lesson 7: Common Scenarios & Examples
// سيناريوهات شائعة وأمثلة

import { PrayerContent } from '../../../../types/prayer';

export const salah7Content: PrayerContent[] = [
  {
    type: 'description',
    title: 'Practical Scenarios',
    titleArabic: 'سيناريوهات عملية',
    content: 'Understanding Sujud as-Sahw is best done through practical examples. Here are seven common scenarios that may occur during prayer, along with the correct way to handle each one.',
  },
  {
    type: 'rule',
    title: 'Scenario 1: Forgot the First Tashahhud',
    content: 'You are praying Dhuhr (4 rak\'ahs) and after the 2nd rak\'ah, you stand up directly without sitting for the first Tashahhud.\n\nSolution: If you have not yet fully stood up, sit back down and recite the Tashahhud. If you have already stood up fully, continue the prayer and do NOT go back. Perform Sujud as-Sahw BEFORE the Tasleem at the end of the prayer.',
    icon: 'arrow-up',
  },
  {
    type: 'rule',
    title: 'Scenario 2: Prayed 5 Rak\'ahs Instead of 4',
    content: 'You are praying Isha (4 rak\'ahs) and you realize during the 5th rak\'ah that you have added an extra one.\n\nSolution: Sit down immediately wherever you are, recite the Tashahhud and Salawat, then perform Sujud as-Sahw AFTER the Tasleem. The extra rak\'ah becomes a voluntary (nafl) prayer for you.',
    icon: 'add-circle',
  },
  {
    type: 'rule',
    title: 'Scenario 3: Unsure if 3 or 4 Rak\'ahs',
    content: 'You are praying Asr (4 rak\'ahs) and after what you think might be the 3rd or 4th rak\'ah, you are not sure which one it was.\n\nSolution: Build on what you are certain of - which is 3 rak\'ahs (the lesser number). Stand up and pray one more rak\'ah to be safe, then perform Sujud as-Sahw BEFORE the Tasleem.',
    icon: 'help-circle',
  },
  {
    type: 'rule',
    title: 'Scenario 4: Forgot to Say Subhana Rabbiyal-A\'la in Sujud',
    content: 'You realize after rising from prostration that you forgot to say "Subhana rabbiyal-a\'la" in the sujud.\n\nSolution: Continue the prayer as normal. Since saying the tasbeeh in sujud is an obligatory (wajib) part but not a pillar (rukn), you do NOT go back. Perform Sujud as-Sahw before the Tasleem at the end of the prayer.',
    icon: 'volume-mute',
  },
  {
    type: 'rule',
    title: 'Scenario 5: Said Tasleem After 2 Rak\'ahs in a 4-Rak\'ah Prayer',
    content: 'You are praying Dhuhr and accidentally say the Tasleem after 2 rak\'ahs thinking the prayer is complete.\n\nSolution: If you remember shortly after (before a long gap), stand up and complete the remaining 2 rak\'ahs. Then perform Sujud as-Sahw AFTER the final Tasleem. If a long time has passed, you must repeat the entire prayer.',
    icon: 'exit',
  },
  {
    type: 'rule',
    title: 'Scenario 6: Forgot a Complete Prostration',
    content: 'You realize you only performed one prostration in a rak\'ah instead of two.\n\nSolution: Since the prostration is a pillar (rukn) of prayer, you MUST make it up. If you remember before starting the next rak\'ah\'s recitation, go back and perform the missing prostration. If you have already started reciting in the next rak\'ah, the previous rak\'ah is invalid - your current rak\'ah replaces it. Complete the prayer and perform Sujud as-Sahw.',
    icon: 'arrow-down',
  },
  {
    type: 'rule',
    title: 'Scenario 7: Imam Makes a Mistake',
    content: 'You are praying behind an imam and he makes a mistake (like standing up when he should sit).\n\nSolution: The followers should alert the imam by saying "SubhanAllah" (men) or clapping (women). If the imam corrects himself, follow him. The imam performs Sujud as-Sahw and the followers follow him in it. If you joined late and the imam does Sujud as-Sahw after Tasleem, do it after your own Tasleem when you complete your remaining rak\'ahs.',
    icon: 'people',
  },
  {
    type: 'table',
    title: 'Quick Reference Summary',
    titleArabic: 'ملخص مرجعي سريع',
    headers: ['Scenario', 'Action', 'Sujud as-Sahw'],
    rows: [
      ['Forgot Tashahhud', 'Continue, don\'t go back', 'Before Tasleem'],
      ['Extra rak\'ah', 'Sit immediately', 'After Tasleem'],
      ['Doubt in count', 'Build on lesser number', 'Before Tasleem'],
      ['Forgot tasbeeh', 'Continue normally', 'Before Tasleem'],
      ['Early Tasleem', 'Stand and complete', 'After Tasleem'],
      ['Missed prostration', 'Make up the rak\'ah', 'Before Tasleem'],
      ['Imam\'s mistake', 'Alert with SubhanAllah', 'Follow the imam'],
    ],
  },
  {
    type: 'note',
    title: 'Don\'t Overthink It',
    content: 'The Prophet (peace be upon him) himself sometimes forgot during prayer, which is how we learned about Sujud as-Sahw. He said: "I am only human; I forget as you forget. So if I forget, remind me." (Bukhari & Muslim). The key principle is: if you omitted something, do Sujud as-Sahw before Tasleem. If you added something, do it after Tasleem. If in doubt, build on certainty and do it before Tasleem.',
  },
  {
    type: 'description',
    title: 'Final Advice',
    titleArabic: 'نصيحة أخيرة',
    content: 'The best way to avoid mistakes in prayer is to pray with khushu\' (humility and concentration). Focus on the meaning of what you are reciting, remember that you are standing before Allah, and pray as if it is your last prayer. May Allah accept our prayers and forgive our shortcomings.',
    arabic: 'وَاسْتَعِينُوا بِالصَّبْرِ وَالصَّلَاةِ',
  },
];
