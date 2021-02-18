const users = require("../users/users-model");

function logger() {
  // DO YOUR MAGIC
  return (req, res, next) => {
    const time = new Date().toISOString();
    console.log(`${req.method} | ${req.url} | ${time}`);
    next();
  }
}

function validateUserId() {
  // DO YOUR MAGIC
  return (req, res, next) => {
    users.getById(req.params.id)
      .then ((user) => {
        if (user) {
          req.user = user;
          next();
        } else {
          res.status(404).json({message: "user not found"});
        }
      })
      .catch ((error) => {
        console.log(error);
      })
  }
}

function validateUser() {
  // DO YOUR MAGIC
  return (req, res, next) => {
    const name = req.body.name;
    const body = req.body;

    if (!body) {
      res.status().json({message: "missing user data"});
    }

    if (!name) {
      res.status().json({message: "missing required name field"});
    }

    next();
  }
}

function validatePost() {
  // DO YOUR MAGIC
  return (req, res, next) => {
    const text = req.body.text;
    const data = req.body;

    if (!data) {
      res.status().json({message: "missing post data"});
    }

    if (!text) {
      res.status().json({message: "missing required text field"});
    }

    next();
  }
}

// do not forget to expose these functions to other modules
module.exports = {
  logger,
  validateUser,
  validatePost,
  validateUserId
}
