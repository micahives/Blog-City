const sequelize = require('../config/connection');
const seedBlogPosts = require('./blogPost-seed.json');
const seedUsers = require('./user-seed.json');
const seedComments = require('./comment-seed.json');
const { User, BlogPost, Comment } = require('../models');

const seedAll = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(seedUsers);
  await BlogPost.bulkCreate(seedBlogPosts);
  await Comment.bulkCreate(seedComments);

  process.exit(0);
};

module.exports = { seedAll };