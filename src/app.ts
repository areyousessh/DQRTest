import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import dotenv from 'dotenv'
import { knightsRouter } from './routes/knightsRoutes'

dotenv.config()

export const app = express()

app.use(express.json())
app.use(cors())
app.use(morgan('dev'))
app.use('/', knightsRouter)