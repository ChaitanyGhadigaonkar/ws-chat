import { Pool } from "pg";

const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD } = process.env;

export const pool = new Pool({
  host: PGHOST,
  database: PGDATABASE,
  user: PGUSER,
  password: PGPASSWORD,
  port: 5432,
  ssl: true,
});

const connectToDatabase = async () => {
  try {
    await pool.connect();
    console.log("Connected to database");
  } catch (error) {
    console.error("Error connecting to database", error);
    process.exit(1);
  }
};

export { connectToDatabase };
