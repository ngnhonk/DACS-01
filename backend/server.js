const port = 3000;
const express = require('express');
const server = express();
require('dotenv').config();

const cors = require("cors");
server.use(cors({ origin: "http://localhost:5173", credentials: true }));

const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const categoryRoutes = require('./routes/category.routes');
const postRoutes = require('./routes/post.routes');
const commentRoutes = require('./routes/comment.routes');
const likeRoutes = require('./routes/like.routes');

server.use('/api/v1/auth', authRoutes);
server.use('/api/v1/user', userRoutes);
server.use('/api/v1/category', categoryRoutes);
server.use('/api/v1/post', postRoutes);
server.use('/api/v1/comment', commentRoutes);
server.use('/api/v1/vote', likeRoutes);

server.listen(port, () => {
    console.log(`server is running at ${port}: http://localhost:${port}`);
})