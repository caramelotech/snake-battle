import Phaser from 'phaser';
import { DifficultyLevel, GameMode } from '@shared/types';
import { CANVAS_WIDTH, CANVAS_HEIGHT } from '@shared/constants';
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
    this.cameras.main.setBackgroundColor('#5c94fc');

    const cx = CANVAS_WIDTH / 2;

    this.drawRetroBackdrop();

    this.add
      .text(cx, 78, t('gameOver'), {
        fontSize: '52px',
        color: '#ff4f4f',
        fontFamily: 'monospace',
        stroke: '#2b1a4a',
        strokeThickness: 8,
      })
      .setOrigin(0.5);

    this.add
      .text(cx, 128, 'FINAL SCORE', {
        fontSize: '16px',
        color: '#2b1a4a',
        fontFamily: 'monospace',
        backgroundColor: '#ffd447',
        padding: { x: 12, y: 4 },
      })
      .setOrigin(0.5);

    this.add
      .rectangle(cx, 300, 456, 266, 0x2b1a4a, 0.94)
      .setStrokeStyle(5, 0xffd447)
      .setOrigin(0.5);

    this.add.rectangle(cx, 184, 392, 42, 0x462a73, 1).setStrokeStyle(3, 0xfff6d6).setOrigin(0.5);

    this.add
      .text(cx, 184, this.formatResultTitle(), {
        fontSize: '26px',
        color: '#fff6d6',
        fontFamily: 'monospace',
        align: 'center',
        stroke: '#000000',
        strokeThickness: 3,
      })
      .setOrigin(0.5);

    this.drawScoreRows(cx);

    this.add
      .text(cx, 366, `${t('difficultyDisplay')}: ${tDifficulty(this.gameOverData.difficulty)}`, {
        fontSize: '15px',
        color: '#ffd447',
        fontFamily: 'monospace',
        stroke: '#000000',
        strokeThickness: 2,
      })
      .setOrigin(0.5);

    this.add
      .text(cx, 394, `${t('modeDisplay')}: ${tGameMode(this.gameOverData.mode)}`, {
        fontSize: '15px',
        color: '#ffd447',
        fontFamily: 'monospace',
        stroke: '#000000',
        strokeThickness: 2,
      })
      .setOrigin(0.5);

    const restartText = this.createActionButton(cx, 470, t('playAgain'), true);

    this.createActionButton(cx, 528, t('mainMenu'), false);

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

  private formatResultTitle(): string {
    if (this.gameOverData.mode === GameMode.SOLO) {
      return t('score');
    }

    if (this.gameOverData.winnerId === null) {
      return t('draw');
    }

    return `${t('winner')}: ${this.gameOverData.winnerId === 'P1' ? t('player1') : t('player2')}`;
  }

  private drawScoreRows(cx: number): void {
    if (this.gameOverData.mode === GameMode.SOLO) {
      this.createScoreRow(cx, 258, t('score'), this.gameOverData.scores.P1 ?? 0);
      return;
    }

    this.createScoreRow(cx, 246, `${t('player1')} ${t('score')}`, this.gameOverData.scores.P1 ?? 0);
    this.createScoreRow(cx, 304, `${t('player2')} ${t('score')}`, this.gameOverData.scores.P2 ?? 0);
  }

  private createScoreRow(cx: number, y: number, label: string, score: number): void {
    this.add.rectangle(cx, y, 342, 42, 0x1f153a, 1).setStrokeStyle(2, 0xff8c42).setOrigin(0.5);

    this.add
      .text(cx - 150, y, label, {
        fontSize: '17px',
        color: '#ff8c42',
        fontFamily: 'monospace',
      })
      .setOrigin(0, 0.5);

    this.add
      .text(cx + 150, y, String(score), {
        fontSize: '24px',
        color: '#ffffff',
        fontFamily: 'monospace',
        stroke: '#000000',
        strokeThickness: 3,
      })
      .setOrigin(1, 0.5);
  }

  private createActionButton(
    x: number,
    y: number,
    label: string,
    isPrimary: boolean
  ): Phaser.GameObjects.Text {
    this.add
      .rectangle(x, y, 380, 42, isPrimary ? 0xffd447 : 0x462a73, 1)
      .setStrokeStyle(3, isPrimary ? 0xfff6d6 : 0xffd447)
      .setOrigin(0.5);

    return this.add
      .text(x, y, label, {
        fontSize: '20px',
        color: isPrimary ? '#2b1a4a' : '#fff6d6',
        fontFamily: 'monospace',
        stroke: isPrimary ? '#fff6d6' : '#000000',
        strokeThickness: isPrimary ? 2 : 3,
      })
      .setOrigin(0.5);
  }

  private drawRetroBackdrop(): void {
    this.drawCloud(70, 62);
    this.drawCloud(514, 94);
    this.drawHills();
    this.drawBrickFloor();
  }

  private drawCloud(x: number, y: number): void {
    const graphics = this.add.graphics();
    graphics.fillStyle(0xffffff, 0.95);
    graphics.fillRect(x, y + 14, 84, 18);
    graphics.fillRect(x + 18, y, 28, 18);
    graphics.fillRect(x + 46, y + 6, 28, 18);
  }

  private drawHills(): void {
    const graphics = this.add.graphics();
    graphics.fillStyle(0x4ebf4a, 1);
    graphics.fillTriangle(0, 570, 112, 386, 230, 570);
    graphics.fillTriangle(404, 570, 512, 402, 640, 570);
    graphics.fillStyle(0x2a8f3a, 1);
    graphics.fillTriangle(80, 570, 232, 430, 386, 570);
  }

  private drawBrickFloor(): void {
    const graphics = this.add.graphics();
    for (let y = 576; y < CANVAS_HEIGHT; y += 32) {
      for (let x = 0; x < CANVAS_WIDTH; x += 32) {
        const offset = y % 64 === 0 ? 16 : 0;
        graphics.fillStyle(0x8f3b1f, 1);
        graphics.fillRect(x - offset, y, 30, 30);
        graphics.fillStyle(0xc55a2e, 1);
        graphics.fillRect(x - offset + 2, y + 2, 26, 26);
      }
    }
  }
}
