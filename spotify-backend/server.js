import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import songRouter from './src/routes/songRoute.js';
import connectDB from './src/config/mongodb.js';
import connectCloudinary from './src/config/cloudinary.js';
import albumRouter from './src/routes/albumRoute.js';
import recommendRouter from './src/routes/recommendRoute.js';
import apiFetchRoute from './src/routes/apiFetchRoute.js';


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


app.get('/', (req,res)=> res.send("API WORKING"))

app.listen(port , ()=>console.log(`Server Started on ${port}`));
