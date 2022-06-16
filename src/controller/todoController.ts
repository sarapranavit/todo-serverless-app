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

    async getTodoList(_: Request, res:Response) {
        try {
            const result = await this.todoModel.getTodoList()
            return res.json({result})
        }
        catch(err) {
            throw err
        }
       
    }

    async getTodoById(req: Request, res:Response) {
        try {
            const id = req.params.id;
            const result = await this.todoModel.getTodoById(id)
            if(result){
                return res.status(200).json(result)
            }
            else {
                return res.status(404).json({statusCode: 404, message: "Todo Not found"})
            }
            
        }
        catch(err) {
            throw err
        }
       
    }

    async createTodo(req: Request, res:Response) {
        try {
            const { body: params } = req
            const todoEntity = this.constructCreateTodoEntity(params)
            const result = await this.todoModel.createTodo(todoEntity)
            return res.status(201).json(result)
        }
        catch(err) {
            throw err
        }
        
    }

    async updateTodo(req: Request, res:Response) {
        try {
            const { body: params } = req
            const id = req.params.id
            const param = {
                id: id
            }
            const getResult:TodoList = await this.todoModel.queryTodo(param);
            if(getResult) {
                const todoEntity = this.constructUpdateTodoEntity(params, getResult)
                const respone =  await this.todoModel.updateTodo(todoEntity)

                return res.status(200).json(respone)
            }
            else {
                return res.status(404).json({statusCode: 404, message: "Todo Id Not Exits"})
            }
        }
        catch(err) {
            throw err
        }
        
    }

    async deleteTodo(req: Request, res:Response) {
        try {
            const id = req.params.id
            const param = {
                id: id
            }
            const getResult = await this.todoModel.queryTodo(param);
            if(getResult) {
                const todoEntity:TodoList = new TodoList();
                todoEntity.id = id;
                todoEntity.status = TODO_STATUS.IN_ACTIVE
                await this.todoModel.updateTodo(todoEntity)
                return res.status(204).json({})
            }
            else {
                return res.status(404).json({statusCode: 404, message: "Todo Id Not Exits"})
            }
        }
        catch(err) {
            throw err
        }
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