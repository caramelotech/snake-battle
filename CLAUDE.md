# Claude Project Guidelines - Snake Battle

This document provides context and standards for Claude (or other AI assistants) to understand the Snake Battle project and maintain consistency when assisting with development.

## Project Overview

**Snake Battle** is a browser-based competitive snake game built with Phaser 3, Express.js, and Socket.io.

**Context:** Portfolio project developed by friends in spare time (weekends and after work). No commercial pressure. Each phase is designed to be a standalone, presentable milestone.

### Vision

A fast-paced competitive snake game where players compete locally or online, with power-ups, obstacles, and multiple difficulty levels.

### Game Mechanics

- **Modes**: Solo (Player vs self) or Local 2-Player (same keyboard)
- **Controls**: Player 1 uses WASD, Player 2 uses Arrow Keys, P to pause
- **Objective**: Collect fruits to grow, last player alive wins
- **Power-ups**: Speed Boost, Invisibility, Speed Reversal, Slice, Invert Controls, Petrify
- **Obstacles**: Static and moving blocks in Hard and Insane difficulty
- **Difficulty Levels**: Easy, Normal, Hard, Insane

### Current Phase

**Phase 0** - Technical foundation + solo player snake playable

## Technology Stack

### Frontend

- **Engine**: Phaser 3.55+ (HTML5 2D Canvas)
- **Build Tool**: Vite 4.3+ (hot module reload)
- **Language**: TypeScript 5.0+
- **Communication**: Socket.io client 4.5+

### Backend

- **Framework**: Express.js 4.18+
- **Real-time**: Socket.io 4.5+
- **Language**: TypeScript 5.0+
- **Runtime**: Node.js 18+ LTS

### Shared

- **Language**: TypeScript (both client & server)
- **Module System**: ESM (ECMAScript Modules)

### Development Tools

- **Package Manager**: npm 8+
- **Bundler**: Rollup (via Vite)
- **Linting**: ESLint 8.40+
- **Formatting**: Prettier 2.8+
- **Concurrency**: concurrently 8.0+
- **File Watching**: nodemon 2.0+
- **TypeScript Execution**: tsx 3.14+

## Architecture

### Monorepo Structure

Single `package.json` with unified TypeScript configuration. Separation by directory, not by repository.

```
src/
├── client/          # Phaser game client
├── server/          # Express API & WebSocket
└── shared/          # Types & constants (both client & server)
```

### Path Aliases

All imports use TypeScript path aliases (defined in `tsconfig.json`):

- `@client/*` → `src/client/*`
- `@server/*` → `src/server/*`
- `@shared/*` → `src/shared/*`
- `@/*` → `src/*`

```typescript
import { GameState } from "@shared/types";
import { SocketClient } from "@client/network/SocketClient";
import { config } from "@server/config";
```

### Module Resolution

- Strategy: `moduleResolution: "bundler"` (modern standard)
- Format: ESM (ESNext modules)
- Vite handles client bundling
- tsx handles server TypeScript execution

## Code Standards

### TypeScript Guidelines

```typescript
// Always use explicit types
function calculateScore(points: number): number {
  return points * 10;
}

// Interfaces for contracts/structs
interface Player {
  id: string;
  name: string;
  score: number;
}

// Types for unions and primitives
type GameMode = "solo" | "local" | "online";
type DifficultyLevel = "EASY" | "NORMAL" | "HARD" | "INSANE";

// Strict null checking - use optional chaining and nullish coalescing
const health = player?.health ?? 100;
```

Avoid `any` without an explanatory comment. Prefer `unknown` when the type is truly unknown.

### Naming Conventions

| Category  | Format           | Example                                    |
| --------- | ---------------- | ------------------------------------------ |
| Classes   | PascalCase       | `SnakeObject`, `MenuScene`, `SocketClient` |
| Functions | camelCase        | `handleInput()`, `calculateCollision()`    |
| Constants | UPPER_SNAKE_CASE | `GRID_WIDTH`, `PLAYER_SPEED`               |
| Variables | camelCase        | `isGameRunning`, `playerCount`             |
| Booleans  | `is*` or `has*`  | `isAlive`, `hasCollected`, `shouldRender`  |
| Files     | PascalCase       | `GameScene.ts`, `SocketClient.ts`          |
| Enums     | UPPER_SNAKE_CASE | `Direction.UP`, `PowerUpType.SPEED_BOOST`  |

### Comments

```typescript
// Good: explain the "why"
// Delay prevents input ghost on scene transition
const INPUT_BUFFER_MS = 100;

// Good: JSDoc on public/exported functions
/**
 * Checks if position is free of snakes, fruits and obstacles.
 * Used to validate spawn points.
 */
function isPositionFree(pos: Position, state: GameState): boolean { ... }

// Bad: obvious comments
count++; // increment count
```

### Error Handling

```typescript
// try-catch for async operations
try {
  const data = await fetch("/api/config").then((r) => r.json());
  return data;
} catch (error) {
  console.error("Failed to fetch config:", error);
  throw new Error("Configuration load failed");
}

// Validate inputs early
function createPlayer(name: string): Player {
  if (!name.trim()) throw new Error("Player name cannot be empty");
  return { id: generateId(), name, score: 0 };
}
```

