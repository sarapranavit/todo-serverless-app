import {
    hashKey,
    rangeKey,
    table
} from '@aws/dynamodb-data-mapper-annotations';


@table("todo_list_management")
export class TodoList{
    
    @hashKey()
    id: string

    @rangeKey()
    name: string
}