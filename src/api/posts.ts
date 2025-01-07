import express, { type Express, type Request, type Response } from 'express'
import { db } from '../database'
import { postsTable } from '../db/schema'
import { and, eq } from 'drizzle-orm'

export const initializePostsAPI = (app: Express) => {  
  //GET-function for all posts
  app.get('/api/posts', async (req: Request, res: Response) => {
    const posts = await db.select().from(postsTable)
    res.send(posts)
  })
  
  //POST-function to add new ID + post comment via postman
  app.post('/api/posts', async (req: Request, res: Response) => {
    const userId = req.user?.id
    if (!userId) {
      res.status(401).send({ error: 'Unauthorized' })
      return
    }
    const { content } = req.body
    const newPost = await db.insert(postsTable).values({ content, userId }).returning()
    res.send(newPost[0])
  });
  
  // PUT-Function to update an existing content
  app.put('/api/posts/:id', async (req: Request, res: Response) => {
    const id = parseInt(req.params.id)
    const userId = req.user?.id
    
    if (!userId) {
      res.status(401).send({ error: 'Unauthorized' })
      return
    }

    const updatedPost = await db
      .update(postsTable)
      .set(req.body)
      .where(and(eq(postsTable.id, id), eq(postsTable.userId, userId)))
      .returning()
    res.send(updatedPost[0])
  })
    // DELETE-function to delete contents
    app.delete('/api/posts/:id', async (req: Request, res: Response) => {
      const id = parseInt(req.params.id)
      const userId = req.user?.id
    
      if (!userId) {
        res.status(401).send({ error: 'Unauthorized' })
        return
      }
    
      await db.delete(postsTable)
        .where(and(eq(postsTable.id, id), eq(postsTable.userId, userId)))
        .execute();
    
      res.send({ id })
    })
}