import express from "express"
import cors from "cors"
import pool from "./utils/db.js"
const server = express()
const {PORT=5000} = process.env

const loggerMiddleware = (req, res, next) => {
    console.log(`Request method ${req.method} +++++ Request URL ${req.url}`)
    next()  // don't forget the NEXT() not to get stuck in sending request :)
}

server.use(cors())
server.use(express.json())
server.use(loggerMiddleware)

server.listen(PORT,async ()=>{
    console.log(`Server is listening on port ${PORT}`)
   const result = await pool.query("SELECT NOW()")
   console.log(result)
})

server.on('error',(error)=>{
    console.log('WARNING - SERVER IS STOPPED ',error)
})