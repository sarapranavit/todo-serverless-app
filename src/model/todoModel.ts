import { DynamoDBHelper } from "../helper/dynamoDBHelper";
import { TodoList } from "../dao/todo_list_management";

export class TodoModel {
    private dynhelper: DynamoDBHelper = undefined;

    constructor() {
        //this.helper = new DBHelper();
        this.dynhelper =  DynamoDBHelper.getInstance();
    }

    public async getTodoList() {
        try {
            const todoList = new TodoList()
            const response = await this.dynhelper.scanItem(todoList)
            return response
        }
        catch (error) {
            throw(error);
        }
    }
}