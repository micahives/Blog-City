const express = require('express');
const handlebars = require('express-handlebars');
const path = require('path');
require('dotenv').config()

const routes = require('./controllers');
const sequelize = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static('public'));

app.set('view engine', 'hbs');

// sets handlebars configurations 
app.engine('hbs', handlebars({
    layoutsDir: __dirname + '/views/layouts',
    extname: 'hbs'
}));

app.get('/', (req, res) => {
    // serves the body of the page "main.handlebars" to the container, "index.handlebars"
    res.render('main', { layout : 'index' });
});
    

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`);
})