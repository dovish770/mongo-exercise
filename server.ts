import express from 'express'
import dotenv from "dotenv"
import connectDb from "./config/db.js"
import usersRouter from './Routes/usersRouts.js'

dotenv.config();

const PORT = 8080
const app = express()

connectDb();

app.use(express.json());
app.use('/users', usersRouter);

app.listen(PORT, ()=> {console.log('server is on ' + PORT) })