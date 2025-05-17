import { addSong ,listSong ,removeSong } from "../controllers/songController.js";
import express from 'express'
import upload from "../middleware/multer.js";
import { addSongFromAPI } from "../controllers/songController.js";

const songRouter = express.Router();

songRouter.post('/add',upload.fields([{name:'image' ,maxCount:1},{name : 'audio' , maxCount :1}]),addSong);
songRouter.post('/add-from-api', addSongFromAPI);
songRouter.get('/list',listSong);
songRouter.post('/remove',removeSong);
export default songRouter;