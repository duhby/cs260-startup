const { WebSocketServer } = require("ws");
const WebSocket = require("ws");

function websocket(httpServer) {
  const socketServer = new WebSocketServer({ server: httpServer });

  socketServer.on("connection", (socket) => {
    socket.isAlive = true;

    socket.on("message", function message(data) {
      socketServer.clients.forEach((client) => {
        if (client !== socket && client.readyState === WebSocket.OPEN) {
          client.send(data);
        }
      });
    });

    socket.on("pong", () => {
      socket.isAlive = true;
    });
  });

  setInterval(() => {
    socketServer.clients.forEach(function each(client) {
      if (client.isAlive === false) return client.terminate();

      client.isAlive = false;
      client.ping();
    });
  }, 10000);

  return socketServer;
}

function sendMessage(socketServer, message) {
  socketServer.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message);
    }
  });
}

module.exports = { websocket, sendMessage };
