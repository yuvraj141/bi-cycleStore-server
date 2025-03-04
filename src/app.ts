import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import router from './app/routes'
const app:Application=express()

app.use(express.json())
app.use(cors()) 
app.use(cookieParser())


//router
app.use('/api/v1',router)

const test=async(req:Request,res:Response)=>{
    const c=10
    res.send(c)
}
app.get('/',test)

export default app