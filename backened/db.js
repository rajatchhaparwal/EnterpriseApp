import pg from 'pg';
const { Pool } = pg;

const connectionString = process.env.DATABASE_URL || process.env.POSTGRES_URL;

const pool = new Pool(
  connectionString
    ? {
        connectionString,
        ssl: { rejectUnauthorized: false }
      }
    : {
        user: process.env.PGUSER || 'postgres',
        host: process.env.PGHOST || 'localhost',
        database: process.env.PGDATABASE || 'se',
        password: process.env.PGPASSWORD || 'root',
        port: process.env.PGPORT ? Number(process.env.PGPORT) : 5432,
      }
);

pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('PostgreSQL connection error:', err.message);
  } else {
    console.log('Connected to PostgreSQL successfully at:', res.rows[0].now);
  }
});

export default pool;
