import { createServer } from "http";
import express from "express";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { Server } from "socket.io";
const app = express();
const server = createServer(app);
const io = new Server(server);
const __dirname = dirname(fileURLToPath(import.meta.url));

app.get("/", (req, res) => {
  res.sendFile(join(__dirname, "index.html"));
});

io.on("connection", (socket) => {
  console.log("a user connected => " + socket.id);
  socket.on("join", (room) => {
    socket.join(room);
    console.log(socket.id + " joined room: " + room);
    socket.on("msg", (msg) => {
      io.to(room).emit("msg", msg);
    });
  });
});

server.listen(3000, () => {
  console.log("server work");
});
