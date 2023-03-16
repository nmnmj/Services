import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
dotenv.config()
import connectDB from './db/connectDB.js'
import cors from 'cors'
import web from './routes/web.js'
const PORT = process.env.PORT
const DATABASE_URL = process.env.DATABASE_URL
const app = express()
app.use(cors())
app.use(express.urlencoded({extended:false}))
app.use(cookieParser())


connectDB(DATABASE_URL)

app.use("/", web);


app.listen(PORT,()=>{
    console.log(`running on port ${PORT}`)
})