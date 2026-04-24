import Phaser from 'phaser';
import { Snake } from '@client/objects/Snake';
import { Fruit } from '@client/objects/Fruit';
import { ScoreBoard } from '@client/ui/ScoreBoard';
import { Direction, DifficultyLevel, FruitType } from '@shared/types';
import {
  GRID_WIDTH,
  GRID_HEIGHT,
  TILE_SIZE,
  CANVAS_WIDTH,
  CANVAS_HEIGHT,
  INITIAL_SNAKE_P1_X,
  INITIAL_SNAKE_P1_Y,
  INITIAL_SNAKE_LENGTH,
  GAME_SPEEDS,
  FRUITS_COUNT,
  MIN_FRUITS,
  MAX_FRUITS,
  UI_COLORS,
  SNAKE_COLORS,
  FRUIT_POINTS,
  GOLDEN_FRUIT_POINTS,
  GOLDEN_FRUIT_CHANCE,
  GAME_OVER_DELAY_MS,
} from '@shared/constants';

interface GameSceneData {
  difficulty: DifficultyLevel;
}

export class GameScene extends Phaser.Scene {
  private snake!: Snake;
  private fruits: Fruit[] = [];
  private scoreBoard!: ScoreBoard;
  private tickTimer!: Phaser.Time.TimerEvent;
  private difficulty: DifficultyLevel = DifficultyLevel.NORMAL;
  private isRunning = false;

  constructor() {
    super({ key: 'GameScene' });
  }

  init(data: GameSceneData): void {
    this.difficulty = data?.difficulty ?? DifficultyLevel.NORMAL;
  }

  create(): void {
    this.fruits = [];
    this.cameras.main.setBackgroundColor(UI_COLORS.BACKGROUND);
    this.drawGrid();

    const p1Color = parseInt(SNAKE_COLORS.P1.replace('#', ''), 16);
    this.snake = new Snake(
      this,
      INITIAL_SNAKE_P1_X,
      INITIAL_SNAKE_P1_Y,
      INITIAL_SNAKE_LENGTH,
      p1Color
    );

    const initialFruits = Math.max(FRUITS_COUNT[this.difficulty], MIN_FRUITS);
    for (let i = 0; i < initialFruits; i++) {
      this.spawnFruit();
    }

    this.scoreBoard = new ScoreBoard(this, 8, 8);
    this.setupInput();

    this.tickTimer = this.time.addEvent({
      delay: GAME_SPEEDS[this.difficulty],
      callback: this.onTick,
      callbackScope: this,
      loop: true,
    });

    this.isRunning = true;
  }

  update(): void {
    // Tick-based logic is handled by the timer event, not here.
  }

  private drawGrid(): void {
    const graphics = this.add.graphics();
    const lineColor = parseInt(UI_COLORS.GRID_LINE.replace('#', ''), 16);
    graphics.lineStyle(1, lineColor, 0.5);

    for (let x = 0; x <= GRID_WIDTH; x++) {
      graphics.lineBetween(x * TILE_SIZE, 0, x * TILE_SIZE, CANVAS_HEIGHT);
    }
    for (let y = 0; y <= GRID_HEIGHT; y++) {
      graphics.lineBetween(0, y * TILE_SIZE, CANVAS_WIDTH, y * TILE_SIZE);
    }
  }

  private setupInput(): void {
    const kb = this.input.keyboard!;

    kb.on('keydown-W', () => this.snake.setDirection(Direction.UP));
    kb.on('keydown-S', () => this.snake.setDirection(Direction.DOWN));
    kb.on('keydown-A', () => this.snake.setDirection(Direction.LEFT));
    kb.on('keydown-D', () => this.snake.setDirection(Direction.RIGHT));
    kb.on('keydown-UP', () => this.snake.setDirection(Direction.UP));
    kb.on('keydown-DOWN', () => this.snake.setDirection(Direction.DOWN));
    kb.on('keydown-LEFT', () => this.snake.setDirection(Direction.LEFT));
    kb.on('keydown-RIGHT', () => this.snake.setDirection(Direction.RIGHT));
  }

  private onTick(): void {
    if (!this.isRunning) return;

    this.snake.move();

    if (this.snake.checkWallCollision() || this.snake.checkSelfCollision()) {
      this.endGame();
      return;
    }

    this.checkFruitCollision();
  }

  private checkFruitCollision(): void {
    const head = this.snake.getHead();
    const index = this.fruits.findIndex((f) => f.x === head.x && f.y === head.y);

    if (index === -1) return;

    const fruit = this.fruits[index];
    const isGolden = fruit.type === FruitType.GOLDEN;

    this.snake.grow(isGolden ? 2 : 1);
    this.scoreBoard.add(isGolden ? GOLDEN_FRUIT_POINTS : FRUIT_POINTS);

    fruit.destroy();
    this.fruits.splice(index, 1);
    this.spawnFruit();
  }

  private spawnFruit(): void {
    if (this.fruits.length >= MAX_FRUITS) return;
    const occupied = [...this.snake.getSegments(), ...this.fruits.map((f) => ({ x: f.x, y: f.y }))];
    const pos = Fruit.findFreePosition(occupied);
    if (pos === null) return;
    const type = Math.random() < GOLDEN_FRUIT_CHANCE ? FruitType.GOLDEN : FruitType.APPLE;
    this.fruits.push(new Fruit(this, pos, type));
  }

  private endGame(): void {
    this.isRunning = false;
    this.tickTimer.remove(false);

    const finalScore = this.scoreBoard.getScore();

    this.cameras.main.setBackgroundColor('#330000');

    this.time.delayedCall(GAME_OVER_DELAY_MS, () => {
      this.scene.start('GameOverScene', {
        score: finalScore,
        difficulty: this.difficulty,
      });
    });
  }
}
