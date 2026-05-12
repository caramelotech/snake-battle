import Phaser from 'phaser';
import { DifficultyLevel, GameMode } from '@shared/types';
import { CANVAS_WIDTH, CANVAS_HEIGHT, UI_COLORS } from '@shared/constants';
import { t, tDifficulty, tGameMode } from '@client/i18n';

interface GameOverData {
  scores: Record<string, number>;
  difficulty: DifficultyLevel;
  mode: GameMode;
  winnerId: string | null;
}

export class GameOverScene extends Phaser.Scene {
  private gameOverData: GameOverData = {
    scores: { P1: 0 },
    difficulty: DifficultyLevel.NORMAL,
    mode: GameMode.SOLO,
    winnerId: null,
  };

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
      .text(cx, CANVAS_HEIGHT / 2 - 75, this.formatResult(), {
        fontSize: '34px',
        color: UI_COLORS.TEXT,
        fontFamily: 'monospace',
        align: 'center',
      })
      .setOrigin(0.5);

    this.add
      .text(
        cx,
        CANVAS_HEIGHT / 2,
        `${t('difficultyDisplay')}: ${tDifficulty(this.gameOverData.difficulty)}`,
        {
          fontSize: '16px',
          color: '#888888',
          fontFamily: 'monospace',
        }
      )
      .setOrigin(0.5);

    this.add
      .text(cx, CANVAS_HEIGHT / 2 + 28, `${t('modeDisplay')}: ${tGameMode(this.gameOverData.mode)}`, {
        fontSize: '16px',
        color: '#888888',
        fontFamily: 'monospace',
      })
      .setOrigin(0.5);

    const restartText = this.add
      .text(cx, CANVAS_HEIGHT / 2 + 95, t('playAgain'), {
        fontSize: '22px',
        color: UI_COLORS.ACCENT,
        fontFamily: 'monospace',
      })
      .setOrigin(0.5);

    this.add
      .text(cx, CANVAS_HEIGHT / 2 + 140, t('mainMenu'), {
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
      this.scene.start('GameScene', {
        difficulty: this.gameOverData.difficulty,
        mode: this.gameOverData.mode,
      });
    });

    kb.once('keydown-ESC', () => {
      this.scene.start('MenuScene');
    });
  }

  private formatResult(): string {
    if (this.gameOverData.mode === GameMode.SOLO) {
      return `${t('score')}: ${this.gameOverData.scores.P1 ?? 0}`;
    }

    const p1Score = this.gameOverData.scores.P1 ?? 0;
    const p2Score = this.gameOverData.scores.P2 ?? 0;
    const result =
      this.gameOverData.winnerId === null
        ? t('draw')
        : `${t('winner')}: ${this.gameOverData.winnerId === 'P1' ? t('player1') : t('player2')}`;

    return `${result}\n${t('player1')} ${t('score')}: ${p1Score}\n${t('player2')} ${t(
      'score'
    )}: ${p2Score}`;
  }
}
