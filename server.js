const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
require('dotenv').config();
const hbs = exphbs.create({ helpers });

const routes = require('./controllers');
const sequelize = require('./config/connection');

const helpers = require('./utils/helpers');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

// set handlebars as default template engine "turn on handlebars"
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');

app.get('/partials', (req, res) => {
    // serves the body of the page "main.hbs" to the container, "index.hbs"
    res.render('main', { layout : 'index' });
});

const sess = {
    secret: process.env.COOKIE_SECRET,
    cookie: {
        // stored in milliseconds
        maxAge: 24 * 60 * 60 * 1000, // expires after one day
    },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize,
    }),
};

app.use(session(sess));

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () =>
      console.log(
        `\nServer running on port ${PORT}. Visit http://localhost:${PORT} and create an account!`
      )
    );
  });