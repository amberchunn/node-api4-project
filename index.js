// Requires
const express = require('express');
const helmet = require("helmet")
const cors = require("cors")

// Routers
const homeRouter = require("./api/home-router");
const postsRouter = require('./api/posts/posts-router');
const usersRouter = require('./api/users/users-router');

// Middleware
const { logger } = require('./api/middleware/middleware');

// Server & ENV
const server = express();
const port = process.env.PORT || 5000;

// Use Json
server.use(express.json());
server.use(helmet())
server.use(cors())

// Use Routes
server.use(homeRouter)
server.use(postsRouter);
server.use(usersRouter);
server.use(logger);

// Error Middleware
server.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({
    message: "Something went wrong. Please try again later.",
  })
})

// Server Listens
server.listen(port, () => {
	console.log(`Server running at http://localhost:${port}`)
})
