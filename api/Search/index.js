import express from 'express';
import searchMovies from '../tmdb-api';

const router = express.Router();

router.get('/', (req, res,next) => {
    searchMovies().then(movies => res.status(200).send(movies))
  .catch((error) => next(error));
});


export default router;