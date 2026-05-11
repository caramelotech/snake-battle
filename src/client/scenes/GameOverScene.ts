import Phaser from 'phaser';
import { DifficultyLevel } from '@shared/types';
import { CANVAS_WIDTH, CANVAS_HEIGHT, UI_COLORS } from '@shared/constants';
import { t, tDifficulty } from '@client/i18n';

interface GameOverData {
  score: number;
  difficulty: DifficultyLevel;
}

export class GameOverScene extends Phaser.Scene {
  private gameOverData: GameOverData = { score: 0, difficulty: DifficultyLevel.NORMAL };

  constructor() {
    super({ key: 'GameOverScene' });
  }

  init(data: GameOverData): void {
    this.gameOverData = data;
  }

  create(): void {
    this.cameras.main.setBackgroundColor(UI_COLORS.BACKGROUND);

    const cx = CANVAS_WIDTH / 2;

    this.add
      .text(cx, CANVAS_HEIGHT / 2 - 160, t('gameOver'), {
        fontSize: '52px',
        color: UI_COLORS.WARNING,
        fontFamily: 'monospace',
      })
      .setOrigin(0.5);

    this.add
      .text(cx, CANVAS_HEIGHT / 2 - 60, `${t('score')}: ${this.gameOverData.score}`, {
        fontSize: '34px',
        color: UI_COLORS.TEXT,
        fontFamily: 'monospace',
      })
      .setOrigin(0.5);

    this.add
      .text(
        cx,
        CANVAS_HEIGHT / 2 - 10,
        `${t('difficultyDisplay')}: ${tDifficulty(this.gameOverData.difficulty)}`,
        {
          fontSize: '16px',
          color: '#888888',
          fontFamily: 'monospace',
        }
      )
      .setOrigin(0.5);

    const restartText = this.add
      .text(cx, CANVAS_HEIGHT / 2 + 80, t('playAgain'), {
        fontSize: '22px',
        color: UI_COLORS.ACCENT,
        fontFamily: 'monospace',
      })
      .setOrigin(0.5);

    this.add
      .text(cx, CANVAS_HEIGHT / 2 + 125, t('mainMenu'), {
        fontSize: '22px',
        color: UI_COLORS.TEXT,
        fontFamily: 'monospace',
      })
      .setOrigin(0.5);

    this.tweens.add({
      targets: restartText,
      alpha: 0,
      duration: 600,
      ease: 'Linear',
      yoyo: true,
      repeat: -1,
    });

    const kb = this.input.keyboard!;

    kb.once('keydown-SPACE', () => {
      this.scene.start('GameScene', { difficulty: this.gameOverData.difficulty });
    });

    kb.once('keydown-ESC', () => {
      this.scene.start('MenuScene');
    });
  }
}
