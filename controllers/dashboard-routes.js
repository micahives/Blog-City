const router = require('express').Router();
const BlogPost = require('../models/BlogPost');

router.get('/', async (req, res) => {
    try {
      const loggedIn = req.session.loggedIn || false;
      const username = req.session.username;
  
      // Fetch blog posts for the specific user
      const blogPosts = await BlogPost.findAll({
        where: {
          author: username,
        },
      });
      console.log('Rendering dashboard with blogPosts:', blogPosts);
      res.render('dashboard', { loggedIn, username, blogPosts });
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  });

router.get('/new-post', (req, res) => {
    console.log('New Post route hit!');
    const username = req.session.username;
    const loggedIn = req.session.loggedIn || false;
    console.log('Username from session:', username);
    res.render('new-post', { loggedIn, username });
  });

  router.post('/new-post', async (req, res) => {
    try {
      const { title, summary } = req.body;
      const author = req.session.username;
  
      const newBlogPost = await BlogPost.create({
        title,
        summary,
        author,
      });
  
      res.json(newBlogPost);
    //   res.redirect('/dashboard');
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });

  module.exports = router;