### Performance

```typescript
// Cache expensive calculations - do not compute in update()
class GameScene extends Phaser.Scene {
  private gridBounds: Phaser.Geom.Rectangle;

  create(): void {
    this.gridBounds = this.physics.world.bounds;
  }

  update(): void {
    // use this.gridBounds, never recreate it here
  }
}

// Avoid object creation inside game loop or render calls
// Use object pooling for frequently created objects (particles, effects)
```

## File Organization

```
src/
├── client/
│   ├── index.ts                      # Game initialization
│   ├── config.ts                     # Difficulty-specific configs
│   ├── scenes/
│   │   ├── MenuScene.ts             # Main menu
│   │   ├── GameScene.ts             # Game loop (solo & local)
│   │   └── GameOverScene.ts         # Result screen
│   ├── objects/
│   │   ├── Snake.ts                 # Snake game object
│   │   ├── Fruit.ts                 # Fruit spawning
│   │   └── PowerUp.ts               # Power-ups (Phase 2+)
│   ├── network/
│   │   └── SocketClient.ts          # WebSocket client wrapper
│   ├── ui/
│   │   └── ScoreBoard.ts            # HUD components (Phase 1+)
│   └── types/
│       └── index.ts                 # Client-specific types
│
├── server/
│   ├── server.ts                    # Express entry point
│   ├── websocket/
│   │   └── GameServer.ts            # WebSocket game logic (Phase 4)
│   ├── routes/
│   │   ├── auth.ts                  # Authentication (Phase 4)
│   │   ├── games.ts                 # Game endpoints
│   │   └── leaderboard.ts           # Leaderboard (Phase 4)
│   ├── models/
│   │   ├── User.ts                  # User model (Phase 4)
│   │   ├── GameSession.ts           # Session tracking (Phase 4)
│   │   └── Leaderboard.ts           # Leaderboard storage (Phase 4)
│   └── types/
│       └── index.ts                 # Server-specific types
│
└── shared/
    ├── types.ts                     # All shared game types and enums
    ├── constants.ts                 # Game balancing constants
    └── config.ts                    # Configuration management
```

One class per file. Each scene and game object gets its own file.

### Import Order

```typescript
// 1. External packages
import express from "express";
import { Server as SocketIOServer } from "socket.io";

// 2. Shared
import { GameState, Player } from "@shared/types";
import { GRID_WIDTH, TILE_SIZE } from "@shared/constants";

// 3. Internal (same layer)
import { MenuScene } from "@client/scenes/MenuScene";
```

## Development Workflow

```bash
# Development (hot reload)
npm run dev              # Both server & client
npm run server:dev       # Server only
npm run client:dev       # Client only

# Code Quality
npm run lint             # ESLint check
npm run lint -- --fix    # ESLint with auto-fix
npm run format           # Prettier formatting

# Build & Production
npm run build            # Full build
npm run start            # Start production build
```

### Git Workflow

**Branch Naming:**

```
feature/short-description
fix/short-description
docs/short-description
refactor/short-description
```

**Commit Messages (Conventional Commits):**

```
feat(gamescene): implement collision detection
fix(snake): prevent 180-degree reversal on same tick
docs: update development phases
refactor(socket): simplify event handling
```

**Development Cycle:**

1. Create branch from `main`
2. Make atomic commits
3. Run `npm run lint` and `npm run format`
4. Test with `npm run dev`
5. Create PR with description
6. Merge when reviewed

## Common Patterns

### Phaser Scene

```typescript
export class GameScene extends Phaser.Scene {
  private snakes: Map<string, Snake> = new Map();
  private fruits: Fruit[] = [];
  private isRunning = false;

  constructor() {
    super({ key: "GameScene" });
  }

  create(): void {
    this.isRunning = true;
    this.setupInput();
    this.spawnInitialFruits();
  }

  update(_time: number, _delta: number): void {
    if (!this.isRunning) return;
    // tick-based logic is handled by a timer, not update()
  }

  private setupInput(): void { ... }
}
```

### Game Object

```typescript
export class Snake extends Phaser.GameObjects.Container {
  private segments: SnakeSegment[] = [];
  private direction: Direction = Direction.RIGHT;
  private nextDirection: Direction = Direction.RIGHT;

  constructor(scene: Phaser.Scene, x: number, y: number, id: string) {
    super(scene, x, y);
    this.initialize(id);
  }

  move(): void { ... }
  grow(): void { ... }

  setDirection(direction: Direction): void {
    // Prevent 180-degree reversal
    if (!isOpposite(direction, this.direction)) {
      this.nextDirection = direction;
    }
  }
}
```

## Guidelines for AI Assistance

### Architecture Decisions

- **Shared types and constants**: always in `src/shared/`, never duplicated client/server
- **Game state authority**: server is authoritative in online mode; client simulates locally in offline mode
- **Path aliases required**: never use relative paths across layers (`../../shared/` is wrong)
- **One concern per file**: scenes handle rendering, objects handle state, network handles communication

