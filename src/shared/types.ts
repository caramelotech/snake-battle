export interface SnakeSegment {
  x: number;
  y: number;
}

export interface Snake {
  id: string;
  playerId: string;
  segments: SnakeSegment[];
  direction: Direction;
  color: string;
  isAlive: boolean;
}

export interface Fruit {
  x: number;
  y: number;
  type: FruitType;
}

export interface GameState {
  id: string;
  snakes: Snake[];
  fruits: Fruit[];
  score: { [playerId: string]: number };
  isRunning: boolean;
  difficulty: DifficultyLevel;
  timestamp: number;
}

export enum Direction {
  UP = 'UP',
  DOWN = 'DOWN',
  LEFT = 'LEFT',
  RIGHT = 'RIGHT',
}

export enum FruitType {
  APPLE = 'APPLE', // +1 segment
  GOLDEN = 'GOLDEN', // +2 segments
}

export enum DifficultyLevel {
  EASY = 'EASY',
  NORMAL = 'NORMAL',
  HARD = 'HARD',
  INSANE = 'INSANE',
}

export enum GameMode {
  SOLO = 'SOLO',
  LOCAL = 'LOCAL',
}

export interface Player {
  id: string;
  username: string;
  score: number;
  snakeId: string;
  color: string;
  isReady: boolean;
}
