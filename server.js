const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
require('dotenv').config();
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const helpers = require('handlebars-helpers')();

const hbs = exphbs.create({
  extname: 'handlebars',
  defaultLayout: 'main',
  layoutsDir: path.join(__dirname, 'views/layouts'),
  partialsDir: path.join(__dirname, 'views/partials'),
  helpers: {
    ...helpers,
    isNotEmpty: function (value, options) {
      if (value && value.summary && value.author) {
        return options.fn(this);
      } else {
        return options.inverse ? options.inverse(this) : '';
      }
    }
  }
});

const routes = require('./controllers');
const sequelize = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
hbs.handlebars.registerPartial('blogPost', '');
app.use(express.static(path.join(__dirname, 'public')));

const sess = {
  secret: process.env.COOKIE_SECRET,
  cookie: {
    maxAge: 24 * 60 * 60 * 1000, // expires after one day
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));
app.use(routes);

// Middleware to set username in res.locals if the user is logged in
app.use((req, res, next) => {
  if (req.session.loggedIn) {
    res.locals.username = req.session.username;
  }
  next();
});

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () =>
    console.log(
      `\nServer running on port ${PORT}. Visit http://localhost:${PORT}`
    )
  );
});
