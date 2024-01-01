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

// create a new blog post
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

    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });

router.get('/blog-post/:id', async (req, res) => {
    try {
        const loggedIn = req.session.loggedIn || false;
        const blogPostId = req.params.id;
        const blogPost = await BlogPost.findByPk(blogPostId);
        // source parameter (dashboard or homepage)
        const source = req.query.source || 'unknown';
  
        if (!blogPost) {
            res.status(404).render('404');
            return;
        }

        res.render('blog-post-detail', { loggedIn, blogPost, source });
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

// DELETE route for deleting a blog post
router.delete('/blog-post/:id', async (req, res) => {
  const postId = req.params.id;

  try {
    const blogPost = await BlogPost.findByPk(postId);

    if (!blogPost) {
      return res.status(404).json({ error: 'Blog post not found' });
    }

    await blogPost.destroy();

    res.json({ message: 'Blog post deleted successfully' });
  } catch (error) {
    console.error('Error deleting blog post:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.put('/blog-post/:id', async (req, res) => {
  const postId = req.params.id;

  try {
    const blogPost = await BlogPost.findByPk(postId);

    if (!blogPost) {
      return res.status(404).json({ error: 'Blog post not found' });
    }

    const { title, summary } = req.body;

    // update properties
    blogPost.title = title;
    blogPost.summary = summary;

    await blogPost.save();

    res.json({ message: 'Blog post updated successfully' });
  } catch (error) {
    console.error('Error updating blog post:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

  module.exports = router;