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
  selectedOptionIndex?: number;
}

type MenuOptionId = 'difficulty' | 'mode' | 'language';

interface MenuOptionView {
  id: MenuOptionId;
  y: number;
  labelKey: 'difficultyLabel' | 'modeLabel' | 'langLabel';
  valueText: Phaser.GameObjects.Text;
  labelText: Phaser.GameObjects.Text;
  box: Phaser.GameObjects.Rectangle;
  cursor: Phaser.GameObjects.Text;
}

export class MenuScene extends Phaser.Scene {
  private difficultyIndex = 1;
  private modeIndex = 0;
  private selectedOptionIndex = 0;
  private difficultyText!: Phaser.GameObjects.Text;
  private modeText!: Phaser.GameObjects.Text;
  private languageText!: Phaser.GameObjects.Text;
  private optionViews: MenuOptionView[] = [];

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
    if (data?.selectedOptionIndex !== undefined) {
      this.selectedOptionIndex = data.selectedOptionIndex;
    }
  }

  create(): void {
    this.optionViews = [];
    this.cameras.main.setBackgroundColor('#5c94fc');

    const cx = CANVAS_WIDTH / 2;

    this.drawRetroBackdrop();

    this.add
      .text(cx, 76, t('title'), {
        fontSize: '48px',
        color: '#fff6d6',
        fontFamily: 'monospace',
        stroke: '#2b1a4a',
        strokeThickness: 8,
      })
      .setOrigin(0.5);

    this.add
      .text(cx, 126, 'RETRO SNAKE ARENA', {
        fontSize: '16px',
        color: '#2b1a4a',
        fontFamily: 'monospace',
        backgroundColor: '#ffd447',
        padding: { x: 12, y: 4 },
      })
      .setOrigin(0.5);

    this.difficultyText = this.createOption(
      0,
      'difficulty',
      214,
      'difficultyLabel',
      tDifficulty(DIFFICULTIES[this.difficultyIndex])
    );
    this.modeText = this.createOption(
      1,
      'mode',
      298,
      'modeLabel',
      tGameMode(GAME_MODES[this.modeIndex])
    );
    this.languageText = this.createOption(2, 'language', 382, 'langLabel', t('langName'));

    this.add
      .text(cx, 454, '< UP / DOWN > SELECT     < LEFT / RIGHT > CHANGE', {
        fontSize: '14px',
        color: '#fff6d6',
        fontFamily: 'monospace',
        stroke: '#2b1a4a',
        strokeThickness: 4,
      })
      .setOrigin(0.5);

    this.add
      .text(cx, 486, `${t('controlsMove')}     ${t('controlsPause')}`, {
        fontSize: '14px',
        color: '#ffffff',
        fontFamily: 'monospace',
        stroke: '#2b1a4a',
        strokeThickness: 4,
      })
      .setOrigin(0.5);

    const startText = this.add
      .text(cx, CANVAS_HEIGHT - 45, t('pressStart'), {
        fontSize: '22px',
        color: '#ffd447',
        fontFamily: 'monospace',
        stroke: '#2b1a4a',
        strokeThickness: 5,
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

    this.updateSelection();
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

    kb.on('keydown-ENTER', () => {
      this.scene.start('GameScene', {
        difficulty: DIFFICULTIES[this.difficultyIndex],
        mode: GAME_MODES[this.modeIndex],
      });
    });

    kb.on('keydown-UP', () => this.changeSelection(-1));
    kb.on('keydown-DOWN', () => this.changeSelection(1));
    kb.on('keydown-LEFT', () => this.changeCurrentOption(-1));
    kb.on('keydown-RIGHT', () => this.changeCurrentOption(1));
    kb.on('keydown-Q', () => this.changeDifficulty(-1));
    kb.on('keydown-E', () => this.changeDifficulty(1));
    kb.on('keydown-A', () => this.changeMode(-1));
    kb.on('keydown-D', () => this.changeMode(1));
    kb.on('keydown-L', () => this.changeLanguage());
  }

  private changeDifficulty(delta: number): void {
    this.difficultyIndex = cycleDifficultyIndex(this.difficultyIndex, delta, DIFFICULTIES.length);
    this.difficultyText.setText(tDifficulty(DIFFICULTIES[this.difficultyIndex]));
    this.pulseSelectedValue();
  }

  private changeMode(delta: number): void {
    this.modeIndex = cycleDifficultyIndex(this.modeIndex, delta, GAME_MODES.length);
    this.modeText.setText(tGameMode(GAME_MODES[this.modeIndex]));
    this.pulseSelectedValue();
  }

  private changeLanguage(): void {
    cycleLocale();
    this.scene.restart({
      difficultyIndex: this.difficultyIndex,
      modeIndex: this.modeIndex,
      selectedOptionIndex: this.selectedOptionIndex,
    });
  }

  private changeSelection(delta: number): void {
    this.selectedOptionIndex = cycleDifficultyIndex(
      this.selectedOptionIndex,
      delta,
      this.optionViews.length
    );
    this.updateSelection();
  }

  private changeCurrentOption(delta: number): void {
    const option = this.optionViews[this.selectedOptionIndex];
    if (option.id === 'difficulty') {
      this.changeDifficulty(delta);
      return;
    }
    if (option.id === 'mode') {
      this.changeMode(delta);
      return;
    }
    this.changeLanguage();
  }

  private createOption(
    index: number,
    id: MenuOptionId,
    y: number,
    labelKey: 'difficultyLabel' | 'modeLabel' | 'langLabel',
    value: string
  ): Phaser.GameObjects.Text {
    const cx = CANVAS_WIDTH / 2;
    const box = this.add
      .rectangle(cx, y, 430, 62, 0x2b1a4a, 0.88)
      .setStrokeStyle(4, 0xffd447)
      .setOrigin(0.5);

    const labelText = this.add
      .text(cx - 176, y - 12, t(labelKey), {
        fontSize: '14px',
        color: '#ff8c42',
        fontFamily: 'monospace',
      })
      .setOrigin(0, 0.5);

    const valueText = this.add
      .text(cx + 176, y + 10, value, {
        fontSize: '24px',
        color: '#fff6d6',
        fontFamily: 'monospace',
        stroke: '#000000',
        strokeThickness: 3,
      })
      .setOrigin(1, 0.5);

    const cursor = this.add
      .text(cx - 238, y, '>', {
        fontSize: '32px',
        color: '#ffd447',
        fontFamily: 'monospace',
        stroke: '#2b1a4a',
        strokeThickness: 3,
      })
      .setOrigin(0.5)
      .setVisible(false);

    this.optionViews[index] = { id, y, labelKey, valueText, labelText, box, cursor };
    return valueText;
  }

  private updateSelection(): void {
    this.optionViews.forEach((option, index) => {
      const isSelected = index === this.selectedOptionIndex;
      option.cursor.setVisible(isSelected);
      option.box.setFillStyle(isSelected ? 0x462a73 : 0x2b1a4a, isSelected ? 0.96 : 0.88);
      option.box.setStrokeStyle(4, isSelected ? 0xfff6d6 : 0xffd447);
      option.labelText.setColor(isSelected ? '#ffd447' : '#ff8c42');
      option.valueText.setColor(isSelected ? '#ffffff' : '#fff6d6');
    });
  }

  private pulseSelectedValue(): void {
    const option = this.optionViews[this.selectedOptionIndex];
    this.tweens.add({
      targets: option.valueText,
      scale: 1.12,
      duration: 80,
      ease: 'Quad.easeOut',
      yoyo: true,
    });
  }

  private drawRetroBackdrop(): void {
    this.drawCloud(74, 64);
    this.drawCloud(520, 96);
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
