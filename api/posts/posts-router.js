const express = require('express');
const posts = require('./posts-model');

const router = express.Router();

router.get('/posts', (req, res, next) => {
  // DO YOUR MAGIC
  posts.get()
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch((error) => {
      next(error);
    })
});

router.get('/posts/:id', (req, res, next) => {
  // DO YOUR MAGIC
  posts.getById(req.params.id)
    .then((post) => {
      res.status(200).json(post);
    })
    .catch((error) => {
      next(error);
    })
});

// do not forget to export the router
module.exports = router;
