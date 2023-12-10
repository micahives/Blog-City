const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
require('dotenv').config();
const hbs = exphbs.create({});

const routes = require('./controllers');
const sequelize = require('./config/connection');
const exp = require('constants');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

// set handlebars as default template engine "turn on handlebars"
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');

app.get('/', (req, res) => {
    // serves the body of the page "main.handlebars" to the container, "index.handlebars"
    res.render('main', { layout : 'index' });
});
    

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`);
})