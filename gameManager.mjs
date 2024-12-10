"use server";

import UREngine from "./ur-engine.mjs";

export const basicUUID = () =>
  (Date.now().toString(36) + Math.random().toString(36).slice(2))
    .slice(-5)
    .toUpperCase();

class GameManager {
  constructor() {
    this.games = {};
    this.boundUsers = {};
    this.disconnectTimeout = 3000;
  }

  connect(socket) {
    console.log("[socket]", `client connected ${socket.id}`);
    this.boundUsers[socket.id] = { id: socket.id };
  }

  disconnect(socket) {
    const id = socket.id;
    console.log("[socket]", `client disconnected ${id}`);
    const gameId = this.boundUsers[id].game;
    if (gameId) {
      // remove player from game to allow rejoining
      this.games[gameId].players = this.games[gameId].players.filter((pl) => pl !== socket);
      this.games[gameId].players.forEach(pl => {
        return pl.emit("errorMessage", "Opponent disconnected");
      })
      if (this.games[gameId].players.length === 0) {
        delete this.games[gameId]
        console.log(`no more players - deleted game ${gameId}`);
      }
    }
    delete this.boundUsers[id];
  }

  setInfo(socket, name, color) {
    console.log("setInfo", socket.id, name, color);
    this.boundUsers[socket.id].name = name;
    this.boundUsers[socket.id].color = color;
  }

  startGame(socket) {
    const newId = basicUUID();
    this.games[newId] = { players: [socket], state: "waiting" };
    this.boundUsers[socket.id].game = newId;
    socket.emit("gameId", newId);
  }
  joinGame(socket, gameId) {
    const player = this.boundUsers[socket.id];
    const game = this.games?.[gameId];
    if (!game) return socket.emit("errorMessage", `No games with id: ${gameId}`);
    player.game = gameId;
    if (game.players.length < 2) game.players.push(socket);
    if (game.players.length == 2 && game.state === "waiting") {
      game.engine = new UREngine();
      game.state = "started";
    }
    const playerData = game.players.map((sock) => this.boundUsers[sock.id]);
    console.log("player data for game", gameId, playerData);
    game.players.forEach((sock) => {
      sock.emit("playerUpdate", playerData);
      sock.emit("gameUpdate", game.engine.getObject());
    });
  }
  roll(socket) {
    const player = this.boundUsers?.[socket.id];
    const game = this.games?.[player.game];
    const gameState = JSON.parse(game.engine.getObject());
    if (game.players[gameState.player] === socket) {
      try {
        game.engine.roll();
      } catch (err) {
        return socket.emit("errorMessage", err.message);
      }
    } else {
      return socket.emit("errorMessage", "It is not your turn");
    }
    game.players.forEach((sock) =>
      sock.emit("gameUpdate", game.engine.getObject())
    );
  }

  reset(socket) {
    const player = this.boundUsers?.[socket.id];
    const game = this.games?.[player.game];
    if (game.engine.stage === "over") {
      game.engine.reset();
    } else {
      return socket.emit("errorMessage", "Cannot restart a game in progress");
    }
    game.players.forEach((sock) =>
      sock.emit("gameUpdate", game.engine.getObject())
    );
  }

  movePiece(socket, index) {
    const player = this.boundUsers?.[socket.id];
    const game = this.games?.[player.game];
    const gameState = JSON.parse(game.engine.getObject());
    if (game.players[gameState.player] === socket) {
      try {
        game.engine.click(index);
      } catch (err) {
        return socket.emit("errorMessage", err.message);
      }
    } else {
      return socket.emit("errorMessage", "It is not your turn");
    }
    game.players.forEach((sock) =>
      sock.emit("gameUpdate", game.engine.getObject())
    );
  }
}

export default GameManager;
