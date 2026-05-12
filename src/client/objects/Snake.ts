import Phaser from 'phaser';
import { Direction } from '@shared/types';
import { TILE_SIZE, GRID_WIDTH, GRID_HEIGHT, OPPOSITE_DIRECTION } from '@shared/constants';

interface SegmentPosition {
  x: number;
  y: number;
}

export class Snake {
  private segments: SegmentPosition[];
  private direction: Direction;
  // Two-slot FIFO buffer: lets players pre-queue one turn ahead without
  // allowing unbounded growth from rapid key presses.
  private directionQueue: Direction[] = [];
  private readonly scene: Phaser.Scene;
  private readonly color: number;
  private segmentRects: Phaser.GameObjects.Rectangle[] = [];
  private growPending = 0;
  isAlive = true;

  constructor(
    scene: Phaser.Scene,
    startX: number,
    startY: number,
    length: number,
    color: number,
    initialDirection: Direction = Direction.RIGHT
  ) {
    this.scene = scene;
    this.color = color;
    this.direction = initialDirection;
    this.segments = [];
    for (let i = 0; i < length; i++) {
      const segment = this.getInitialSegment(startX, startY, i);
      this.segments.push(segment);
      this.segmentRects.push(this.makeRect(segment.x, segment.y, i === 0));
    }
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
      default:
        throw new Error(`Unexpected direction: ${this.direction as string}`);
    }

    this.segments.unshift(newHead);
    this.segmentRects[0].setAlpha(0.75);

    if (this.growPending > 0) {
      this.growPending--;
      this.segmentRects.unshift(this.makeRect(newHead.x, newHead.y, true));
    } else {
      const tailRect = this.segmentRects.pop()!;
      this.segments.pop();
      tailRect.setPosition(
        newHead.x * TILE_SIZE + TILE_SIZE / 2,
        newHead.y * TILE_SIZE + TILE_SIZE / 2
      );
      tailRect.setAlpha(1);
      this.segmentRects.unshift(tailRect);
    }
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
    this.segmentRects.forEach((r) => r.destroy());
    this.segmentRects = [];
  }

  private makeRect(x: number, y: number, isHead: boolean): Phaser.GameObjects.Rectangle {
    return this.scene.add
      .rectangle(
        x * TILE_SIZE + TILE_SIZE / 2,
        y * TILE_SIZE + TILE_SIZE / 2,
        TILE_SIZE - 2,
        TILE_SIZE - 2,
        this.color
      )
      .setAlpha(isHead ? 1 : 0.75);
  }

  private getInitialSegment(startX: number, startY: number, index: number): SegmentPosition {
    switch (this.direction) {
      case Direction.UP:
        return { x: startX, y: startY + index };
      case Direction.DOWN:
        return { x: startX, y: startY - index };
      case Direction.LEFT:
        return { x: startX + index, y: startY };
      case Direction.RIGHT:
        return { x: startX - index, y: startY };
      default:
        throw new Error(`Unexpected direction: ${this.direction as string}`);
    }
  }
}
