import { initializeAPI } from './api'
import express from 'express'

const port = 3000

const app = express()

app.use(express.json())

initializeAPI(app)

app.listen(port, () => {
console.log(`Example app listening on port ${port}`)
})
