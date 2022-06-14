import express, { Request, Response } from 'express';

const todoRoutes = express.Router();

todoRoutes.get('/todo', (req: Request, res:Response) => {
    res.json({
        "Msg": "todo- list"
    })
})


export default todoRoutes