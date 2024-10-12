import { User } from '../types';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from './db';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export async function createUser(userData: Omit<User, 'id'>): Promise<User | null> {
  const { name, email, password, role } = userData;
  
  try {
    // Check if user already exists
    const existingUser = await db.query('SELECT * FROM users WHERE email = $1', [email]);
    if (existingUser.rows.length > 0) {
      throw new Error('User already exists');
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Insert user into database
    const result = await db.query(
      'INSERT INTO users (name, email, password_hash, role) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, email, hashedPassword, role]
    );

    const newUser = result.rows[0];
    delete newUser.password_hash;

    return newUser;
  } catch (error) {
    console.error('Error creating user:', error);
    return null;
  }
}

export async function authenticateUser(email: string, password: string): Promise<User | null> {
  try {
    const result = await db.query('SELECT * FROM users WHERE email = $1', [email]);
    const user = result.rows[0];

    if (user && await bcrypt.compare(password, user.password_hash)) {
      delete user.password_hash;
      return user;
    }

    return null;
  } catch (error) {
    console.error('Error authenticating user:', error);
    return null;
  }
}

export function generateToken(user: User): string {
  return jwt.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '1d' });
}

// ... (rest of the file remains the same)