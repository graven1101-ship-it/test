import express from 'express'
import cors from 'cors'
import pg from 'pg'

const app = express()
const port = 4000
const { Pool } = pg

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password: 'mysecretpassword',
  database: 'postgres',
})

app.use(cors())
app.use(express.json())

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
    ['raven@gmail.com', 'raven@gmail.com', 'Admin'],
  )
}

app.post('/api/login', async (req, res) => {
  const email = String(req.body?.email ?? '').trim().toLowerCase()
  const password = String(req.body?.password ?? '').trim()

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' })
  }

  try {
    const result = await pool.query(
      'SELECT id, email, role FROM users WHERE email = $1 AND password = $2',
      [email, password],
    )

    if (result.rowCount === 0) {
      return res.status(401).json({ message: 'Invalid email or password.' })
    }

    const user = result.rows[0]
    return res.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        role: user.role.charAt(0).toUpperCase() + user.role.slice(1),
      },
    })
  } catch (error) {
    console.error('Login error:', error)
    return res.status(500).json({ message: 'Login failed. Please try again.' })
  }
})

app.get('/api/health', async (req, res) => {
  try {
    await pool.query('SELECT 1')
    res.json({ ok: true, database: 'connected' })
  } catch (error) {
    console.error('Health check failed:', error)
    res.status(500).json({ ok: false, database: 'disconnected' })
  }
})

initializeDatabase()
  .then(() => {
    app.listen(port, () => {
      console.log(`Auth API running on http://localhost:${port}`)
    })
  })
  .catch((error) => {
    console.error('Failed to start auth API:', error)
    process.exit(1)
  })
