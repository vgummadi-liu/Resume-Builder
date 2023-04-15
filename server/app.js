const express = require('express')

const bodyParser = require('body-parser')

const cors = require('cors')

const app = express()

const apiPort = 3000

const db = require('./db')

const userRouter = require('./routes')

app.use(bodyParser.urlencoded({ extended: true }))

app.use(cors())

app.use(bodyParser.json())



app.get('/', (req, res) => {

    res.send('Hello World!')

})

app.use('/api', userRouter)

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`))