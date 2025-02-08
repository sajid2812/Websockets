import { WebSocketServer, WebSocket } from "ws";
import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/about", (req, res) => {
  res.send("Hello from about page.");
});

const httpServer = app.listen(3000,()=>{
  console.log('Server is listening on port 3000.')
});

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
