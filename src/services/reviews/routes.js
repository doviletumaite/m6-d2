import { Router } from "express";
import pool from "../../utils/db.js";

const reviewsRoute = Router()
reviewsRoute.get("/", async(req, res, next) => {
    try {
        const query =  `SELECT * FROM reviews` 
        const result = await pool.query(query)
        res.send(result.rows)
    } catch (error) {
        console.log(error)
        res.status(500).send(error)   
    }
})

reviewsRoute.post("/", async(req, res, next) => {
    try {
      const { comment, rate, product_id } = req.body
      const query =  `
      INSERT INTO reviews 
      (
        comment,
        rate,
        product_id
      )
      VALUES
      (
          ${"`"+comment+"`"},
          ${"`"+rate+"`"},
          ${"`"+product_id+"`"}
      ) RETURNING *;
      `
      const result = await pool.query(query)
      res.status(201).send(result.rows[0])
    } catch (error) {
        console.log(error)
        res.status(500).send(error) 
    }
})
export default reviewsRoute