import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'


import connectDb from './config/db.js'
import userRoute from './routes/userRoute.js';
import productRouter from './routes/productRoute.js';
import stockInRouter from './routes/stockInRoute.js';
import stockOutRouter from "./routes/stockOutRoute.js";

dotenv.config();

connectDb()

const option = {
     origin:[process.env.SERVER_URL1,process.env.SERVER_URL2],
     credentials:true
}
const app=express();
app.use(express.json());
app.use(cors(option))
 

app.get('/', (req,res) => {
     res.send(' ✔🌐 Api Enviroment is Working Well')
})

app.use('/api',userRoute)
app.use("/api/product", productRouter);
app.use("/api/stockin", stockInRouter);
app.use("/api/stockout", stockOutRouter);

const port = process.env.PORT ;
app.listen(port, () => {
     console.log(`✅ Server Enviroment is Successfully Running on 🌐 http://127.0.0.1:${port}`)
})