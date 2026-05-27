import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

const PORT = process.env.PORT || 3000

const app = express()

app.get('/', (req, res) => {
    res.status(200).send("Welcome to TaskManager app")
})

app.listen(PORT, () => {
    console.log("Running on PORT", PORT)
})