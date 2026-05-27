import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

const app = express()

// --- Routes ---

// --- Middleware ---
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// --- Routes ----
app.get('/', (req, res) => {
    res.status(200).send('Welcome to TaskManager app')
})

export default app;