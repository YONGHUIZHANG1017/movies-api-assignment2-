import express from 'express';
import {
 getMovieReviews
} from '../tmdb-api';

const router = express.Router();


router.get('/:id', (req, res, next) => {
  const id = parseInt(req.params.id);
  getMovieReviews(id)
  .then(reviews => res.status(200).send(reviews))
  .catch((error) => next(error));
});

export default router;