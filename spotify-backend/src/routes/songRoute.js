import { addSong ,listSong ,removeSong } from "../controllers/songController.js";
import express from 'express'
import upload from "../middleware/multer.js";
<<<<<<< HEAD
import { addSongFromAPI } from "../controllers/songController.js";

=======
>>>>>>> 1333d4642bea10e67118ad2c7e55d822be6fde0a

const songRouter = express.Router();

songRouter.post('/add',upload.fields([{name:'image' ,maxCount:1},{name : 'audio' , maxCount :1}]),addSong);
<<<<<<< HEAD
songRouter.post('/add-from-api', addSongFromAPI);
=======
>>>>>>> 1333d4642bea10e67118ad2c7e55d822be6fde0a
songRouter.get('/list',listSong);
songRouter.post('/remove',removeSong);
export default songRouter;