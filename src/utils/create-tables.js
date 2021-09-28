import pool from "./db.js"

const query = `
 CREATE TABLE IF NOT EXISTS
 products(
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR (100) NOT NULL,
  description VARCHAR (100) NOT NULL,
  brand VARCHAR (50) NOT NULL,
  image_url TEXT NOT NULL,
  price FLOAT NOT NULL,
  category VARCHAR (50) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
 );

 CREATE TABLE IF NOT EXISTS
 reviews(
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  comment VARCHAR (100) NOT NULL,
  rate FLOAT NOT NULL,
  product_id INTEGER NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW()
 )
`

const createTable = async () => {
    try {
        await pool.query(query)
        console.log("tables are created successfully")
    } catch (error) {
        console.log("tables aren't created",error)
    }
}

export default createTable