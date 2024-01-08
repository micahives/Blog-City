const router = require('express').Router();
const BlogPost = require('../models/BlogPost');
const Comment = require('../models/Comment');

router.get('/', async (req, res) => {
  try {
    // Check the user's authentication status
    const loggedIn = req.session.loggedIn || false;
    const username = req.session.username;
    // Fetch all blog posts with associated comments
    const blogPosts = await BlogPost.findAll({
      include: Comment,
    });

    console.log(blogPosts);

    res.render('homepage', { loggedIn, blogPosts, username });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/login', async (req, res) => {
  try {
      res.render('login');
  } catch (err) {
      console.log(err);
      res.status(500).json(err);
  };
});
  module.exports = router;