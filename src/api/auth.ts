import { type Express, type Request, type Response } from 'express';
import { db } from '../database';
import { postsTable } from '../db/schema';
import { eq } from 'drizzle-orm';
import bcrypt from "bcrypt";


export const initializeAuthAPI = (app: Express) => {
    app.post('/api/auth/register', async (req: Request, res: Response) => {
        //Insert a new user into the database
        
    })
}