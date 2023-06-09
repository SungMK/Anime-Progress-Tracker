// Dependencies
const express = require('express');
const logger = require('morgan');
const indexRoutes = require('./routes/index');
const animeRoutes = require('./routes/animes');
const noteRoutes = require('./routes/notes');
const methodOverride = require('method-override');

// Initialize Express App
const app = express();

// Environment Variables
require ('dotenv').config();
require ('./config/database');

// Configure App Settings 
app.set('view engine', 'ejs');

// Middleware 
app.use(logger('dev'));
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));

// Mounted Routes
app.use('/', indexRoutes);
app.use('/', noteRoutes);
app.use('/animes', animeRoutes);

// Listening Port
app.listen(process.env.PORT);

app.use('*', (req, res) => {
    res.render('404', {title: '404 - Page Not Found'});
});