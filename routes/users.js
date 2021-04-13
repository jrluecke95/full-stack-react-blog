var express = require('express');
var router = express.Router();
const models = require('../models');
const bcrypt = require('bcrypt');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
// localhost:3000/api/v1/users/register
router.post('/register', async (req, res) => {
  // check for username and password
  if (!req.body.username || !req.body.password) {
    return res.status(400).json({
      error: 'please fill out username and password'
    })
  }
  //check database for existing user
  const user = await models.User.findOne({
    where: {
      username: req.body.username
    }
  })
  //if exists, send error
  if (user) {
    return res.status(400).json({
      error: 'user already exists'
    })
  }

  // hash password
  const hash = await bcrypt.hash(req.body.password, 10)
  // create user
  const newUser = await models.User.create({
    username: req.body.username,
    password: hash
  })
  // respond with success message
  return res.status(201).json(newUser)
})

// localhost:3000/api/v1/users/login
router.post('/login', async (req, res) => {
  //check for username and password
  //if not both send error
  if (!req.body.username || !req.body.password) {
    return res.status(400).json({
      error: 'please fill out username and password'
    })
  }
  //if we have both, lookup user in db
  const user = await models.User.findOne({
    where: {
      username: req.body.username
    }
  })
   //if no user send error
  if (!user) {
    return res.status(400).json({
      error: 'could not find user with that username'
    })
  }
  //if user exists, check password, if no match send error
  const match = await bcrypt.compare(req.body.password, user.password);
  if (!match) {
    return res.status(401).json({
      error: 'incorrect password'
    })
  }
  //store user info in session/log in 
  req.session.user = user
  //respond with success
  return res.json({
    id: user.id,
    username: user.username,
    updatedAt: user.updatedAt
  })
})
// logging user out
// localhost:3000/api/v1/users/logout
router.get('/logout', (req, res) => {
  // clears session out 
  req.session.user = null;
  res.json({
    success: 'logged out'
  })
})
// checking to see if user is logged in and sending back appropriate data
router.get('/current', (req, res) => {
  const { user } = req.session;
  if (user) {
    res.json({
      id: user.id,
      username: user.username,
      updatedAt: user.updatedAt,
    })
  } else {
    res.status(401).json({
      error: 'not logged in'
    })
  }
})

module.exports = router;
