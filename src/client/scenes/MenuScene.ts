import Phaser from 'phaser';
import { DifficultyLevel } from '@shared/types';
import { CANVAS_WIDTH, CANVAS_HEIGHT, UI_COLORS } from '@shared/constants';
import { t, tDifficulty, cycleLocale } from '@client/i18n';

const DIFFICULTIES = Object.values(DifficultyLevel);

export function cycleDifficultyIndex(current: number, delta: number, total: number): number {
  return (current + delta + total) % total;
}

interface MenuData {
  difficultyIndex?: number;
}

export class MenuScene extends Phaser.Scene {
  private difficultyIndex = 1;
  private difficultyText!: Phaser.GameObjects.Text;

  constructor() {
    super({ key: 'MenuScene' });
  }

  init(data: MenuData): void {
    if (data?.difficultyIndex !== undefined) {
      this.difficultyIndex = data.difficultyIndex;
    }
  }

  create(): void {
    this.cameras.main.setBackgroundColor(UI_COLORS.BACKGROUND);

    const cx = CANVAS_WIDTH / 2;

    this.add
      .text(cx, 110, t('title'), {
        fontSize: '52px',
        color: UI_COLORS.ACCENT,
        fontFamily: 'monospace',
      })
      .setOrigin(0.5);

    this.add
      .text(cx, 210, t('difficultyLabel'), {
        fontSize: '16px',
        color: '#888888',
        fontFamily: 'monospace',
      })
      .setOrigin(0.5);

    this.difficultyText = this.add
      .text(cx, 245, tDifficulty(DIFFICULTIES[this.difficultyIndex]), {
        fontSize: '30px',
        color: UI_COLORS.ACCENT,
        fontFamily: 'monospace',
      })
      .setOrigin(0.5);

    this.add
      .text(cx, 280, t('difficultyHint'), {
        fontSize: '13px',
        color: '#555555',
        fontFamily: 'monospace',
      })
      .setOrigin(0.5);

    this.add
      .text(cx, 340, t('controlsMove'), {
        fontSize: '15px',
        color: UI_COLORS.TEXT,
        fontFamily: 'monospace',
      })
      .setOrigin(0.5);

    this.add
      .text(cx, 365, t('controlsPause'), {
        fontSize: '15px',
        color: UI_COLORS.TEXT,
        fontFamily: 'monospace',
      })
      .setOrigin(0.5);

    this.add
      .text(cx, 425, t('langLabel'), {
        fontSize: '16px',
        color: '#888888',
        fontFamily: 'monospace',
      })
      .setOrigin(0.5);

    this.add
      .text(cx, 455, t('langName'), {
        fontSize: '22px',
        color: UI_COLORS.TEXT,
        fontFamily: 'monospace',
      })
      .setOrigin(0.5);

    this.add
      .text(cx, 483, t('langHint'), {
        fontSize: '13px',
        color: '#555555',
        fontFamily: 'monospace',
      })
      .setOrigin(0.5);

    const startText = this.add
      .text(cx, CANVAS_HEIGHT - 70, t('pressStart'), {
        fontSize: '22px',
        color: UI_COLORS.TEXT,
        fontFamily: 'monospace',
      })
      .setOrigin(0.5);

    this.tweens.add({
      targets: startText,
      alpha: 0,
      duration: 600,
      ease: 'Linear',
      yoyo: true,
      repeat: -1,
    });

    this.setupInput();
  }

  private setupInput(): void {
    const kb = this.input.keyboard!;

    kb.on('keydown-SPACE', () => {
      this.scene.start('GameScene', { difficulty: DIFFICULTIES[this.difficultyIndex] });
    });

    kb.on('keydown-LEFT', () => this.changeDifficulty(-1));
    kb.on('keydown-RIGHT', () => this.changeDifficulty(1));
    kb.on('keydown-Q', () => this.changeDifficulty(-1));
    kb.on('keydown-E', () => this.changeDifficulty(1));
    kb.on('keydown-L', () => this.changeLanguage());
  }

  private changeDifficulty(delta: number): void {
    this.difficultyIndex = cycleDifficultyIndex(this.difficultyIndex, delta, DIFFICULTIES.length);
    this.difficultyText.setText(tDifficulty(DIFFICULTIES[this.difficultyIndex]));
  }

  private changeLanguage(): void {
    cycleLocale();
    this.scene.restart({ difficultyIndex: this.difficultyIndex });
  }
}
