import express from 'express';
import {getPopularMovies} from '../tmdb-api';

const router = express.Router();

router.get('/', (req, res,next) => {
    getPopularMovies().then(movies => res.status(200).json(movies))
  .catch((error) => next(error));
});


export default router;