import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRouter from './routes/authroute.js';


const app = express()

dotenv.config();


mongoose.connect(process.env.MONGO).then(()=> {
    console.log("Database Connected");
}).catch((err)=>{
    console.log(err);
})


app.use(express.json())

app.listen(3000, () => {
    console.log('Server is running 3000')
})

app.get('/', (req, res) => {
    res.send('Hello World')
})

app.use('/backend/now',authRouter);
