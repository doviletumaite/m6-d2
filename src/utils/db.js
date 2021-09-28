import pg from "pg"
import dotenv from "dotenv"
dotenv.config()
const { Pool } = pg

const { DEPLOYED_DATABASE_URL, DATABASE_URL, NODE_ENV } = process.env
 const isProduction = NODE_ENV === "production";
 const connectionString = isProduction ? DATABASE_URL : DEPLOYED_DATABASE_URL;

// console.log( typeof process.env.DATABASETEST_URL)

const sslConfig = isProduction
  ? {
      ssl: {
        rejectUnauthorized: false,
      },
    }
  : {};
  const pool = new Pool({
    // DATABASETEST_URL
    // DEPLOYED_DATABASE_URL,
    // DATABASE_URL,
    // ssl: {
    //     rejectUnauthorized:false
    // }
    connectionString, 
    ...sslConfig,
})
async function test () {
    const res = await pool.query('SELECT NOW();')
    // console.log(res)
}

test()

export default pool