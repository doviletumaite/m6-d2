import { Router } from "express";
import pool from "../../utils/db.js";

const route = Router()

route.get("/", async( req, res, next)=> {
    try {
const query =  `SELECT * FROM products` 
const result = await pool.query(query)
res.send(result.rows)
    } catch (error) {
        console.log(error)
        res.status(500).send(error)     
    }
})

route.post("/", async (req, res, next) => {
   try {
       const {name, description, brand, image_url, price, category} = req.body
       const query =  `
       INSERT INTO products
       (
           name, 
           description, 
           brand, 
           image_url,
           price, 
           category
       )
       VALUES
       (
        ${"'"+name+"'"},
        ${"'"+description+"'"},
        ${"'"+brand+"'"},
        ${"'"+image_url+"'"},
        ${"'"+price+"'"},
        ${"'"+category+"'"}
       ) RETURNING *;
       `
       const result = await pool.query(query)
       res.status(201).send(result.rows[0])
   } catch (error) {
    console.log(error)
    res.status(500).send(error)   
   }
})
export default route