### When Writing Code

- Use existing types from `src/shared/types.ts` before creating new ones
- Reference constants from `src/shared/constants.ts` instead of hardcoding values
- Follow the patterns in existing files (e.g., `SocketClient.ts` for network, `config.ts` for difficulty)
- Do not add online/server features to files that currently handle offline gameplay only

### Priorities

1. **Type Safety** over runtime flexibility
2. **Code Readability** over clever brevity
3. **Existing patterns** over introducing new conventions
4. **Performance awareness** in game loop code (avoid object creation per frame)

### What to Avoid

- `any` type without an explanatory comment
- Creating files outside the documented structure
- Adding online/Phase 4 scaffolding when working on Phase 0-3 gameplay
- Hardcoding values that belong in `constants.ts`
- Skipping null checks on player input or socket events

## Shared Types Reference

Key types in `src/shared/types.ts`. Read the file for the full picture.

```typescript
// Enums
enum Direction {
  UP,
  DOWN,
  LEFT,
  RIGHT,
}
enum FruitType {
  APPLE,
  GOLDEN,
} // APPLE: +1 segment, GOLDEN: +2
enum PowerUpType {
  SPEED_BOOST,
  INVISIBILITY,
  SPEED_REVERSAL, // Phase 2
  SLICE,
  INVERT_CONTROLS,
  PETRIFY, // Phase 3
}
enum ObstacleType {
  STATIC,
  MOVING,
  PORTAL,
}
enum DifficultyLevel {
  EASY,
  NORMAL,
  HARD,
  INSANE,
}

// Core interfaces
interface SnakeSegment {
  x: number;
  y: number;
}

interface Snake {
  id: string;
  playerId: string;
  segments: SnakeSegment[];
  direction: Direction;
  color: string;
  isAlive: boolean;
}

interface Fruit {
  x: number;
  y: number;
  type: FruitType;
}

interface PowerUp {
  id: string;
  type: PowerUpType;
  x: number;
  y: number;
  duration: number;
  isActive: boolean;
}

interface GameState {
  snakes: Snake[];
  fruits: Fruit[];
  powerUps: PowerUp[];
  obstacles: Obstacle[];
  scores: Record<string, number>;
  tick: number;
}
```

## Game Constants Reference

Key constants in `src/shared/constants.ts`. Read the file for full details.

```typescript
// Grid
GRID_WIDTH = 20; // tiles
GRID_HEIGHT = 20; // tiles
TILE_SIZE = 32; // px per tile
CANVAS_WIDTH = 640; // px (GRID_WIDTH * TILE_SIZE)
CANVAS_HEIGHT = 640; // px

// Snake starting positions
P1_START = { x: 5, y: 10 };
P2_START = { x: 15, y: 10 };
INITIAL_LENGTH = 3;

// Tick speed (ms per move) - lower = faster
GAME_SPEEDS = { EASY: 150, NORMAL: 100, HARD: 80, INSANE: 60 };

// Fruits simultaneously on map
FRUITS_COUNT = { EASY: 3, NORMAL: 2, HARD: 1, INSANE: 1 };

// Power-ups
POWER_UP_SPAWN_CHANCE = 0.15; // 15% on fruit eaten
// Individual durations and duration modifiers per difficulty
// are in POWER_UP_DURATIONS and POWER_UP_DURATION_MODIFIERS

// Obstacles (activated Phase 3+)
OBSTACLE_COUNTS = { EASY: 0, NORMAL: 0, HARD: 8, INSANE: 17 };
MOVING_OBSTACLE_COUNTS = { EASY: 0, NORMAL: 0, HARD: 0, INSANE: 2 };

// Colors
PLAYER_COLORS = { P1: "#00FF00", P2: "#FF00FF" };
```

## Development Phases

See `docs/plano-de-desenvolvimento.md` for the full plan with deliverables and completion criteria.

| Phase | Name                        | Focus                                       | Status   |
| ----- | --------------------------- | ------------------------------------------- | -------- |
| 0     | Foundation + Single Player  | Build pipeline, scenes, solo snake playable | Current  |
| 1     | Local Multiplayer           | 2-player local, 4 difficulty levels         | Planned  |
| 2     | Powers Set 1 + Polish       | Speed Boost, Invisibility, Speed Reversal   | Planned  |
| 3     | Powers Set 2 + Obstacles    | Slice, Invert Controls, Petrify + obstacles | Planned  |
| 4     | Online, Skins & Leaderboard | Multiplayer online, cosmetics, deploy       | Optional |
| 5     | Post-launch                 | Iteration based on real usage               | If live  |

When making changes, consider which phase they support. Do not scaffold Phase 4+ features when working on Phase 0-3.

## References

- **Game Design Document**: `docs/snake-battle.md`
- **Development Plan**: `docs/plano-de-desenvolvimento.md`
- **Contribution Guide**: `.github/CONTRIBUTING.md`
- **Pull Request Template**: `.github/pull_request_template.md`
- **Setup Guide**: `docs/SETUP.md`
