import {Request, Response } from "express"
import { v4 as uuidv4 } from 'uuid';
import { TodoModel } from "../model/todoModel";
import { TodoList } from "../dao/todo_list_management"


export class TodoController {

    private todoModel: TodoModel

    constructor() {
        this.todoModel = new TodoModel()
    }

    async getTodoList(req: Request, res:Response) {
        console.log("req", req)
        const result = await this.todoModel.getTodoList()
        return res.json({result})
    }

    async getTodoById(req: Request, res:Response) {
        const id = req.params.id;
        const result = await this.todoModel.getTodoById(id)
        return res.json(result)
    }

    async createTodo(req: Request, res:Response) {
        const { name } = req.body
        const todoEntity:TodoList = new TodoList();
        todoEntity.id = uuidv4();
        todoEntity.name = name;
        const result = await this.todoModel.createTodo(todoEntity)
        return res.json(result)
    }

    async updateTodo(req: Request, res:Response) {
        const { name } = req.body
        console.log(req.params)
        const id = req.params.id
        const todoEntity:TodoList = new TodoList();
        todoEntity.id = id;
        todoEntity.name = name;
        console.log("todoEntity", todoEntity)
        const result = await this.todoModel.updateTodo(todoEntity)
        return res.json(result)
    }

    async deleteTodo(req: Request, res:Response) {
        const id = req.params.id
        
        const param = {
            id: id
        }
        const getResult = await this.todoModel.queryTodo(param);
        let respone = {}
        if(getResult.length > 0 ) {
            const todoEntity:TodoList = new TodoList();
            todoEntity.id = id;
            todoEntity.status = "InActive";
            await this.todoModel.updateTodo(todoEntity)
        }
        else {
            respone = { "statuCode": 404, "message": "No Records"}
        }
        
        return res.json(respone)
    }
}