import express from 'express';
import {
   getMovies 
} from '../tmdb-api';

const router = express.Router();

 router.get('/', (req, res,next) => {
  getMovies().then(movies => res.status(200).json(movies));
});



export default router;