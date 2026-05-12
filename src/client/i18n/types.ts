export type Locale = 'en' | 'pt-BR';

export interface Translations {
  title: string;
  difficultyLabel: string;
  difficultyHint: string;
  modeLabel: string;
  modeHint: string;
  soloMode: string;
  localMode: string;
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
  modeDisplay: string;
  playAgain: string;
  mainMenu: string;
  player1: string;
  player2: string;
  winner: string;
  draw: string;
  easy: string;
  normal: string;
  hard: string;
  insane: string;
}

export type TranslationKey = keyof Translations;
