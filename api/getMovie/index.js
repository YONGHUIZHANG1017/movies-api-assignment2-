import express from 'express';
import {
  getMovie
} from '../tmdb-api';

const router = express.Router();


router.get('/:id', (req, res, next) => {
  const id = parseInt(req.params.id);
  getMovie(id).then(movie => res.status(200).send(movie));
});

export default router;