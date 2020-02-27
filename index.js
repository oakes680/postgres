const express = require('express')
const helmet = require('helmet')
const userRouter = require('./db/api/index')

const server = express()
// server.use(helmet())
server.use(express.json())

server.use('/api',  userRouter)

const port = process.env.DATABASE_URL ||  8888

//done 
server.listen(port, () => {
  console.log(`you are on ${port}`)
})