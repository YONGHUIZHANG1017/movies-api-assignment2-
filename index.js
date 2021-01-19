import './db';
import dotenv from 'dotenv';
import loglevel from 'loglevel';
import express from 'express';
import reviewsRouter from './api/MoiveReviews';
import bodyParser from 'body-parser';
import {loadUsers, loadMovies} from './seedData';
import usersRouter from './api/users';
import session from 'express-session';
import passport from './authenticate';
import genresRouter from './api/genres';
import SearchRouter from './api/Search';
import popularRouter from './api/popular';
import upcomingRouter from './api/upcoming';
import movieRouter from './api/getMovie';
import getmoviesRouter from './api/getMovies';
import moviesRouter from './api/movies';
dotenv.config();
if (process.env.NODE_ENV === 'test') {
  loglevel.setLevel('warn')
} else {
  loglevel.setLevel('info')
}

if (process.env.SEED_DB === 'true' && process.env.NODE_ENV === 'development') {
  loadUsers();
}

const errHandler = (err, req, res, next) => {
  /* if the error in development then send stack trace to display whole error,
  if it's in production then just send error message  */
  if(process.env.NODE_ENV === 'production') {
    return res.status(500).send(`Something went wrong!`);
  }
  res.status(500).send(`Hey!! You caught the error 👍👍, ${err.stack} `);
};
const app = express();
const port = process.env.PORT ;

app.use(bodyParser.json());
app.use(express.static('public'));
app.use('/api/MovieReviews', reviewsRouter);
app.use(passport.initialize());
app.use(bodyParser.urlencoded());
app.use(errHandler);
app.use(session({
  secret: 'ilikecake',
  resave: true,
  saveUninitialized: true
}));
app.use('/api/movies', moviesRouter);
app.use('/api/users', usersRouter);
app.use('/api/genres', genresRouter);
app.use('/movies/api/genres', genresRouter);
app.use('/api/Search',SearchRouter);
app.use('/api/popular',popularRouter);
app.use('/api/upcoming',upcomingRouter);
app.use('/api/getMovie',movieRouter);
app.use('/movies/api/getMovie/movie',movieRouter);
app.use('/api/getMovie/movie',movieRouter);
app.use('/api/getMovies',getmoviesRouter);
let server = app.listen(port, () => {
  loglevel.info(`Server running at ${port}`);
});
module.exports = server

