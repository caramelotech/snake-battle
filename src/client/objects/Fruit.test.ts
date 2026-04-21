import { describe, it, expect, vi } from 'vitest';
import { GRID_WIDTH, GRID_HEIGHT } from '@shared/constants';

vi.mock('phaser', () => ({ default: {} }));

import { Fruit } from './Fruit';

const ALL_POSITIONS = Array.from({ length: GRID_WIDTH }, (_, x) =>
  Array.from({ length: GRID_HEIGHT }, (_, y) => ({ x, y }))
).flat();

describe('Fruit.findFreePosition', () => {
  it('returns a position when the grid is empty', () => {
    const pos = Fruit.findFreePosition([]);
    expect(pos).not.toBeNull();
    expect(pos!.x).toBeGreaterThanOrEqual(0);
    expect(pos!.x).toBeLessThan(GRID_WIDTH);
    expect(pos!.y).toBeGreaterThanOrEqual(0);
    expect(pos!.y).toBeLessThan(GRID_HEIGHT);
  });

  it('never returns an occupied position', () => {
    const occupied = [{ x: 3, y: 7 }, { x: 10, y: 10 }];
    // Run many times to catch random failures
    for (let i = 0; i < 50; i++) {
      const pos = Fruit.findFreePosition(occupied);
      expect(pos).not.toBeNull();
      const isOccupied = occupied.some((o) => o.x === pos!.x && o.y === pos!.y);
      expect(isOccupied).toBe(false);
    }
  });

  it('returns null when every grid cell is occupied', () => {
    const pos = Fruit.findFreePosition(ALL_POSITIONS);
    expect(pos).toBeNull();
  });

  it('returns the single remaining free cell when only one is left', () => {
    const onlyFree = { x: 12, y: 8 };
    const almostFull = ALL_POSITIONS.filter((p) => !(p.x === onlyFree.x && p.y === onlyFree.y));
    const pos = Fruit.findFreePosition(almostFull);
    expect(pos).toEqual(onlyFree);
  });

  it('never spawns on a snake body segment', () => {
    const snakeSegments = [
      { x: 5, y: 10 },
      { x: 4, y: 10 },
      { x: 3, y: 10 },
    ];
    for (let i = 0; i < 100; i++) {
      const pos = Fruit.findFreePosition(snakeSegments);
      expect(pos).not.toBeNull();
      const isOnSnake = snakeSegments.some((seg) => seg.x === pos!.x && seg.y === pos!.y);
      expect(isOnSnake).toBe(false);
    }
  });
});
