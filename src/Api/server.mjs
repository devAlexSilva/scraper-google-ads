import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import { price } from './routes/priceRouter.mjs'

dotenv.config()
const app = express()
const port = process.env.PORT || 2222

app.use(express.json())
app.use(cors())

app.get('/', (req, res) => res.send('hello!'))

app.use(price)

app.listen(port, (req, res) => console.log(`run ⚙️ http://localhost:${port}`))