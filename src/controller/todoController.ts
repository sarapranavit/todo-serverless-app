import {Request, Response } from "express"
import { TodoModel } from "../model/todoModel";


export class TodoController {

    private todoModel: TodoModel

    constructor() {
        this.todoModel = new TodoModel()
    }

    async getTodoList(req: Request, res:Response) {
        const result = await this.todoModel.getTodoList()
        return res.json({result})
    }
}