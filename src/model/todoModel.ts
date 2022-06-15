import { DynamoDBHelper } from "../helper/dynamoDBHelper";

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
}