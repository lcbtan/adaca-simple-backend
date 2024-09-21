import express from 'express';
import pool from './db/index.ts';
import { Request, Response } from 'express';
import { userSchema } from './db/models/user.ts';

const app = express();
app.use(express.json());

app.post('/user', async (req: Request, res: Response) => {
  const { name, age } = req.body;

  // Validate the user data
  const { error } = userSchema.validate({ name, age });
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  try {
    const result = await pool.query(
      'INSERT INTO users (name, age) VALUES ($1, $2) RETURNING *',
      [name, age]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Database error' });
  }
});

app.get('/user', async (req: Request, res: Response) => {
  try {
    const result = await pool.query('SELECT * FROM users');
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Database error' });
  }
});

export default app;