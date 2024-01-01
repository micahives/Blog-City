const router = require('express').Router();
const BlogPost = require('../models/BlogPost');

router.get('/', async (req, res) => {
  try {
    // Check the user's authentication status
    const loggedIn = req.session.loggedIn || false;
    const blogPosts = await BlogPost.findAll();

    res.render('homepage', { loggedIn, blogPosts });
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