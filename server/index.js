import express from "express"
import bodyParser from "body-parser"
import mongoose from "mongoose"
import cors from 'cors'
import postRoutes from './routes/posts.js'
import 'dotenv/config.js'

const app = express();


app.use(bodyParser.json({limit:'30mb',extended:'true'}));
app.use(bodyParser.urlencoded({limit:'30mb',extended:'true'}));
app.use(cors());    

app.use('/posts',postRoutes);


const PORT=process.env.PORT || 5000;
mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.onfkrpt.mongodb.net/?retryWrites=true&w=majority`)
    .then(()=>app.listen(PORT,()=>console.log("server running on PORT :"+`${PORT}`)))
    .catch((error)=>console.log(`${error} did not connect`)) 

 // we don't get any warnings in console 