import Phaser from 'phaser';
import { DifficultyLevel, GameMode } from '@shared/types';
import { CANVAS_WIDTH, CANVAS_HEIGHT, UI_COLORS } from '@shared/constants';
import { t, tDifficulty, tGameMode, cycleLocale } from '@client/i18n';

const DIFFICULTIES = Object.values(DifficultyLevel);
const GAME_MODES = Object.values(GameMode);

export function cycleDifficultyIndex(current: number, delta: number, total: number): number {
  return (current + delta + total) % total;
}

interface MenuData {
  difficultyIndex?: number;
  modeIndex?: number;
}

export class MenuScene extends Phaser.Scene {
  private difficultyIndex = 1;
  private modeIndex = 0;
  private difficultyText!: Phaser.GameObjects.Text;
  private modeText!: Phaser.GameObjects.Text;

  constructor() {
    super({ key: 'MenuScene' });
  }

  init(data: MenuData): void {
    if (data?.difficultyIndex !== undefined) {
      this.difficultyIndex = data.difficultyIndex;
    }
    if (data?.modeIndex !== undefined) {
      this.modeIndex = data.modeIndex;
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
      .text(cx, 320, t('modeLabel'), {
        fontSize: '16px',
        color: '#888888',
        fontFamily: 'monospace',
      })
      .setOrigin(0.5);

    this.modeText = this.add
      .text(cx, 350, tGameMode(GAME_MODES[this.modeIndex]), {
        fontSize: '26px',
        color: UI_COLORS.ACCENT,
        fontFamily: 'monospace',
      })
      .setOrigin(0.5);

    this.add
      .text(cx, 380, t('modeHint'), {
        fontSize: '13px',
        color: '#555555',
        fontFamily: 'monospace',
      })
      .setOrigin(0.5);

    this.add
      .text(cx, 430, t('controlsMove'), {
        fontSize: '15px',
        color: UI_COLORS.TEXT,
        fontFamily: 'monospace',
      })
      .setOrigin(0.5);

    this.add
      .text(cx, 455, t('controlsPause'), {
        fontSize: '15px',
        color: UI_COLORS.TEXT,
        fontFamily: 'monospace',
      })
      .setOrigin(0.5);

    this.add
      .text(cx, 500, t('langLabel'), {
        fontSize: '16px',
        color: '#888888',
        fontFamily: 'monospace',
      })
      .setOrigin(0.5);

    this.add
      .text(cx, 527, t('langName'), {
        fontSize: '20px',
        color: UI_COLORS.TEXT,
        fontFamily: 'monospace',
      })
      .setOrigin(0.5);

    this.add
      .text(cx, 552, t('langHint'), {
        fontSize: '13px',
        color: '#555555',
        fontFamily: 'monospace',
      })
      .setOrigin(0.5);

    const startText = this.add
      .text(cx, CANVAS_HEIGHT - 45, t('pressStart'), {
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
      this.scene.start('GameScene', {
        difficulty: DIFFICULTIES[this.difficultyIndex],
        mode: GAME_MODES[this.modeIndex],
      });
    });

    kb.on('keydown-LEFT', () => this.changeDifficulty(-1));
    kb.on('keydown-RIGHT', () => this.changeDifficulty(1));
    kb.on('keydown-Q', () => this.changeDifficulty(-1));
    kb.on('keydown-E', () => this.changeDifficulty(1));
    kb.on('keydown-A', () => this.changeMode(-1));
    kb.on('keydown-D', () => this.changeMode(1));
    kb.on('keydown-L', () => this.changeLanguage());
  }

  private changeDifficulty(delta: number): void {
    this.difficultyIndex = cycleDifficultyIndex(this.difficultyIndex, delta, DIFFICULTIES.length);
    this.difficultyText.setText(tDifficulty(DIFFICULTIES[this.difficultyIndex]));
  }

  private changeMode(delta: number): void {
    this.modeIndex = cycleDifficultyIndex(this.modeIndex, delta, GAME_MODES.length);
    this.modeText.setText(tGameMode(GAME_MODES[this.modeIndex]));
  }

  private changeLanguage(): void {
    cycleLocale();
    this.scene.restart({ difficultyIndex: this.difficultyIndex, modeIndex: this.modeIndex });
  }
}
