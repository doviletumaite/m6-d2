import express from "express"
import cors from "cors"
import createTable from "./utils/create-tables.js"
import route from "./services/products/routes.js"
const server = express()
const {PORT=5000} = process.env

const loggerMiddleware = (req, res, next) => {
    console.log(`Request method ${req.method} +++++ Request URL ${req.url}`)
    next()  // don't forget the NEXT() not to get stuck in sending request :)
}

server.use(cors())
server.use(express.json())
server.use(loggerMiddleware)
server.use("/products",route)
server.listen(PORT,async ()=>{
    console.log(`Server is listening on port ${PORT}`)
//    const result = await pool.query("SELECT NOW()")
//    console.log(result)
      await createTable()
})

server.on('error',(error)=>{
    console.log('WARNING - SERVER IS STOPPED ',error)
})