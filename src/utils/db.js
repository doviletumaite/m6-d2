import pg from "pg"
import dotenv from "dotenv"
dotenv.config()
const { Pool } = pg

const {DATABASETEST_URL} = process.env
console.log( typeof process.env.DATABASETEST_URL)
const pool = new Pool({
    DATABASETEST_URL
})

async function test () {
    const res = await pool.query('SELECT NOW();')
    console.log(res)
}

test()

export default pool