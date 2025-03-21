import express from 'express'
import { connectDB } from './db/db'
import authRouter from './routes/auth.route'
import cookieParser from 'cookie-parser'
import cors from 'cors'
const app = express()
connectDB()
app.use(cors({
  origin: "*"
}))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())
app.use('/api/v1/auth', authRouter)
app.get('/', (req, res)=>{
  res.send("Health Check")
})

export default app
