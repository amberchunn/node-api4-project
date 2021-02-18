const express = require('express');
const postsRouter = require('./posts/posts-router');
const usersRouter = require('./users/users-router');
const { logger } = require('./middleware/middleware');
const server = express();

// remember express by default cannot parse JSON in request bodies
server.use(express.json());

// global middlewares and routes need to be connected here
server.use(postsRouter);
server.use(usersRouter);
server.use(logger);

server.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({
    message: "Something went wrong. Please try again later.",
  })
  next();
})

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

module.exports = server;
