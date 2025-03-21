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

io.on("connection", (socket) => {
  // console.log(`User connected: ${socket.id}`);

  socket.on("send_message", (message) => {
    io.emit("receive_message", message);
  });

  socket.on("disconnect", () => {
    // console.log(`User disconnected: ${socket.id}`);
  });
});

const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");
const categoryRoutes = require("./routes/category.routes");
const postRoutes = require("./routes/post.routes");

server.use("/api/v1/auth", authRoutes);
server.use("/api/v1/user", userRoutes);
server.use("/api/v1/category", categoryRoutes);
server.use("/api/v1/post", postRoutes);

ioServer.listen(port, () => {
  console.log(`server is running at ${port}: http://localhost:${port}`);
});
