import express, { Request, Response } from 'express';
import { TodoController } from "../controller/todoController"
//const Validator = require("../middleware/request_validator")
import { middyValidator } from "../middleware/request_validator"

const todoRoutes = express.Router();
const todoController = new TodoController()

todoRoutes.get('/todo', (req: Request, res:Response) => {
    todoController.getTodoList(req, res)
})

todoRoutes.get('/todo/:id', middyValidator("todoIdSchema"),(req: Request, res:Response) => {
    todoController.getTodoById(req, res)
})

todoRoutes.post('/todo', middyValidator("createTodoSchema"), (req: Request, res:Response) => {
    todoController.createTodo(req, res)
})

todoRoutes.put('/todo/:id', middyValidator("updateTodoSchema"), (req: Request, res:Response) => {
    todoController.updateTodo(req, res)
})

todoRoutes.delete('/todo/:id', middyValidator("todoIdSchema"), (req: Request, res:Response) => {
    todoController.deleteTodo(req, res)
})


export default todoRoutes