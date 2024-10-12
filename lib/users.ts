import db from './db';
import { User } from '../types';

export async function createUser(user: Omit<User, 'id'>): Promise<User> {
  const { rows } = await db.query(
    'INSERT INTO users (email, password_hash, name, role, credits) VALUES ($1, $2, $3, $4, $5) RETURNING *',
    [user.email, user.password_hash, user.name, user.role, user.credits]
  );
  return rows[0];
}

export async function getUserById(id: number): Promise<User | null> {
  const { rows } = await db.query('SELECT * FROM users WHERE id = $1', [id]);
  return rows[0] || null;
}

export async function updateUser(id: number, updates: Partial<User>): Promise<User | null> {
  const setClause = Object.keys(updates)
    .map((key, index) => `${key} = $${index + 2}`)
    .join(', ');
  const values = Object.values(updates);
  
  const { rows } = await db.query(
    `UPDATE users SET ${setClause} WHERE id = $1 RETURNING *`,
    [id, ...values]
  );
  return rows[0] || null;
}

// Add more functions as needed for other operations