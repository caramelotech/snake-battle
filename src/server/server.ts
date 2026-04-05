/**
 * Servidor Express + Socket.io para Snake Battle
 * Fase 1: MVP - Suporte a multiplayer local
 */

import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { Server as SocketIOServer } from 'socket.io';
import path from 'path';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

import { config } from '@shared/config';
import { CANVAS_WIDTH, CANVAS_HEIGHT } from '@shared/constants';

const app = express();
const httpServer = createServer(app);
const io = new SocketIOServer(httpServer, {
  cors: config.cors,
});

// Middleware
app.use(cors(config.cors));
app.use(express.json());

// Servir arquivos estáticos do cliente (build de produção)
app.use(express.static(path.join(process.cwd(), 'dist/client')));

// Rotas
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    version: config.app.version,
  });
});

app.get('/api/config', (req, res) => {
  res.json({
    canvasWidth: CANVAS_WIDTH,
    canvasHeight: CANVAS_HEIGHT,
  });
});

// Servir index.html para rotas não encontradas (SPA fallback)
app.get('*', (_req, res) => {
  res.sendFile(path.join(process.cwd(), 'dist/client/index.html'));
});

// WebSocket Events (Placeholder para Fase 1)
io.on('connection', (socket) => {
  console.log(`[Socket] Player conectado: ${socket.id}`);

  socket.on('disconnect', () => {
    console.log(`[Socket] Player desconectado: ${socket.id}`);
  });

  // Placeholder para eventos de game
  socket.on('game:start', (data) => {
    console.log('[Game] Start signal received:', data);
  });

  socket.on('game:input', (data) => {
    console.log('[Game] Player input:', data);
  });
});

// Error Handling
process.on('unhandledRejection', (reason, promise) => {
  console.error('[Error] Unhandled Rejection at:', promise, 'reason:', reason);
});

// Start Server
const PORT = config.server.port;
const HOST = config.server.host;

httpServer.listen(PORT, HOST, () => {
  console.log(`
╔══════════════════════════════════════╗
║       🐍 SNAKE BATTLE SERVER 🐍       ║
╚══════════════════════════════════════╝

📍 Servidor: http://${HOST}:${PORT}
🎮 Cliente:  http://localhost:5173
🔧 Modo:     ${config.server.env.toUpperCase()}
📦 Versão:   ${config.app.version}

Aguardando conexões...
  `);
});

// Graceful Shutdown
process.on('SIGINT', () => {
  console.log('\n[Server] Encerrando gracefully...');
  httpServer.close(() => {
    console.log('[Server] Servidor parado');
    process.exit(0);
  });
});
