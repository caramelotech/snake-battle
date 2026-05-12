import Phaser from 'phaser';
import { UI_COLORS } from '@shared/constants';
import { TranslationKey, t } from '@client/i18n';

interface ScoreEntry {
  id: string;
  labelKey: TranslationKey;
}

export class ScoreBoard {
  private scoreText: Phaser.GameObjects.Text;
  private readonly scores: Record<string, number> = {};
  private readonly entries: ScoreEntry[];

  constructor(scene: Phaser.Scene, x: number, y: number, entries: ScoreEntry[]) {
    this.entries = entries;
    this.entries.forEach((entry) => {
      this.scores[entry.id] = 0;
    });

    this.scoreText = scene.add
      .text(x, y, this.formatScore(), {
        fontSize: '18px',
        color: UI_COLORS.TEXT,
        fontFamily: 'monospace',
        backgroundColor: UI_COLORS.SCOREBOARD_BG,
        padding: { x: 8, y: 4 },
      })
      .setDepth(10);
  }

  add(playerId: string, points: number): void {
    if (points <= 0) return;
    this.scores[playerId] += points;
    this.scoreText.setText(this.formatScore());
  }

  getScore(playerId: string): number {
    return this.scores[playerId] ?? 0;
  }

  getScores(): Record<string, number> {
    return { ...this.scores };
  }

  destroy(): void {
    this.scoreText.destroy();
  }

  private formatScore(): string {
    return this.entries
      .map((entry) => `${t(entry.labelKey)} ${t('score')}: ${this.scores[entry.id]}`)
      .join('\n');
  }
}
