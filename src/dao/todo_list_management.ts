import {
    hashKey,
    rangeKey,
    table
} from '@aws/dynamodb-data-mapper-annotations';


@table(process.env.Todo_TABLE)
export class TodoList{
    
    @hashKey()
    id: string

    @rangeKey()
    name: string
}