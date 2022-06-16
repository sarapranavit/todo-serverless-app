import {
    attribute,
    hashKey,
    table
} from '@aws/dynamodb-data-mapper-annotations';

@table(process.env.Table)
export class TodoList{
    
    @hashKey()
    id: string

    @attribute()
    name: string

    @attribute()
    status: string
    
    @attribute()
    descrption: string

    @attribute()
    dueDate: Date

    @attribute()
    createdAt: Date

    @attribute()
    updatedAt: Date
}