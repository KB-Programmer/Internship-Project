import express from 'express'

const app=express();
app.use(express.json());

const port = 4001;
app.listen(port, () => {
     console.log(`Server Enviroment is Successfully Running on http://127.0.0.1:${port}`)
})