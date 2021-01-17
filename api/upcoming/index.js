import express from 'express';
import {getUpcomingMovies} from '../tmdb-api';

const router = express.Router();

router.get('/', (req, res,next) => {
    getUpcomingMovies().then((movies) =>{
        console.log(movies);
        res.status(200).json(movies)
    })
  .catch((error) => next(error));
});


export default router;