// Grammar Color Scheme
// Colors for different grammar categories and levels

export const GRAMMAR_COLORS = {
  // Levels
  beginner: '#4CAF50', // Green - Foundation
  intermediate: '#FF9800', // Orange - Building
  advanced: '#F44336', // Red - Mastery

  // Categories
  articles: '#2196F3', // Blue - Definite article, sun/moon letters
  pronouns: '#9C27B0', // Purple - Personal, possessive, demonstrative pronouns
  verbs: '#E91E63', // Pink - Verb conjugations, tenses, moods
  nouns: '#00BCD4', // Cyan - Noun patterns, gender, number
  adjectives: '#8BC34A', // Light green - Adjective agreement, comparatives
  sentences: '#FF5722', // Deep orange - Sentence structure, syntax
  other: '#9E9E9E', // Gray - Writing system, vowels, misc

  // Specific grammar concepts
  writing_system: '#607D8B', // Blue gray - Arabic alphabet, letter forms
  vowels: '#795548', // Brown - Harakat, short/long vowels
  definite_article: '#3F51B5', // Indigo - Al, sun/moon letters
  personal_pronouns: '#9C27B0', // Purple - I, you, he, she, etc.
  possessive_pronouns: '#7B1FA2', // Dark purple - My, your, his, etc.
  demonstrative_pronouns: '#BA68C8', // Light purple - This, that, these
  noun_gender: '#00ACC1', // Dark cyan - Masculine/feminine
  noun_number: '#0097A7', // Teal - Singular/dual/plural
  nominal_sentences: '#FF7043', // Deep orange light - Jumla ismiyya
  verbal_sentences: '#F4511E', // Deep orange dark - Jumla fi'liyya
  past_tense: '#D81B60', // Pink dark - Al-madi
  present_tense: '#C2185B', // Pink darker - Al-mudari'
  future_tense: '#AD1457', // Pink darkest - Al-mustaqbal
  imperative: '#880E4F', // Pink very dark - Al-amr
  verb_patterns: '#E91E63', // Pink - Awzan
  idafa: '#26A69A', // Teal light - Construct state
  adjective_agreement: '#7CB342', // Light green dark - Agreement rules
  prepositions: '#FFA726', // Orange light - Huruf al-jarr
  case_endings: '#5C6BC0', // Indigo light - I'rab
  negation: '#EF5350', // Red light - Negation particles
} as const;

export type GrammarColorKey = keyof typeof GRAMMAR_COLORS;

// Category colors for grouping in UI
export const GRAMMAR_CATEGORY_COLORS = {
  articles: '#2196F3', // Blue
  pronouns: '#9C27B0', // Purple
  verbs: '#E91E63', // Pink
  nouns: '#00BCD4', // Cyan
  adjectives: '#8BC34A', // Light green
  sentences: '#FF5722', // Deep orange
  other: '#9E9E9E', // Gray
} as const;

// Level colors for UI
export const GRAMMAR_LEVEL_COLORS = {
  beginner: '#4CAF50', // Green
  intermediate: '#FF9800', // Orange
  advanced: '#F44336', // Red
} as const;
