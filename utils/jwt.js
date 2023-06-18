import jwt from 'jsonwebtoken';

export function generateToken(userId) {

  return jwt.sign({ userId }, 'secret-key', { expiresIn: 60 * 1 });

}