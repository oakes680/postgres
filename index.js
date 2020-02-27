const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const userRouter = require('./db/api/index.js')

const server = express()
server.use(cors())
// server.use(helmet())
server.use(express.json())

server.use('/api',  userRouter)

const port = process.env.PORT ||  8888

//done 
server.listen(port, () => {
  console.log(`you are on ${port}`)
})