import Phaser from 'phaser';
import { Direction } from '@shared/types';
import { TILE_SIZE, GRID_WIDTH, GRID_HEIGHT } from '@shared/constants';

interface SegmentPosition {
  x: number;
  y: number;
}

const OPPOSITE_DIRECTION: Record<Direction, Direction> = {
  [Direction.UP]: Direction.DOWN,
  [Direction.DOWN]: Direction.UP,
  [Direction.LEFT]: Direction.RIGHT,
  [Direction.RIGHT]: Direction.LEFT,
};

export class Snake {
  private segments: SegmentPosition[];
  private direction: Direction;
  // Two-slot FIFO buffer: lets players pre-queue one turn ahead without
  // allowing unbounded growth from rapid key presses.
  private directionQueue: Direction[] = [];
  private graphics: Phaser.GameObjects.Graphics;
  private readonly color: number;
  private growPending = 0;
  isAlive = true;

  constructor(scene: Phaser.Scene, startX: number, startY: number, length: number, color: number) {
    this.color = color;
    this.direction = Direction.RIGHT;
    this.segments = [];

    for (let i = 0; i < length; i++) {
      this.segments.push({ x: startX - i, y: startY });
    }

    this.graphics = scene.add.graphics();
    this.draw();
  }

  setDirection(direction: Direction): void {
    const lastQueued = this.directionQueue[this.directionQueue.length - 1] ?? this.direction;
    if (
      direction !== OPPOSITE_DIRECTION[lastQueued] &&
      direction !== lastQueued &&
      this.directionQueue.length < 2
    ) {
      this.directionQueue.push(direction);
    }
  }

  move(): void {
    if (this.directionQueue.length > 0) {
      const next = this.directionQueue.shift()!;
      // Re-validate: current direction may differ if a previous move changed it
      if (next !== OPPOSITE_DIRECTION[this.direction]) {
        this.direction = next;
      }
    }
    const head = this.segments[0];
    let newHead: SegmentPosition;

    switch (this.direction) {
      case Direction.UP:
        newHead = { x: head.x, y: head.y - 1 };
        break;
      case Direction.DOWN:
        newHead = { x: head.x, y: head.y + 1 };
        break;
      case Direction.LEFT:
        newHead = { x: head.x - 1, y: head.y };
        break;
      case Direction.RIGHT:
        newHead = { x: head.x + 1, y: head.y };
        break;
    }

    this.segments.unshift(newHead);

    if (this.growPending > 0) {
      this.growPending--;
    } else {
      this.segments.pop();
    }

    this.draw();
  }

  grow(amount = 1): void {
    this.growPending += amount;
  }

  getHead(): SegmentPosition {
    return this.segments[0];
  }

  getSegments(): SegmentPosition[] {
    return [...this.segments];
  }

  checkWallCollision(): boolean {
    const { x, y } = this.segments[0];
    return x < 0 || x >= GRID_WIDTH || y < 0 || y >= GRID_HEIGHT;
  }

  checkSelfCollision(): boolean {
    const head = this.segments[0];
    return this.segments.slice(1).some((seg) => seg.x === head.x && seg.y === head.y);
  }

  checkBodyCollision(otherSegments: { x: number; y: number }[]): boolean {
    const head = this.segments[0];
    return otherSegments.some((seg) => seg.x === head.x && seg.y === head.y);
  }

  destroy(): void {
    this.graphics.destroy();
  }

  private draw(): void {
    this.graphics.clear();
    this.segments.forEach((seg, index) => {
      const alpha = index === 0 ? 1 : 0.75;
      this.graphics.fillStyle(this.color, alpha);
      this.graphics.fillRect(
        seg.x * TILE_SIZE + 1,
        seg.y * TILE_SIZE + 1,
        TILE_SIZE - 2,
        TILE_SIZE - 2
      );
    });
  }
}
