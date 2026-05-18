import Phaser from 'phaser';
import { Snake } from '@client/objects/Snake';
import { Fruit, FRUIT_ASSETS } from '@client/objects/Fruit';
import { ScoreBoard } from '@client/ui/ScoreBoard';
import { Direction, DifficultyLevel, FruitType, GameMode } from '@shared/types';
import { t } from '@client/i18n';
import {
  GRID_WIDTH,
  GRID_HEIGHT,
  TILE_SIZE,
  CANVAS_WIDTH,
  CANVAS_HEIGHT,
  INITIAL_SNAKE_P1_X,
  INITIAL_SNAKE_P1_Y,
  INITIAL_SNAKE_P2_X,
  INITIAL_SNAKE_P2_Y,
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
  mode?: GameMode;
}

type PlayerId = 'P1' | 'P2';

interface PlayerSnake {
  id: PlayerId;
  snake: Snake;
}

export class GameScene extends Phaser.Scene {
  private snakes: PlayerSnake[] = [];
  private fruits: Fruit[] = [];
  private scoreBoard!: ScoreBoard;
  private tickTimer!: Phaser.Time.TimerEvent;
  private pauseOverlay!: Phaser.GameObjects.Rectangle;
  private pauseText!: Phaser.GameObjects.Text;
  private difficulty: DifficultyLevel = DifficultyLevel.NORMAL;
  private mode: GameMode = GameMode.SOLO;
  private isRunning = false;
  private isPaused = false;

  constructor() {
    super({ key: 'GameScene' });
  }

