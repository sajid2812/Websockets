import { WebSocketServer, WebSocket } from "ws";
import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const httpServer = app.listen(8080);

const wss = new WebSocketServer({ server: httpServer });

wss.on("connection", function connection(socket) {
  socket.on("error", (err) => console.error(err));

  socket.on("message", function message(data) {
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    });
  });

  socket.send("Hello! Message From Server!!");
});
