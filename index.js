require('dotenv').config()

const express = require('express')
const cors = require('cors')
const router = require('./router/router')
require('./database/dbConnection')

const techServer = express()

techServer.use(express.json())
techServer.use(cors())
techServer.use(router)
techServer.use('/uploads',express.static('./uploads'))

const PORT = 3000 || process.env.PORT

techServer.listen(PORT,()=>{
    console.log(`Server Listening for client request through port ${PORT}`);
    
})

techServer.get('/',(req,res)=>{
    res.status(200).send('<h1>Server listening for client request!!!</h1>')
})

techServer.post('/',(req,res)=>{
    res.status(200).send('POST REQUEST')
})