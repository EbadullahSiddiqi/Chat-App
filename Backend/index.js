// index.js
import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";

const app = express();
const server = http.createServer(app); // creating the HTTP server manually so that we can add socket.io to it

const io = new Server(server, { // initialize socket.io
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.use(cors());

io.on("connection", (socket) => { // listens for event
  console.log("🔌 User connected:", socket.id);

  socket.on("chat message", (data) => {
    console.log("💬 Message received:", data);
    io.emit("chat message", data); // Broadcast to all
  });

  socket.on("disconnect", () => {
    console.log("❌ User disconnected:", socket.id);
  });
});

server.listen(3000, () => {
  console.log("🚀 Server running on http://localhost:3000");
});
