import {Request, Response } from "express"
import { v4 as uuidv4 } from 'uuid';
import { TodoModel } from "../model/todoModel";
import { TodoList } from "../dao/todo_list_management"
import { TODO_STATUS } from "src/config";


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
        const { body: params } = req
        const todoEntity = this.constructCreateTodoEntity(params)
        const result = await this.todoModel.createTodo(todoEntity)
        return res.json(result)
    }

    async updateTodo(req: Request, res:Response) {
        const { body: params } = req
        const id = req.params.id
        const param = {
            id: id
        }
        const getResult:TodoList = await this.todoModel.queryTodo(param);
        let respone = {}
        if(getResult) {
            const todoEntity = this.constructUpdateTodoEntity(params, getResult)
            respone =  await this.todoModel.updateTodo(todoEntity)
        }
        else {
            respone = { "statuCode": 404, "message": "No Records"}
        }
        return res.json(respone)
    }

    async deleteTodo(req: Request, res:Response) {
        const id = req.params.id
        const param = {
            id: id
        }
        const getResult = await this.todoModel.queryTodo(param);
        let respone = {}
        if(getResult) {
            const todoEntity:TodoList = new TodoList();
            todoEntity.id = id;
            todoEntity.status = TODO_STATUS.IN_ACTIVE
            await this.todoModel.updateTodo(todoEntity)
        }
        else {
            respone = { "statuCode": 404, "message": "No Records"}
        }
        
        return res.json(respone)
    }

    private constructUpdateTodoEntity(params, getResult) {
        
        const todoEntity:TodoList = new TodoList();
        todoEntity.id = getResult.id;
        todoEntity.name = (params.name) ? params.name : getResult.name
        todoEntity.createdAt =  getResult.createdAt
        todoEntity.descrption =  (params.descrption) ? params.descrption : getResult.descrption
        todoEntity.dueDate = (params.dueDate) ? params.dueDate : getResult.dueDate
        todoEntity.updatedAt = new Date()
        todoEntity.status = TODO_STATUS.ACTIVE

        return todoEntity
    }

    private constructCreateTodoEntity(params) {

        const todoEntity:TodoList = new TodoList();
        todoEntity.id = uuidv4();
        todoEntity.name = params.name;
        todoEntity.dueDate = params.dueDate;
        todoEntity.descrption = params.descrption
        todoEntity.status = TODO_STATUS.ACTIVE;
        todoEntity.createdAt = new Date();
        todoEntity.updatedAt = new Date();

        return todoEntity;
    }
}