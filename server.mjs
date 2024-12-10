import { createServer } from 'node:http';
import next from 'next';
import { Server } from 'socket.io';
import GameManager from './gameManager.mjs';

const dev = process.env.NODE_ENV !== 'production';
const hostname = 'localhost';
const port = 3000;
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

app.prepare().then(() => {
  const httpServer = createServer(handler);

  const GM = new GameManager();
  const io = new Server(httpServer);

  io.on('connection', (socket) => {
    GM.connect(socket);
    socket.on('disconnect', () => GM.disconnect(socket));
    socket.on('setInfo', (name, color) => GM.setInfo(socket, name, color));
    socket.on('startGame', () => GM.startGame(socket));
    socket.on('joinGame', id => GM.joinGame(socket, id));
    socket.on('rollDice', () => GM.roll(socket));
    socket.on('reset', () => GM.reset(socket));
    socket.on('movePiece', index => GM.movePiece(socket, index));
  });

  httpServer
    .once('error', (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
    });
});
