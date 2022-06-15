import {
    attribute,
    hashKey,
    table
} from '@aws/dynamodb-data-mapper-annotations';


@table("todo_list_management")
export class TodoList{
    
    @hashKey()
    id: string

    @attribute()
    name: string

    @attribute()
    status: string
}