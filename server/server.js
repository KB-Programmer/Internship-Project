import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'


import connectDb from './config/db.js'
import userRoute from './routes/userRoute.js';

dotenv.config();

connectDb()

const option = {
     origin:['http://localhost:5173','http://localhost:5174'],
     credentials:true
}
const app=express();
app.use(express.json());
app.use(cors(option))
 

app.get('/', (req,res) => {
     res.send(' ✔🌐 Api Enviroment is Working Well ')
})

app.use('/api',userRoute)

const port = process.env.PORT ;
app.listen(port, () => {
     console.log(`✅ Server Enviroment is Successfully Running on 🌐 http://127.0.0.1:${port}`)
})