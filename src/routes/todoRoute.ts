import express, { Request, Response } from 'express';
import { TodoController } from "../controller/todoController"

const todoRoutes = express.Router();
const todoController = new TodoController()

todoRoutes.get('/todo', (req: Request, res:Response) => {
    todoController.getTodoList(req, res)
})


export default todoRoutes