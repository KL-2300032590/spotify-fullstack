import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import songRouter from './src/routes/songRoute.js';
import connectDB from './src/config/mongodb.js';
import connectCloudinary from './src/config/cloudinary.js';
import albumRouter from './src/routes/albumRoute.js';
import videoRouter from './src/routes/videoRoute.js';
import recommendRouter from './src/routes/recommendRoute.js';
import apiFetchRoute from './src/routes/apiFetchRoute.js';
import videoAlbumRouter from './src/routes/videoAlbumRoute.js';
import paymentRoutes from './src/routes/paymentRoutes.js';
import authRoutes from './src/routes/authRoutes.js';
import offlineRoutes from './src/routes/offlineRoutes.js';
import visualizerRoutes from './src/routes/visualizerRoutes.js';
import podcastRoutes from './src/routes/podcastRoute.js';





// app config
const app = express();
const port = process.env.PORT || 4000;
connectDB();
connectCloudinary();


// middlewares 
app.use(express.json());
app.use(cors()); //allow fronted to connect with backend


//initilazing routes
app.use("/api/song",songRouter);
app.use("/api/album",albumRouter);


//recommandation
 
app.use("/api/recommend",recommendRouter);
app.use('/api', apiFetchRoute);

//video

app.use('/api/video-album',videoAlbumRouter);
app.use('/api/video', videoRouter);


// Payment
app.use('/api/payment', paymentRoutes); 


//auth
app.use('/api/auth', authRoutes); 



//premium
app.use('/api/offline', offlineRoutes);
app.use('/api/visualizer', visualizerRoutes);


//podcast
app.use('/api/podcast', podcastRoutes);

app.get('/', (req,res)=> res.send("API WORKING"))

app.listen(port , ()=>console.log(`Server Started on ${port}`));
