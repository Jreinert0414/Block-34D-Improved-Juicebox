const { Client } = require('pg') 


const client = new Client({
  connectionString: process.env.DATABASE_URL || 'postgres://localhost:5432/34d_',
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : undefined,
});