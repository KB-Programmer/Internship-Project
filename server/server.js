import express from 'express'
import cors from 'cors'

const option = {
     origin:['http://localhost:5173','http://localhost:5174'],
     Credential:true
}

const app=express();
app.use(express.json());
app.use(cors(option))


const port = 4001;
app.listen(port, () => {
     console.log(`Server Enviroment is Successfully Running on http://127.0.0.1:${port}`)
})