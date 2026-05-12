import { en } from './locales/en';
import { ptBR } from './locales/pt-BR';
import { Locale, TranslationKey, Translations } from './types';

export type { Locale, TranslationKey };

const LOCALES: Locale[] = ['en', 'pt-BR'];

const DIFFICULTY_KEY_MAP: Record<string, TranslationKey> = {
  EASY: 'easy',
  NORMAL: 'normal',
  HARD: 'hard',
  INSANE: 'insane',
};

const GAME_MODE_KEY_MAP: Record<string, TranslationKey> = {
  SOLO: 'soloMode',
  LOCAL: 'localMode',
};

const translations: Record<Locale, Translations> = {
  en,
  'pt-BR': ptBR,
};

let currentLocale: Locale = 'en';

export function getLocale(): Locale {
  return currentLocale;
}

export function cycleLocale(): void {
  const idx = LOCALES.indexOf(currentLocale);
  currentLocale = LOCALES[(idx + 1) % LOCALES.length];
}

export function t(key: TranslationKey): string {
  return translations[currentLocale][key];
}

export function tDifficulty(level: string): string {
  const key = DIFFICULTY_KEY_MAP[level];
  return key ? translations[currentLocale][key] : level;
}

export function tGameMode(mode: string): string {
  const key = GAME_MODE_KEY_MAP[mode];
  return key ? translations[currentLocale][key] : mode;
}
