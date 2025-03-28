const port = 3000;
const express = require("express");
const server = express();
const http = require("http");
require("dotenv").config();
const { Server } = require("socket.io");
const cors = require("cors");

server.use(
  cors({
    origin: ["http://localhost:3001", "http://localhost:5173"],
    credentials: true,
  })
);

const ioServer = http.createServer(server);
const io = new Server(ioServer, {
  cors: {
    origin: ["http://localhost:3001", "http://localhost:5173"],
    methods: ["GET", "POST"],
  },
});

let userCount = 0;
const users = new Map();

io.on("connection", (socket) => {
  userCount++;
  const username = `user ${userCount}`;
  users.set(socket.id, username);
  console.log(`${username} connected: ${socket.id}`);

  io.emit("active_users", users.size);

  socket.on("send_message", (message) => {
    const sender = users.get(socket.id);
    const data = { user: sender, message };
    io.emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    const username = users.get(socket.id);
    users.delete(socket.id);
    console.log(`${username} disconnected: ${socket.id}`);
    io.emit("active_users", users.size);
  });
});

const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");
const categoryRoutes = require("./routes/category.routes");
const postRoutes = require("./routes/post.routes");
const commentRoutes = require("./routes/comment.routes");

server.use("/api/v1/auth", authRoutes);
server.use("/api/v1/users", userRoutes);
server.use("/api/v1/categories", categoryRoutes);
server.use("/api/v1/posts", postRoutes);
server.use("/api/v1/comments", commentRoutes);

ioServer.listen(port, () => {
  console.log(`server is running at ${port}: http://localhost:${port}`);
});