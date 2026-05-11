export type Locale = 'en' | 'pt-BR';

const LOCALES: Locale[] = ['en', 'pt-BR'];

interface Translations {
  title: string;
  difficultyLabel: string;
  difficultyHint: string;
  controlsMove: string;
  controlsPause: string;
  pressStart: string;
  langLabel: string;
  langHint: string;
  langName: string;
  paused: string;
  gameOver: string;
  score: string;
  difficultyDisplay: string;
  playAgain: string;
  mainMenu: string;
  easy: string;
  normal: string;
  hard: string;
  insane: string;
}

export type TranslationKey = keyof Translations;

const DIFFICULTY_KEY_MAP: Record<string, TranslationKey> = {
  EASY: 'easy',
  NORMAL: 'normal',
  HARD: 'hard',
  INSANE: 'insane',
};

const translations: Record<Locale, Translations> = {
  en: {
    title: 'SNAKE BATTLE',
    difficultyLabel: 'DIFFICULTY',
    difficultyHint: '< Q/E or LEFT/RIGHT to change >',
    controlsMove: 'WASD / ARROWS - MOVE',
    controlsPause: 'P - PAUSE',
    pressStart: 'PRESS SPACE TO START',
    langLabel: 'LANGUAGE',
    langHint: '< L to change >',
    langName: 'EN',
    paused: 'PAUSED',
    gameOver: 'GAME OVER',
    score: 'SCORE',
    difficultyDisplay: 'DIFFICULTY',
    playAgain: 'SPACE - Play Again',
    mainMenu: 'ESC - Main Menu',
    easy: 'EASY',
    normal: 'NORMAL',
    hard: 'HARD',
    insane: 'INSANE',
  },
  'pt-BR': {
    title: 'SNAKE BATTLE',
    difficultyLabel: 'DIFICULDADE',
    difficultyHint: '< Q/E ou ESQUERDA/DIREITA para mudar >',
    controlsMove: 'WASD / SETAS - MOVER',
    controlsPause: 'P - PAUSAR',
    pressStart: 'PRESSIONE ESPACO PARA INICIAR',
    langLabel: 'IDIOMA',
    langHint: '< L para mudar >',
    langName: 'PT-BR',
    paused: 'PAUSADO',
    gameOver: 'FIM DE JOGO',
    score: 'PONTOS',
    difficultyDisplay: 'DIFICULDADE',
    playAgain: 'ESPACO - Jogar Novamente',
    mainMenu: 'ESC - Menu Principal',
    easy: 'FACIL',
    normal: 'NORMAL',
    hard: 'DIFICIL',
    insane: 'INSANO',
  },
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
