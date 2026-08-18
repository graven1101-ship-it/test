import pg from 'pg'

const { Pool } = pg

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password: 'mysecretpassword',
  database: 'postgres',
})

async function initializeDatabase() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      email VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      role VARCHAR(50) NOT NULL DEFAULT 'admin',
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `)

  await pool.query(
    `
      INSERT INTO users (email, password, role)
      VALUES ($1, $2, $3)
      ON CONFLICT (email) DO NOTHING;
    `,
    ['raven@gmail.com', 'raven@gmail.com', 'admin'],
  )

  const result = await pool.query('SELECT email, role FROM users WHERE email = $1', ['raven@gmail.com'])
  console.log('Database initialized. Matching user count:', result.rowCount)
}

initializeDatabase()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('Database initialization failed:', error)
    process.exit(1)
  })
