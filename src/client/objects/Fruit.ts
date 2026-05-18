import Phaser from 'phaser';
import { FruitType } from '@shared/types';
import { TILE_SIZE, GRID_WIDTH, GRID_HEIGHT } from '@shared/constants';
import appleUrl from '../../../public/assets/sprites/fruits/apple.png';
import bananaUrl from '../../../public/assets/sprites/fruits/banana.png';
import cherryUrl from '../../../public/assets/sprites/fruits/cherry.png';
import lemonUrl from '../../../public/assets/sprites/fruits/lemon.png';
import orangeUrl from '../../../public/assets/sprites/fruits/orange.png';
import peachUrl from '../../../public/assets/sprites/fruits/peach.png';
import pearUrl from '../../../public/assets/sprites/fruits/pear.png';
import purpleGrapeUrl from '../../../public/assets/sprites/fruits/purple-grape.png';
import redGrapeUrl from '../../../public/assets/sprites/fruits/red-grape.png';
import strawberryUrl from '../../../public/assets/sprites/fruits/strawberry.png';
import watermelonUrl from '../../../public/assets/sprites/fruits/watermelon.png';
import yellowLemonUrl from '../../../public/assets/sprites/fruits/yellow-lemon.png';

interface GridPosition {
  x: number;
  y: number;
}

export const FRUIT_ASSETS: Record<string, string> = {
  apple: appleUrl,
  banana: bananaUrl,
  cherry: cherryUrl,
  lemon: lemonUrl,
  orange: orangeUrl,
  peach: peachUrl,
  pear: pearUrl,
  purpleGrape: purpleGrapeUrl,
  redGrape: redGrapeUrl,
  strawberry: strawberryUrl,
  watermelon: watermelonUrl,
  yellowLemon: yellowLemonUrl,
};

const NORMAL_FRUIT_KEYS = [
  'fruit-apple',
  'fruit-banana',
  'fruit-cherry',
  'fruit-lemon',
  'fruit-orange',
  'fruit-peach',
  'fruit-pear',
  'fruit-purple-grape',
  'fruit-red-grape',
  'fruit-strawberry',
  'fruit-watermelon',
];

const GOLDEN_FRUIT_KEYS = ['fruit-yellow-lemon', 'fruit-banana', 'fruit-orange'];

export class Fruit {
  readonly x: number;
  readonly y: number;
  readonly type: FruitType;
  private sprite: Phaser.GameObjects.Image;

  // Reservoir sampling: O(n) time, O(1) extra space, uniform distribution.
  static findFreePosition(occupied: GridPosition[]): GridPosition | null {
    const occupiedSet = new Set(occupied.map((pos) => `${pos.x},${pos.y}`));
    let chosen: GridPosition | null = null;
    let count = 0;

    for (let x = 0; x < GRID_WIDTH; x++) {
      for (let y = 0; y < GRID_HEIGHT; y++) {
        if (!occupiedSet.has(`${x},${y}`)) {
          count++;
          if (Math.random() < 1 / count) {
            chosen = { x, y };
          }
        }
      }
    }

    return chosen;
  }

  constructor(scene: Phaser.Scene, pos: GridPosition, type: FruitType = FruitType.APPLE) {
    this.type = type;
    this.x = pos.x;
    this.y = pos.y;
    this.sprite = scene.add
      .image(
        this.x * TILE_SIZE + TILE_SIZE / 2,
        this.y * TILE_SIZE + TILE_SIZE / 2,
        this.pickSpriteKey(type)
      )
      .setDisplaySize(TILE_SIZE - 4, TILE_SIZE - 4)
      .setOrigin(0.5);
  }

  destroy(): void {
    this.sprite.destroy();
  }

  private pickSpriteKey(type: FruitType): string {
    const keys = type === FruitType.GOLDEN ? GOLDEN_FRUIT_KEYS : NORMAL_FRUIT_KEYS;
    return Phaser.Utils.Array.GetRandom(keys);
  }
}
