import express, { Request, Response } from 'express';
import { TodoController } from "../controller/todoController"

const todoRoutes = express.Router();
const todoController = new TodoController()

todoRoutes.get('/todo', (req: Request, res:Response) => {
    todoController.getTodoList(req, res)
})

todoRoutes.get('/todo/:id', (req: Request, res:Response) => {
    todoController.getTodoById(req, res)
})

todoRoutes.post('/todo', (req: Request, res:Response) => {
    todoController.createTodo(req, res)
})

todoRoutes.put('/todo', (req: Request, res:Response) => {
    todoController.updateTodo(req, res)
})

todoRoutes.delete('/todo/:id', (req: Request, res:Response) => {
    todoController.deleteTodo(req, res)
})


export default todoRoutes