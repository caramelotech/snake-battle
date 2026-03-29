# 🤖 Claude Project Guidelines - Snake Battle

This document provides context and standards for Claude (or other AI assistants) to understand the Snake Battle project and maintain consistency when assisting with development.

## 📋 Table of Contents

1. [Project Overview](#project-overview)
2. [Technology Stack](#technology-stack)
3. [Architecture](#architecture)
4. [Code Standards](#code-standards)
5. [File Organization](#file-organization)
6. [Development Workflow](#development-workflow)
7. [Common Patterns](#common-patterns)
8. [Guidelines for AI Assistance](#guidelines-for-ai-assistance)

---

## 📌 Project Overview

**Snake Battle** is a browser-based multiplayer snake game built with Phaser 3, Express.js, and Socket.io.

### Vision

Create a fast-paced, competitive snake game where two players compete locally or online, with power-ups, obstacles, and multiple difficulty levels.

### Game Mechanics

- **2 Players** compete simultaneously on same board
- **Snake Controls**: Player 1 uses WASD, Player 2 uses Arrow Keys
- **Objective**: Collect fruits to grow, last player alive wins
- **Power-ups**: Shield, Speed Boost, Freeze Enemy, Ghost Mode, Size Reduction
- **Obstacles**: Appear in higher difficulties
- **Difficulty Levels**: Easy, Normal, Hard, Extreme

### Current Phase

**Phase 1: MVP** - Local multiplayer support with core gameplay

---

## 🛠️ Technology Stack

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

### DevOps

- **Environment**: .env.example (dotenv)
- **Version Control**: Git
- **CI/CD**: GitHub Actions (planned)

---

## 🏗️ Architecture

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

**Usage:**

```typescript
import { GameState } from "@shared/types";
import { SocketClient } from "@client/network/SocketClient";
import { config } from "@server/server";
```

### Module Resolution

- Strategy: `moduleResolution: "bundler"` (modern standard)
- Format: ESM (ESNext modules)
- Vite handles client bundling
- tsx handles server TypeScript execution

---

## 📐 Code Standards

### TypeScript Guidelines

#### Type Safety

```typescript
// ✅ ALWAYS use explicit types
function calculateScore(points: number): number {
  return points * 10;
}

// ❌ AVOID using 'any' unless absolutely necessary
function calculateScore(points: any) {
  return points * 10;
}
```

#### Interfaces vs Types

```typescript
// ✅ Use interfaces for contracts/structs
interface Player {
  id: string;
  name: string;
  score: number;
}

// ✅ Use types for unions, primitives
type GameMode = "local" | "online";
type Difficulty = "easy" | "normal" | "hard" | "extreme";
```

#### Null Safety

```typescript
// ✅ Use strict null checking (enforced via tsconfig)
const score: number | null = null;
if (score !== null) {
  console.log(score);
}

// ✅ Use optional chaining & nullish coalescing
const health = player?.health ?? 100;
```

### Naming Conventions

| Category  | Format                   | Example                                    |
| --------- | ------------------------ | ------------------------------------------ |
| Classes   | PascalCase               | `SnakeObject`, `MenuScene`, `SocketClient` |
| Functions | camelCase                | `handleInput()`, `calculateCollision()`    |
| Constants | UPPER_SNAKE_CASE         | `GRID_WIDTH`, `PLAYER_SPEED`, `MAX_SNAKES` |
| Variables | camelCase                | `isGameRunning`, `playerCount`             |
| Booleans  | `is*` or `has*`          | `isAlive`, `hasCollected`, `shouldRender`  |
| Files     | kebab-case or PascalCase | `socket-client.ts` or `SocketClient.ts`    |
| Exports   | Match declaration        | `export class MenuScene {}`                |

### Comments & Documentation

```typescript
// ✅ GOOD: Explain the "why"
// Delaying fruit spawn prevents lag when game starts
const FRUIT_SPAWN_DELAY = 500;

// ✅ GOOD: Document complex logic
/**
 * Calculates collision between snake head and game obstacles
 * @param snakeHead - Position of snake head
 * @param obstacles - Array of obstacle positions
 * @returns true if collision detected
 */
function checkCollision(snakeHead: Position, obstacles: Position[]): boolean {
  // ...
}

// ❌ BAD: Obvious comments
// Increment count
count++;

// ❌ BAD: No JSDoc for public functions
function importantLogic() {}
```

### Error Handling

```typescript
// ✅ Use try-catch for async operations
try {
  const response = await fetch("/api/config");
  const data = await response.json();
  return data;
} catch (error) {
  console.error("Failed to fetch config:", error);
  throw new Error("Configuration load failed");
}

// ✅ Validate inputs early
function createPlayer(name: string): Player {
  if (!name || name.trim().length === 0) {
    throw new Error("Player name cannot be empty");
  }
  return { id: generateId(), name, score: 0 };
}
```

### Performance Considerations

```typescript
// ✅ Cache expensive calculations
class GameScene extends Phaser.Scene {
  private cachedBounds: Phaser.Geom.Rectangle;

  preload() {
    this.cachedBounds = this.physics.world.bounds;
  }
}

// ✅ Avoid creating objects in loops
const snakes: Snake[] = [];
for (const id of playerIds) {
  snakes.push(new Snake(id)); // Object created once
}

// ❌ DON'T create objects repeatedly in render loop
update(): void {
  // DON'T do this - creates new object every frame!
  const bounds = { x: 0, y: 0, width: 640, height: 640 };
}
```

---

## 📁 File Organization

### Directory Structure

```
src/
├── client/
│   ├── index.ts                      # Game initialization
│   ├── config.ts                     # Difficulty-specific configs
│   ├── scenes/
│   │   ├── MenuScene.ts             # Main menu
│   │   ├── GameScene.ts             # Local multiplayer game
│   │   └── GameOverScene.ts         # Game over screen
│   ├── objects/
│   │   ├── Snake.ts                 # Snake game object
│   │   ├── Fruit.ts                 # Fruit spawning
│   │   └── PowerUp.ts               # Power-ups (Phase 2)
│   ├── network/
│   │   └── SocketClient.ts          # WebSocket client wrapper
│   ├── ui/
│   │   └── ScoreBoard.ts            # UI components (Phase 3)
│   └── types/
│       └── index.ts                 # Client-specific types
│
├── server/
│   ├── server.ts                    # Express entry point
│   ├── websocket/
│   │   └── GameServer.ts            # WebSocket game logic
│   ├── routes/
│   │   ├── auth.ts                  # Authentication (Phase 5)
│   │   ├── games.ts                 # Game endpoints
│   │   └── leaderboard.ts           # Leaderboard endpoints
│   ├── models/
│   │   ├── User.ts                  # User model
│   │   ├── GameSession.ts           # Game session tracking
│   │   └── Leaderboard.ts           # Leaderboard storage
│   ├── controllers/
│   │   └── ...                      # Request handlers (Phase 5+)
│   ├── middleware/
│   │   └── ...                      # Auth, logging (Phase 5+)
│   └── types/
│       └── index.ts                 # Server-specific types
│
└── shared/
    ├── types.ts                     # Shared game types
    ├── constants.ts                 # Game balancing constants
    └── config.ts                    # Configuration management
```

### One File Per Class

- Each Phaser scene gets its own file
- Each game object gets its own file
- Utilities grouped in `utils/` or `helpers/`

### Importing in Files

```typescript
// ✅ DO: Organize imports
// External
import express from "express";
import { Server as SocketIOServer } from "socket.io";

// Shared
import { GameState, Player } from "@shared/types";
import { GRID_WIDTH, TILE_SIZE } from "@shared/constants";

// Internal
import { MenuScene } from "@client/scenes/MenuScene";

// ❌ DON'T: Mix import styles or disorder
import x from "y";
import SomeLocal from "./local";
import { z } from "./another";
```

---

## 🔄 Development Workflow

### Running the Project

```bash
# Development (hot reload)
npm run dev              # Both server & client
npm run server:dev      # Server only
npm run client:dev      # Client only

# Code Quality
npm run lint            # ESLint check
npm run format          # Prettier formatting
npm run lint -- --fix   # ESLint with auto-fix

# Building
npm run build           # Full build
npm run build:server    # Server build only
npm run build:client    # Client build only
npm run start           # Start production build
```

### Git Workflow

**Branch Naming:**

```
feature/short-description      # New features
fix/short-description          # Bug fixes
docs/short-description         # Documentation
refactor/short-description     # Code refactoring
```

**Commit Messages (Conventional Commits):**

```
feat(gamescene): implement collision detection
fix(network): handle reconnection timeout
docs: update contribution guidelines
refactor(socket): simplify event handling
```

### Development Cycle

1. Create branch from `main`
2. Make atomic commits
3. Run `npm run lint` and `npm run format`
4. Test with `npm run dev`
5. Create PR with description
6. Address review feedback
7. Merge when approved

---

## 🎯 Common Patterns

### Phaser Scene Pattern

```typescript
export class GameScene extends Phaser.Scene {
  private snakes: Map<string, Snake> = new Map();
  private fruits: Fruit[] = [];
  private isRunning: boolean = false;

  constructor() {
    super({ key: "GameScene" });
  }

  create(): void {
    // Initialize scene
    this.isRunning = true;
    this.createSnakes();
    this.createFruits();
    this.setupInput();
  }

  update(time: number, delta: number): void {
    if (!this.isRunning) return;
    // Game loop logic
  }

  private setupInput(): void {
    // Input handling
  }
}
```

### Game Object Pattern

```typescript
export class Snake extends Phaser.GameObjects.Container {
  private segments: SnakeSegment[] = [];
  private direction: Direction = "RIGHT";
  private nextDirection: Direction = "RIGHT";

  constructor(scene: Phaser.Scene, x: number, y: number, id: string) {
    super(scene, x, y);
    this.initialize(id);
  }

  private initialize(id: string): void {
    // Setup snake segments
  }

  move(): void {
    // Movement logic
  }

  grow(): void {
    // Add segment
  }

  setDirection(direction: Direction): void {
    this.nextDirection = direction;
  }
}
```

### Socket.io Pattern

```typescript
export class SocketClient {
  private socket: Socket | null = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;

  async connect(): Promise<void> {
    try {
      this.socket = io(this.getServerUrl(), {
        reconnection: true,
        reconnectionDelay: 1000,
        reconnectionDelayMax: 5000,
        reconnectionAttempts: this.maxReconnectAttempts,
      });

      return new Promise((resolve, reject) => {
        const timeout = setTimeout(() => {
          reject(new Error("Connection timeout"));
        }, 5000);

        this.socket!.on("connect", () => {
          clearTimeout(timeout);
          resolve();
        });
      });
    } catch (error) {
      throw new Error(`Failed to connect: ${error}`);
    }
  }

  emit<T>(event: string, data: T): void {
    if (!this.socket?.connected) {
      console.warn(`Socket not connected, cannot emit: ${event}`);
      return;
    }
    this.socket.emit(event, data);
  }

  on<T>(event: string, callback: (data: T) => void): void {
    if (this.socket) {
      this.socket.on(event, callback);
    }
  }
}
```

### Express Route Pattern

```typescript
import express, { Router } from "express";
import { GameState } from "@shared/types";

const router = Router();

// GET /api/games/active
router.get("/active", (req, res) => {
  try {
    const games = getActiveGames();
    res.json({ success: true, data: games });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to fetch games",
    });
  }
});

// POST /api/games
router.post("/", (req, res) => {
  try {
    const { difficulty } = req.body;
    const gameId = createGame(difficulty);
    res.status(201).json({ success: true, gameId });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: "Invalid game parameters",
    });
  }
});

export default router;
```

---

## 🤖 Guidelines for AI Assistance

### When Helping with Code

1. **Respect Project Structure**

   - Follow the monorepo pattern
   - Use path aliases (`@shared/*`, `@client/*`, `@server/*`)
   - One class per file
   - Group related utilities

2. **Maintain Consistency**

   - Use existing patterns as reference
   - Follow naming conventions
   - Match code style in the file
   - Use TypeScript strictly (no `any`)

3. **Consider Architecture**

   - Shared types in `src/shared/types.ts`
   - Constants in `src/shared/constants.ts`
   - Don't duplicate logic between client/server
   - Keep concerns separate (scenes, objects, network)

4. **Performance Matters**

   - Cache expensive calculations
   - Avoid object creation in loops/render calls
   - Use object pooling for frequently created objects
   - Minimize socket.io event frequency

5. **Error Handling**
   - Always handle potential errors
   - Provide meaningful error messages
   - Use try-catch for async operations
   - Validate inputs early

### When Writing Documentation

- Use clear, concise language
- Provide code examples
- Document the "why", not just the "what"
- Include TypeScript examples when relevant
- Link to related files/concepts

### When Suggesting Changes

- Explain the reasoning
- Provide complete code
- Reference existing patterns
- Test recommendations locally first
- Consider performance implications

### What to Prioritize

1. **Code Quality** > Quick fixes
2. **Type Safety** > Runtime flexibility
3. **Readability** > Brevity
4. **Performance** > Simplicity (within reason)
5. **Documentation** > Assumed knowledge

### What to Avoid

- Using `any` types without // @ts-ignore comment
- Creating files outside the documented structure
- Breaking existing patterns for "better" approaches
- Performance optimizations without profiling
- Changing established conventions without discussion

---

## 📋 Shared Types Reference

Key types shared between client and server (in `src/shared/types.ts`):

```typescript
interface SnakeSegment {
  x: number;
  y: number;
}

interface Snake {
  id: string;
  segments: SnakeSegment[];
  direction: Direction;
  color: string;
}

interface Fruit {
  x: number;
  y: number;
  type: "standard" | "golden";
}

interface PowerUp {
  id: string;
  type: PowerUpType;
  x: number;
  y: number;
  duration: number;
}

type Direction = "UP" | "DOWN" | "LEFT" | "RIGHT";
type DifficultyLevel = "easy" | "normal" | "hard" | "extreme";
```

---

## 🎮 Game Constants Reference

Key constants in `src/shared/constants.ts`:

```typescript
export const GRID_WIDTH = 20;
export const GRID_HEIGHT = 20;
export const TILE_SIZE = 32;

export const CANVAS_WIDTH = GRID_WIDTH * TILE_SIZE; // 640px
export const CANVAS_HEIGHT = GRID_HEIGHT * TILE_SIZE; // 640px

export const GAME_SPEEDS: Record<DifficultyLevel, number> = {
  easy: 100,
  normal: 120,
  hard: 150,
  extreme: 200,
};

export const POWER_UP_SPAWN_CHANCE = 0.15; // 15%

export const FRUITS_COUNT: Record<DifficultyLevel, number> = {
  easy: 3,
  normal: 5,
  hard: 7,
  extreme: 10,
};
```

---

## 🚀 Development Phases

The project follows a structured 7-phase development plan:

| Phase | Name               | Duration | Focus                              |
| ----- | ------------------ | -------- | ---------------------------------- |
| 1     | MVP                | Week 1-2 | Local multiplayer, core gameplay   |
| 2     | Power-ups          | Week 3   | 5 power-up mechanics               |
| 3     | Obstacles          | Week 4   | Obstacle spawning & avoidance      |
| 4     | Difficulty         | Week 5   | Difficulty system & balancing      |
| 5     | Online             | Week 6-7 | Multiplayer over network           |
| 6     | Auth & Leaderboard | Week 8   | Users, authentication, persistence |
| 7     | Polish             | Week 9   | UI, sound, performance, release    |

When making changes, consider which phase they support.

---

## 📚 References

- **Main Specification**: `docs/snake-battle.md`
- **Contribution Guide**: `.github/CONTRIBUTING.md`
- **Pull Request Template**: `.github/pull_request_template.md`
- **Project README**: `README.md`
- **Setup Guide**: `SETUP.md`

---

## ✨ Summary

When assisting with Snake Battle:

1. **Know the context**: It's a Phaser 3 snake game, TypeScript monorepo, two players competing
2. **Follow patterns**: Use existing code as reference
3. **Respect structure**: File organization matters, path aliases required
4. **Prioritize quality**: Type safety, performance, readability
5. **Document intent**: Explain the "why" in comments and PRs
6. **Test locally**: Always verify changes work before suggesting

Thank you for helping make Snake Battle better! 🎮
