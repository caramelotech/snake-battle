import Phaser from 'phaser';
import { FruitType } from '@shared/types';
import { TILE_SIZE, GRID_WIDTH, GRID_HEIGHT } from '@shared/constants';

interface GridPosition {
  x: number;
  y: number;
}

const FRUIT_COLORS: Record<FruitType, number> = {
  [FruitType.APPLE]: 0xff3333,
  [FruitType.GOLDEN]: 0xffd700,
};

const FRUIT_PADDING = 6;

export class Fruit {
  readonly x: number;
  readonly y: number;
  readonly type: FruitType;
  private graphics: Phaser.GameObjects.Graphics;

  static findFreePosition(occupied: GridPosition[]): GridPosition | null {
    const free: GridPosition[] = [];

    for (let x = 0; x < GRID_WIDTH; x++) {
      for (let y = 0; y < GRID_HEIGHT; y++) {
        if (!occupied.some((pos) => pos.x === x && pos.y === y)) {
          free.push({ x, y });
        }
      }
    }

    if (free.length === 0) return null;

    return free[Math.floor(Math.random() * free.length)];
  }

  constructor(scene: Phaser.Scene, pos: GridPosition, type: FruitType = FruitType.APPLE) {
    this.type = type;
    this.x = pos.x;
    this.y = pos.y;
    this.graphics = scene.add.graphics();
    this.draw();
  }

  destroy(): void {
    this.graphics.destroy();
  }

  private draw(): void {
    this.graphics.fillStyle(FRUIT_COLORS[this.type], 1);
    this.graphics.fillRect(
      this.x * TILE_SIZE + FRUIT_PADDING,
      this.y * TILE_SIZE + FRUIT_PADDING,
      TILE_SIZE - FRUIT_PADDING * 2,
      TILE_SIZE - FRUIT_PADDING * 2
    );
  }
}
