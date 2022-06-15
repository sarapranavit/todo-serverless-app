import { DynamoDBHelper } from "../helper/dynamoDBHelper";
import { TodoList } from "../dao/todo_list_management"
import { ConditionExpression } from "@aws/dynamodb-expressions";

export class TodoModel {
    private dynhelper: DynamoDBHelper = undefined;

    constructor() {
        this.dynhelper =  DynamoDBHelper.getInstance();
        
    }

    public async getTodoList() {
        try {
            //todoList.id = "ORG#104970";
            //todoList.name = "todo-task-1";
            const response = await this.dynhelper.scanItem()
            return response
        }
        catch (error) {
            throw(error);
        }
    }

    public async getTodoById(id) {
        try {
            const todoList = new TodoList()
            todoList.id = id;
            const response = await this.dynhelper.getItem(todoList)
            return response
        }
        catch (error) {
            throw(error);
        }
    }

    public async createTodo(todoEntity:TodoList) {
        try {
            const response = <TodoList>await this.dynhelper.putItem(todoEntity);
            return response
        }
        catch (error) {
            throw(error);
        }
    }

    public async updateTodo(todoEntity:TodoList) {
        try {
            const response = <TodoList>await this.dynhelper.putItem(todoEntity);
            return response
        }
        catch (error) {
            throw(error);
        }
    }

    public async queryTodo(param) {
        try {
            const statusFilter: ConditionExpression = {
                type: 'Equals',
                subject: 'status',
                object: 'Active'
            };
            const response = await this.dynhelper.queryItem(param, statusFilter);
            return response
        }
        catch (error) {
            throw(error);
        }
    }


}