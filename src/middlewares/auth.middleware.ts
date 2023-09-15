import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export function authenticate(req: Request, res: Response, next: NextFunction) {
  let token = req.header('Authorization');
  
  if (!token) {
    return res.status(401).json({ message: 'Access denied. Please provide the token.' });
  }  
  
  try {
    token = token.replace('Bearer ', '');
    jwt.verify(token, process.env.JWT_SECRET as string);
    next();    
  } catch (error) {
    console.log(`Authentication failed ${(error as Error).message}`);
    res.status(401).json({ message: 'Access denied. Please provide the valid token.' });
  }
}