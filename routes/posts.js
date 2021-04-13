var express = require('express');
const checkAuth = require('../auth/checkAuth');
var router = express.Router();
const models = require('../models')

/* GET home page. */
router.get('/', async function(req, res) {
  const posts = await models.Post.findAll({
    // sends back user data that we want - only uesr and id
    include: [
      {
        model: models.User, 
        attributes: ['username', 'id']
      }
    ]
  });
  res.json(posts)
});

router.post('/', checkAuth, async (req, res) => {
  // check to see if user is logged in
  const { user } = req.session;
    // if not send 401 error
    if (!user) {
      return res.status(401).json({
        error: 'not logged in'
      })
    }
  // check for all fields
  if (!req.body.title || !req.body.content) {
    // if not all fields throw 400 error
    return res.status(400).json({
      error: 'please include all required fields'
    })
  }
  // create new post and send back new post data
  const post = await models.Post.create({
    title: req.body.title,
    content: req.body.content,
    UserId: user.id
  })
  res.status(201).json(post)
})

router.post('/:id/comments', checkAuth, async  (req, res) => {
  const post = await models.Post.findByPk(req.params.id)
  if (!post) {
    return res.status(404).json({
      error: "could not find post with that id"
    })
  }

  if (!req.body.text) {
    res.status(400).json({
      error: "please include all required fields"
    })
  }

  const comment = await post.createComment({
    text: req.body.text,
    PostId: req.params.id,
    UserId: req.session.user.id
  })

  res.status(201).json(comment)
})

router.get('/:id/comments', async (req, res) => {
  const post = await models.Post.findByPk(req.params.id)
  if (!post) {
    return res.status(404).json({
      error: "could not find post with that id"
    })
  }

  const comments = await post.getComments({
    include: [{ model: models.User, attributes: ['username', 'id'] }]
  })

  res.json(comments)
})


module.exports = router;