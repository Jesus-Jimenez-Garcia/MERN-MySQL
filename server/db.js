import { createPool } from "mysql2/promise";
import * as dotenv from "dotenv"
dotenv.config({path:"./.env"})

export const pool = createPool({
  host: process.env.HOST,
  port: process.env.PORTDB,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE
})



