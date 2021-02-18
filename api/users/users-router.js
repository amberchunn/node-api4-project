const express = require('express');
const users = require('./users-model');
const posts = require('../posts/posts-model');
const { validateUser, validateUserId, validatePost } = require('../middleware/middleware');

const router = express.Router();

router.get('/users', (req, res, next) => {
  // RETURN AN ARRAY WITH ALL THE USERS
  users.get()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((error) => {
      next(error);
    })
});

router.get('/users/:id', validateUserId(), (req, res, next) => {
  // RETURN THE USER OBJECT
  // this needs a middleware to verify user id
  users.getById(req.params.id)
  .then((user) => {
    res.status(200).json(user);
  })
  .catch((error) => {
    next(error);
  })
});

router.post('/users', validateUser(), (req, res, next) => {
  // RETURN THE NEWLY CREATED USER OBJECT
  // this needs a middleware to check that the request body is valid
  users.insert(req.body)
  .then((user) => {
    res.status(201).json(user);
  })
  .catch((error) => {
    next(error);
  })
});

router.put('/users/:id', validateUserId(), validateUser(), (req, res, next) => {
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid

  users.update(req.params.id, req.body)
    .then((user) => {
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({message: 'The user coud not be found'});
      }
    })
  .catch((error) => {
    next(error);
  })
})

router.delete('/users/:id', validateUserId(), (req, res, next) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
  users.remove(req.params.id)
  .then((count) => {
    if (count > 0) {
      res.status(200).json({id: req.params.id, name: req.body.name});
    } else {
      res.status(400).json({message: "There was an issue."})
    }
  })
  .catch((error) => {
    next(error);
  })
});

router.get('/users/:id/posts', validateUserId(), (req, res, next) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
  users.getUserPosts(req.params.id)
  .then((posts) => {
    res.status(200).json(posts);
  })
  .catch((error) => {
    next(error);
  })
});

router.post('/users/:id/posts', validateUserId(), validatePost(), (req, res, next) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  posts.insert(req.body)
  .then((post) => {
    res.status(201).json(post);
  })
  .catch((error) => {
    next(error);
  })
});

// do not forget to export the router
module.exports = router;