  preload(): void {
    Object.entries(FRUIT_ASSETS).forEach(([key, path]) => {
      this.load.image(
        `fruit-${key.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`)}`,
        path
      );
    });
  }

  init(data: GameSceneData): void {
    this.difficulty = data?.difficulty ?? DifficultyLevel.NORMAL;
    this.mode = data?.mode ?? GameMode.SOLO;
  }

  create(): void {
    this.snakes = [];
    this.fruits = [];
    this.isPaused = false;
    this.cameras.main.setBackgroundColor(UI_COLORS.BACKGROUND);
    this.drawGrid();
    this.createSnakes();

    const initialFruits = Math.max(FRUITS_COUNT[this.difficulty], MIN_FRUITS);
    for (let i = 0; i < initialFruits; i++) {
      this.spawnFruit();
    }

    this.scoreBoard = new ScoreBoard(
      this,
      8,
      8,
      this.snakes.map((player) => ({
        id: player.id,
        labelKey: player.id === 'P1' ? 'player1' : 'player2',
      }))
    );
    this.createPauseOverlay();
    this.setupInput();

    this.tickTimer = this.time.addEvent({
      delay: GAME_SPEEDS[this.difficulty],
      callback: this.onTick,
      callbackScope: this,
      loop: true,
    });

    this.isRunning = true;
    this.events.once(Phaser.Scenes.Events.SHUTDOWN, this.cleanup, this);
  }

  update(): void {}

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

    kb.on('keydown-W', () => this.queueDirection(Direction.UP));
    kb.on('keydown-S', () => this.queueDirection(Direction.DOWN));
    kb.on('keydown-A', () => this.queueDirection(Direction.LEFT));
    kb.on('keydown-D', () => this.queueDirection(Direction.RIGHT));
    kb.on('keydown-UP', () =>
      this.queueDirection(Direction.UP, this.mode === GameMode.LOCAL ? 'P2' : 'P1')
    );
    kb.on('keydown-DOWN', () =>
      this.queueDirection(Direction.DOWN, this.mode === GameMode.LOCAL ? 'P2' : 'P1')
    );
    kb.on('keydown-LEFT', () =>
      this.queueDirection(Direction.LEFT, this.mode === GameMode.LOCAL ? 'P2' : 'P1')
    );
    kb.on('keydown-RIGHT', () =>
      this.queueDirection(Direction.RIGHT, this.mode === GameMode.LOCAL ? 'P2' : 'P1')
    );
    kb.on('keydown-P', () => this.togglePause());
  }

  private onTick(): void {
    if (!this.isRunning || this.isPaused) return;

    this.snakes.filter((player) => player.snake.isAlive).forEach((player) => player.snake.move());

    this.updateSnakeDeaths();

    if (this.shouldEndGame()) {
      this.endGame();
      return;
    }

    this.checkFruitCollision();
  }

  private checkFruitCollision(): void {
    this.snakes
      .filter((player) => player.snake.isAlive)
      .forEach((player) => {
        const head = player.snake.getHead();
        const index = this.fruits.findIndex((f) => f.x === head.x && f.y === head.y);

        if (index === -1) return;

        const fruit = this.fruits[index];
        const isGolden = fruit.type === FruitType.GOLDEN;

        player.snake.grow(isGolden ? 2 : 1);
        this.scoreBoard.add(player.id, isGolden ? GOLDEN_FRUIT_POINTS : FRUIT_POINTS);

        fruit.destroy();
        this.fruits.splice(index, 1);
        this.spawnFruit();
      });
  }

  private spawnFruit(): void {
    if (this.fruits.length >= MAX_FRUITS) return;
    const occupied = [
      ...this.snakes.flatMap((player) => player.snake.getSegments()),
      ...this.fruits.map((f) => ({ x: f.x, y: f.y })),
    ];
    const pos = Fruit.findFreePosition(occupied);
    if (pos === null) return;
    const type = Math.random() < GOLDEN_FRUIT_CHANCE ? FruitType.GOLDEN : FruitType.APPLE;
    this.fruits.push(new Fruit(this, pos, type));
  }

  private endGame(): void {
    this.isRunning = false;
    this.tickTimer.remove(false);

    const scores = this.scoreBoard.getScores();

    this.cameras.main.setBackgroundColor('#330000');

    this.time.delayedCall(GAME_OVER_DELAY_MS, () => {
      this.scene.start('GameOverScene', {
        scores,
        difficulty: this.difficulty,
        mode: this.mode,
        winnerId: this.getWinnerId(),
      });
    });
  }

  private queueDirection(direction: Direction, playerId: PlayerId = 'P1'): void {
    if (!this.isRunning || this.isPaused) return;
    const player = this.snakes.find((candidate) => candidate.id === playerId);
    if (!player?.snake.isAlive) return;
    player.snake.setDirection(direction);
  }

  private togglePause(): void {
    if (!this.isRunning) return;

    this.isPaused = !this.isPaused;
    this.pauseOverlay.setVisible(this.isPaused);
    this.pauseText.setVisible(this.isPaused);
  }

  private createPauseOverlay(): void {
    this.pauseOverlay = this.add
      .rectangle(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT, 0x000000, 0.62)
      .setOrigin(0)
      .setDepth(20)
      .setVisible(false);

    this.pauseText = this.add
      .text(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2, t('paused'), {
        fontSize: '44px',
        color: UI_COLORS.TEXT,
        fontFamily: 'monospace',
      })
      .setOrigin(0.5)
      .setDepth(21)
      .setVisible(false);
  }

  private cleanup(): void {
    this.tickTimer?.remove(false);
    this.snakes.forEach((player) => player.snake.destroy());
    this.snakes = [];
    this.fruits.forEach((fruit) => fruit.destroy());
    this.fruits = [];
    this.scoreBoard?.destroy();
  }

  private createSnakes(): void {
    this.snakes.push({
      id: 'P1',
      snake: new Snake(
        this,
        INITIAL_SNAKE_P1_X,
        INITIAL_SNAKE_P1_Y,
        INITIAL_SNAKE_LENGTH,
        parseInt(SNAKE_COLORS.P1.replace('#', ''), 16),
        Direction.RIGHT
      ),
    });

    if (this.mode === GameMode.LOCAL) {
      this.snakes.push({
        id: 'P2',
        snake: new Snake(
          this,
          INITIAL_SNAKE_P2_X,
          INITIAL_SNAKE_P2_Y,
          INITIAL_SNAKE_LENGTH,
          parseInt(SNAKE_COLORS.P2.replace('#', ''), 16),
          Direction.LEFT
        ),
      });
    }
  }

  private updateSnakeDeaths(): void {
    this.snakes.forEach((player) => {
      if (!player.snake.isAlive) return;

      const hitSelfOrWall = player.snake.checkWallCollision() || player.snake.checkSelfCollision();
      const hitOtherSnake = this.snakes
        .filter((otherPlayer) => otherPlayer.id !== player.id)
        .some((otherPlayer) => player.snake.checkBodyCollision(otherPlayer.snake.getSegments()));

      if (hitSelfOrWall || hitOtherSnake) {
        player.snake.isAlive = false;
      }
    });
  }

  private shouldEndGame(): boolean {
    if (this.mode === GameMode.SOLO) {
      return !this.snakes[0]?.snake.isAlive;
    }

    return this.snakes.filter((player) => player.snake.isAlive).length <= 1;
  }

  private getWinnerId(): PlayerId | null {
    const alivePlayers = this.snakes.filter((player) => player.snake.isAlive);
    if (this.mode === GameMode.SOLO || alivePlayers.length !== 1) {
      return null;
    }

    return alivePlayers[0].id;
  }
}
